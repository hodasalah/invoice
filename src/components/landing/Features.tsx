import { useTranslation } from 'react-i18next';

const Features = () => {
	const { t, i18n } = useTranslation();
	const isArabic = i18n.language === 'ar';

	const features = t('features.items', { returnObjects: true }) as {
		icon: string;
		title: string;
		description: string;
	}[];

	return (
		<section
			className='py-20 px-6 text-center'
			dir={isArabic ? 'rtl' : 'ltr'}
		>
			<div className='max-w-6xl mx-auto'>
				<h2 className='text-3xl md:text-4xl font-bold mb-4'>
					{t('features.title')}
				</h2>
				<p className='text-slate-300 mb-12'>{t('features.subtitle')}</p>
				<div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8'>
					{features.map((feature, idx) => (
						<div
							key={idx}
							className='bg-[rgb(30,41,59)] p-6 rounded-lg shadow-sm border hover:shadow-md transition border-slate-500'
						>
							<div className='text-4xl mb-4'>{feature.icon}</div>
							<h3 className='text-xl font-semibold text-white mb-2'>
								{feature.title}
							</h3>
							<p className='text-slate-400 text-sm'>
								{feature.description}
							</p>
						</div>
					))}
				</div>
			</div>
		</section>
	);
};

export default Features;
