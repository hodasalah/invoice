import type { Variants } from 'framer-motion';
import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router';
import { PrimaryBtn, SecondaryBtn } from '../shared/button';

const containerVariants: Variants = {
	hidden: { opacity: 0 },
	visible: {
		opacity: 1,
		transition: { staggerChildren: 0.15 },
	},
};

const itemVariants: Variants = {
	hidden: { opacity: 0, y: 30 },
	visible: {
		opacity: 1,
		y: 0,
		transition: { duration: 0.5, ease: 'easeOut' },
	},
};

const Pricing = () => {
	const { t, i18n } = useTranslation('landing');
	const isArabic = i18n.language === 'ar';
	const navigate = useNavigate();

	const plans = t('pricing.plans', { returnObjects: true }) as {
		name: string;
		price: string;
		description: string;
		features: string[];
		button: string;
	}[];

	return (
		<section
			className='py-24 px-6 text-center relative'
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
						{t('pricing.title')}
					</h2>
					<p className='dark:text-slate-300 text-gray-500 mb-16 text-lg max-w-2xl mx-auto'>
						{t('pricing.subtitle')}
					</p>
				</motion.div>
				<motion.div
					variants={containerVariants}
					initial='hidden'
					whileInView='visible'
					viewport={{ once: true, margin: '-50px' }}
					className='grid grid-cols-1 md:grid-cols-3 gap-8 items-center'
				>
					{plans.map((plan, idx) => (
						<motion.div
							variants={itemVariants}
							key={idx}
							className={`relative p-8 rounded-2xl shadow-sm transition-all duration-300 ${
								idx === 1
									? 'border-2 border-primary bg-white dark:bg-slate-800 shadow-xl shadow-primary/20 scale-105 z-10'
									: 'border border-gray-200 dark:border-slate-700 bg-gray-50 dark:bg-slate-800/60 hover:shadow-lg'
							}`}
						>
							{idx === 1 && (
								<div className='absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-primary text-white px-4 py-1 rounded-full text-sm font-medium tracking-wide'>
									{t('pricing.recommended', 'Recommended')}
								</div>
							)}
							<h3
								className={`text-2xl font-bold mb-2 ${
									idx === 1
										? 'text-gray-900 dark:text-white'
										: 'text-gray-700 dark:text-slate-200'
								}`}
							>
								{plan.name}
							</h3>
							<p
								className={`text-sm mb-6 ${
									idx === 1
										? 'text-gray-600 dark:text-slate-300'
										: 'text-gray-500 dark:text-slate-400'
								}`}
							>
								{plan.description}
							</p>
							<div
								className={`text-5xl font-extrabold mb-8 ${
									idx === 1
										? 'text-gray-900 dark:text-white'
										: 'text-gray-800 dark:text-slate-100'
								}`}
							>
								${plan.price}
								<span
									className={`text-base font-normal ml-1 ${
										idx === 1
											? 'text-gray-500 dark:text-slate-400'
											: 'text-gray-400 dark:text-slate-500'
									}`}
								>
									{t('pricing.perMonth')}
								</span>
							</div>
							<ul
								className={`space-y-4 mb-8 ${
									idx === 1
										? 'text-gray-700 dark:text-slate-200'
										: 'text-gray-600 dark:text-slate-300'
								} ${isArabic ? 'text-right' : 'text-left'}`}
							>
								{plan.features.map((feature, i) => (
									<li
										key={i}
										className='flex items-center gap-3'
									>
										<span className='text-primary text-lg'>
											✅
										</span>
										<span>{feature}</span>
									</li>
								))}
							</ul>
							<div className='mt-auto pt-4'>
								{plan.price !== '0' ? (
									<motion.div
										whileHover={{ scale: 1.05 }}
										whileTap={{ scale: 0.95 }}
									>
										<PrimaryBtn
											onClick={() => navigate('/signup')}
											disabled={false}
											type='button'
											className='w-full py-3 shadow-md shadow-primary/20'
										>
											{plan.button}
										</PrimaryBtn>
									</motion.div>
								) : (
									<motion.div
										whileHover={{ scale: 1.05 }}
										whileTap={{ scale: 0.95 }}
									>
										<SecondaryBtn
											onClick={() => navigate('/signup')}
											disabled={false}
											type='button'
											className='w-full py-3 bg-slate-700 border-gray-300 dark:border-slate-600'
										>
											{plan.button}
										</SecondaryBtn>
									</motion.div>
								)}
							</div>
						</motion.div>
					))}
				</motion.div>
			</div>
		</section>
	);
};

export default Pricing;
