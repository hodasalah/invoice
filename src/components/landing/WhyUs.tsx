import { useTranslation } from 'react-i18next';

const WhyUs = () => {
	const { t, i18n } = useTranslation();
	const isArabic = i18n.language === 'ar';

	const benefits = t('whyUs.items', { returnObjects: true }) as {
		icon: string;
		title: string;
		description: string;
	}[];

	return (
		<section
			className='py-20 px-6 text-center'
			dir={isArabic ? 'rtl' : 'ltr'}
		>
			<div className='max-w-5xl mx-auto'>
				<h2 className='text-3xl md:text-4xl font-bold mb-6'>
					{t('whyUs.title')}
				</h2>
				<p className='dark:text-slate-300 text-gray-500 mb-12'>{t('whyUs.subtitle')}</p>
				<div
					className={`grid grid-cols-1 sm:grid-cols-2 gap-8 ${
						isArabic ? 'text-right' : 'text-left'
					}`}
				>
					{benefits.map((item, index) => (
						<div
							key={index}
							className='bg-[rgb(30,41,59)]  p-6 rounded-lg shadow-sm border hover:shadow-md transition border-slate-500'
						>
							<div className='text-3xl mb-4'>{item.icon}</div>
							<h3 className='text-xl font-semibold mb-2 text-slate-300'>
								{item.title}
							</h3>
							<p className='text-slate-400 text-sm'>
								{item.description}
							</p>
						</div>
					))}
				</div>
			</div>
		</section>
	);
};

export default WhyUs;
