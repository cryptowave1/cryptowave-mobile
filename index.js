import {AppRegistry} from 'react-native'
import App from './src/App'
import {name as appName} from './app.json'

import allSettled from 'promise.allsettled' // Shim for the Promise.allSettled function
allSettled.shim()

import 'intl'; // Shims for Intl on android
import 'intl/locale-data/jsonp/en';

AppRegistry.registerComponent(appName, () => App)
