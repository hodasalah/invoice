import { useDispatch, useSelector } from 'react-redux';
import { toggleLanguage } from '../../features/theme/languageSlice';

const LanguageSwitcher = () => {
	const dispatch = useDispatch();
	// Replace 'RootState' with the actual type of your Redux root state if different
	const lang = useSelector((state: any) => state.language.lang);

	return (
		<button
			onClick={() => dispatch(toggleLanguage())}
			className='dark:text-white dark:hover:text-gray-300 text-sm border px-3 py-1 rounded dark:border-slate-400 border-gray-800 transition duration-300'
		>
			{lang === 'ar' ? 'English' : 'عـــربي'}
		</button>
	);
};

export default LanguageSwitcher;
