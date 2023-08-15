# Image Search using Flicker API

Built on top of React Native sample(Vanilla version)

# Set up requirements

> **Note**: Make sure you have completed the [React Native - Environment Setup](https://reactnative.dev/docs/environment-setup) instructions till "Creating a new application" step, before proceeding.

> Install `yarn` as the dependencies were installed with it. Xcode version was 14.3.1

> Open `src/SearchContainer.tsx` file and add you flickr api key

## Install dependencies and run pods

```bash
yarn install

cd ios && pod install
```

## Prepare to run: Start the Metro Server

First, you will need to start **Metro**, the JavaScript _bundler_ that ships _with_ React Native.

To start Metro, run the following command from the _root_ of your React Native project:

```bash
yarn start
```

## Step 2: Start your Application

Let Metro Bundler run in its _own_ terminal. Open a _new_ terminal from the _root_ of your React Native project. Run the following command to start your _Android_ or _iOS_ app:

### For Android

```bash
yarn android
```

### For iOS

```bash
yarn ios
```

If everything is set up _correctly_, you should see your new app running in your _Android Emulator_ or _iOS Simulator_ shortly provided you have set up your emulator/simulator correctly.

This is one way to run your app — you can also run it directly from within Android Studio and Xcode respectively.

## Known issues

1. SearchContainer render test unit fails because we run into an issue with `@gluestack-ui` lib
2. Due to latest versions, Gluestack Icons are not fully working with `gluestack-ui` lib, open issue here: https://github.com/software-mansion/react-native-svg/issues/2101
3. The search result list doesn't ensure merge of a list of unique items because when loading the next page, there's no check on whether the item has moved between pages and therefore an item might come in 2 pages, even after merge. This can affect the recycling of the list which would have caching issues. One work around would be replacing the array with a hashmap
4. API_KEY and HOST should be in a environment file, so we don't store it on the repo by mistake.
5. Fail case UX should be handled better, right now is silent in terms of user interface
6. Right now history view is on the empty results component. It should have its own component
7. SearchHeader unit test no completed

## Suggestions for next Immediate Improvements

1. History could be in a autosuggestion view as the user types in the input. Tap on a item should search again
2. Persist history with redux persist?
3. Strings could be using i18n
4. There's no assurance the images sizes are appropriated
5. Increase test coverage
6. Pull to refresh

# Troubleshooting

1. If you come across `xcrun error: SDK "iphoneos" cannot be located` while installing pods, fix it running: `sudo xcode-select --switch /Applications/Xcode.app`
2. in case you have issues with dependencies caching, try `yarn clear:all`

If you can't get this to work, see the [Troubleshooting](https://reactnative.dev/docs/troubleshooting) page.

# Used versions

- Xcode 14.3.1
- node 19.7.0
- yarn 1.22.19
- pod 1.12.1
- javac 14.0.2
- react-native 0.72.3
