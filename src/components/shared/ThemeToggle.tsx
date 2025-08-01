import { useEffect, useState } from 'react';

const ThemeToggle = () => {
	const [isDark, setIsDark] = useState(() => {
		return localStorage.getItem('theme') === 'dark';
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
			onClick={() => setIsDark(!isDark)}
			className='text-white hover:text-gray-300 text-sm border px-3 py-1 rounded'
		>
			{isDark ? '🌙 داكن' : '☀️ فاتح'}
		</button>
	);
};

export default ThemeToggle;
