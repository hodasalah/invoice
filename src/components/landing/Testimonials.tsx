import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';

import type { Variants } from 'framer-motion';

const containerVariants: Variants = {
	hidden: { opacity: 0 },
	visible: {
		opacity: 1,
		transition: { staggerChildren: 0.2 },
	},
};

const itemVariants: Variants = {
	hidden: { opacity: 0, scale: 0.95, y: 20 },
	visible: { opacity: 1, scale: 1, y: 0, transition: { duration: 0.5 } },
};

const Testimonials = () => {
	const { t, i18n } = useTranslation('landing');
	const isArabic = i18n.language === 'ar';

	const testimonials = t('testimonials.items', { returnObjects: true }) as {
		name: string;
		role: string;
		comment: string;
		avatar: string;
	}[];

	return (
		<section
			className='py-24 px-6 text-center bg-gray-50/50 dark:bg-slate-900/50'
			dir={isArabic ? 'rtl' : 'ltr'}
		>
			<div className='max-w-6xl mx-auto'>
				<motion.div
					initial={{ opacity: 0, y: -20 }}
					whileInView={{ opacity: 1, y: 0 }}
					viewport={{ once: true, margin: '-100px' }}
					transition={{ duration: 0.6 }}
				>
					<h2 className='text-3xl md:text-5xl font-bold mb-6'>
						{t('testimonials.title')}
					</h2>
					<p className='dark:text-slate-400 text-gray-500 mb-16 text-lg max-w-2xl mx-auto'>
						{t('testimonials.subtitle')}
					</p>
				</motion.div>
				<motion.div 
					variants={containerVariants}
					initial="hidden"
					whileInView="visible"
					viewport={{ once: true, margin: '-50px' }}
					className='grid grid-cols-1 md:grid-cols-3 gap-8'
				>
					{testimonials.map((testimonial, index) => (
						<motion.div
							variants={itemVariants}
							whileHover={{ y: -5 }}
							key={index}
							className='bg-white dark:bg-slate-800 p-8 rounded-2xl shadow-sm border border-gray-100 dark:border-slate-700 hover:shadow-lg transition-all duration-300 flex flex-col items-center text-center relative'
						>
							{/* Quote Icon Background */}
							<div className="absolute top-6 right-6 text-6xl text-primary/10 dark:text-primary/5 font-serif leading-none">"</div>
							
							<div className='w-20 h-20 flex items-center justify-center rounded-full bg-primary/10 dark:bg-slate-700 text-4xl mb-6 shadow-inner'>
								{testimonial.avatar}
							</div>
							<p className='text-gray-600 dark:text-slate-300 italic mb-8 relative z-10 text-sm leading-relaxed flex-grow'>
								"{testimonial.comment}"
							</p>
							<div className='mt-auto w-full'>
								<div className='text-gray-900 dark:text-white font-bold text-lg'>
									{testimonial.name}
								</div>
								<div className='text-sm text-primary font-medium mt-1'>
									{testimonial.role}
								</div>
							</div>
						</motion.div>
					))}
				</motion.div>
			</div>
		</section>
	);
};

export default Testimonials;
