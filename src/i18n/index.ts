import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';
import ar from "./locales/ar/landing.json";
import en from './locales/en/landing.json';

i18n.use(LanguageDetector)
	.use(initReactI18next)
	.init({
		resources: {
			ar: { landing: ar },
			en: { landing: en },
		},
		fallbackLng: 'ar',
		ns: ['landing'], 
		defaultNS: 'landing',
		interpolation: {
			escapeValue: false,
		},
	});

export default i18n;
