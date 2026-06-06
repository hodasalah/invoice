import { ArrowRight } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router';
import { motion } from 'framer-motion';
import { PrimaryBtn, SecondaryBtn } from '../shared/button';
import Nav from './Nav';

const Hero = () => {
	const { i18n, t } = useTranslation('landing');
	const isArabic = i18n.language === 'ar';
	const navigate = useNavigate();

	return (
		<section className='relative px-6 text-center w-full overflow-hidden'>
			<div className="absolute top-0 left-1/2 w-[800px] h-[400px] -translate-x-1/2 bg-primary/20 blur-[100px] rounded-full pointer-events-none -z-10 dark:bg-primary/10"></div>
			
			<Nav />
			<div className='max-w-4xl mx-auto relative z-10'>
				<motion.h1 
					initial={{ opacity: 0, y: 20 }}
					animate={{ opacity: 1, y: 0 }}
					transition={{ duration: 0.5, ease: 'easeOut' }}
					className='text-4xl md:text-6xl font-extrabold leading-tight mb-6 bg-clip-text text-transparent bg-gradient-to-r from-gray-900 to-gray-600 dark:from-white dark:to-gray-400'
				>
					{t('hero.title')}
				</motion.h1>
				<motion.p 
					initial={{ opacity: 0, y: 20 }}
					animate={{ opacity: 1, y: 0 }}
					transition={{ duration: 0.5, delay: 0.1, ease: 'easeOut' }}
					className='text-lg mb-8 dark:text-slate-300 text-gray-600 max-w-2xl mx-auto'
				>
					{t('hero.subtitle')}
				</motion.p>
				<motion.div 
					initial={{ opacity: 0, y: 20 }}
					animate={{ opacity: 1, y: 0 }}
					transition={{ duration: 0.5, delay: 0.2, ease: 'easeOut' }}
					className='flex justify-center gap-4 mb-24'
				>
					<motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
						<PrimaryBtn
							onClick={() => navigate('/signup')}
							type='button'
							disabled={false}
							className="shadow-lg shadow-primary/30"
							icon={
								<ArrowRight
									className={`${
										isArabic ? 'rotate-180' : ''
									} text-white mt-1`}
									size={16}
									height={14}
								/>
							}
						>
							{t('hero.cta_primary')}
						</PrimaryBtn>
					</motion.div>

					<motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
						<SecondaryBtn
							type='button'
							disabled={false}
							onClick={() => navigate('/login')}
							className="backdrop-blur-sm bg-white/50 dark:bg-slate-800/50 border border-gray-200 dark:border-slate-700 hover:bg-gray-50 dark:hover:bg-slate-700/50"
							icon={
								<ArrowRight
									className={`${
										isArabic ? 'rotate-180' : ''
									} mt-1`}
									size={16}
									height={14}
								/>
							}
						>
							{t('hero.cta_secondary')}
						</SecondaryBtn>
					</motion.div>
				</motion.div>
				
				<motion.div
					initial={{ opacity: 0, y: 40 }}
					animate={{ opacity: 1, y: 0 }}
					transition={{ duration: 0.7, delay: 0.3, ease: 'easeOut' }}
					className="relative mx-auto max-w-3xl mt-12 rounded-2xl border border-gray-200 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-[0_20px_50px_-12px_rgba(0,0,0,0.15)] dark:shadow-[0_20px_50px_-12px_rgba(0,0,0,0.5)] overflow-hidden"
				>
					<div className="flex items-center gap-1.5 px-4 py-3 border-b border-gray-200/80 dark:border-slate-800 bg-gray-50/50 dark:bg-slate-950/50">
						<div className="w-2.5 h-2.5 rounded-full bg-red-400"></div>
						<div className="w-2.5 h-2.5 rounded-full bg-yellow-400"></div>
						<div className="w-2.5 h-2.5 rounded-full bg-green-400"></div>
					</div>
					<img
						src='/assets/hero-dashboard.png'
						alt='Dashboard Preview'
						className='w-full object-cover object-top'
					/>
				</motion.div>
			</div>
		</section>
	);
};

export default Hero;
