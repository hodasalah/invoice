import { auth, db } from '@/firebaseConfigs/firebase';
import { collection, onSnapshot, query, where,writeBatch,deleteDoc,doc, updateDoc } from 'firebase/firestore';
import {
	AlertTriangle,
	Bell,
	Check,
	CheckCircle2,
	Clock,
	Search,
	SlidersHorizontal,
	Trash2,
} from 'lucide-react';
import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';

interface Notification {
	id: string;
	invoiceId: string;
	invoiceNumber: string;
	clientName: string;
	companyName: string;
	amount: number;
	currency: string;
	type: 'paid' | 'unpaid' | 'overdue';
	titleEn: string;
	titleAr: string;
	isRead: boolean;
	createdAt: string;
}

export default function NotificationPage() {
	const { t, i18n } = useTranslation('common');
	const isRTL =
		i18n.language === 'ar' || document.documentElement.dir === 'rtl';

	const [notifications, setNotifications] = useState<Notification[]>([]);
	const [activeFilter, setActiveFilter] = useState<
		'all' | 'unread' | 'overdue'
	>('all');
	const [searchQuery, setSearchQuery] = useState<string>('');
	const [loading, setLoading] = useState(true);

	// جلب الإشعارات من Firestore مباشرة
	useEffect(() => {
		const currentUser = auth.currentUser;
		if (!currentUser) {
			setLoading(false);
			return;
		}

		// استعلام لجلب إشعارات المستخدم الحالي فقط
		const notificationsQuery = query(
			collection(db, 'notifications'),
			where('userId', '==', currentUser.uid),
		);

		// الاستماع للتغييرات في الوقت الفعلي
		const unsubscribe = onSnapshot(
			notificationsQuery,
			(snapshot) => {
				const notificationsData: Notification[] = [];
				snapshot.forEach((doc) => {
					notificationsData.push({
						id: doc.id,
						...doc.data(),
					} as Notification);
				});

				// ترتيب الإشعارات من الأحدث إلى الأقدم
				notificationsData.sort(
					(a, b) =>
						new Date(b.createdAt).getTime() -
						new Date(a.createdAt).getTime(),
				);

				setNotifications(notificationsData);
				setLoading(false);
			},
			(error) => {
				console.error('Error fetching notifications:', error);
				setLoading(false);
			},
		);

		return () => unsubscribe();
	}, []);

	// تحديث حالة القراءة في Firestore
	const handleToggleReadStatus = async (
		id: string,
		currentStatus: boolean,
	) => {
		try {
			const notificationRef = doc(db, 'notifications', id);
			await updateDoc(notificationRef, {
				isRead: !currentStatus,
			});
		} catch (error) {
			console.error('Error updating notification:', error);
		}
	};

	// حذف إشعار من Firestore
	const handleDeleteNotification = async (id: string) => {
		try {
			const notificationRef = doc(db, 'notifications', id);
			await deleteDoc(notificationRef);
		} catch (error) {
			console.error('Error deleting notification:', error);
		}
	};

	// تعيين الكل كمقروء
	const handleMarkAllAsRead = async () => {
		const batch = writeBatch(db);
		const unreadNotifications = notifications.filter((n) => !n.isRead);

		unreadNotifications.forEach((notification) => {
			const notificationRef = doc(db, 'notifications', notification.id);
			batch.update(notificationRef, { isRead: true });
		});

		try {
			await batch.commit();
		} catch (error) {
			console.error('Error marking all as read:', error);
		}
	};

	// فلترة الإشعارات
	const filteredNotifications = notifications.filter((n) => {
		const matchesFilter =
			activeFilter === 'all'
				? true
				: activeFilter === 'unread'
					? !n.isRead
					: activeFilter === 'overdue'
						? n.type === 'overdue'
						: true;

		const matchesSearch =
			n.clientName.toLowerCase().includes(searchQuery.toLowerCase()) ||
			n.companyName.toLowerCase().includes(searchQuery.toLowerCase()) ||
			n.invoiceNumber.toLowerCase().includes(searchQuery.toLowerCase());

		return matchesFilter && matchesSearch;
	});

	const unreadCount = notifications.filter((n) => !n.isRead).length;

	// عرض التحميل
	if (loading) {
		return (
			<div className='min-h-screen bg-[var(--color-bg)] flex items-center justify-center'>
				<div className='text-center'>
					<div className='animate-spin rounded-full h-12 w-12 border-b-2 border-[var(--color-primary)] mx-auto'></div>
					<p className='mt-4 text-[var(--color-text)]'>
						جاري تحميل الإشعارات...
					</p>
				</div>
			</div>
		);
	}

	return (
		<div className='min-h-screen bg-gray-50 dark:bg-gray-900 p-4 sm:p-8 lg:p-12'>
			<div className='max-w-5xl mx-auto space-y-8'>
				{/* Header */}
				<div className='flex flex-wrap items-center justify-between gap-4 p-5 rounded-2xl bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 shadow-sm'>
					<div className='flex items-center gap-3'>
						<div className='p-3 bg-gradient-to-r from-green-600 to-green-700 text-white rounded-xl shadow-md'>
							<Bell className='h-6 w-6' />
						</div>
						<div>
							<div className='flex items-center gap-2'>
								<h1 className='text-xl sm:text-2xl font-bold tracking-tight text-gray-900 dark:text-white'>
									{t('dashboard.activity')}
								</h1>
								{unreadCount > 0 && (
									<span className='px-2.5 py-0.5 rounded-full text-xs font-bold bg-red-500 text-white shadow-sm'>
										{unreadCount}
									</span>
								)}
							</div>
							<p className='text-sm text-gray-500 dark:text-gray-400 mt-0.5'>
								{t('profilePage.subtitle')}
							</p>
						</div>
					</div>

					{unreadCount > 0 && (
						<button
							onClick={handleMarkAllAsRead}
							className='px-4 py-2 text-xs font-bold text-white bg-green-600 hover:bg-green-700 rounded-xl shadow-sm flex items-center gap-1.5 transition-colors'
						>
							<Check className='h-3.5 w-3.5' />
							<span>
								{isRTL
									? 'تعيين الكل كمقروء'
									: 'Mark all as read'}
							</span>
						</button>
					)}
				</div>

				{/* Filter and Search */}
				<div className='grid grid-cols-1 sm:grid-cols-12 gap-4 items-center'>
					<div className='sm:col-span-7 relative'>
						<Search
							className={`absolute top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400 dark:text-gray-500 ${isRTL ? 'right-4' : 'left-4'}`}
						/>
						<input
							type='text'
							placeholder={
								isRTL
									? 'بحث برقم الفاتورة أو العميل...'
									: 'Search by invoice or client...'
							}
							value={searchQuery}
							onChange={(e) => setSearchQuery(e.target.value)}
							className={`w-full py-2.5 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl text-sm text-gray-900 dark:text-white placeholder:text-gray-400 dark:placeholder:text-gray-500 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all ${isRTL ? 'pr-11 pl-4' : 'pl-11 pr-4'}`}
						/>
					</div>

					<div className='sm:col-span-5 flex p-1 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl gap-1'>
						{(['all', 'unread', 'overdue'] as const).map(
							(filter) => {
								const isActive = activeFilter === filter;
								return (
									<button
										key={filter}
										onClick={() => setActiveFilter(filter)}
										className={`flex-1 text-center py-2 text-xs font-semibold rounded-lg transition-all capitalize ${
											isActive
												? 'bg-green-600 text-white shadow-sm'
												: 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700'
										}`}
									>
										{filter === 'all' &&
											(isRTL ? 'الكل' : 'All')}
										{filter === 'unread' &&
											(isRTL ? 'غير مقروء' : 'Unread')}
										{filter === 'overdue' &&
											(isRTL ? 'متأخرة' : 'Overdue')}
									</button>
								);
							},
						)}
					</div>
				</div>

				{/* Notifications List */}
				<div className='bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-2xl shadow-sm overflow-hidden'>
					{filteredNotifications.length === 0 ? (
						<div className='flex flex-col items-center justify-center py-20 px-4 text-center space-y-4'>
							<div className='p-4 bg-gray-50 dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-full'>
								<SlidersHorizontal className='h-8 w-8 text-green-600 dark:text-green-500' />
							</div>
							<div>
								<h3 className='text-md font-bold text-gray-900 dark:text-white'>
									{searchQuery || activeFilter !== 'all'
										? isRTL
											? 'لا توجد نتائج للمعايير المحددة'
											: 'No results found'
										: t('dashboard.noData')}
								</h3>
								<p className='text-sm text-gray-500 dark:text-gray-400 mt-1'>
									{searchQuery || activeFilter !== 'all'
										? isRTL
											? 'جرب تغيير الفلتر أو البحث'
											: 'Try changing the filter or search'
										: isRTL
											? 'قم بتوليد بيانات جديدة من صفحة Seed Database'
											: 'Generate new data from Seed Database page'}
								</p>
							</div>
						</div>
					) : (
						<div className='divide-y divide-gray-200 dark:divide-gray-700'>
							{filteredNotifications.map((notification) => {
								const isPaid = notification.type === 'paid';
								const isOverdue =
									notification.type === 'overdue';
								const title = isRTL
									? notification.titleAr
									: notification.titleEn;

								return (
									<div
										key={notification.id}
										className={`flex items-start p-5 gap-4 transition-all relative group ${
											!notification.isRead
												? 'bg-gradient-to-r from-green-50 dark:from-green-950/30 to-transparent'
												: 'hover:bg-gray-50 dark:hover:bg-gray-900/50'
										}`}
									>
										{!notification.isRead && (
											<div
												className={`absolute top-0 bottom-0 w-1 bg-green-600 dark:bg-green-500 ${isRTL ? 'right-0' : 'left-0'}`}
											/>
										)}

										{/* Status Icon */}
										<div
											className={`p-2.5 rounded-xl border shrink-0 ${
												isPaid
													? 'bg-emerald-50 dark:bg-emerald-950/50 border-emerald-200 dark:border-emerald-800 text-emerald-600 dark:text-emerald-400'
													: isOverdue
														? 'bg-red-50 dark:bg-red-950/50 border-red-200 dark:border-red-800 text-red-600 dark:text-red-400'
														: 'bg-amber-50 dark:bg-amber-950/50 border-amber-200 dark:border-amber-800 text-amber-600 dark:text-amber-400'
											}`}
										>
											{isPaid ? (
												<CheckCircle2 className='h-5 w-5' />
											) : isOverdue ? (
												<AlertTriangle className='h-5 w-5' />
											) : (
												<Clock className='h-5 w-5' />
											)}
										</div>

										{/* Content */}
										<div className='flex-1 min-w-0 space-y-1.5'>
											<div className='flex flex-wrap items-baseline justify-between gap-x-2 gap-y-1'>
												<h4
													className={`text-sm tracking-tight ${
														!notification.isRead
															? 'font-bold text-gray-900 dark:text-white'
															: 'text-gray-700 dark:text-gray-300'
													}`}
												>
													{title}
												</h4>
												<span className='text-xs font-bold px-2 py-0.5 rounded bg-gray-100 dark:bg-gray-900 border border-gray-200 dark:border-gray-700 text-gray-900 dark:text-white'>
													{notification.amount.toLocaleString(
														isRTL
															? 'ar-SA'
															: 'en-US',
														{
															minimumFractionDigits: 2,
														},
													)}{' '}
													{notification.currency}
												</span>
											</div>

											<div className='text-xs space-y-1'>
												<div className='flex flex-wrap gap-x-3 gap-y-1'>
													<span className='text-gray-600 dark:text-gray-400'>
														<span className='font-semibold text-gray-900 dark:text-white'>
															{isRTL
																? 'رقم الفاتورة'
																: 'Invoice Number'}
															:
														</span>{' '}
														<span className='font-mono text-gray-900 dark:text-white'>
															{
																notification.invoiceNumber
															}
														</span>
													</span>
													<span className='text-gray-600 dark:text-gray-400'>
														<span className='font-semibold text-gray-900 dark:text-white'>
															{isRTL
																? 'الحالة'
																: 'Status'}
															:
														</span>{' '}
														<span
															className={`font-semibold ${
																isPaid
																	? 'text-emerald-600 dark:text-emerald-400'
																	: isOverdue
																		? 'text-red-600 dark:text-red-400'
																		: 'text-amber-600 dark:text-amber-400'
															}`}
														>
															{notification.type ===
															'paid'
																? isRTL
																	? 'مدفوعة'
																	: 'Paid'
																: notification.type ===
																	  'overdue'
																	? isRTL
																		? 'متأخرة'
																		: 'Overdue'
																	: isRTL
																		? 'غير مدفوعة'
																		: 'Unpaid'}
														</span>
													</span>
												</div>
												<div className='text-gray-500 dark:text-gray-400'>
													<span className='font-semibold text-gray-900 dark:text-white'>
														{isRTL
															? 'التاريخ'
															: 'Date'}
														:
													</span>{' '}
													{new Date(
														notification.createdAt,
													).toLocaleDateString(
														isRTL
															? 'ar-SA'
															: 'en-US',
													)}
												</div>
											</div>
										</div>

										{/* Actions */}
										<div
											className={`flex items-center gap-1 transition-opacity opacity-0 group-hover:opacity-100 ${isRTL ? 'mr-2' : 'ml-2'}`}
										>
											<button
												onClick={() =>
													handleToggleReadStatus(
														notification.id,
														notification.isRead,
													)
												}
												className='p-1.5 bg-gray-100 dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-lg text-gray-600 dark:text-gray-400 hover:text-green-600 dark:hover:text-green-500 transition-colors'
												title={
													notification.isRead
														? 'Mark as unread'
														: 'Mark as read'
												}
											>
												<Check
													className={`h-3.5 w-3.5 ${!notification.isRead ? 'text-green-600 dark:text-green-500' : ''}`}
												/>
											</button>
											<button
												onClick={() =>
													handleDeleteNotification(
														notification.id,
													)
												}
												className='p-1.5 bg-gray-100 dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-lg text-gray-600 dark:text-gray-400 hover:text-red-600 dark:hover:text-red-500 transition-colors'
												title='Delete entry'
											>
												<Trash2 className='h-3.5 w-3.5' />
											</button>
										</div>
									</div>
								);
							})}
						</div>
					)}
				</div>
			</div>
		</div>
	);
}
