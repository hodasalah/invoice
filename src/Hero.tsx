import { useTranslation } from 'react-i18next';

function Hero() {
	const { t, i18n } = useTranslation();

	return (
		<div className='text-center'>
			<h1>{t('welcome')}</h1>
			<button onClick={() => i18n.changeLanguage('ar')}>عربي</button>
			<button onClick={() => i18n.changeLanguage('en')}>English</button>
		</div>
	);
}

export default Hero;