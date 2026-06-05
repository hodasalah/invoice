import { motion } from 'framer-motion';
import { CheckCircle2, Circle } from 'lucide-react';

interface ProfileCompletionProps {
	user: any;
	t: (key: string) => string;
}

interface CheckItem {
	key: string;
	label: string;
	done: boolean;
}

export default function ProfileCompletion({ user, t }: ProfileCompletionProps) {
	const checks: CheckItem[] = [
		{ key: 'avatar', label: t('profilePage.completionAvatar'), done: !!user?.avatar },
		{ key: 'name', label: t('profilePage.completionName'), done: !!(user?.firstName && user?.lastName) },
		{ key: 'email', label: t('profilePage.completionEmail'), done: !!user?.email },
		{ key: 'phone', label: t('profilePage.completionPhone'), done: !!user?.phone },
		{ key: 'company', label: t('profilePage.completionCompany'), done: !!user?.companyName },
		{ key: 'address', label: t('profilePage.completionAddress'), done: !!(user?.address?.street && user?.address?.city) },
		{ key: 'vat', label: t('profilePage.completionVat'), done: !!user?.vatNumber },
		{ key: 'cr', label: t('profilePage.completionCr'), done: !!user?.crNumber },
	];

	const completed = checks.filter((c) => c.done).length;
	const total = checks.length;
	const percent = Math.round((completed / total) * 100);

	return (
		<motion.div
			initial={{ opacity: 0, y: 16 }}
			animate={{ opacity: 1, y: 0 }}
			transition={{ duration: 0.4, delay: 0.2 }}
			className='rounded-2xl border border-gray-200/80 dark:border-gray-700/50 bg-white dark:bg-gray-900/80 backdrop-blur-sm p-6 overflow-hidden'
		>
			<div className='flex items-center justify-between mb-5'>
				<h3 className='font-semibold text-gray-900 dark:text-white text-sm'>
					{t('profilePage.profileCompletion')}
				</h3>
				<span className={`text-sm font-bold ${percent === 100 ? 'text-emerald-600 dark:text-emerald-400' : 'text-amber-600 dark:text-amber-400'}`}>
					{percent}%
				</span>
			</div>

			{/* Progress bar */}
			<div className='w-full h-2 rounded-full bg-gray-100 dark:bg-gray-800 mb-5 overflow-hidden'>
				<motion.div
					initial={{ width: 0 }}
					animate={{ width: `${percent}%` }}
					transition={{ duration: 0.8, ease: 'easeOut', delay: 0.4 }}
					className={`h-full rounded-full ${percent === 100 ? 'bg-gradient-to-r from-emerald-500 to-teal-500' : 'bg-gradient-to-r from-amber-400 to-orange-500'}`}
				/>
			</div>

			{/* Checklist */}
			<div className='grid grid-cols-1 sm:grid-cols-2 gap-2.5'>
				{checks.map((item, i) => (
					<motion.div
						key={item.key}
						initial={{ opacity: 0, x: -8 }}
						animate={{ opacity: 1, x: 0 }}
						transition={{ duration: 0.3, delay: 0.3 + i * 0.04 }}
						className='flex items-center gap-2.5 text-sm'
					>
						{item.done ? (
							<CheckCircle2 className='w-4 h-4 text-emerald-500 flex-shrink-0' />
						) : (
							<Circle className='w-4 h-4 text-gray-300 dark:text-gray-600 flex-shrink-0' />
						)}
						<span className={item.done ? 'text-gray-600 dark:text-gray-400' : 'text-gray-400 dark:text-gray-500'}>
							{item.label}
						</span>
					</motion.div>
				))}
			</div>
		</motion.div>
	);
}
