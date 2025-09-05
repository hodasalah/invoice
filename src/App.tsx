import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { I18nextProvider } from 'react-i18next';
import i18n from './i18n';
import AppRoutes from './routes';

function App() {
	const theme = useSelector((state) => state.theme.theme); // light | dark
	const lang = useSelector((state) => state.language.lang); // en | ar

	// تحديث i18n و DOM attributes
	useEffect(() => {
		i18n.changeLanguage(lang);
		document.documentElement.dir = lang === 'ar' ? 'rtl' : 'ltr';
		document.documentElement.className = theme === 'dark' ? 'dark' : '';
	}, [lang, theme]);

	return (
		<I18nextProvider i18n={i18n}>
			<AppRoutes />
		</I18nextProvider>
	);
}

export default App;
