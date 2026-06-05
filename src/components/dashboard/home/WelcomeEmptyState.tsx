import { motion } from 'framer-motion';
import {
	FileText,
	Users,
	ArrowRight,
	Sparkles,
	TrendingUp,
	Wallet,
	CheckCircle2,
	PlusCircle,
	BarChart3,
} from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router';
import { useAppSelector } from '@/store/hooks';

/* ─── Animation variants ─────────────────────────────────────── */
const containerVariants = {
	hidden: { opacity: 0 },
	visible: {
		opacity: 1,
		transition: { staggerChildren: 0.13, delayChildren: 0.05 },
	},
};
const itemVariants = {
	hidden: { opacity: 0, y: 20 },
	visible: {
		opacity: 1,
		y: 0,
		transition: { type: 'spring', stiffness: 90, damping: 14 },
	},
};

/* ─── Types ───────────────────────────────────────────────────── */
type WelcomeEmptyStateProps = {
	hasClients: boolean;
	hasInvoices: boolean;
};

/* ─── Component ───────────────────────────────────────────────── */
export default function WelcomeEmptyState({
	hasClients,
	hasInvoices,
}: WelcomeEmptyStateProps) {
	const { i18n } = useTranslation('common');
	const navigate = useNavigate();
	const currentUser = useAppSelector((s) => s.user.currentUser);
	const isArabic = i18n.language === 'ar';

	const firstName =
		(currentUser as any)?.firstName ||
		(currentUser as any)?.displayName?.split(' ')[0] ||
		(isArabic ? 'بك' : 'there');

	const completedCount = [hasClients, hasInvoices].filter(Boolean).length;
	const progressPct = (completedCount / 2) * 100;

	/* ── Steps data ── */
	const steps = [
		{
			icon: <Users className='w-6 h-6' />,
			route: '/dashboard/clients/new',
			gradient: 'from-violet-500 to-purple-600',
			shadowColor: 'shadow-purple-200 dark:shadow-purple-900/40',
			done: hasClients,
			title: isArabic ? 'أضف أول عميل' : 'Add your first client',
			desc: isArabic
				? 'سجّل بيانات عملائك لتتمكن من إنشاء الفواتير وتتبع المدفوعات.'
				: 'Register your clients so you can create invoices and track payments.',
			cta: isArabic ? 'إضافة عميل' : 'Add Client',
		},
		{
			icon: <FileText className='w-6 h-6' />,
			route: '/dashboard/invoices/create',
			gradient: 'from-emerald-500 to-teal-500',
			shadowColor: 'shadow-emerald-200 dark:shadow-emerald-900/40',
			done: hasInvoices,
			title: isArabic ? 'أنشئ أول فاتورة' : 'Create your first invoice',
			desc: isArabic
				? 'أصدر فاتورتك الأولى في ثوانٍ وتابع حالة الدفع لحظياً.'
				: 'Issue your first invoice in seconds and track payment status in real time.',
			cta: isArabic ? 'إنشاء فاتورة' : 'Create Invoice',
		},
	];

	/* ── Feature pills ── */
	const featurePills = [
		{
			icon: <TrendingUp className='w-4 h-4' />,
			label: isArabic ? 'تقارير مالية ذكية' : 'Smart Revenue Reports',
		},
		{
			icon: <Wallet className='w-4 h-4' />,
			label: isArabic ? 'إدارة المحفظة' : 'Wallet Management',
		},
		{
			icon: <BarChart3 className='w-4 h-4' />,
			label: isArabic ? 'تحليلات فورية' : 'Instant Analytics',
		},
	];

	return (
		<motion.div
			variants={containerVariants}
			initial='hidden'
			animate='visible'
			className='space-y-7'
			dir={isArabic ? 'rtl' : 'ltr'}
		>
			{/* ══════════════════════════════════════════════════════════
			    HERO BANNER
			    Light mode: vibrant emerald-to-teal gradient
			    Dark mode:  dark slate with subtle emerald glow
			══════════════════════════════════════════════════════════ */}
			<motion.div
				variants={itemVariants}
				className={[
					'relative overflow-hidden rounded-2xl p-8 md:p-10 shadow-xl',
					/* Light */
					'bg-gradient-to-br from-emerald-500 via-emerald-600 to-teal-600',
					/* Dark — override with dark: variants */
					'dark:bg-none dark:bg-gradient-to-br dark:from-slate-800 dark:via-slate-850 dark:to-slate-900',
				].join(' ')}
			>
				{/* ── Decorative blobs (light) ── */}
				<div className='pointer-events-none absolute -top-20 -right-20 h-72 w-72 rounded-full bg-white/10 blur-3xl dark:bg-emerald-500/5' />
				<div className='pointer-events-none absolute -bottom-24 -left-12 h-64 w-64 rounded-full bg-teal-400/20 blur-3xl dark:bg-teal-400/5' />

				{/* ── Animated sparkle dots ── */}
				<div className='pointer-events-none absolute inset-0 overflow-hidden'>
					{Array.from({ length: 14 }).map((_, i) => (
						<motion.div
							key={i}
							className='absolute h-1.5 w-1.5 rounded-full bg-white/25 dark:bg-white/10'
							style={{
								top: `${8 + (i * 6) % 82}%`,
								left: `${4 + (i * 7) % 92}%`,
							}}
							animate={{ opacity: [0.15, 0.6, 0.15], scale: [1, 1.4, 1] }}
							transition={{ duration: 3 + (i % 3), repeat: Infinity, delay: i * 0.2 }}
						/>
					))}
				</div>

				{/* ── Content ── */}
				<div className='relative z-10'>
					{/* Badge */}
					<motion.div
						initial={{ scale: 0.85, opacity: 0 }}
						animate={{ scale: 1, opacity: 1 }}
						transition={{ delay: 0.15 }}
						className='mb-4 inline-flex items-center gap-2 rounded-full bg-white/20 dark:bg-white/10 border border-white/20 dark:border-white/10 px-4 py-1.5 text-sm font-medium text-white backdrop-blur-sm'
					>
						<Sparkles className='w-4 h-4' />
						{isArabic ? 'مرحباً بك في فاتورتي ✨' : 'Welcome to Fatoorty ✨'}
					</motion.div>

					{/* Heading */}
					<h1 className='text-3xl md:text-4xl font-extrabold text-white mb-3 leading-tight'>
						{isArabic ? `أهلاً، ${firstName}! 👋` : `Hey, ${firstName}! 👋`}
					</h1>

					{/* Sub-heading */}
					<p className='text-white/85 dark:text-slate-300 text-base md:text-lg max-w-2xl leading-relaxed'>
						{isArabic
							? 'حسابك جاهز تماماً. ابدأ بإضافة عميلك الأول وأصدر فاتورتك الأولى في دقائق.'
							: 'Your account is ready. Start by adding your first client and create your first invoice in minutes.'}
					</p>

					{/* Feature pills */}
					<div className='mt-6 flex flex-wrap gap-2'>
						{featurePills.map((pill, i) => (
							<span
								key={i}
								className='flex items-center gap-1.5 rounded-full border border-white/25 dark:border-slate-600 bg-white/15 dark:bg-slate-700/50 px-4 py-1.5 text-sm text-white dark:text-slate-200 backdrop-blur-sm'
							>
								{pill.icon}
								{pill.label}
							</span>
						))}
					</div>
				</div>
			</motion.div>

			{/* ══════════════════════════════════════════════════════════
			    SECTION HEADING
			══════════════════════════════════════════════════════════ */}
			<motion.div variants={itemVariants}>
				<h2 className='text-xl font-bold text-gray-800 dark:text-white'>
					{isArabic ? '🚀 ابدأ في خطوتين' : '🚀 Get started in 2 steps'}
				</h2>
				<p className='mt-1 text-sm text-gray-500 dark:text-slate-400'>
					{isArabic
						? 'أكمل هذه الخطوات البسيطة لتبدأ في رؤية إحصاءاتك.'
						: 'Complete these simple steps to start seeing your dashboard come to life.'}
				</p>
			</motion.div>

			{/* ══════════════════════════════════════════════════════════
			    STEP CARDS
			══════════════════════════════════════════════════════════ */}
			<div className='grid md:grid-cols-2 gap-5'>
				{steps.map((step, i) => (
					<motion.div
						key={i}
						variants={itemVariants}
						whileHover={step.done ? {} : { y: -5, transition: { duration: 0.2 } }}
						onClick={() => !step.done && navigate(step.route)}
						className={[
							'relative rounded-2xl border p-6 transition-all duration-200',
							step.done
								/* Completed card */
								? 'cursor-default border-emerald-200 bg-emerald-50 dark:border-emerald-800/50 dark:bg-emerald-950/25'
								/* Active card */
								: [
										'cursor-pointer shadow-md hover:shadow-lg',
										'border-gray-200 bg-white',
										'dark:border-slate-700 dark:bg-slate-800',
								  ].join(' '),
						].join(' ')}
					>
						{/* Icon + step number row */}
						<div className='flex items-start justify-between mb-5'>
							{/* Gradient icon */}
							<div
								className={`flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br ${step.gradient} ${step.shadowColor} shadow-lg text-white`}
							>
								{step.icon}
							</div>

							{/* Done badge OR step number */}
							{step.done ? (
								<motion.div
									initial={{ scale: 0 }}
									animate={{ scale: 1 }}
									transition={{ type: 'spring', stiffness: 200, delay: 0.1 }}
								>
									<CheckCircle2 className='w-7 h-7 text-emerald-500' />
								</motion.div>
							) : (
								<span className='flex h-8 w-8 items-center justify-center rounded-full bg-gray-100 dark:bg-slate-700 text-sm font-black text-gray-400 dark:text-slate-400'>
									{i + 1}
								</span>
							)}
						</div>

						{/* Title */}
						<h3 className='text-base font-semibold text-gray-800 dark:text-white mb-1.5'>
							{step.title}
						</h3>

						{/* Description */}
						<p className='text-sm leading-relaxed text-gray-500 dark:text-slate-400 mb-5'>
							{step.desc}
						</p>

						{/* CTA button / done message */}
						{step.done ? (
							<p className='flex items-center gap-1.5 text-sm font-semibold text-emerald-600 dark:text-emerald-400'>
								<CheckCircle2 className='w-4 h-4' />
								{isArabic ? 'تم بنجاح!' : 'Completed!'}
							</p>
						) : (
							<button
								onClick={(e) => {
									e.stopPropagation();
									navigate(step.route);
								}}
								className={`inline-flex items-center gap-2 rounded-xl bg-gradient-to-r ${step.gradient} px-5 py-2.5 text-sm font-semibold text-white shadow-sm transition-all duration-150 hover:shadow-md hover:opacity-95 active:scale-95`}
							>
								<PlusCircle className='w-4 h-4' />
								{step.cta}
								<ArrowRight
									className={`w-4 h-4 transition-transform group-hover:translate-x-0.5 ${isArabic ? 'rotate-180' : ''}`}
								/>
							</button>
						)}
					</motion.div>
				))}
			</div>

			{/* ══════════════════════════════════════════════════════════
			    PROGRESS CARD
			══════════════════════════════════════════════════════════ */}
			<motion.div
				variants={itemVariants}
				className='rounded-2xl border border-gray-200 dark:border-slate-700 bg-white dark:bg-slate-800 p-6 shadow-sm'
			>
				{/* Header row */}
				<div className='flex items-center justify-between mb-4'>
					<div>
						<p className='text-sm font-semibold text-gray-700 dark:text-white'>
							{isArabic ? 'تقدمك في الإعداد' : 'Setup Progress'}
						</p>
						<p className='text-xs text-gray-400 dark:text-slate-500 mt-0.5'>
							{isArabic
								? 'بعد إضافة البيانات ستظهر لوحة التحكم كاملةً بالإحصاءات.'
								: 'Once you add data, your dashboard will populate with live charts.'}
						</p>
					</div>
					<span
						className={`flex h-10 w-10 items-center justify-center rounded-full text-sm font-bold ${
							completedCount === 2
								? 'bg-emerald-100 text-emerald-600 dark:bg-emerald-900/40 dark:text-emerald-400'
								: completedCount === 1
								? 'bg-amber-100 text-amber-600 dark:bg-amber-900/40 dark:text-amber-400'
								: 'bg-gray-100 text-gray-500 dark:bg-slate-700 dark:text-slate-400'
						}`}
					>
						{completedCount}/2
					</span>
				</div>

				{/* Progress bar */}
				<div className='h-3 w-full overflow-hidden rounded-full bg-gray-100 dark:bg-slate-700'>
					<motion.div
						className='h-full rounded-full bg-gradient-to-r from-emerald-500 to-teal-500'
						initial={{ width: 0 }}
						animate={{ width: `${progressPct}%` }}
						transition={{ duration: 1.1, ease: 'easeOut', delay: 0.4 }}
					/>
				</div>

				{/* Step indicators */}
				<div className='mt-4 flex gap-4'>
					{steps.map((step, i) => (
						<div key={i} className='flex items-center gap-2'>
							{step.done ? (
								<CheckCircle2 className='w-4 h-4 text-emerald-500' />
							) : (
								<div className='h-4 w-4 rounded-full border-2 border-gray-300 dark:border-slate-600' />
							)}
							<span
								className={`text-xs font-medium ${
									step.done
										? 'text-emerald-600 dark:text-emerald-400'
										: 'text-gray-400 dark:text-slate-500'
								}`}
							>
								{step.title}
							</span>
						</div>
					))}
				</div>
			</motion.div>
		</motion.div>
	);
}
