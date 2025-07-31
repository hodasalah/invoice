// src/components/landing/Features.tsx
const features = [
	{
		title: 'إنشاء فواتير بسهولة',
		description:
			'أنشئ فواتير احترافية خلال ثوانٍ، واحفظها أو أرسلها مباشرة.',
		icon: '🧾',
	},
	{
		title: 'إرسال تلقائي للعملاء',
		description: 'أرسل الفواتير عبر البريد الإلكتروني أو رابط مباشر.',
		icon: '📤',
	},
	{
		title: 'الدفع الإلكتروني السريع',
		description: 'اتصل بـ Stripe أو PayPal لتحصيل المدفوعات بسهولة.',
		icon: '💳',
	},
	{
		title: 'تذكيرات تلقائية',
		description: 'نذكّر العملاء بالفواتير المستحقة تلقائيًا لتوفير وقتك.',
		icon: '⏰',
	},
	{
		title: 'تقارير مفصلة',
		description: 'تابع دخلك الشهري، ومصروفاتك بتقارير دقيقة ورسوم بيانية.',
		icon: '📊',
	},
	{
		title: 'إدارة العملاء',
		description: 'احتفظ ببيانات العملاء وسجل فواتيرهم ومراسلاتهم.',
		icon: '👥',
	},
];

const Features = () => {
	return (
		<section className='py-20 px-6 text-center'>
			<div className='max-w-6xl mx-auto'>
				<h2 className='text-3xl md:text-4xl font-bold  mb-4'>
					مميزات منصتنا
				</h2>
				<p className='text-slate-300 mb-12'>
					كل ما تحتاجه لإدارة فواتيرك وأعمالك — في مكان واحد. أضف
					بيانات فاتورتك في ثوانٍ عبر بضع نقرات بسيطة
				</p>
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
