import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';

import type { Variants } from 'framer-motion';

const containerVariants: Variants = {
	hidden: { opacity: 0 },
	visible: {
		opacity: 1,
		transition: {
			staggerChildren: 0.15,
		},
	},
};

const itemVariants: Variants = {
	hidden: { opacity: 0, y: 20 },
	visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
};

const Features = () => {
	const { t, i18n } = useTranslation('landing');
	const isArabic = i18n.language === 'ar';

	const features = t('features.items', { returnObjects: true }) as {
		icon: string;
		title: string;
		description: string;
	}[];

	return (
		<section
			className='py-24 px-6 text-center relative overflow-hidden'
			dir={isArabic ? 'rtl' : 'ltr'}
		>
			<div className='max-w-6xl mx-auto relative z-10'>
				<motion.div
					initial={{ opacity: 0, y: -20 }}
					whileInView={{ opacity: 1, y: 0 }}
					viewport={{ once: true, margin: '-100px' }}
					transition={{ duration: 0.6 }}
				>
					<h2 className='text-3xl md:text-4xl font-bold mb-4'>
						{t('features.title')}
					</h2>
					<p className='dark:text-slate-300 text-gray-500 mb-16 max-w-2xl mx-auto text-lg'>
						{t('features.subtitle')}
					</p>
				</motion.div>
				<motion.div 
					variants={containerVariants}
					initial="hidden"
					whileInView="visible"
					viewport={{ once: true, margin: '-50px' }}
					className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8'
				>
					{features.map((feature, idx) => (
						<motion.div
							variants={itemVariants}
							whileHover={{ y: -5 }}
							key={idx}
							className='dark:bg-slate-800/80 bg-white/80 backdrop-blur-sm p-8 rounded-2xl shadow-sm border border-gray-100 dark:border-slate-700 hover:shadow-xl hover:border-primary/30 transition-all duration-300 group'
						>
							<div className='text-5xl mb-6 transform group-hover:scale-110 transition-transform duration-300'>{feature.icon}</div>
							<h3 className='text-xl font-semibold dark:text-white text-gray-900 mb-3'>
								{feature.title}
							</h3>
							<p className='dark:text-slate-400 text-gray-600 text-sm leading-relaxed'>
								{feature.description}
							</p>
						</motion.div>
					))}
				</motion.div>
			</div>
		</section>
	);
};

export default Features;
