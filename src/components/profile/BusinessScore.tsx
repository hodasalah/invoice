import { motion } from 'framer-motion';
import { Zap } from 'lucide-react';

interface BusinessScoreProps {
	collectionRate: number;
	profilePercent: number;
	totalClients: number;
	totalInvoices: number;
	t: (key: string) => string;
}

export default function BusinessScore({ collectionRate, profilePercent, totalClients, totalInvoices, t }: BusinessScoreProps) {
	// Dynamic score: weighted average of profile completion, collection rate, and activity
	const activityScore = Math.min(100, (totalClients * 10 + totalInvoices * 5));
	const score = Math.round(profilePercent * 0.3 + collectionRate * 0.4 + activityScore * 0.3);

	const getScoreColor = (s: number) => {
		if (s >= 80) return { ring: 'text-emerald-500', bg: 'from-emerald-500 to-teal-500', label: t('profilePage.scoreExcellent') };
		if (s >= 60) return { ring: 'text-sky-500', bg: 'from-sky-500 to-blue-500', label: t('profilePage.scoreGood') };
		if (s >= 40) return { ring: 'text-amber-500', bg: 'from-amber-500 to-orange-500', label: t('profilePage.scoreFair') };
		return { ring: 'text-rose-500', bg: 'from-rose-500 to-pink-500', label: t('profilePage.scoreNeedsWork') };
	};

	const { ring, bg, label } = getScoreColor(score);

	// SVG ring parameters
	const radius = 52;
	const circumference = 2 * Math.PI * radius;
	const offset = circumference - (score / 100) * circumference;

	return (
		<motion.div
			initial={{ opacity: 0, y: 16 }}
			animate={{ opacity: 1, y: 0 }}
			transition={{ duration: 0.4, delay: 0.25 }}
			className='rounded-2xl border border-gray-200/80 dark:border-gray-700/50 bg-white dark:bg-gray-900/80 backdrop-blur-sm p-6 flex flex-col items-center gap-4'
		>
			<div className='flex items-center gap-2'>
				<Zap className='w-4 h-4 text-amber-500' />
				<h3 className='font-semibold text-gray-900 dark:text-white text-sm'>
					{t('profilePage.businessScore')}
				</h3>
			</div>

			{/* Circular progress */}
			<div className='relative w-32 h-32'>
				<svg className='w-full h-full transform -rotate-90' viewBox='0 0 120 120'>
					<circle
						cx='60' cy='60' r={radius}
						stroke='currentColor'
						strokeWidth='8'
						fill='none'
						className='text-gray-100 dark:text-gray-800'
					/>
					<motion.circle
						cx='60' cy='60' r={radius}
						stroke='currentColor'
						strokeWidth='8'
						fill='none'
						strokeLinecap='round'
						className={ring}
						strokeDasharray={circumference}
						initial={{ strokeDashoffset: circumference }}
						animate={{ strokeDashoffset: offset }}
						transition={{ duration: 1.2, ease: 'easeOut', delay: 0.5 }}
					/>
				</svg>
				<div className='absolute inset-0 flex flex-col items-center justify-center'>
					<span className='text-3xl font-bold text-gray-900 dark:text-white'>{score}</span>
					<span className='text-[10px] font-medium text-gray-400 dark:text-gray-500 uppercase tracking-widest'>Score</span>
				</div>
			</div>

			<span className={`px-3 py-1 rounded-full text-xs font-semibold bg-gradient-to-r ${bg} text-white`}>
				{label}
			</span>

			{/* Breakdown */}
			<div className='w-full space-y-2 mt-1'>
				{[
					{ label: t('profilePage.profileCompletion'), value: profilePercent },
					{ label: t('profilePage.collectionRate'), value: Math.round(collectionRate) },
					{ label: t('profilePage.activityScore'), value: Math.min(100, activityScore) },
				].map((item) => (
					<div key={item.label}>
						<div className='flex items-center justify-between text-xs mb-1'>
							<span className='text-gray-500 dark:text-gray-400'>{item.label}</span>
							<span className='text-gray-700 dark:text-gray-300 font-medium'>{item.value}%</span>
						</div>
						<div className='w-full h-1.5 rounded-full bg-gray-100 dark:bg-gray-800 overflow-hidden'>
							<motion.div
								initial={{ width: 0 }}
								animate={{ width: `${item.value}%` }}
								transition={{ duration: 0.8, ease: 'easeOut', delay: 0.6 }}
								className={`h-full rounded-full bg-gradient-to-r ${bg}`}
							/>
						</div>
					</div>
				))}
			</div>
		</motion.div>
	);
}
