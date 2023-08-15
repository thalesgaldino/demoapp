/**
 * Image search app
 * Build on top of Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */
import React from 'react';
import SearchContainer from './SearchContainer';

//TODO: fetch this from the build environment
// uncomment with the constants
// const API_KEY = '<ADD-KEY_HERE>';
export const API_KEY = 'edf1b09ac2160046da111839bf4ba708';
export const HOST = 'https://api.flickr.com';
export const API_ENDPOINT = `${HOST}/services/rest`;

const App = () => <SearchContainer />;

export default App;
