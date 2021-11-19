import { Platform, NativeModules } from 'react-native'

// todo akolov: add localization
import en_us from './en_us.json'

export const locale = Platform.OS === 'ios'
   ? NativeModules.SettingsManager.settings.AppleLocale || NativeModules.SettingsManager.settings.AppleLanguages[0]
   : NativeModules.I18nManager.localeIdentifier

export default en_us
