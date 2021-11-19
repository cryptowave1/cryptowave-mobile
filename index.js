import {AppRegistry} from 'react-native'
import App from './App'
import {name as appName} from './app.json'
import allSettled from 'promise.allsettled' // Shim for the Promise.allSettled function
allSettled.shim();

AppRegistry.registerComponent(appName, () => App)
