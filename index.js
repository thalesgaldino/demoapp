/**
 * @format
 */

import React from 'react';
import {AppRegistry} from 'react-native';
import App from './App';
import {name as appName} from './app.json';
import {config, GluestackUIProvider} from '@gluestack-ui/react';

const Main = () => {
  return (
    <GluestackUIProvider config={config.theme}>
      <App />
    </GluestackUIProvider>
  );
};

AppRegistry.registerComponent(appName, () => Main);
