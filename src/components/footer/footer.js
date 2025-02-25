/*
Copyright 2023 Adobe
All Rights Reserved.
NOTICE: Adobe permits you to use, modify, and distribute this file in
accordance with the terms of the Adobe license agreement accompanying
it.
*/
import React, { useState, useEffect, useContext } from 'react';
import PropTypes from 'prop-types';
import './footer.css';
import { useErrorHandler } from 'react-error-boundary';
import { pageRef } from '../../api/api';
import { AppContext } from '../../utils/context';

const Footer = ({ config }) => {
  const context = useContext(AppContext);
  const [footer, setFooter] = useState({});
  const handleError = useErrorHandler();

  useEffect(() => {
    if (!config) return;
    // const url = context.defaultServiceURL === context.serviceURL || context.serviceURL.includes('publish-') ?
    //   config._publishUrl.replace('.html', '.model.json') :
    //   config._authorUrl.replace('.html', '.model.json');
    const url = context.defaultServiceURL === context.serviceURL && context.serviceURL.includes('publish-') ?
      config._authorUrl.replace('.html', '.model.json') :
      config._authorUrl.replace('.html', '.model.json');

    const walk = [':items', 'root', ':items', 'container', ':items', 'container', ':items'];

    pageRef(url, context, walk)
      .then((res) => {
        if (res && res.image) {
          res.image.src = `${context.serviceURL}${res?.image?.src.substring(1)}`;
        }
        setFooter(res);
      })
      .catch((error) => {
        handleError(error);
      });

  }, [config, handleError, context]);

  const { host, pathname } = window.location;

  return (
    <React.Fragment>
      <div className="footer-xf">
        {footer && (
          <React.Fragment>
            {/*<div className='image'><img src={footer.image?.src} alt={footer.image?.alt}  /></div>
            <hr />*/}
            {/*<p dangerouslySetInnerHTML={{ __html: footer.text?.text }} />*/}
            <div className='footer-container'>
              <div className="footer-email-signup">
                <div className="footer-email-inner">
                  <title>Ecom OptIn Footer Signup Email</title>
                  <div className="content-asset">
                    <h3> Sign Up for Emails</h3>
                  </div> 
                  <form action="/on/demandware.store/Sites-RalphLauren_US-Site/en_US/ExactTargetEmailSignUp-FooterSignUpAjax" method="post" id="email-alert-signup" className="email-subscribe" noValidate="novalidate">
                    <input type="email" inputMode="email" autoCapitalize="off" autoCorrect="off" autoComplete="email" id="email-alert-address" className="input-text email required empty" placeholder="Enter Email Address" defaultValue="" name="dwfrm_emailsubscribe_email"/>
                    <button type="submit" name="home-email" defaultValue="Submit" title="Submit">Submit</button>
                  </form>
                  <span className="EmailErrorMsg"></span>
                  <div id="EmailSuccess" className="email-success hide">
                    <div className="thank-msg"></div>
                  </div>
                </div>
                <div className="footer-email-opt-in-text">
                  <div className="html-slot-container">
                    <p><u><a href="/customerservice?cid=cs-privacy-notice">Click here</a></u> <span style={{color:'#000000'}}>to read Ralph Lauren&apos;s privacy notice. Or</span> <u><a href="https://www.ralphlauren.com/contactus">contact us</a></u>.&nbsp;</p>
                  </div>
                </div>
              </div>
              <div className="footer-item first-column">
                <h3><span style={{color:'#252525'}}>CUSTOMER SERVICE</span><span aria-hidden="true"></span></h3>
                <ul>
                  <li><a href="https://www.ralphlauren.com/account" title="My Account"><span style={{color:'#000000'}}>My Account</span></a></li>
                  <li><a className="gladly-init" href="javascript:void(0);" title="Live Chat"><span style={{color:'#000000'}}>Live Chat</span></a></li>
                  <li><a href="/support" title="Customer Support"><span style={{color:'#000000'}}>Customer Support</span></a></li>
                  <li><a href="/support?a=Shipping-Options-and-Delivery-Costs---id--Bf908h3CQ9mgVeeHT0g21g"><span style={{color:'#000000'}}>Shipping &amp; Delivery</span></a></li>
                  <li><a href="/support?a=Holiday-Returns-and-Exchanges-Policy---id--axaLbG8vR4iQqxRS8hDDGQ" title="Return Policy"><span style={{color:'#000000'}}>Returns &amp; Exchanges Policy</span></a></li>
                  <li><a href="https://www.ralphlauren.com/returns?cid=cs-start-a-return" className="return-exchange"><span style={{color:'#000000'}}>Start a Free Return or Exchange</span></a></li>
                  <li><a rel="nofollow" href="/on/demandware.store/Sites-RalphLauren_US-Site/en_US/Order-CheckOrdersGuest" title="Check Order"><span style={{color:'#000000'}}>Check Order Status</span></a></li>
                  <li><a href="https://www.ralphlauren.com/giftcertpurchase?virtualgc=true&amp;webcat=footer" title="Gift Cards"><span style={{color:'#000000'}}>Gift Cards</span></a></li>
                </ul>
              </div>
              <div className="footer-item second-column">
                <h3><span style={{color:'#252525'}}>COMPANY</span><span aria-hidden="true"></span></h3>
                <ul>
                  <li><a href="https://corporate.ralphlauren.com" target="new" title="About Us" rel='noopener noreferrer'><span style={{color:'#000000'}}>About Us</span></a></li>
                  <li><a href="http://careers.ralphlauren.com" target="new" title="Careers" rel='noopener noreferrer'><span style={{color:'#000000'}}>Careers</span></a></li>
                  <li><a href="https://www.ralphlauren.com/rl-50-about-ralph-feat" title="World of RL"><span style={{color:'#000000'}}>World of RL</span></a></li>
                  <li><a href="https://corporate.ralphlauren.com/protecting-our-brands" target="new" title="Protecting Our Brands" rel='noopener noreferrer'><span style={{color:'#000000'}}>Protecting Our Brands</span></a></li>
                  <li><a href="https://www.ralphlauren.com/sustainability-and-citizenship" title="Global Citizenship &amp; Sustainability"><span style={{color:'#000000'}}>Global Citizenship &amp; Sustainability</span></a></li>
                  <li><a href="https://corporate.ralphlauren.com/citizenship-champion-better-lives" target="_blank" rel='noreferrer'><span style={{color:'#000000'}}>Commitment to Racial Equity</span></a></li>
                  <li><a href="/support?a=Satisfaction-Guarantee---id--acqV7aYUS7mIaq3R3fHkzA&amp;cid=products-satisfaction-guarantee" title="Satisfaction Guarantee"><span style={{color:'#000000'}}>Satisfaction Guarantee</span></a></li>
                </ul>
              </div>
              <div className="footer-item third-column">
                <h3><span style={{color:'#252525'}}>MORE FROM RL</span><span aria-hidden="true"></span></h3>
                <ul>
                  <li><a href="https://www.ralphlauren.com/mystyle" title="Personalize Your Experience"><span style={{color:'#000000'}}>Personalize Your Experience</span></a></li>
                  <li><a href="/stores" title="Find a Store"><span style={{color:'#000000'}}>Find a Store</span></a></li>
                  <li><a href="https://ralphlauren.onelink.me/wv2L/14zapl2u" title="Download the Ralph Lauren App" rel='noopener noreferrer'><span style={{color:'#000000'}}>Download the Ralph Lauren App</span></a></li>
                  <li><a href="https://corporate.ralphlauren.com/protecting-our-brands" target="new" title="Protecting Our Brands" rel='noopener noreferrer'><span style={{color:'#000000'}}>Protecting Our Brands</span></a></li>
                  <li><a href="https://www.ralphlauren.com/sitemap" title="Sitemap"><span style={{color:'#000000'}}>Sitemap</span></a></li>
                  <li><a href="https://www.ralphlauren.com/customerservice?cid=cs-mobile-marketing" title="Mobile Marketing"><span style={{color:'#000000'}}>Mobile Marketing</span></a></li>
                  <li><a href="https://www.ralphlauren.com/Stores-Details?StoreID=virtualappointment"><span style={{color:'#000000'}}>Book an appointment</span></a></li>
                </ul>
              </div>
            </div>
            <div className='image'><img src={footer.image?.src} alt={footer.image?.alt}  /></div>
          </React.Fragment>
        )}
      </div>
      <div className='version'>
        <span>{localStorage.getItem('version') && localStorage.getItem('version') === 'v2' ? 'version 2.0' : 'version 1.0'}</span>
        <span>{context.serviceURL}</span>
        <span>{context.project}</span>
        <span><a href={`https://experience.adobe.com/#/aem/editor/canvas/${host}${pathname}`} target='_blank' rel='noreferrer'>Open in Editor</a></span>
      </div>
    </React.Fragment>
  );
};

Footer.propTypes = {
  config: PropTypes.object,
  context: PropTypes.object
};

export default Footer;