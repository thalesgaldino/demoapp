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
// Add key and set host
export const API_KEY = '<ADD_KEY_HERE>';
export const HOST = 'https://api.flickr.com';
export const API_ENDPOINT = `${HOST}/services/rest`;

const App = () => <SearchContainer />;

export default App;
