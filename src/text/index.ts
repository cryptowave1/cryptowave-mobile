import { Platform, NativeModules } from 'react-native'

// todo akolov: add localization
import en_us from './en-US.json'

export const getIntlLocale = () => {
   let locale: string;
   if (Platform.OS === 'ios') {
      locale = NativeModules.SettingsManager.settings.AppleLocale || NativeModules.SettingsManager.settings.AppleLanguages[0]
   } else {
      locale = NativeModules.I18nManager.localeIdentifier
   }

   locale = locale.replace('_', '-');
   const split = locale.split('-')
   return split[0]
}

export default en_us
