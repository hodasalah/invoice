import { useState } from 'react';
import {
	ArrowDownToLine,
	ArrowUpFromLine,
	CreditCard,
	FileText,
	ShoppingCart,
	Send,
	TrendingUp,
	TrendingDown,
	MoreHorizontal,
	Plus,
	Settings,
} from 'lucide-react';
import { useTranslation } from 'react-i18next';

// ─── Mini Sparkline (pure SVG, no deps) ──────────────────────────────────────
const Sparkline = ({
	data,
	color,
	fill,
}: {
	data: number[];
	color: string;
	fill: string;
}) => {
	const w = 220,
		h = 70;
	const min = Math.min(...data);
	const max = Math.max(...data);
	const pts = data
		.map((v, i) => {
			const x = (i / (data.length - 1)) * w;
			const y = h - ((v - min) / (max - min)) * h;
			return `${x},${y}`;
		})
		.join(' ');
	const area = `${pts} ${w},${h} 0,${h}`;
	return (
		<svg viewBox={`0 0 ${w} ${h}`} className='w-full h-full' preserveAspectRatio='none'>
			<defs>
				<linearGradient id={`grad-${color}`} x1='0' y1='0' x2='0' y2='1'>
					<stop offset='0%' stopColor={fill} stopOpacity='0.35' />
					<stop offset='100%' stopColor={fill} stopOpacity='0' />
				</linearGradient>
			</defs>
			<polygon points={area} fill={`url(#grad-${color})`} />
			<polyline points={pts} fill='none' stroke={color} strokeWidth='2.5' strokeLinecap='round' strokeLinejoin='round' />
		</svg>
	);
};

// ─── Money Flow dual chart ────────────────────────────────────────────────────
const MoneyFlowChart = () => {
	const income = [4200, 5800, 5100, 7300, 6200, 8900, 7800, 10200, 9100, 11500, 10800, 13200];
	const expense = [3100, 4200, 3800, 5200, 4600, 6100, 5400, 7200, 6500, 8100, 7600, 9400];
	const w = 400, h = 120;
	const max = Math.max(...income, ...expense);
	const toPath = (arr: number[]) =>
		arr
			.map((v, i) => {
				const x = (i / (arr.length - 1)) * w;
				const y = h - (v / max) * h;
				return `${i === 0 ? 'M' : 'L'}${x},${y}`;
			})
			.join(' ');

	return (
		<svg viewBox={`0 0 ${w} ${h}`} className='w-full' style={{ height: 120 }} preserveAspectRatio='none'>
			<path d={toPath(expense)} fill='none' stroke='#9ca3af' strokeWidth='2.5' strokeLinecap='round' strokeLinejoin='round' />
			<path d={toPath(income)} fill='none' stroke='#44814E' strokeWidth='2.5' strokeLinecap='round' strokeLinejoin='round' />
		</svg>
	);
};

// ─── Card component ───────────────────────────────────────────────────────────
const VisaCard = ({ dark, balance, number, expiry }: { dark?: boolean; balance: string; number: string; expiry: string }) => (
	<div
		className='relative w-full overflow-hidden select-none cursor-default transition-transform hover:-translate-y-1 rounded-2xl'
		style={{
			aspectRatio: '1.8', // Decreased height (slimmer profile)
			background: dark
				? 'linear-gradient(135deg,#1a1a2e 0%,#16213e 100%)'
				: 'linear-gradient(135deg,#44814E 0%,#2d5a35 100%)',
			boxShadow: dark
				? '0 8px 32px rgba(0,0,0,0.4)'
				: '0 8px 32px rgba(68,129,78,0.45)',
		}}
	>
		{/* topo / wave decoration */}
		<svg className='absolute inset-0 w-full h-full opacity-10' viewBox='0 0 320 180' preserveAspectRatio='xMidYMid slice'>
			<ellipse cx='280' cy='90' rx='160' ry='90' fill='none' stroke='white' strokeWidth='28' />
			<ellipse cx='280' cy='90' rx='110' ry='60' fill='none' stroke='white' strokeWidth='22' />
			<ellipse cx='280' cy='90' rx='62' ry='35' fill='none' stroke='white' strokeWidth='16' />
		</svg>

		{/* Content — using absolute fill to keep proportions */}
		<div className='absolute inset-0 flex flex-col justify-between p-[6%]'>
			{/* Top row: chip + VISA */}
			<div className='flex justify-between items-start'>
				{/* EMV chip */}
				<svg viewBox='0 0 34 26' className='w-[10%] opacity-90'>
					<rect x='1' y='1' width='32' height='24' rx='3' fill='#d4a843' />
					<rect x='1' y='8' width='32' height='1.5' fill='#b8861e' />
					<rect x='1' y='16.5' width='32' height='1.5' fill='#b8861e' />
					<rect x='11' y='1' width='1.5' height='24' fill='#b8861e' />
					<rect x='21.5' y='1' width='1.5' height='24' fill='#b8861e' />
					<rect x='11' y='8' width='12' height='10' rx='1' fill='#c9952a' />
				</svg>
				{/* VISA wordmark */}
				<svg viewBox='0 0 60 20' className='w-[16%]'>
					<text x='0' y='15' fontSize='16' fontWeight='bold' fontStyle='italic' fill='white' fontFamily='serif'>VISA</text>
				</svg>
			</div>

			{/* Balance */}
			<div>
				<p className='text-white/60 font-medium' style={{ fontSize: 'clamp(8px, 1.8cqi, 11px)' }}>Current Balance</p>
				<p className='font-bold text-white leading-tight' style={{ fontSize: 'clamp(14px, 4cqi, 22px)' }}>{balance}</p>
			</div>

			{/* Bottom row: number + expiry */}
			<div className='flex justify-between items-end'>
				<p className='text-white/80 tracking-widest font-mono' style={{ fontSize: 'clamp(8px, 2.2cqi, 13px)' }}>{number}</p>
				<p className='text-white/70' style={{ fontSize: 'clamp(8px, 2cqi, 12px)' }}>{expiry}</p>
			</div>
		</div>
	</div>
);

// ─── Stat card ────────────────────────────────────────────────────────────────
const StatCard = ({ label, value, change, positive }: { label: string; value: string; change: string; positive: boolean }) => (
	<div className='bg-white dark:bg-gray-900 rounded-2xl p-5 border border-gray-100 dark:border-gray-800 flex flex-col gap-2 shadow-sm'>
		<div className='flex justify-between items-center'>
			<span className='text-sm text-gray-500 font-medium'>{label}</span>
			<MoreHorizontal className='w-4 h-4 text-gray-400' />
		</div>
		<div className='flex items-baseline gap-2'>
			<span className='text-xl font-bold text-gray-900 dark:text-white'>{value}</span>
			<span className={`text-xs font-semibold px-1.5 py-0.5 rounded-full ${positive ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>
				{positive ? '+' : ''}{change}
			</span>
		</div>
	</div>
);

// ─── Savings goal card ────────────────────────────────────────────────────────
const SavingsGoal = ({ icon, label, amount, target, pct }: { icon: string; label: string; amount: string; target: string; pct: number }) => (
	<div className='bg-white dark:bg-gray-900 rounded-2xl p-4 border border-gray-100 dark:border-gray-800 shadow-sm'>
		<div className='flex justify-between items-center mb-3'>
			<div className='flex items-center gap-2'>
				<span className='text-xl'>{icon}</span>
				<span className='text-sm font-semibold text-gray-800 dark:text-gray-200'>{label}</span>
			</div>
			<MoreHorizontal className='w-4 h-4 text-gray-400' />
		</div>
		<p className='text-lg font-bold text-gray-900 dark:text-white mb-2'>{amount}</p>
		<div className='w-full bg-gray-100 dark:bg-gray-800 rounded-full h-1.5 mb-1'>
			<div className='h-1.5 rounded-full' style={{ width: `${pct}%`, background: '#44814E' }} />
		</div>
		<p className='text-xs text-gray-400'>Target {pct}% achieved</p>
	</div>
);

// ─── Quick link button ────────────────────────────────────────────────────────
const QuickLink = ({ icon: Icon, label }: { icon: React.ElementType; label: string }) => (
	<button className='flex flex-col items-center gap-2 group'>
		<div className='w-12 h-12 rounded-xl border-2 flex items-center justify-center transition-all group-hover:scale-110 group-hover:shadow-md'
			style={{ borderColor: '#44814E', color: '#44814E' }}>
			<Icon className='w-5 h-5' />
		</div>
		<span className='text-xs text-gray-600 dark:text-gray-400 font-medium'>{label}</span>
	</button>
);

// ─── Main Wallet Page ─────────────────────────────────────────────────────────
const WalletPage = () => {
	const { i18n } = useTranslation();
	const isAr = i18n.language === 'ar';
	const [activeTab, setActiveTab] = useState<'month' | 'year'>('month');

	return (
		<div className='p-6 min-h-screen bg-gray-50 dark:bg-gray-950' dir={isAr ? 'rtl' : 'ltr'}>

			{/* Header */}
			<div className='flex justify-between items-center mb-6'>
				<h1 className='text-2xl font-bold text-gray-900 dark:text-white'>
					{isAr ? 'محفظتي' : 'My Wallet'}
				</h1>
				<button className='flex items-center gap-2 px-4 py-2 rounded-full border border-gray-200 dark:border-gray-700 text-sm font-medium text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors'>
					<Settings className='w-4 h-4' />
					{isAr ? 'إدارة الرصيد' : 'Manage Balance'}
				</button>
			</div>

			<div className='grid grid-cols-1 lg:grid-cols-3 gap-6'>

				{/* ── LEFT COLUMN ── */}
				<div className='flex flex-col gap-5'>

					{/* Total Balance */}
					<div className='bg-white dark:bg-gray-900 rounded-2xl p-6 border border-gray-100 dark:border-gray-800 shadow-sm'>
						<p className='text-sm text-gray-500 font-medium mb-1'>{isAr ? 'الرصيد الإجمالي' : 'Total Balance'}</p>
						<div className='flex items-baseline gap-2 mb-1'>
							<span className='text-4xl font-extrabold text-gray-900 dark:text-white'>$88,232.00</span>
							<span className='text-xs text-gray-400 font-semibold'>USD</span>
						</div>
						<div className='flex items-center gap-2 mb-4'>
							<span className='text-xs text-gray-400'>11 April 2025</span>
							<span className='flex items-center gap-0.5 text-xs font-semibold text-green-600'>
								<TrendingUp className='w-3 h-3' /> 2.05%
							</span>
						</div>
						<button
							className='w-full py-2.5 rounded-xl text-white text-sm font-semibold transition-all hover:opacity-90 hover:shadow-lg active:scale-95'
							style={{ background: 'linear-gradient(135deg,#44814E,#2d5a35)' }}
						>
							{isAr ? 'سحب جميع الأرباح' : 'Withdraw All Earning'}
						</button>
					</div>

					{/* My Cards */}
					<div className='bg-white dark:bg-gray-900 rounded-2xl p-5 border border-gray-100 dark:border-gray-800 shadow-sm flex flex-col gap-4'>
						<div className='flex justify-between items-center'>
							<h2 className='text-sm font-bold text-gray-800 dark:text-gray-100'>{isAr ? 'بطاقاتي' : 'My Cards'}</h2>
							<span className='text-xs text-gray-400'>2 {isAr ? 'بطاقات' : 'cards'}</span>
						</div>
						<div className='flex flex-col gap-3'>
							<VisaCard balance='$14,200.00' number='5294 2436 4780 9568' expiry='12/26' />
							<VisaCard dark balance='$8,750.00' number='6391 1827 3340 7712' expiry='09/27' />
						</div>
						<button
							className='w-full py-2.5 rounded-xl text-white text-sm font-semibold transition-all hover:opacity-90 hover:shadow-lg active:scale-95 flex-shrink-0'
							style={{ background: 'linear-gradient(135deg,#44814E,#2d5a35)' }}
						>
							{isAr ? 'إدارة البطاقات' : 'Manage Card'}
						</button>
					</div>
				</div>

				{/* ── RIGHT COLUMNS (2/3) ── */}
				<div className='lg:col-span-2 flex flex-col gap-5'>

					{/* Quick Links */}
					<div className='bg-white dark:bg-gray-900 rounded-2xl p-5 border border-gray-100 dark:border-gray-800 shadow-sm'>
						<h2 className='text-sm font-bold text-gray-800 dark:text-gray-100 mb-4'>{isAr ? 'روابط سريعة' : 'Quick Links'}</h2>
						<div className='flex justify-around'>
							<QuickLink icon={ArrowDownToLine} label={isAr ? 'إيداع' : 'Deposit'} />
							<QuickLink icon={Send} label={isAr ? 'إرسال' : 'Send'} />
							<QuickLink icon={ArrowUpFromLine} label={isAr ? 'استلام' : 'Receive'} />
							<QuickLink icon={FileText} label={isAr ? 'فاتورة' : 'Invoice'} />
							<QuickLink icon={ShoppingCart} label={isAr ? 'دفع' : 'Check Out'} />
						</div>
					</div>

					{/* Stat Cards */}
					<div className='grid grid-cols-3 gap-4'>
						<StatCard label={isAr ? 'الدخل الشهري' : 'Monthly Income'} value='$18,500.99' change='2.5%' positive />
						<StatCard label={isAr ? 'المصروف الشهري' : 'Monthly Expense'} value='$11,200.56' change='8%' positive={false} />
						<StatCard label={isAr ? 'المدخرات الشهرية' : 'Monthly Savings'} value='$6,765.12' change='8.5%' positive />
					</div>

					{/* Bottom row: savings + chart + currency */}
					<div className='grid grid-cols-1 md:grid-cols-2 gap-4'>

						{/* Savings Goals */}
						<div className='bg-white dark:bg-gray-900 rounded-2xl p-5 border border-gray-100 dark:border-gray-800 shadow-sm flex flex-col gap-4'>
							<div className='flex justify-between items-center'>
								<div>
									<p className='text-xs text-gray-500 font-medium'>{isAr ? 'المدخرات' : 'Savings'}</p>
									<div className='flex items-baseline gap-2'>
										<span className='text-xl font-bold text-gray-900 dark:text-white'>$58,145.07</span>
										<span className='text-xs font-semibold text-green-600'>+2.5%</span>
									</div>
								</div>
								<button className='w-7 h-7 rounded-full border border-gray-200 dark:border-gray-700 flex items-center justify-center hover:bg-gray-50 dark:hover:bg-gray-800 transition'>
									<Plus className='w-4 h-4 text-gray-500' />
								</button>
							</div>
							<SavingsGoal icon='💍' label={isAr ? 'متزوج' : 'Married'} amount='$6,560.11' target='Target' pct={11} />
							<SavingsGoal icon='🏠' label={isAr ? 'المنزل' : 'Home'} amount='$33,159.15' target='Target' pct={25} />
						</div>

						{/* Money Flow + Currency */}
						<div className='flex flex-col gap-4'>

							{/* Money Flow */}
							<div className='bg-white dark:bg-gray-900 rounded-2xl p-5 border border-gray-100 dark:border-gray-800 shadow-sm flex-1'>
								<div className='flex justify-between items-center mb-3'>
									<span className='text-sm font-bold text-gray-800 dark:text-gray-100'>{isAr ? 'تدفق الأموال' : 'Money Flow'}</span>
									<div className='flex items-center gap-3'>
										<span className='flex items-center gap-1 text-xs text-gray-500'><span className='w-2 h-2 rounded-full inline-block' style={{ background: '#44814E' }} />{isAr ? 'دخل' : 'Income'}</span>
										<span className='flex items-center gap-1 text-xs text-gray-500'><span className='w-2 h-2 rounded-full bg-gray-400 inline-block' />{isAr ? 'مصروف' : 'Expenses'}</span>
										<div className='flex rounded-lg overflow-hidden border border-gray-200 dark:border-gray-700 text-xs'>
											{(['month', 'year'] as const).map(tab => (
												<button
													key={tab}
													onClick={() => setActiveTab(tab)}
													className={`px-3 py-1 transition-colors ${activeTab === tab ? 'text-white' : 'text-gray-600 dark:text-gray-400 bg-white dark:bg-gray-900 hover:bg-gray-50 dark:hover:bg-gray-800'}`}
													style={activeTab === tab ? { background: '#44814E' } : {}}
												>
													{tab === 'month' ? (isAr ? 'هذا الشهر' : 'This Month') : (isAr ? 'هذا العام' : 'This Year')}
												</button>
											))}
										</div>
									</div>
								</div>
								<MoneyFlowChart />
							</div>

							{/* Currency */}
							<div className='bg-white dark:bg-gray-900 rounded-2xl p-5 border border-gray-100 dark:border-gray-800 shadow-sm'>
								<h2 className='text-sm font-bold text-gray-800 dark:text-gray-100 mb-3'>{isAr ? 'العملات' : 'Currency'}</h2>
								<div className='flex flex-col gap-3'>
									{[
										{ flag: '🇺🇸', code: 'USD', amount: '56,476.00', label: 'USD', positive: true },
										{ flag: '🇪🇺', code: 'EUR', amount: '49,973.67', label: 'EUR', positive: false },
										{ flag: '🇬🇧', code: 'GBP', amount: '45,098.56', label: 'GBP', positive: true },
									].map(c => (
										<div key={c.code} className='flex items-center justify-between'>
											<div className='flex items-center gap-2'>
												<span className='text-2xl'>{c.flag}</span>
												<span className='text-sm font-semibold text-gray-800 dark:text-gray-200'>{c.code}</span>
											</div>
											<div className='flex items-center gap-1'>
												<span className='text-sm font-medium text-gray-900 dark:text-white'>{c.amount}</span>
												<span className='text-xs text-gray-400'>{c.label}</span>
												{c.positive
													? <TrendingUp className='w-3 h-3 text-green-500 ml-1' />
													: <TrendingDown className='w-3 h-3 text-red-400 ml-1' />
												}
											</div>
										</div>
									))}
								</div>
							</div>
						</div>
					</div>

				</div>
			</div>
		</div>
	);
};

export default WalletPage;
