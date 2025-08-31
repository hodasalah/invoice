import { useTranslation } from 'react-i18next';
import AppRoutes from './routes';
import { useEffect } from 'react';

function App() {
	const { i18n } = useTranslation();

	useEffect(() => {
		const dir = i18n.language === 'ar' ? 'rtl' : 'ltr';
		document.documentElement.dir = dir;
	}, [i18n.language]);

	return (
		<>
			<AppRoutes />
		</>
	);
}

export default App;
