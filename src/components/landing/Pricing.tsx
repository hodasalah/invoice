import { useTranslation } from 'react-i18next';

const Pricing = () => {
	const { t, i18n } = useTranslation('landing');
	const isArabic = i18n.language === 'ar';

	const plans = t('pricing.plans', { returnObjects: true }) as {
		name: string;
		price: string;
		description: string;
		features: string[];
		button: string;
	}[];

	return (
		<section
			className='py-20 px-6 text-center'
			dir={isArabic ? 'rtl' : 'ltr'}
		>
			<div className='max-w-6xl mx-auto'>
				<h2 className='text-3xl md:text-4xl font-bold mb-4'>
					{t('pricing.title')}
				</h2>
				<p className='dark:text-slate-300 text-gray-500 mb-12'>{t('pricing.subtitle')}</p>
				<div className='grid grid-cols-1 md:grid-cols-3 gap-8'>
					{plans.map((plan, idx) => (
						<div
							key={idx}
							className={`border p-6 rounded-lg shadow-sm transition ${
								idx === 1
									? 'border-primary dark:bg-slate-100 bg-transparent shadow-[10px_10px_30px_0px_rgba(99,102,241,0.5)]'
									: 'bg-[rgb(30,41,59)]'
							}`}
						>
							<h3
								className={`text-xl font-semibold mb-1 ${
									idx === 1 ? 'text-gray-800' : 'text-white'
								}`}
							>
								{plan.name}
							</h3>
							<p
								className={`text-sm mb-4 ${
									idx === 1
										? 'text-gray-700'
										: 'text-slate-300'
								}`}
							>
								{plan.description}
							</p>
							<div
								className={`text-4xl font-bold mb-6 ${
									idx === 1 ? 'text-gray-800' : 'text-white'
								}`}
							>
								${plan.price}
								<span
									className={`text-sm ${
										idx === 1
											? 'text-gray-600'
											: 'text-slate-400'
									}`}
								>
									{t('pricing.perMonth')}
								</span>
							</div>
							<ul
								className={`space-y-2 mb-6 ${
									idx === 1
										? 'text-gray-700'
										: 'text-slate-300'
								} ${isArabic ? 'text-right' : 'text-left'}`}
							>
								{plan.features.map((feature, i) => (
									<li key={i}>✅ {feature}</li>
								))}
							</ul>
							<div>
								<button
									className={`transition px-8 py-2 rounded-md ${
										plan.price === '0'
											? 'text-[rgb(203,215,225)] bg-[rgb(51,65,85)] border-[.5px] border-slate-300'
											: 'bg-[rgb(99,102,241)] text-white hover:text-gray-300'
									}`}
								>
									{plan.button}
								</button>
							</div>
						</div>
					))}
				</div>
			</div>
		</section>
	);
};

export default Pricing;
