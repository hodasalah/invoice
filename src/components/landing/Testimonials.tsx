import { useTranslation } from 'react-i18next';

const Testimonials = () => {
	const { t, i18n } = useTranslation();
	const isArabic = i18n.language === 'ar';

	const testimonials = t('testimonials.items', { returnObjects: true }) as {
		name: string;
		role: string;
		comment: string;
		avatar: string;
	}[];

	return (
		<section
			className='py-20 px-6 text-center'
			dir={isArabic ? 'rtl' : 'ltr'}
		>
			<div className='max-w-6xl mx-auto'>
				<h2 className='text-3xl md:text-4xl font-bold mb-6'>
					{t('testimonials.title')}
				</h2>
				<p className='text-slate-400 mb-12'>
					{t('testimonials.subtitle')}
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
								" {t.comment} "
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
