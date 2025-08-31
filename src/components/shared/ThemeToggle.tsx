import { useDispatch, useSelector } from 'react-redux';
import { toggleTheme } from '../../features/theme/themeSlice';

const ThemeSwitcher = () => {
	const dispatch = useDispatch();
	const mode = useSelector((state: any) => state.theme.mode);

	return (
		<button
			onClick={() => dispatch(toggleTheme())}
			className='dark:text-white dark:hover:text-gray-300 text-sm border px-3 py-1 rounded dark:border-slate-400 border-gray-800 transition duration-300 ml-2'
		>
			{mode === 'light' ? '🌙 Dark' : '☀️ Light'}
		</button>
	);
};

export default ThemeSwitcher;
