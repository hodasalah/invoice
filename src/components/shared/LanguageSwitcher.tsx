import { useTranslation } from 'react-i18next';

const LanguageSwitcher = () => {
	const { i18n } = useTranslation();

	const toggleLang = () => {
		const newLang = i18n.language === 'ar' ? 'en' : 'ar';
		i18n.changeLanguage(newLang);
		document.documentElement.dir = newLang === 'ar' ? 'rtl' : 'ltr';
		document.documentElement.className =
			newLang === 'ar' ? 'lang-ar' : 'lang-en';
	};

	return (
		<button
			onClick={toggleLang}
			className='text-white hover:text-gray-300 text-sm border px-3 py-1 rounded'
		>
			{i18n.language === 'ar' ? 'English' : 'عربي'}
		</button>
	);
};

export default LanguageSwitcher;
