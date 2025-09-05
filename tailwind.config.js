
/** @type {import('tailwindcss').Config} */
module.exports = {
	darkMode: 'class', // تفعيل Dark Mode عبر class="dark"
	content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
	theme: {
		extend: {
			colors: {
				bg: 'var(--color-bg)',
				card: 'var(--color-card)',
				text: 'var(--color-text)',
				primary: 'var(--color-primary)',
				secondary: 'var(--color-secondary)',
				border: 'var(--color-border)',
				accent: 'var(--color-accent)',
			},
		},
	},
	plugins: [require('tailwindcss-rtl'), require('tailwindcss-animate')],
};
