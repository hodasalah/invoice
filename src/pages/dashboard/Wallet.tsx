import { db } from '@/firebaseConfigs/firebase';
import { useAppSelector } from '@/store/hooks';
import { collection, doc, getDoc, getDocs, setDoc } from 'firebase/firestore';
import {
	ArrowDownToLine,
	ArrowUpFromLine,
	FileText,
	MoreHorizontal,
	Plus,
	Send,
	Settings,
	ShoppingCart,
	TrendingDown,
	TrendingUp,
} from 'lucide-react';
import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';

const MoneyFlowChart = () => {
	const income = [ 4200, 5800, 5100, 7300, 6200, 8900, 7800, 10200, 9100, 11500, 10800, 13200 ];
	const expense = [ 3100, 4200, 3800, 5200, 4600, 6100, 5400, 7200, 6500, 8100, 7600, 9400 ];
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

const VisaCard = ({ theme, balance, number, expiry }: { theme: string; balance: string; number: string; expiry: string }) => {
	const isDark = theme === 'dark_blue';
	return (
		<div
			className='relative w-full overflow-hidden select-none cursor-default transition-transform hover:-translate-y-1 rounded-2xl'
			style={{
				aspectRatio: '1.8',
				background: isDark
					? 'linear-gradient(135deg,#1a1a2e 0%,#16213e 100%)'
					: 'linear-gradient(135deg,#44814E 0%,#2d5a35 100%)',
				boxShadow: isDark
					? '0 8px 32px rgba(0,0,0,0.4)'
					: '0 8px 32px rgba(68,129,78,0.45)',
			}}
		>
			<svg className='absolute inset-0 w-full h-full opacity-10' viewBox='0 0 320 180' preserveAspectRatio='xMidYMid slice'>
				<ellipse cx='280' cy='90' rx='160' ry='90' fill='none' stroke='white' strokeWidth='28' />
				<ellipse cx='280' cy='90' rx='110' ry='60' fill='none' stroke='white' strokeWidth='22' />
				<ellipse cx='280' cy='90' rx='62' ry='35' fill='none' stroke='white' strokeWidth='16' />
			</svg>

			<div className='absolute inset-0 flex flex-col justify-between p-[6%]'>
				<div className='flex justify-between items-start'>
					<svg viewBox='0 0 34 26' className='w-[10%] opacity-90'>
						<rect x='1' y='1' width='32' height='24' rx='3' fill='#d4a843' />
						<rect x='1' y='8' width='32' height='1.5' fill='#b8861e' />
						<rect x='1' y='16.5' width='32' height='1.5' fill='#b8861e' />
						<rect x='11' y='1' width='1.5' height='24' fill='#b8861e' />
						<rect x='21.5' y='1' width='1.5' height='24' fill='#b8861e' />
						<rect x='11' y='8' width='12' height='10' rx='1' fill='#c9952a' />
					</svg>
					<svg viewBox='0 0 60 20' className='w-[16%]'>
						<text x='0' y='15' fontSize='16' fontWeight='bold' fontStyle='italic' fill='white' fontFamily='serif'>VISA</text>
					</svg>
				</div>

				<div>
					<p className='text-white/60 font-medium' style={{ fontSize: 'clamp(8px, 1.8cqi, 11px)' }}>Current Balance</p>
					<p className='font-bold text-white leading-tight' style={{ fontSize: 'clamp(14px, 4cqi, 22px)' }}>{balance}</p>
				</div>

				<div className='flex justify-between items-end'>
					<p className='text-white/80 tracking-widest font-mono' style={{ fontSize: 'clamp(8px, 2.2cqi, 13px)' }}>{number}</p>
					<p className='text-white/70' style={{ fontSize: 'clamp(8px, 2cqi, 12px)' }}>{expiry}</p>
				</div>
			</div>
		</div>
	);
};

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

const SavingsGoal = ({ icon, label, amount, pct }: { icon: string; label: string; amount: string; pct: number }) => (
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

const QuickLink = ({ icon: Icon, label }: { icon: React.ElementType; label: string }) => (
	<button className='flex flex-col items-center gap-2 group'>
		<div className='w-12 h-12 rounded-xl border-2 flex items-center justify-center transition-all group-hover:scale-110 group-hover:shadow-md'
			style={{ borderColor: '#44814E', color: '#44814E' }}>
			<Icon className='w-5 h-5' />
		</div>
		<span className='text-xs text-gray-600 dark:text-gray-400 font-medium'>{label}</span>
	</button>
);

interface Card {
	card_id: string;
	type: string;
	card_number: string;
	balance: number;
	expiry_date: string;
	theme: string;
}

interface WalletData {
	total_balance: number;
	currency: string;
	last_updated: string;
	monthly_income: {
		amount: number;
		change_percentage: number;
	};
	monthly_expense: {
		amount: number;
		change_percentage: number;
	};
	monthly_savings: {
		amount: number;
		change_percentage: number;
	};
	total_savings: number;
	targets: Array<{
		target_id: string;
		title: string;
		current_amount: number;
		achieved_percentage: number;
	}>;
	currencies: Array<{
		code: string;
		value: number;
	}>;
}

const formatCurrency = (val: number, currencyCode = 'USD') => {
	return new Intl.NumberFormat('en-US', {
		style: 'currency',
		currency: currencyCode,
		minimumFractionDigits: 2,
		maximumFractionDigits: 2,
	}).format(val);
};

const getCurrencyMeta = (fullCode: string) => {
	const code = fullCode.split(' ').pop() || fullCode;
	let flag = '💵';
	if (code === 'USD') flag = '🇺🇸';
	else if (code === 'EUR') flag = '🇪🇺';
	else if (code === 'GBP') flag = '🇬🇧';
	return { flag, code };
};

const getTargetTranslation = (title: string, isAr: boolean) => {
	if (title === 'Married') return isAr ? 'متزوج' : 'Married';
	if (title === 'Home') return isAr ? 'المنزل' : 'Home';
	return title;
};

const getTargetIcon = (targetId: string) => {
	if (targetId === 'target_married') return '💍';
	if (targetId === 'target_home') return '🏠';
	return '💰';
};

const WalletPage = () => {
	const { i18n } = useTranslation();
	const isAr = i18n.language === 'ar';
	const [ activeTab, setActiveTab ] = useState<'month' | 'year'>('month');

	const currentUser = useAppSelector((state) => state.user.currentUser);
	const [ loading, setLoading ] = useState(true);
	const [ wallet, setWallet ] = useState<WalletData | null>(null);
	const [ cards, setCards ] = useState<Card[]>([]);

	useEffect(() => {
		if (!currentUser?.uid) return;

		const fetchWalletData = async () => {
			try {
				setLoading(true);
				const walletDocRef = doc(db, 'wallets', currentUser.uid);
				const walletSnap = await getDoc(walletDocRef);

				let walletData: WalletData;
				let cardsData: Card[] = [];

				if (!walletSnap.exists()) {
					walletData = {
						total_balance: 88232.00,
						currency: 'USD',
						last_updated: '11 April 2025',
						monthly_income: {
							amount: 18500.99,
							change_percentage: 2.5
						},
						monthly_expense: {
							amount: 11200.56,
							change_percentage: -8.0
						},
						monthly_savings: {
							amount: 6765.12,
							change_percentage: 8.5
						},
						total_savings: 58145.07,
						targets: [
							{
								target_id: 'target_married',
								title: 'Married',
								current_amount: 6560.11,
								achieved_percentage: 11
							},
							{
								target_id: 'target_home',
								title: 'Home',
								current_amount: 33159.15,
								achieved_percentage: 25
							}
						],
						currencies: [
							{ code: 'US USD', value: 56476.00 },
							{ code: 'EU EUR', value: 49973.67 },
							{ code: 'GB GBP', value: 45098.56 }
						]
					};

					cardsData = [
						{
							card_id: 'card_01',
							type: 'VISA',
							card_number: '5294 2436 4780 9568',
							balance: 14200.00,
							expiry_date: '12/26',
							theme: 'green'
						},
						{
							card_id: 'card_02',
							type: 'VISA',
							card_number: '6391 1827 3340 7712',
							balance: 8750.00,
							expiry_date: '09/27',
							theme: 'dark_blue'
						}
					];

					await setDoc(walletDocRef, walletData);
					for (const card of cardsData) {
						await setDoc(doc(db, 'wallets', currentUser.uid, 'cards', card.card_id), card);
					}
				} else {
					walletData = walletSnap.data() as WalletData;

					const cardsColRef = collection(db, 'wallets', currentUser.uid, 'cards');
					const cardsSnap = await getDocs(cardsColRef);
					cardsData = cardsSnap.docs.map(doc => doc.data() as Card);
				}

				setWallet(walletData);
				setCards(cardsData);
			} catch (error) {
				console.error('Error loading wallet data from Firestore:', error);
			} finally {
				setLoading(false);
			}
		};

		fetchWalletData();
	}, [ currentUser?.uid ]);

	if (!currentUser) {
		return (
			<div className='flex items-center justify-center min-h-screen bg-gray-50 dark:bg-gray-950' dir={isAr ? 'rtl' : 'ltr'}>
				<div className='bg-white dark:bg-gray-900 p-8 rounded-2xl shadow-md text-center max-w-sm border border-gray-100 dark:border-gray-800'>
					<p className='text-red-500 font-semibold mb-4'>
						{isAr ? 'الرجاء تسجيل الدخول أولاً.' : 'Please log in first.'}
					</p>
				</div>
			</div>
		);
	}

	if (loading || !wallet) {
		return (
			<div className='flex items-center justify-center min-h-screen bg-gray-50 dark:bg-gray-950' dir={isAr ? 'rtl' : 'ltr'}>
				<div className='flex flex-col items-center gap-4'>
					<div className='w-12 h-12 border-4 border-emerald-500 border-t-transparent rounded-full animate-spin'></div>
					<p className='text-gray-500 dark:text-gray-400 font-medium animate-pulse'>
						{isAr ? 'جاري تحميل المحفظة...' : 'Loading Wallet...'}
					</p>
				</div>
			</div>
		);
	}

	return (
		<div className='p-6 min-h-screen bg-gray-50 dark:bg-gray-950' dir={isAr ? 'rtl' : 'ltr'}>

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

				<div className='flex flex-col gap-5'>

					<div className='bg-white dark:bg-gray-900 rounded-2xl p-6 border border-gray-100 dark:border-gray-800 shadow-sm'>
						<p className='text-sm text-gray-500 font-medium mb-1'>{isAr ? 'الرصيد الإجمالي' : 'Total Balance'}</p>
						<div className='flex items-baseline gap-2 mb-1'>
							<span className='text-4xl font-extrabold text-gray-900 dark:text-white'>
								{formatCurrency(wallet.total_balance, wallet.currency)}
							</span>
							<span className='text-xs text-gray-400 font-semibold'>{wallet.currency}</span>
						</div>
						<div className='flex items-center gap-2 mb-4'>
							<span className='text-xs text-gray-400'>{wallet.last_updated}</span>
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

					<div className='bg-white dark:bg-gray-900 rounded-2xl p-5 border border-gray-100 dark:border-gray-800 shadow-sm flex flex-col gap-4'>
						<div className='flex justify-between items-center'>
							<h2 className='text-sm font-bold text-gray-800 dark:text-gray-100'>{isAr ? 'بطاقاتي' : 'My Cards'}</h2>
							<span className='text-xs text-gray-400'>{cards.length} {isAr ? 'بطاقات' : 'cards'}</span>
						</div>
						<div className='flex flex-col gap-3'>
							{cards.map((card) => (
								<VisaCard
									key={card.card_id}
									theme={card.theme}
									balance={formatCurrency(card.balance, 'USD')}
									number={card.card_number}
									expiry={card.expiry_date}
								/>
							))}
						</div>
						<button
							className='w-full py-2.5 rounded-xl text-white text-sm font-semibold transition-all hover:opacity-90 hover:shadow-lg active:scale-95 flex-shrink-0'
							style={{ background: 'linear-gradient(135deg,#44814E,#2d5a35)' }}
						>
							{isAr ? 'إدارة البطاقات' : 'Manage Card'}
						</button>
					</div>
				</div>

				<div className='lg:col-span-2 flex flex-col gap-5'>

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

					<div className='grid grid-cols-3 gap-4'>
						<StatCard
							label={isAr ? 'الدخل الشهري' : 'Monthly Income'}
							value={formatCurrency(wallet.monthly_income.amount, wallet.currency)}
							change={`${wallet.monthly_income.change_percentage}%`}
							positive={wallet.monthly_income.change_percentage >= 0}
						/>
						<StatCard
							label={isAr ? 'المصروف الشهري' : 'Monthly Expense'}
							value={formatCurrency(wallet.monthly_expense.amount, wallet.currency)}
							change={`${Math.abs(wallet.monthly_expense.change_percentage)}%`}
							positive={wallet.monthly_expense.change_percentage >= 0}
						/>
						<StatCard
							label={isAr ? 'المدخرات الشهرية' : 'Monthly Savings'}
							value={formatCurrency(wallet.monthly_savings.amount, wallet.currency)}
							change={`${wallet.monthly_savings.change_percentage}%`}
							positive={wallet.monthly_savings.change_percentage >= 0}
						/>
					</div>

					<div className='grid grid-cols-1 md:grid-cols-2 gap-4'>

						<div className='bg-white dark:bg-gray-900 rounded-2xl p-5 border border-gray-100 dark:border-gray-800 shadow-sm flex flex-col gap-4'>
							<div className='flex justify-between items-center'>
								<div>
									<p className='text-xs text-gray-500 font-medium'>{isAr ? 'المدخرات' : 'Savings'}</p>
									<div className='flex items-baseline gap-2'>
										<span className='text-xl font-bold text-gray-900 dark:text-white'>
											{formatCurrency(wallet.total_savings, wallet.currency)}
										</span>
										<span className='text-xs font-semibold text-green-600'>+2.5%</span>
									</div>
								</div>
								<button className='w-7 h-7 rounded-full border border-gray-200 dark:border-gray-700 flex items-center justify-center hover:bg-gray-50 dark:hover:bg-gray-800 transition'>
									<Plus className='w-4 h-4 text-gray-500' />
								</button>
							</div>
							{wallet.targets?.map((target) => (
								<SavingsGoal
									key={target.target_id}
									icon={getTargetIcon(target.target_id)}
									label={getTargetTranslation(target.title, isAr)}
									amount={formatCurrency(target.current_amount, wallet.currency)}
									pct={target.achieved_percentage}
								/>
							))}
						</div>

						<div className='flex flex-col gap-4'>

							<div className='bg-white dark:bg-gray-900 rounded-2xl p-5 border border-gray-100 dark:border-gray-800 shadow-sm flex-1'>
								<div className='flex justify-between items-center mb-3'>
									<span className='text-sm font-bold text-gray-800 dark:text-gray-100'>{isAr ? 'تدفق الأموال' : 'Money Flow'}</span>
									<div className='flex items-center gap-3'>
										<span className='flex items-center gap-1 text-xs text-gray-500'><span className='w-2 h-2 rounded-full inline-block' style={{ background: '#44814E' }} />{isAr ? 'دخل' : 'Income'}</span>
										<span className='flex items-center gap-1 text-xs text-gray-500'><span className='w-2 h-2 rounded-full bg-gray-400 inline-block' />{isAr ? 'مصروف' : 'Expenses'}</span>
										<div className='flex rounded-lg overflow-hidden border border-gray-200 dark:border-gray-700 text-xs'>
											{([ 'month', 'year' ] as const).map(tab => (
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

							<div className='bg-white dark:bg-gray-900 rounded-2xl p-5 border border-gray-100 dark:border-gray-800 shadow-sm'>
								<h2 className='text-sm font-bold text-gray-800 dark:text-gray-100 mb-3'>{isAr ? 'العملات' : 'Currency'}</h2>
								<div className='flex flex-col gap-3'>
									{wallet.currencies?.map(c => {
										const { flag, code } = getCurrencyMeta(c.code);
										const isPositive = code !== 'EUR';
										return (
											<div key={c.code} className='flex items-center justify-between'>
												<div className='flex items-center gap-2'>
													<span className='text-2xl'>{flag}</span>
													<span className='text-sm font-semibold text-gray-800 dark:text-gray-200'>{code}</span>
												</div>
												<div className='flex items-center gap-1'>
													<span className='text-sm font-medium text-gray-900 dark:text-white'>
														{new Intl.NumberFormat('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 }).format(c.value)}
													</span>
													<span className='text-xs text-gray-400'>{code}</span>
													{isPositive
														? <TrendingUp className='w-3 h-3 text-green-500 ml-1' />
														: <TrendingDown className='w-3 h-3 text-red-400 ml-1' />
													}
												</div>
											</div>
										);
									})}
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
