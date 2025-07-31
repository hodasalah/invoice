// src/components/landing/Testimonials.tsx
const testimonials = [
	{
		name: 'أحمد سامي',
		role: 'مصمم جرافيك مستقل',
		comment:
			'بقيت أخلص الفواتير في 3 دقائق، المنصة أنقذت وقتي وسهلت شغلي جدًا!',
		avatar: '🧑🏻‍💻',
	},
	{
		name: 'ندى خالد',
		role: 'محاسبة - شركة ناشئة',
		comment:
			'لوحة التحكم مرنة وسهلة، والتقارير الشهرية ساعدتنا نتابع الأداء المالي.',
		avatar: '👩🏻‍💼',
	},
	{
		name: 'يوسف عماد',
		role: 'Freelancer - تطوير مواقع',
		comment:
			'بقيت أبعت فواتيري من الموبايل حتى وأنا في الطريق! تجربة ممتازة جدًا.',
		avatar: '🧔🏻‍♂️',
	},
];

const Testimonials = () => {
	return (
		<section className=' py-20 px-6 text-center'>
			<div className='max-w-6xl mx-auto'>
				<h2 className='text-3xl md:text-4xl font-bold  mb-6'>
					ماذا يقول عملاؤنا
				</h2>
				<p className='text-slate-400 mb-12'>
					نساعد آلاف المحترفين في إدارة أعمالهم بسهولة واحتراف.
				</p>
				<div className='grid grid-cols-1 md:grid-cols-3 gap-8'>
					{testimonials.map((t, index) => (
						<div
							key={index}
							className='bg-[rgb(30,41,59)] p-6 rounded-lg shadow-sm border hover:shadow-md transition flex flex-col items-center text-center'
						>
							<div className='w-20 h-20 flex items-center justify-center rounded-full bg-gray-200 text-3xl mb-4'>
								{t.avatar}
							</div>
							<p className='text-slate-400 italic mb-4'>
								"{t.comment}"
							</p>
							<div className='text-slate-200 font-semibold'>
								{t.name}
							</div>
							<div className='text-sm text-slate-300'>
								{t.role}
							</div>
						</div>
					))}
				</div>
			</div>
		</section>
	);
};

export default Testimonials;
