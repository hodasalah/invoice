import { ArrowRight } from 'lucide-react';
import Nav from './Nav';

// src/components/landing/Hero.tsx
const Hero = () => {
	return (
		<section className='px-6 text-center w-full'>
			<Nav />
			<div className='max-w-4xl mx-auto'>
				<h1 className='text-4xl md:text-5xl font-bold  leading-tight mb-6'>
					أنشئ فواتيرك الاحترافية في دقائق
				</h1>
				<p className='text-md  mb-8 text-slate-300 max-w-2xl mx-auto'>
					منصة سهلة وسريعة لإدارة الفواتير والمدفوعات لرواد الأعمال
					والمستقلين. ويعينك برنامج فاتورتك على إصدار فواتير معتمدة
					باللغة العربية والإنجليزية من خلال واجهة استخدام سهلة وسريعة
					الاستجابة
				</p>
				<div className='flex justify-center gap-4 mb-24'>
					<button className='flex gap-2 items-center text-white hover:text-gray-300 transition bg-[rgb(99,102,241)] px-4 py-2 rounded-md'>
						جرّب مجانًا الآن
						<ArrowRight
							className='text-[rgb(125,211,252)] mt-1'
							size={16}
							height={14}
						/>
					</button>
					<button className='flex gap-2 items-center text-white hover:bg-slate-600 transition text-[rgb(203,215,225))] bg-[rgb(51,65,85)] px-4 py-2 rounded-md border-[.5px] border-slate-300'>
						استعرض المميزات
					</button>
				</div>
				<img
					src='/assets/hero-dashboard.png'
					alt='Dashboard Preview'
					className='w-full max-w-3xl mx-auto mt-12 rounded-xl shadow-md'
				/>
			</div>
		</section>
	);
};

export default Hero;
