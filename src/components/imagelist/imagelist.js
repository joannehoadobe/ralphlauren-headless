/*
Copyright 2023 Adobe
All Rights Reserved.
NOTICE: Adobe permits you to use, modify, and distribute this file in
accordance with the terms of the Adobe license agreement accompanying
it.
*/

import React, { useState, useRef } from 'react';
import PropTypes from 'prop-types';
import LinkManager from '../../utils/link-manager';
import Image from '../image';
import './imagelist.css';
import { mapJsonRichText } from '../../utils/renderRichText';

export const ImageListGQL = `
...on ImageListModel {
  _model {
    title
    _path
  }
  _metadata {
    stringMetadata {
      value
    }
  }
  imageListItems {
    ...on PageRef {
      _authorUrl
      _publishUrl
    }
  }
}`;


const cardImageSizes = [
  {
    imageWidth: '546px', //'350px',
    renditionName: 'web-optimized-small.webp',
    size: '350px'
  }
];

const ImageList = ({ content, config }) => {
  const [position, setPosition] = useState(0);
  const listRef = useRef(document.body); // Ref for HTML Element

  listRef.current.addEventListener('aue:content-patch', (event) => {
    if (event.detail) {
      const { name, value } = event.detail.patch;
      const section = event.target.querySelector('section');
      if (section.classList.contains('list-container') && name === 'style') {
        section.setAttribute('class', `${value} list-container`);
        event.stopPropagation();
      }
    }
  });

  const scrollLeft = (e, num) => {
    const element = e.target.nextElementSibling;
    element.scrollTo({
      left: position - num,
      behavior: 'smooth'
    });

    setPosition(position - num);

  };

  const scrollRight = (e, num) => {
    const element = e.target.previousElementSibling;
    element.scrollTo({
      left: position + num,
      behavior: 'smooth'
    });

    setPosition(position + num);

  };

  const containerChange = (e) => {

    if ((e.target.scrollWidth - e.target.clientWidth - .5) <= e.target.scrollLeft) {
      e.target.nextElementSibling.style.visibility = 'hidden';
    } else {
      e.target.nextElementSibling.style.visibility = 'visible';
    }

    if (e.target.scrollLeft === 0)
      e.target.previousElementSibling.style.display = 'none';
    else
      e.target.previousElementSibling.style.display = 'unset';
  };

  const listProps = {
    'data-aue-resource': `urn:aemconnection:${content._path}/jcr:content/data/${content._variation}`,
    'data-aue-type': 'container',
    'data-aue-label': content.headline.plaintext,
    'data-aue-behavior': 'component',
    'data-aue-model': content?._model?._path,
    'data-aue-filter': 'image-list',
    'data-aue-prop': 'listItems'
  };

  return (
    <div {...listProps} ref={listRef}>
      <section className={`${content.style} list-container`}>
        {/*mapJsonRichText(content.headline.json)*/}
        {/* {title && <h4>{title.join('')}</h4>} */}
        <i className='arrow left' onClick={e => scrollLeft(e, 300)}></i>
        <div className='list' id='list-container-body' onScroll={e => containerChange(e)} >
          {content && content.listItems.map((item, i) => {
            if (item['__typename'] === 'AdventureModel') return <AdventureCard key={i} item={item} style={content.style} config={config} />;
            else if (item['__typename'] === 'MagazineArticleModel') return <ArticleCard key={i} style={content.style} item={item} config={config} />;
            else if (item['__typename'] === 'AuthorModel') return <AuthorCard key={i} style={content.style} item={item} />;
          })}
        </div>
        <i className='arrow right' onClick={e => scrollRight(e, 300)}></i>
      </section>
    </div>
  );
};

ImageList.propTypes = {
  content: PropTypes.object,
  config: PropTypes.object,
  context: PropTypes.object
};

const ArticleCard = ({ item }) => {
  const editorProps = {
    'data-aue-resource': `urn:aemconnection:${item._path}/jcr:content/data/master`,
    'data-aue-type': 'component',
    'data-aue-label': `${item.headline.plaintext} Adventure`,
    'data-aue-behavior': 'component',
    'data-aue-model': item.model
  };

  return (<div className='list-item' key={item.title} {...editorProps}>
    <Image asset={item.primaryImage} itemProp='primaryImage' imageSizes={cardImageSizes} />
    <LinkManager item={item}>
      <span className='title' itemProp='title' itemType='text'>{item.headline.plaintext}</span>
      {item.style === 'image-grid' && (
        <div className='details'>
          <ul>
            <li itemProp='articleTitle' itemType='text'>{item.headline.plaintext}</li>
          </ul>
        </div>
      )}
    </LinkManager>
  </div>);
};

ArticleCard.propTypes = {
  item: PropTypes.object,
  style: PropTypes.string
};

const AdventureCard = ({ item, style }) => {
  const editorProps = {
    'data-aue-resource': `urn:aemconnection:${item._path}/jcr:content/data/master`,
    'data-aue-type': 'component',
    'data-aue-label': `${item.title} Adventure`,
    'data-aue-behavior': 'component',
    'data-aue-model': item.model,
    'data-aue-prop': 'listItems'
  };

  const imageProps = {
    'data-aue-prop': 'primaryImage',
    'data-aue-type': 'media',
    'data-aue-label': 'Asset',
    'data-aue-behavior': 'component'
  };

  return (
    <div className='list-item' key={item.title} {...editorProps}>
      <Image asset={item.primaryImage} imageProps={imageProps} imageSizes={cardImageSizes} />
      <LinkManager item={item}>
        <span className='title' data-aue-prop='title' data-aue-label='Title' data-aue-type='text'>{item.title || item.name}</span>
        {style === 'image-grid' && (
          <div className='details'>
            <ul>
              <li data-aue-prop='activityType' data-aue-label='Activity Type' data-aue-type='text'>{item.activityType}</li>
              <li data-aue-prop='activityLength' data-aue-label='Activity Length' data-aue-type='text'>{item.activity}</li>
              <li data-aue-prop='tripLength' data-aue-label='Trip Length' data-aue-type='text'>{item.tripLength}</li>
            </ul>
          </div>
        )}
      </LinkManager>
    </div >
  );
};

AdventureCard.propTypes = {
  item: PropTypes.object,
  style: PropTypes.string
};

const AuthorCard = ({ item }) => {
  const editorProps = {
    'data-aue-resource': `urn:aemconnection:${item._path}/jcr:content/data/master`,
    'data-aue-type': 'component',
    'data-aue-label': `${item.firstName} ${item.lastName}`,
    'data-aue-behavior': 'component',
    'data-aue-model': item.model
  };
  return (
    <div className='list-item' key={item._path} {...editorProps}>
      <Image asset={item.profilePicture} itemProp='profilePicture' imageSizes={cardImageSizes} />
      <span className='title' itemProp='title' itemType='text'>{item.firstName} {item.lastName}</span>
    </div >
  );
};

AuthorCard.propTypes = {
  item: PropTypes.object,
};

export default ImageList;
