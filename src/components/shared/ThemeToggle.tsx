import { useEffect, useState } from 'react';

const ThemeToggle = () => {
	const [isDark, setIsDark] = useState(() => {
		if (typeof window !== 'undefined') {
			const saved = localStorage.getItem('theme');
			if (saved) return saved === 'dark';
			return window.matchMedia('(prefers-color-scheme: dark)').matches;
		}
		return false;
	});

	useEffect(() => {
		const html = document.documentElement;
		if (isDark) {
			html.classList.add('dark');
			localStorage.setItem('theme', 'dark');
		} else {
			html.classList.remove('dark');
			localStorage.setItem('theme', 'light');
		}
	}, [isDark]);

	return (
		<button
			onClick={() => setIsDark((prev) => !prev)}
			className='text-sm border px-3 py-1 rounded transition duration-300
				text-gray-800 border-gray-800 dark:text-yellow-400 dark:border-yellow-400'
		>
			{isDark ? '🌙 الوضع الداكن' : '☀️ الوضع الفاتح'}
		</button>
	);
};

export default ThemeToggle;
