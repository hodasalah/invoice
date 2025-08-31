import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { toggleTheme } from '../../features/theme/themeSlice';
import { useTranslation } from 'react-i18next';

const ThemeToggle = () => {
	const dispatch = useAppDispatch();
	const theme = useAppSelector((state) => state.theme);
	const { i18n } = useTranslation();

	const isArabic = i18n.language === 'ar';
	const isDark = theme === 'dark';

	return (
		<button
			onClick={() => dispatch(toggleTheme())}
			className='text-sm border px-3 py-1 rounded transition duration-300
        text-gray-800 border-gray-800 dark:text-yellow-400 dark:border-yellow-400'
		>
			{isDark
				? isArabic
					? '🌙 الوضع الداكن'
					: '🌙 Dark'
				: isArabic
				? '☀️ الوضع الفاتح'
				: '☀️ Light'}
		</button>
	);
};

export default ThemeToggle;
