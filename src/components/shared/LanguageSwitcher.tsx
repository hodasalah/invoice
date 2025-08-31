import { useTranslation } from 'react-i18next';

const LanguageSwitcher = () => {
	const { i18n } = useTranslation();

	const toggleLang = () => {
		const newLang = i18n.language === 'ar' ? 'en' : 'ar';
		i18n.changeLanguage(newLang);
		document.documentElement.dir = newLang === 'ar' ? 'rtl' : 'ltr';
		
		document.documentElement.setAttribute('lang',newLang)
		document.documentElement.setAttribute('dir',newLang==='ar'?'rtl':'ltr')
	};
const isArabic = i18n.language === 'ar';
	return (
		<button
			onClick={toggleLang}
			className='dark:text-white dark:hover:text-gray-300 text-sm border px-3 py-1 rounded dark:border-slate-400 border-gray-800 transition duration-300'
		>
			{i18n.language === 'ar' ? 'English' : 'عـــربي'}
		</button>
	);
};

export default LanguageSwitcher;
