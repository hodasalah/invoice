import { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import AppRoutes from './routes';

function App() {
	const { i18n } = useTranslation();

	useEffect(() => {
		const dir = i18n.language === 'ar' ? 'rtl' : 'ltr';
		document.documentElement.dir = dir;
		document.documentElement.className =
			i18n.language === 'ar' ? 'lang-ar' : 'lang-en';
	}, [i18n.language]);

	return (
		<>
			<AppRoutes />
		</>
	);
}

export default App;
