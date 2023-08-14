module.exports = {
  preset: 'react-native',
  transformIgnorePatterns: [
    'node_modules/(?!(jest-)?react-native|@react-native|@gluestack-ui|@legendapp|@expo)',
  ],
};
