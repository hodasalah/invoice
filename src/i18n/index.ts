import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';
import ar from "./locales/ar/landing.json";
import en from './locales/en/landing.json';
import auth_ar from './locales/ar/auth.json';
import auth_en from './locales/en/auth.json';


i18n.use(LanguageDetector)
	.use(initReactI18next)
	.init({
		resources: {
			ar: { landing: ar, auth: auth_ar },
			en: { landing: en, auth: auth_en },
		},
		fallbackLng: 'ar',
		ns: ['landing','auth'], 
		defaultNS: 'landing',
		interpolation: {
			escapeValue: false,
		},
	});

export default i18n;
