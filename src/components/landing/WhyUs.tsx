// src/components/landing/WhyUs.tsx
const benefits = [
	{
		title: 'واجهة بسيطة وسهلة',
		description: 'صممنا الواجهة لتكون سهلة الاستخدام حتى لغير التقنيين.',
		icon: '✨',
	},
	{
		title: 'دعم فني سريع',
		description: 'نحن هنا لمساعدتك دائمًا عبر الدردشة أو البريد.',
		icon: '💬',
	},
	{
		title: 'آمن وسري',
		description: 'نحفظ بياناتك بتقنيات تشفير وحماية متقدمة.',
		icon: '🔒',
	},
	{
		title: 'متوافق مع كل الأجهزة',
		description: 'اعمل من موبايلك أو كمبيوترك في أي وقت وأي مكان.',
		icon: '📱',
	},
];

const WhyUs = () => {
	return (
		<section className=' py-20 px-6 text-center'>
			<div className='max-w-5xl mx-auto'>
				<h2 className='text-3xl md:text-4xl font-bold  mb-6'>
					لماذا يختارنا الآلاف؟
				</h2>
				<p className='text-slate-300 mb-12'>
					نحن نوفّر لك كل الأدوات التي تحتاجها لتنظيم عملك وتحقيق
					المزيد من الإنجاز.
				</p>
				<div className='grid grid-cols-1 sm:grid-cols-2 gap-8 text-right'>
					{benefits.map((item, index) => (
						<div
							key={index}
							className='bg-[rgb(30,41,59)] p-6 rounded-lg shadow-sm border hover:shadow-md transition border-slate-500'
						>
							<div className='text-3xl mb-4'>{item.icon}</div>
							<h3 className='text-xl font-semibold  mb-2'>
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
