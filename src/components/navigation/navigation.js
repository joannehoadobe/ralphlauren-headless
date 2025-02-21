import React, { useState, useEffect, useContext } from 'react';
import { Link } from 'react-router-dom';
import { prepareRequest } from '../../utils';
import LinkManager from '../../utils/link-manager';
import PropTypes from 'prop-types';
import { useErrorHandler } from 'react-error-boundary';
import Flyout from '../../utils/flyout';
import { AppContext } from '../../utils/context';
import Image from '../image/image';
import './navigation.css';

export const NavigationGQL = `query ScreenList($locale: String!) {
  screenList(
    filter: {positionInNavigation: {_expressions: [{value: "dni", _operator: CONTAINS_NOT}]}}
    _locale: $locale
  ) {
    items {
      _metadata {
        stringMetadata {
          name
          value
        }
      }
      _path
      positionInNavigation
    }
  }
}`;

const Navigation = ({ className, config, screen }) => {
  const context = useContext(AppContext);
  const [nav, setNav] = useState('');
  const [expanded, setExpanded] = useState(false);
  const [logo, setLogo] = useState({});
  const handleError = useErrorHandler();

  useEffect(() => {
    function fetchNav() {
      const sdk = prepareRequest(context);
      setLogo(config.configurationByPath.item.siteLogo);
      const params = {
        locale: context.lang?.value,
        project: `/content/dam/${context.project}`
      };

      if (context.serviceURL.includes('author')) params['ts'] = new Date().getTime();
      else params['version'] = context.version;

      sdk.runPersistedQuery(`aem-demo-assets/${context.pqs.nav}`, params)
        .then((data) => {
          if (data) {
            setNav(data);
            context.navigationResponse = data;
          }
        })
        .catch((error) => {
          handleError(error);
        });
    }

    if (Object.keys(context.navigationResponse).length === 0) fetchNav();
  }, [handleError, config, context]);

  function viewGQL() {
    document.querySelector('#flyout') && document.querySelector('#flyout').setAttribute('aria-expanded', true);
    return false;
  }

  let prevScrollPos = window.pageYOffset;
  window.onscroll = function () {
    let currentScrollPos = window.pageYOffset;
    if (prevScrollPos > currentScrollPos) {
      if (document.getElementById('navbar'))
        document.getElementById('navbar').style.top = '0';
    } else {
      if (document.getElementById('navbar'))
        document.getElementById('navbar').style.top = '-80px';
    }
    prevScrollPos = currentScrollPos;
  };

  return (
    <React.Fragment>
      <nav id="navbar" aria-expanded={expanded}>
        <div className='nav-hamburger' onClick={() => {
          if (expanded) setExpanded(false);
          else setExpanded(true);
          document.body.style.overflowY = expanded ? '' : 'hidden';
        }}>
          <div className='nav-hamburger-icon'></div>
        </div>
        <div className='nav-brand'>
          <Link to={'/'}><Image alt='logo' asset={logo} imageProps={{}} width={108} height={56} /></Link>
        </div>
        <div className='nav-sections'>
          <ul>
            {nav && nav.data?.screenV2List?.items.map((item, i) => (
              <li key={i}>
                <LinkManager className={`navItem ${className}`} item={item} ue={false}>{item.screenTitle}</LinkManager>
              </li>
            ))}
            {/*
            <li><Link to={'/settings'} className={`navItem ${className}`} name={'Settings'}>{'Settings'}</Link></li>
            */}
          </ul>
        </div>
        <div className="nav-tools">
          <p className="black">
            <span className="icon icon-search" style={{fill: 'rgb(0, 0, 0)'}}>
              <svg className="icon-white" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24">
                <path d="M16.9,15.5c2.4-3.2,2.2-7.7-0.7-10.6c-3.1-3.1-8.1-3.1-11.3,0c-3.1,3.2-3.1,8.3,0,11.4
                c2.9,2.9,7.5,3.1,10.6,0.6c0,0.1,0,0.1,0,0.1l4.2,4.2c0.5,0.4,1.1,0.4,1.5,0c0.4-0.4,0.4-1,0-1.4L16.9,15.5
                C16.9,15.5,16.9,15.5,16.9,15.5L16.9,15.5z M14.8,6.3c2.3,2.3,2.3,6.1,0,8.5c-2.3,2.3-6.1,2.3-8.5,0C4,12.5,4,8.7,6.3,6.3
                C8.7,4,12.5,4,14.8,6.3z">
                </path>
              </svg>
            </span>
          </p>
          <p className="black"><span className="icon icon-wishlist" style={{fill: 'rgb(0, 0, 0)'}}></span></p>
          <p className="black"><span className="icon icon-login" style={{fill: 'rgb(0, 0, 0)'}}></span></p>
          <p className="black"><span className="icon icon-cart" style={{fill: 'rgb(0, 0, 0)'}}></span></p>
        </div>
      </nav >
      <Flyout show={false} config={config} screen={screen} />
    </React.Fragment>
  );
};

Navigation.propTypes = {
  className: PropTypes.string,
  config: PropTypes.object,
  screen: PropTypes.object,
  context: PropTypes.object
};

export default Navigation;  