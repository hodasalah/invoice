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
	hidden: { opacity: 0, x: -30 },
	visible: { opacity: 1, x: 0, transition: { duration: 0.6, ease: "easeOut" } },
};

const WhyUs = () => {
	const { t, i18n } = useTranslation('landing');
	const isArabic = i18n.language === 'ar';

	const benefits = t('whyUs.items', { returnObjects: true }) as {
		icon: string;
		title: string;
		description: string;
	}[];

	return (
		<section
			className='py-24 px-6 text-center bg-gray-50/50 dark:bg-slate-900/50 relative'
			dir={isArabic ? 'rtl' : 'ltr'}
		>
			<div className='max-w-5xl mx-auto'>
				<motion.div
					initial={{ opacity: 0, y: 20 }}
					whileInView={{ opacity: 1, y: 0 }}
					viewport={{ once: true, margin: '-100px' }}
					transition={{ duration: 0.6 }}
				>
					<h2 className='text-3xl md:text-4xl font-bold mb-6'>
						{t('whyUs.title')}
					</h2>
					<p className='dark:text-slate-300 text-gray-500 mb-16 text-lg max-w-2xl mx-auto'>
						{t('whyUs.subtitle')}
					</p>
				</motion.div>
				<motion.div
					variants={containerVariants}
					initial="hidden"
					whileInView="visible"
					viewport={{ once: true, margin: '-50px' }}
					className={`grid grid-cols-1 sm:grid-cols-2 gap-8 ${
						isArabic ? 'text-right' : 'text-left'
					}`}
				>
					{benefits.map((item, index) => (
						<motion.div
							variants={itemVariants}
							whileHover={{ scale: 1.02 }}
							key={index}
							className='bg-white dark:bg-slate-800 p-8 rounded-2xl shadow-sm border border-gray-100 dark:border-slate-700 hover:shadow-lg transition-all duration-300 flex flex-col sm:flex-row gap-6 items-start'
						>
							<div className='text-4xl bg-primary/10 dark:bg-primary/20 p-4 rounded-xl text-primary shrink-0'>{item.icon}</div>
							<div>
								<h3 className='text-xl font-semibold mb-3 dark:text-white text-gray-900'>
									{item.title}
								</h3>
								<p className='dark:text-slate-400 text-gray-600 leading-relaxed text-sm'>
									{item.description}
								</p>
							</div>
						</motion.div>
					))}
				</motion.div>
			</div>
		</section>
	);
};

export default WhyUs;
