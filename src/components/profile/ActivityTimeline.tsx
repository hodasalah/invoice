import { motion } from 'framer-motion';
import { Clock, FileText, UserPlus, CreditCard } from 'lucide-react';

interface ActivityTimelineProps {
	recentInvoices: any[];
	recentPayments: any[];
	topClients: any[];
	t: (key: string) => string;
}

export default function ActivityTimeline({ recentInvoices, recentPayments, topClients, t }: ActivityTimelineProps) {
	// Let's create a unified list of recent activities, sorted by date.
	const activities: any[] = [];

	recentInvoices.forEach(inv => {
		activities.push({
			id: inv.id,
			type: 'invoice',
			date: new Date(inv.createdAt || inv.date),
			title: t('profilePage.activityInvoiceCreated'),
			desc: `${inv.invoiceNumber} - ${inv.clientName} - $${inv.total}`,
			icon: <FileText className='w-4 h-4 text-sky-500' />,
			bgColor: 'bg-sky-500/10'
		});
	});

	recentPayments.forEach(pay => {
		activities.push({
			id: pay.id,
			type: 'payment',
			date: new Date(pay.date),
			title: t('profilePage.activityPaymentReceived'),
			desc: `${pay.method} - $${pay.amount}`,
			icon: <CreditCard className='w-4 h-4 text-emerald-500' />,
			bgColor: 'bg-emerald-500/10'
		});
	});

	topClients.slice(0, 3).forEach((client, i) => {
		activities.push({
			id: `client-${i}`,
			type: 'client',
			date: new Date(Date.now() - i * 86400000), // fake dates for now
			title: t('profilePage.activityTopClient'),
			desc: `${client.name} - $${client.total}`,
			icon: <UserPlus className='w-4 h-4 text-violet-500' />,
			bgColor: 'bg-violet-500/10'
		});
	});

	activities.sort((a, b) => b.date.getTime() - a.date.getTime());

	const topActivities = activities.slice(0, 5);

	const fmtTime = (d: Date) => d.toLocaleDateString('en-GB', { month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit' });

	return (
		<motion.div
			initial={{ opacity: 0, y: 16 }}
			animate={{ opacity: 1, y: 0 }}
			transition={{ duration: 0.4, delay: 0.3 }}
			className='col-span-1 lg:col-span-2 rounded-2xl border border-gray-200/80 dark:border-gray-700/50 bg-white dark:bg-gray-900/80 backdrop-blur-sm p-6'
		>
			<div className='flex items-center gap-2 mb-6'>
				<Clock className='w-5 h-5 text-gray-500 dark:text-gray-400' />
				<h3 className='font-semibold text-gray-900 dark:text-white text-base'>
					{t('profilePage.recentActivity')}
				</h3>
			</div>

			<div className='space-y-6 relative before:absolute before:inset-0 before:ml-5 before:-translate-x-px md:before:mx-auto md:before:translate-x-0 before:h-full before:w-0.5 before:bg-gradient-to-b before:from-transparent before:via-gray-200 dark:before:via-gray-700 before:to-transparent'>
				{topActivities.length > 0 ? topActivities.map((act, i) => (
					<motion.div 
						key={act.id}
						initial={{ opacity: 0, x: -10 }}
						animate={{ opacity: 1, x: 0 }}
						transition={{ duration: 0.3, delay: 0.4 + i * 0.1 }}
						className='relative flex items-center justify-between md:justify-normal md:odd:flex-row-reverse group is-active'
					>
						<div className='flex items-center justify-center w-10 h-10 rounded-full border-4 border-white dark:border-gray-900 bg-gray-100 dark:bg-gray-800 text-gray-500 dark:text-gray-400 shadow shrink-0 md:order-1 md:group-odd:-translate-x-1/2 md:group-even:translate-x-1/2'>
							<div className={`flex items-center justify-center w-full h-full rounded-full ${act.bgColor}`}>
								{act.icon}
							</div>
						</div>
						
						<div className='w-[calc(100%-4rem)] md:w-[calc(50%-2.5rem)] p-4 rounded-xl border border-gray-100 dark:border-gray-800 bg-gray-50 dark:bg-gray-800/50 shadow-sm'>
							<div className='flex items-center justify-between mb-1'>
								<h4 className='font-semibold text-sm text-gray-900 dark:text-white'>{act.title}</h4>
								<time className='text-xs font-medium text-gray-400 dark:text-gray-500'>{fmtTime(act.date)}</time>
							</div>
							<p className='text-xs text-gray-600 dark:text-gray-400'>{act.desc}</p>
						</div>
					</motion.div>
				)) : (
					<div className='text-center py-8 text-sm text-gray-500'>
						{t('profilePage.noActivity')}
					</div>
				)}
			</div>
		</motion.div>
	);
}
