import { useDashboardData } from '@/hooks/useDashboardData';
import { useAppSelector } from '@/store/hooks';
import { useTranslation } from 'react-i18next';

import StatsCards from '@/components/dashboard/home/StatsCards';
import BestClientCard from '@/components/dashboard/home/BestClientCard';
import InvoiceStatusChart from '@/components/dashboard/home/InvoiceStatusChart';
import LatestInvoices from '@/components/dashboard/home/LatestInvoices';
import QuickActions from '@/components/dashboard/home/QuickActions';
import RecentPayments from '@/components/dashboard/home/RecentPayments';
import RevenueChart from '@/components/dashboard/home/RevenueChart';
import SmartInsights from '@/components/dashboard/home/SmartInsights';
import TopClients from '@/components/dashboard/home/TopClients';
import WelcomeEmptyState from '@/components/dashboard/home/WelcomeEmptyState';
import { motion } from 'framer-motion';

export default function HomePage() {
	const currentUser = useAppSelector(
		(state) => state.user.currentUser
	);

	const {
		loading,
		stats,
		revenueChart,
		invoiceStatus,
		recentInvoices,
		recentPayments,
		topClients,
		bestClient,

	} = useDashboardData(
		currentUser?.uid
	);
	const { t } = useTranslation("common");

	const hasClients = stats.clients > 0;
	const hasInvoices = stats.invoices > 0;

	// Show onboarding until BOTH a client AND an invoice have been created
	const isNewUser = !loading && !(hasClients && hasInvoices);

	if (loading) {
		return (
			<div className="flex flex-col items-center justify-center py-32 gap-4">
				<motion.div
					animate={{ rotate: 360 }}
					transition={{ duration: 1.2, repeat: Infinity, ease: 'linear' }}
					className="h-10 w-10 rounded-full border-4 border-primary border-t-transparent"
				/>
				<p className="text-sm text-gray-400 dark:text-slate-500">
					{t('dashboard.loading')}
				</p>
			</div>
		);
	}

	if (isNewUser) {
		return (
			<WelcomeEmptyState
				hasClients={hasClients}
				hasInvoices={hasInvoices}
			/>
		);
	}

	return (
		<div className="space-y-6">

			<div>
				<h1 className="text-3xl font-bold">
					{t('dashboard.title')}
				</h1>

				<p className="text-slate-500 mt-1">
					{t('dashboard.welcome')}
				</p>
			</div>

			<StatsCards stats={stats} />
			<div className="grid gap-6 lg:grid-cols-3">

				<div className="lg:col-span-2">
					<RevenueChart
						data={revenueChart}
					/>
				</div>

				<InvoiceStatusChart
					paid={invoiceStatus.paid}
					unpaid={invoiceStatus.unpaid}
				/>

			</div>
			<div className="grid gap-6 lg:grid-cols-3">

				<div className="lg:col-span-2">
					<LatestInvoices
						invoices={recentInvoices}
					/>
				</div>

				<RecentPayments
					payments={recentPayments}
				/>

			</div>

			<div className="grid gap-6 lg:grid-cols-3 ">

				<TopClients
					clients={topClients}
				/>

				<div className="lg:col-span-2">
					<BestClientCard
						client={bestClient}
					/>
				</div>

			</div>
			<div className="grid gap-6 lg:grid-cols-2">
				<SmartInsights
					revenue={stats.revenue}
					outstanding={stats.outstanding}
					collectionRate={stats.collectionRate}
					bestClient={bestClient}
				/>

				<QuickActions />
			</div>
		</div>
	);
}