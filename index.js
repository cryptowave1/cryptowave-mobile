import {AppRegistry} from 'react-native';
import App from './src/App';
import {name as appName} from './app.json';
import {LogBox} from 'react-native';
import 'react-native-gesture-handler';
import {enableMapSet} from 'immer';
import allSettled from 'promise.allsettled';
import 'intl';
import 'intl/locale-data/jsonp/en';

/**
 * Sims / other config
 */
enableMapSet();
allSettled.shim();

/**
 * Log box ignores
 */
LogBox.ignoreLogs(['Non-serializable values were found in the navigation state']);

AppRegistry.registerComponent(appName, () => App);
