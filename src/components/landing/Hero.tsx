import { ArrowRight } from 'lucide-react';
import Nav from './Nav';
import { useTranslation } from 'react-i18next';

// src/components/landing/Hero.tsx
const Hero = () => {
	const { i18n,t } = useTranslation();
		const isArabic = i18n.language === 'ar';


	return (
		<section className='px-6 text-center w-full'>
			<Nav />
			<div className='max-w-4xl mx-auto'>
				<h1 className='text-4xl md:text-5xl font-bold  leading-tight mb-6'>
					{t('hero.title')}
				</h1>
				<p className='text-md  mb-8 dark:text-slate-300 text-gray-500 max-w-2xl mx-auto'>
					{t('hero.subtitle')}
				</p>
				<div className='flex justify-center gap-4 mb-24'>
					<button className='flex gap-2 items-center text-white hover:text-gray-300 transition bg-[rgb(99,102,241)] px-4 py-2 rounded-md'>
						{t('hero.cta_primary')}
						<ArrowRight
							className={`${
								isArabic ? 'rotate-180' : ''
							} text-[rgb(125,211,252)] mt-1`}
							size={16}
							height={14}
						/>
					</button>
					<button className='flex gap-2 items-center text-white hover:bg-slate-600 transition text-[rgb(203,215,225))] bg-[rgb(51,65,85)] px-4 py-2 rounded-md border-[.5px] border-slate-300'>
						{t('hero.cta_secondary')}
						<ArrowRight
							className={`${
								isArabic ? 'rotate-180' : ''
							} text-[rgb(125,211,252)] mt-1`}
							size={16}
							height={14}
						/>
					</button>
				</div>
				<img
					src='/assets/hero-dashboard.png'
					alt='Dashboard Preview'
					className='w-full bg-[rgb(15,23,42)] max-w-3xl mx-auto mt-12 rounded-xl shadow-md'
				/>
			</div>
		</section>
	);
};

export default Hero;
