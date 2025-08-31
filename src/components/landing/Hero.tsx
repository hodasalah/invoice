import { ArrowRight } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { PrimaryBtn, SecondaryBtn } from '../shared/button';
import Nav from './Nav';

// src/components/landing/Hero.tsx
const Hero = () => {
	const { i18n, t } = useTranslation('landing');
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
					<PrimaryBtn
						onClick={() => console.log('btn clicked')}
						type='button'
						disabled={false}
						icon={
							<ArrowRight
								className={`${
									isArabic ? 'rotate-180' : ''
								} text-[rgb(125,211,252)] mt-1`}
								size={16}
								height={14}
							/>
						}
					>
						{t('hero.cta_primary')}
					</PrimaryBtn>

					<SecondaryBtn
						type='button'
						disabled={false}
						onClick={() => console.log('secondary btn clicked')}
						icon={
							<ArrowRight
								className={`${
									isArabic ? 'rotate-180' : ''
								} text-[rgb(125,211,252)] mt-1`}
								size={16}
								height={14}
							/>
						}
					>
						{t('hero.cta_secondary')}
					</SecondaryBtn>
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
