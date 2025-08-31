import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { toggleLanguage } from '../../features/theme/languageSlice';
import { useTranslation } from 'react-i18next';
import { store } from './../../store/index';

const LanguageSwitcher = () => {
	const dispatch = useAppDispatch();
	const lang = useAppSelector((state) => state.language);
	const { i18n } = useTranslation();

	const toggleLang = () => {
		dispatch(toggleLanguage());
		i18n.changeLanguage(lang === 'ar' ? 'en' : 'ar');
	};

	return (
		<button
			onClick={toggleLang}
			className='dark:text-white dark:hover:text-gray-300 text-sm border px-3 py-1 rounded dark:border-slate-400 border-gray-800 transition duration-300'
		>
			{lang === 'ar' ? 'English' : 'عـــربي'}
		</button>
	);
};

export default LanguageSwitcher;
