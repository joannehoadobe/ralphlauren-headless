import { createContext } from 'react';
import BrokenImage from '../media/broken.jpg';

const defaultEndpoint = '/content/_cq_graphql/aem-demo-assets/endpoint.json';
const defaultProject = 'ralphlauren'; //'wknd-headless';
const defaultServiceURL = 'https://author-p105154-e986085.adobeaemcloud.com/';
// https://author-p53852-e347001.adobeaemcloud.com/'; /*'https://publish-p124331-e1227315.adobeaemcloud.com/';*/
const defaultPlaceholdersExtensionURL = 'https://1154643-geoipplaceholders.adobeio-static.net/api/v1/web/geoip-placeholders';

export const AppContext = createContext({
  auth: sessionStorage.auth || '',
  endpoint: localStorage.endpoint || defaultEndpoint,
  project: localStorage.project || defaultProject,
  serviceURL: localStorage.serviceURL || defaultServiceURL,
  defaultServiceURL: defaultServiceURL,
  placeholdersExtensionURL: localStorage.placeholdersExtensionURL || defaultPlaceholdersExtensionURL,
  brokenImage: BrokenImage,
  screenResponse: {},
  navigationResponse: {},
  pqs: {
    screen: 'gql-screen-v3',
    config: 'gql-configuration-v2',
    nav: 'gql-navigation-v2',
    adventure: 'gql-adventure-v2'
  },
  lang: localStorage.lang ? JSON.parse(localStorage.lang) : {value:'en',label:'English'},
  audience: localStorage.audience ? JSON.parse(localStorage.audience) : {},
  rootPath: localStorage.rootPath || 'content/dam',
  config: {},
  version: 'v2'
});
