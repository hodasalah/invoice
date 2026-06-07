import { db } from '@/firebaseConfigs/firebase';
import { useAppSelector } from '@/store/hooks';
import { collection, doc, onSnapshot, query, where } from 'firebase/firestore';
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
import { useEffect, useState, type ElementType } from 'react';
import { useTranslation } from 'react-i18next';

const MoneyFlowChart = ({ income, expense }: { income: number[]; expense: number[] }) => {
	const w = 400, h = 120;
	const max = Math.max(...income, ...expense, 1);
	const toPath = (arr: number[]) =>
		arr
			.map((v, i) => {
				const x = arr.length === 1 ? w : (i / (arr.length - 1)) * w;
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
			className='relative w-full max-w-[320px] overflow-hidden select-none cursor-default transition-transform hover:-translate-y-1 rounded-2xl'
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

const QuickLink = ({ icon: Icon, label }: { icon: ElementType; label: string }) => (
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

interface InvoiceRecord {
	id: string;
	date?: string;
	total?: number;
	status?: 'paid' | 'unpaid' | 'overdue';
	currency?: string;
}

interface PaymentRecord {
	id: string;
	amount?: number;
	date?: string;
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
	else if (code === 'SAR') flag = '🇸🇦';
	return { flag, code };
};

const getTargetTranslation = (title: string, isAr: boolean) => {
	if (title.toLowerCase().includes('married')) return isAr ? 'صندوق الزواج' : title;
	if (title.toLowerCase().includes('home') || title.toLowerCase().includes('hq')) return isAr ? 'صندوق المقر' : title;
	return title;
};

const getTargetIcon = (targetId: string) => {
	if (targetId === 'target_married') return '💍';
	if (targetId === 'target_home') return '🏠';
	return '💰';
};

const toNumber = (value?: number) => Number(value || 0);

const getInvoiceDate = (invoice: InvoiceRecord) => {
	const parsed = invoice.date ? new Date(invoice.date) : null;
	return parsed && !Number.isNaN(parsed.getTime()) ? parsed : null;
};

const isSameMonth = (date: Date, baseDate: Date) =>
	date.getFullYear() === baseDate.getFullYear() && date.getMonth() === baseDate.getMonth();

const sumPayments = (payments: PaymentRecord[]) =>
	payments.reduce((sum, payment) => sum + toNumber(payment.amount), 0);

const sumInvoicesByStatus = (invoices: InvoiceRecord[], statuses: Array<InvoiceRecord['status']>) =>
	invoices
		.filter((invoice) => statuses.includes(invoice.status))
		.reduce((sum, invoice) => sum + toNumber(invoice.total), 0);

const getMonthlySeries = (invoices: InvoiceRecord[], activeTab: 'month' | 'year') => {
	const periods = activeTab === 'year' ? 12 : 6;
	const now = new Date();
	const income = Array(periods).fill(0);
	const expense = Array(periods).fill(0);

	invoices.forEach((invoice) => {
		const date = getInvoiceDate(invoice);
		if (!date) return;

		const index = activeTab === 'year'
			? date.getMonth()
			: Math.floor((now.getTime() - date.getTime()) / (1000 * 60 * 60 * 24 * 7));

		if (index < 0 || index >= periods) return;
		const targetIndex = activeTab === 'year' ? index : periods - 1 - index;
		const total = toNumber(invoice.total);

		if (invoice.status === 'paid') {
			income[targetIndex] += total;
		} else if (invoice.status === 'unpaid' || invoice.status === 'overdue') {
			expense[targetIndex] += total;
		}
	});

	return { income, expense };
};

const buildCurrencyBalances = (baseCurrencies: WalletData['currencies'] = [], totalBalance: number) => {
	if (baseCurrencies.length) {
		return baseCurrencies.map((currency) => {
			const { code } = getCurrencyMeta(currency.code);
			if (code === 'USD') return { ...currency, value: totalBalance };
			if (code === 'EUR') return { ...currency, value: Math.round(totalBalance * 0.92) };
			if (code === 'SAR') return { ...currency, value: Math.round(totalBalance * 3.75) };
			return currency;
		});
	}

	return [
		{ code: 'USD', value: totalBalance },
		{ code: 'EUR', value: Math.round(totalBalance * 0.92) },
		{ code: 'SAR', value: Math.round(totalBalance * 3.75) },
	];
};

const WalletPage = () => {
	const { i18n } = useTranslation();
	const isAr = i18n.language === 'ar';
	const [ activeTab, setActiveTab ] = useState<'month' | 'year'>('month');

	const currentUser = useAppSelector((state) => state.user.currentUser);
	const [ loading, setLoading ] = useState(true);
	const [ wallet, setWallet ] = useState<WalletData | null>(null);
	const [ cards, setCards ] = useState<Card[]>([]);
	const [ invoices, setInvoices ] = useState<InvoiceRecord[]>([]);
	const [ payments, setPayments ] = useState<PaymentRecord[]>([]);

	useEffect(() => {
		if (!currentUser?.uid) {
			setLoading(false);
			return;
		}

		setLoading(true);

		let walletReady = false;
		let cardsReady = false;
		let invoicesReady = false;
		let paymentsReady = false;
		const finishWhenReady = () => {
			if (walletReady && cardsReady && invoicesReady && paymentsReady) {
				setLoading(false);
			}
		};

		const unsubscribeWallet = onSnapshot(
			doc(db, 'wallets', currentUser.uid),
			(snapshot) => {
				setWallet(snapshot.exists() ? snapshot.data() as WalletData : null);
				walletReady = true;
				finishWhenReady();
			},
			(error) => {
				console.error('Error loading wallet:', error);
				walletReady = true;
				finishWhenReady();
			}
		);

		const unsubscribeCards = onSnapshot(
			collection(db, 'wallets', currentUser.uid, 'cards'),
			(snapshot) => {
				setCards(snapshot.docs.map((cardDoc) => cardDoc.data() as Card));
				cardsReady = true;
				finishWhenReady();
			},
			(error) => {
				console.error('Error loading cards:', error);
				cardsReady = true;
				finishWhenReady();
			}
		);

		const unsubscribeInvoices = onSnapshot(
			query(collection(db, 'invoices'), where('userId', '==', currentUser.uid)),
			(snapshot) => {
				setInvoices(snapshot.docs.map((invoiceDoc) => ({
					id: invoiceDoc.id,
					...invoiceDoc.data(),
				}) as InvoiceRecord));
				invoicesReady = true;
				finishWhenReady();
			},
			(error) => {
				console.error('Error loading wallet invoices:', error);
				invoicesReady = true;
				finishWhenReady();
			}
		);

		const unsubscribePayments = onSnapshot(
			query(collection(db, 'payments'), where('userId', '==', currentUser.uid)),
			(snapshot) => {
				setPayments(snapshot.docs.map((paymentDoc) => ({
					id: paymentDoc.id,
					...paymentDoc.data(),
				}) as PaymentRecord));
				paymentsReady = true;
				finishWhenReady();
			},
			(error) => {
				console.error('Error loading wallet payments:', error);
				paymentsReady = true;
				finishWhenReady();
			}
		);

		return () => {
			unsubscribeWallet();
			unsubscribeCards();
			unsubscribeInvoices();
			unsubscribePayments();
		};
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

	if (loading) {
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

	const currency = wallet?.currency || invoices[0]?.currency || 'USD';
	const now = new Date();
	const monthlyInvoices = invoices.filter((invoice) => {
		const date = getInvoiceDate(invoice);
		return date ? isSameMonth(date, now) : false;
	});
	const totalBalance = payments.length ? sumPayments(payments) : sumInvoicesByStatus(invoices, [ 'paid' ]);
	const monthlyIncome = sumInvoicesByStatus(monthlyInvoices, [ 'paid' ]);
	const monthlyExpense = sumInvoicesByStatus(monthlyInvoices, [ 'unpaid', 'overdue' ]);
	const monthlySavings = Math.max(monthlyIncome - monthlyExpense, 0);
	const totalSavings = wallet?.total_savings ?? Math.max(Math.round(totalBalance * 1.2), 0);
	const currencies = buildCurrencyBalances(wallet?.currencies, totalBalance);
	const moneyFlow = getMonthlySeries(invoices, activeTab);
	const lastUpdated = wallet?.last_updated || new Intl.DateTimeFormat('en-US', {
		day: 'numeric',
		month: 'long',
		year: 'numeric',
	}).format(new Date());
	const balanceChange = wallet?.monthly_income?.change_percentage ?? 0;

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
								{formatCurrency(totalBalance, currency)}
							</span>
							<span className='text-xs text-gray-400 font-semibold'>{currency}</span>
						</div>
						<div className='flex items-center gap-2 mb-4'>
							<span className='text-xs text-gray-400'>{lastUpdated}</span>
							<span className='flex items-center gap-0.5 text-xs font-semibold text-green-600'>
								<TrendingUp className='w-3 h-3' /> {balanceChange}%
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
						<div className='flex flex-col items-center gap-3'>
							{cards.map((card) => (
								<VisaCard
									key={card.card_id}
									theme={card.theme}
									balance={formatCurrency(card.balance, currency)}
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
							value={formatCurrency(monthlyIncome, currency)}
							change={`${wallet?.monthly_income?.change_percentage ?? 0}%`}
							positive={(wallet?.monthly_income?.change_percentage ?? 0) >= 0}
						/>
						<StatCard
							label={isAr ? 'المصروف الشهري' : 'Monthly Expense'}
							value={formatCurrency(monthlyExpense, currency)}
							change={`${Math.abs(wallet?.monthly_expense?.change_percentage ?? 0)}%`}
							positive={(wallet?.monthly_expense?.change_percentage ?? 0) >= 0}
						/>
						<StatCard
							label={isAr ? 'المدخرات الشهرية' : 'Monthly Savings'}
							value={formatCurrency(monthlySavings, currency)}
							change={`${wallet?.monthly_savings?.change_percentage ?? 0}%`}
							positive={(wallet?.monthly_savings?.change_percentage ?? 0) >= 0}
						/>
					</div>

					<div className='grid grid-cols-1 md:grid-cols-2 gap-4'>

						<div className='bg-white dark:bg-gray-900 rounded-2xl p-5 border border-gray-100 dark:border-gray-800 shadow-sm flex flex-col gap-4'>
							<div className='flex justify-between items-center'>
								<div>
									<p className='text-xs text-gray-500 font-medium'>{isAr ? 'المدخرات' : 'Savings'}</p>
									<div className='flex items-baseline gap-2'>
										<span className='text-xl font-bold text-gray-900 dark:text-white'>
											{formatCurrency(totalSavings, currency)}
										</span>
										<span className='text-xs font-semibold text-green-600'>+2.5%</span>
									</div>
								</div>
								<button className='w-7 h-7 rounded-full border border-gray-200 dark:border-gray-700 flex items-center justify-center hover:bg-gray-50 dark:hover:bg-gray-800 transition'>
									<Plus className='w-4 h-4 text-gray-500' />
								</button>
							</div>
							{wallet?.targets?.map((target) => (
								<SavingsGoal
									key={target.target_id}
									icon={getTargetIcon(target.target_id)}
									label={getTargetTranslation(target.title, isAr)}
									amount={formatCurrency(target.current_amount, currency)}
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
								<MoneyFlowChart income={moneyFlow.income} expense={moneyFlow.expense} />
							</div>

							<div className='bg-white dark:bg-gray-900 rounded-2xl p-5 border border-gray-100 dark:border-gray-800 shadow-sm'>
								<h2 className='text-sm font-bold text-gray-800 dark:text-gray-100 mb-3'>{isAr ? 'العملات' : 'Currency'}</h2>
								<div className='flex flex-col gap-3'>
									{currencies.map(c => {
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
