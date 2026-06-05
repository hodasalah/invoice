import { motion } from 'framer-motion';
import { DollarSign, Users, FileText, CreditCard, TrendingUp, TrendingDown } from 'lucide-react';

interface ProfileStatsProps {
	revenue: number;
	outstanding: number;
	totalClients: number;
	totalInvoices: number;
	paidInvoices: number;
	unpaidInvoices: number;
	payments: number;
	collectionRate: number;
	t: (key: string) => string;
}

interface KPICardProps {
	icon: React.ReactNode;
	label: string;
	value: string;
	sub?: string;
	trend?: 'up' | 'down' | 'neutral';
	color: string;
	delay: number;
}

const KPICard = ({ icon, label, value, sub, trend, color, delay }: KPICardProps) => (
	<motion.div
		initial={{ opacity: 0, y: 16 }}
		animate={{ opacity: 1, y: 0 }}
		transition={{ duration: 0.4, delay }}
		className='group relative rounded-2xl border border-gray-200/80 dark:border-gray-700/50 bg-white dark:bg-gray-900/80 backdrop-blur-sm p-5 overflow-hidden hover:shadow-lg hover:border-gray-300 dark:hover:border-gray-600 transition-all duration-300'
	>
		{/* Background glow */}
		<div className={`absolute top-0 end-0 w-24 h-24 ${color} rounded-full blur-3xl opacity-20 group-hover:opacity-30 transition-opacity`} />

		<div className='relative flex items-start justify-between'>
			<div className='flex-1'>
				<p className='text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider mb-2'>
					{label}
				</p>
				<p className='text-2xl font-bold text-gray-900 dark:text-white tracking-tight'>
					{value}
				</p>
				{sub && (
					<div className='flex items-center gap-1 mt-1.5'>
						{trend === 'up' && <TrendingUp className='w-3 h-3 text-emerald-500' />}
						{trend === 'down' && <TrendingDown className='w-3 h-3 text-rose-500' />}
						<span className={`text-xs font-medium ${trend === 'up' ? 'text-emerald-500' : trend === 'down' ? 'text-rose-500' : 'text-gray-400 dark:text-gray-500'}`}>
							{sub}
						</span>
					</div>
				)}
			</div>
			<div className={`flex items-center justify-center w-11 h-11 rounded-xl ${color} bg-opacity-10 dark:bg-opacity-20`}>
				{icon}
			</div>
		</div>
	</motion.div>
);

const fmtCurrency = (v: number) => {
	if (v >= 1_000_000) return `$${(v / 1_000_000).toFixed(1)}M`;
	if (v >= 1_000) return `$${(v / 1_000).toFixed(1)}K`;
	return `$${v.toFixed(0)}`;
};

export default function ProfileStats({
	revenue, outstanding, totalClients, totalInvoices,
	paidInvoices, unpaidInvoices, payments, collectionRate, t,
}: ProfileStatsProps) {
	return (
		<div className='grid grid-cols-2 lg:grid-cols-4 gap-4'>
			<KPICard
				icon={<DollarSign className='w-5 h-5 text-emerald-600 dark:text-emerald-400' />}
				label={t('profilePage.revenue')}
				value={fmtCurrency(revenue)}
				sub={`${collectionRate.toFixed(0)}% ${t('profilePage.collected')}`}
				trend='up'
				color='bg-emerald-500'
				delay={0}
			/>
			<KPICard
				icon={<CreditCard className='w-5 h-5 text-amber-600 dark:text-amber-400' />}
				label={t('profilePage.outstanding')}
				value={fmtCurrency(outstanding)}
				sub={`${unpaidInvoices} ${t('profilePage.unpaidInvoices')}`}
				trend='down'
				color='bg-amber-500'
				delay={0.05}
			/>
			<KPICard
				icon={<Users className='w-5 h-5 text-violet-600 dark:text-violet-400' />}
				label={t('profilePage.totalClients')}
				value={String(totalClients)}
				sub={`${payments} ${t('profilePage.totalPayments')}`}
				trend='neutral'
				color='bg-violet-500'
				delay={0.1}
			/>
			<KPICard
				icon={<FileText className='w-5 h-5 text-sky-600 dark:text-sky-400' />}
				label={t('profilePage.totalInvoices')}
				value={String(totalInvoices)}
				sub={`${paidInvoices} ${t('profilePage.paidLabel')}`}
				trend='up'
				color='bg-sky-500'
				delay={0.15}
			/>
		</div>
	);
}
