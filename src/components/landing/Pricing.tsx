// src/components/landing/Pricing.tsx
const plans = [
	{
		name: 'مجاني',
		price: '0',
		description: 'ابدأ بدون بطاقة ائتمان',
		features: ['حتى 3 عملاء', '5 فواتير شهريًا', 'دعم عبر البريد فقط' ,'إدارة من فرعين '],
		isPopular: false,
	},
	{
		name: 'احترافي',
		price: '12',
		description: 'الأكثر شيوعًا',
		features: [
			'عدد غير محدود من العملاء',
			'فواتير غير محدودة',
			'دفع إلكتروني',
			'تقارير مفصلة',
		],
		isPopular: true,
	},
	{
		name: 'شركة',
		price: '25',
		description: 'للفِرق والشركات الصغيرة',
		features: [
			'كل ميزات الخطة الاحترافية',
			'إضافة أعضاء للفريق',
			'دعم مباشر',
			'إدارة متعددة الفروع',
		],
		isPopular: false,
	},
];

const Pricing = () => {
	return (
		<section className=' py-20 px-6 text-center'>
			<div className='max-w-6xl mx-auto'>
				<h2 className='text-3xl md:text-4xl font-bold  mb-4'>
					خطط مرنة تناسب الجميع
				</h2>
				<p className='text-slate-300 mb-12'>
					اختر الخطة التي تناسب احتياجات عملك وابدأ اليوم.
				</p>
				<div className='grid grid-cols-1 md:grid-cols-3 gap-8'>
					{plans.map((plan, idx) => (
						<div
							key={idx}
							className={`border p-6 rounded-lg shadow-sm transition ${
								plan.isPopular
									? 'border-primary bg-gray-300'
									: 'bg-[rgb(30,41,59)]'
							}`}
						>
							<h3
								className={`text-xl font-semibold ${
									plan.isPopular
										? 'text-gray-800'
										: 'text-white'
								} mb-1`}
							>
								{plan.name}
							</h3>
							<p
								className={`${
									plan.isPopular
										? 'text-gray-700'
										: 'text-slate-300'
								} text-sm mb-4`}
							>
								{plan.description}
							</p>
							<div
								className={`text-4xl font-bold ${
									plan.isPopular
										? 'text-gray-800'
										: 'text-white'
								} mb-6 `}
							>
								${plan.price}
								<span
									className={`text-sm ${
										plan.isPopular
											? 'text-gray-600'
											: 'text-slate-400'
									}`}
								>
									/شهر
								</span>
							</div>
							<ul
								className={` text-right ${
									plan.isPopular
										? 'text-gray-700'
										: 'text-slate-300'
								}  space-y-2 mb-6`}
							>
								{plan.features.map((feature, i) => (
									<li key={i}>✅ {feature}</li>
								))}
							</ul>
							<div>
								<button
									className={` ${
										plan.price === '0'
											? 'text-[rgb(203,215,225))] bg-[rgb(51,65,85)]  border-[.5px] border-slate-300'
											: 'bg-[rgb(99,102,241)] text-white'
									}  hover:text-gray-300 transition  px-8 py-2 rounded-md`}
								>
									{plan.price === '0'
										? 'ابدأ مجانًا'
										: 'اشترك الآن'}
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
