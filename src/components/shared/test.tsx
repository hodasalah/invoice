import { useTranslation } from 'react-i18next';

const TestLogo = () => {
	const { i18n } = useTranslation();
	const isArabic = i18n.language.startsWith('ar');

	return (
		<div
			className={`flex gap-4 p-4 border ${
				isArabic ? 'flex-row-reverse' : 'flex-row'
			}`}
		>
			<div className='bg-blue-500 text-white p-2'>Text</div>
			<div className='bg-green-500 text-white p-2'>Logo</div>
		</div>
	);
};

export default TestLogo;
