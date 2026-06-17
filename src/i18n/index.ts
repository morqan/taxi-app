import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import { getLocales } from 'react-native-localize';

import az from './locales/az.json';
import en from './locales/en.json';
import ru from './locales/ru.json';

export const supportedLanguages = ['az', 'ru', 'en'] as const;
export type SupportedLanguage = (typeof supportedLanguages)[number];

const resources = {
  az: { translation: az },
  ru: { translation: ru },
  en: { translation: en },
};

function detectLanguage(): SupportedLanguage {
  const code = getLocales()[0]?.languageCode ?? 'az';
  return (supportedLanguages as readonly string[]).includes(code)
    ? (code as SupportedLanguage)
    : 'az';
}

void i18n.use(initReactI18next).init({
  resources,
  lng: detectLanguage(),
  fallbackLng: 'az',
  interpolation: { escapeValue: false },
  returnNull: false,
});

export default i18n;
