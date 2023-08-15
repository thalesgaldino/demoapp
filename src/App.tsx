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
// const API_KEY = '<ADD-KEY_HERE>';
export const API_ENDPOINT = 'https://api.flickr.com/services/rest';

const App = () => <SearchContainer />;

export default App;
