import {AppRegistry} from 'react-native'
import App from './src/App'
import {name as appName} from './app.json'
import {LogBox} from 'react-native'
import 'react-native-gesture-handler'

LogBox.ignoreLogs(['Non-serializable values were found in the navigation state'])

import allSettled from 'promise.allsettled' // Shim for the Promise.allSettled function
allSettled.shim()

import 'intl' // Shims for Intl on android
import 'intl/locale-data/jsonp/en'

AppRegistry.registerComponent(appName, () => App)
