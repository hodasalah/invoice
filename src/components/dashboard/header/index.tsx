// Header.tsx
import { PrimaryBtn } from '@/components/shared/button';
import { SearchBar } from '@/components/shared/ٍSearchBar';
import { db } from '@/firebaseConfigs/firebase';
import { usePageTitle } from '@/hooks/usePageTitle';
import { useAppSelector } from '@/store/hooks';
import { collection, onSnapshot, query, where } from 'firebase/firestore';
import { Bell, Inbox, Mail, Menu, Plus } from 'lucide-react';
import { useEffect, useMemo, useState } from 'react';
import { HeaderIcon } from './HeaderIcon';
import { SidebarButton } from './SidebarButton';
import { useNavigate } from 'react-router';
import LanguageSwitcher from '@/components/shared/LanguageSwitcher';
import ThemeToggle from '@/components/shared/ThemeToggle';
import { useTranslation } from 'react-i18next';

interface HeaderMessage {
	id: string;
	clientName: string;
	body: string;
	sender: 'user' | 'client';
	createdAt: string;
	isRead: boolean;
}

type HeaderProps = {
	collapsed: boolean;
	toggleCollapse: () => void;
	onMobileMenuClick: () => void;
};

const getInitial = (name: string) => name.trim().charAt(0).toUpperCase() || 'C';

const formatMessageTime = (date: string, isArabic: boolean) => {
	const parsed = new Date(date);
	if (Number.isNaN(parsed.getTime())) return '';

	return parsed.toLocaleTimeString(isArabic ? 'ar-SA' : 'en-US', {
		hour: '2-digit',
		minute: '2-digit',
	});
};

export function Header({
	collapsed,
	toggleCollapse,
	onMobileMenuClick,
}: HeaderProps) {
	  const title = usePageTitle();

		useEffect(() => {
			document.title = `${title} `;
		}, [title]);
	const navigate = useNavigate();
	const { i18n, t } = useTranslation('common');
	const isArabic = i18n.language === 'ar';
	const currentUser = useAppSelector((state) => state.user.currentUser);
	const [messages, setMessages] = useState<HeaderMessage[]>([]);

	useEffect(() => {
		if (!currentUser?.uid) {
			setMessages([]);
			return;
		}

		const messagesQuery = query(
			collection(db, 'messages'),
			where('userId', '==', currentUser.uid),
		);

		const unsubscribe = onSnapshot(
			messagesQuery,
			(snapshot) => {
				const nextMessages = snapshot.docs
					.map((messageDoc) => ({
						id: messageDoc.id,
						...messageDoc.data(),
					}) as HeaderMessage)
					.sort(
						(a, b) =>
							new Date(b.createdAt).getTime() -
							new Date(a.createdAt).getTime(),
					);

				setMessages(nextMessages);
			},
			(error) => {
				console.error('Error loading header messages:', error);
			},
		);

		return () => unsubscribe();
	}, [currentUser?.uid]);

	const recentMessages = useMemo(() => messages.slice(0, 3), [messages]);
	const unreadMessagesCount = messages.filter(
		(message) => message.sender === 'client' && !message.isRead,
	).length;

	// Define Popover content for Notifications
	const notificationsContent = (
		<div className='flex flex-col text-right' dir={isArabic ? 'rtl' : 'ltr'}>
			<div className='flex items-center justify-between px-4 py-3 border-b border-gray-100 dark:border-slate-800 bg-gray-50/50 dark:bg-slate-900/50'>
				<span className='font-semibold text-gray-900 dark:text-white text-sm'>
					{isArabic ? 'الإشعارات' : 'Notifications'}
				</span>
				<button className='text-xs text-primary hover:underline font-medium'>
					{isArabic ? 'تحديد الكل كمقروء' : 'Mark all as read'}
				</button>
			</div>
			<div 
				tabIndex={0}
				className='flex flex-col max-h-[300px] overflow-y-auto no-scrollbar divide-y divide-gray-100 dark:divide-slate-800 focus:outline-none focus:ring-2 focus:ring-primary/20 rounded-xl'
			>
				<div className='flex gap-3 p-3.5 hover:bg-gray-50 dark:hover:bg-slate-800/30 transition cursor-pointer text-start'>
					<div className='w-8 h-8 rounded-full bg-green-100 dark:bg-green-900/30 flex items-center justify-center text-green-600 dark:text-green-400 shrink-0 text-sm'>
						💰
					</div>
					<div className='flex-1 min-w-0'>
						<p className='text-xs text-gray-900 dark:text-white font-medium'>
							{isArabic ? 'تم استلام دفعة جديدة بقيمة $1,250' : 'New payment of $1,250 received'}
						</p>
						<span className='text-[10px] text-gray-400 dark:text-slate-500 mt-1 block'>
							{isArabic ? 'منذ 10 دقائق' : '10 minutes ago'}
						</span>
					</div>
				</div>
				<div className='flex gap-3 p-3.5 hover:bg-gray-50 dark:hover:bg-slate-800/30 transition cursor-pointer text-start'>
					<div className='w-8 h-8 rounded-full bg-red-100 dark:bg-red-900/30 flex items-center justify-center text-red-600 dark:text-red-400 shrink-0 text-sm'>
						⚠️
					</div>
					<div className='flex-1 min-w-0'>
						<p className='text-xs text-gray-900 dark:text-white font-medium'>
							{isArabic ? 'فاتورة رقم #INV-0045 متأخرة السداد' : 'Invoice #INV-0045 is overdue'}
						</p>
						<span className='text-[10px] text-gray-400 dark:text-slate-500 mt-1 block'>
							{isArabic ? 'منذ ساعتين' : '2 hours ago'}
						</span>
					</div>
				</div>
				<div className='flex gap-3 p-3.5 hover:bg-gray-50 dark:hover:bg-slate-800/30 transition cursor-pointer text-start'>
					<div className='w-8 h-8 rounded-full bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center text-blue-600 dark:text-blue-400 shrink-0 text-sm'>
						👤
					</div>
					<div className='flex-1 min-w-0'>
						<p className='text-xs text-gray-900 dark:text-white font-medium'>
							{isArabic ? 'قام العميل خالد السعد بتحديث ملفه الشخصي' : 'Client Khalid Al-Saad updated profile'}
						</p>
						<span className='text-[10px] text-gray-400 dark:text-slate-500 mt-1 block'>
							{isArabic ? 'منذ 5 ساعات' : '5 hours ago'}
						</span>
					</div>
				</div>
				<div className='flex gap-3 p-3.5 hover:bg-gray-50 dark:hover:bg-slate-800/30 transition cursor-pointer text-start'>
					<div className='w-8 h-8 rounded-full bg-gray-100 dark:bg-slate-800 flex items-center justify-center text-gray-600 dark:text-gray-400 shrink-0 text-sm'>
						📝
					</div>
					<div className='flex-1 min-w-0'>
						<p className='text-xs text-gray-900 dark:text-white font-medium'>
							{isArabic ? 'تم إنشاء مسودة فاتورة جديدة #INV-0046' : 'Draft invoice #INV-0046 created'}
						</p>
						<span className='text-[10px] text-gray-400 dark:text-slate-500 mt-1 block'>
							{isArabic ? 'منذ يوم' : '1 day ago'}
						</span>
					</div>
				</div>
				<div className='flex gap-3 p-3.5 hover:bg-gray-50 dark:hover:bg-slate-800/30 transition cursor-pointer text-start'>
					<div className='w-8 h-8 rounded-full bg-yellow-100 dark:bg-yellow-900/30 flex items-center justify-center text-yellow-600 dark:text-yellow-400 shrink-0 text-sm'>
						⚙️
					</div>
					<div className='flex-1 min-w-0'>
						<p className='text-xs text-gray-900 dark:text-white font-medium'>
							{isArabic ? 'تحديث النظام مجدول الليلة الساعة 2 صباحاً' : 'System update scheduled tonight at 2 AM'}
						</p>
						<span className='text-[10px] text-gray-400 dark:text-slate-500 mt-1 block'>
							{isArabic ? 'منذ يوم' : '1 day ago'}
						</span>
					</div>
				</div>
			</div>
			<div className='px-4 py-2.5 text-center border-t border-gray-100 dark:border-slate-800 bg-gray-50/30 dark:bg-slate-900/30 rounded-b-2xl'>
				<button className='text-xs text-primary hover:underline font-semibold w-full'
					onClick={() => navigate('/dashboard/notifications')}>
					{isArabic ? 'عرض جميع الإشعارات' : 'View all notifications'}
				</button>
			</div>
		</div>
	);

	// Define Popover content for Messages
	const messagesContent = (
		<div className='flex flex-col text-right' dir={isArabic ? 'rtl' : 'ltr'}>
			<div className='flex items-center justify-between px-4 py-3 border-b border-gray-100 dark:border-slate-800 bg-gray-50/50 dark:bg-slate-900/50'>
				<span className='font-semibold text-gray-900 dark:text-white text-sm'>
					{isArabic ? 'الرسائل' : 'Messages'}
				</span>
				<button className='text-xs text-primary hover:underline font-medium'
					onClick={() => navigate('/dashboard/messages')}>
					{isArabic ? 'كتابة رسالة' : 'New Message'}
				</button>
			</div>
			<div 
				tabIndex={0}
				className='flex flex-col max-h-[300px] overflow-y-auto no-scrollbar divide-y divide-gray-100 dark:divide-slate-800 focus:outline-none focus:ring-2 focus:ring-primary/20 rounded-xl'
			>
				{recentMessages.length === 0 ? (
					<div className='p-6 text-center text-xs text-gray-400 dark:text-slate-500'>
						{isArabic ? 'لا توجد رسائل بعد' : 'No messages yet'}
					</div>
				) : (
					recentMessages.map((message) => (
						<button
							key={message.id}
							onClick={() => navigate('/dashboard/messages')}
							className='flex gap-3 p-3.5 hover:bg-gray-50 dark:hover:bg-slate-800/30 transition cursor-pointer text-start w-full'
						>
							<div className='w-9 h-9 rounded-full bg-primary/10 flex items-center justify-center text-primary font-bold text-sm shrink-0'>
								{getInitial(message.clientName)}
							</div>
							<div className='flex-1 min-w-0'>
								<div className='flex items-center justify-between gap-2'>
									<span className='text-xs font-semibold text-gray-900 dark:text-white truncate'>
										{message.clientName}
									</span>
									<span className='text-[10px] text-gray-400 dark:text-slate-500 shrink-0'>
										{formatMessageTime(message.createdAt, isArabic)}
									</span>
								</div>
								<p className='text-xs text-gray-500 dark:text-slate-400 truncate mt-1'>
									{message.body}
								</p>
							</div>
						</button>
					))
				)}
			</div>
			<div className='px-4 py-2.5 text-center border-t border-gray-100 dark:border-slate-800 bg-gray-50/30 dark:bg-slate-900/30 rounded-b-2xl'>
				<button
					className='text-xs text-primary hover:underline font-semibold w-full'
					onClick={() => navigate('/dashboard/messages')}
				>
					{isArabic ? 'عرض جميع الرسائل' : 'View all messages'}
				</button>
			</div>
		</div>
	);

	// Define Popover content for Invoices/Inbox
	const invoicesContent = (
		<div className='flex flex-col text-right' dir={isArabic ? 'rtl' : 'ltr'}>
			<div className='flex items-center justify-between px-4 py-3 border-b border-gray-100 dark:border-slate-800 bg-gray-50/50 dark:bg-slate-900/50'>
				<span className='font-semibold text-gray-900 dark:text-white text-sm'>
					{isArabic ? 'الفواتير المعلقة' : 'Pending Invoices'}
				</span>
				<span className='text-xs bg-primary/10 text-primary px-2 py-0.5 rounded-full font-semibold'>
					{isArabic ? '10 فواتير' : '10 Invoices'}
				</span>
			</div>
			<div 
				tabIndex={0}
				className='flex flex-col max-h-[300px] overflow-y-auto no-scrollbar divide-y divide-gray-100 dark:divide-slate-800 focus:outline-none focus:ring-2 focus:ring-primary/20 rounded-xl'
			>
				<div className='flex gap-3 p-3.5 hover:bg-gray-50 dark:hover:bg-slate-800/30 transition cursor-pointer items-center justify-between text-start'>
					<div className='min-w-0'>
						<div className='flex items-center gap-2'>
							<span className='text-xs font-semibold text-gray-900 dark:text-white'>
								#INV-0044
							</span>
							<span className='text-[10px] text-gray-400 dark:text-slate-500'>
								{isArabic ? 'خالد السعد' : 'Khalid Al-Saad'}
							</span>
						</div>
						<span className='text-[10px] text-orange-500 font-medium mt-1 block'>
							{isArabic ? 'بانتظار المراجعة' : 'Pending Review'}
						</span>
					</div>
					<span className='text-xs font-bold text-gray-900 dark:text-white'>
						$3,200.00
					</span>
				</div>
				<div className='flex gap-3 p-3.5 hover:bg-gray-50 dark:hover:bg-slate-800/30 transition cursor-pointer items-center justify-between text-start'>
					<div className='min-w-0'>
						<div className='flex items-center gap-2'>
							<span className='text-xs font-semibold text-gray-900 dark:text-white'>
								#INV-0043
							</span>
							<span className='text-[10px] text-gray-400 dark:text-slate-500'>
								{isArabic ? 'شركة الحلول الذكية' : 'Smart Solutions Co'}
							</span>
						</div>
						<span className='text-[10px] text-yellow-500 font-medium mt-1 block'>
							{isArabic ? 'بانتظار الدفع' : 'Awaiting Payment'}
						</span>
					</div>
					<span className='text-xs font-bold text-gray-900 dark:text-white'>
						$850.00
					</span>
				</div>
				<div className='flex gap-3 p-3.5 hover:bg-gray-50 dark:hover:bg-slate-800/30 transition cursor-pointer items-center justify-between text-start'>
					<div className='min-w-0'>
						<div className='flex items-center gap-2'>
							<span className='text-xs font-semibold text-gray-900 dark:text-white'>
								#INV-0042
							</span>
							<span className='text-[10px] text-gray-400 dark:text-slate-500'>
								{isArabic ? 'سارة أحمد' : 'Sarah Ahmed'}
							</span>
						</div>
						<span className='text-[10px] text-gray-500 dark:text-slate-400 mt-1 block'>
							{isArabic ? 'مسودة' : 'Draft'}
						</span>
					</div>
					<span className='text-xs font-bold text-gray-900 dark:text-white'>
						$1,500.00
					</span>
				</div>
			</div>
			<div className='px-4 py-2.5 text-center border-t border-gray-100 dark:border-slate-800 bg-gray-50/30 dark:bg-slate-900/30 rounded-b-2xl'>
				<button 
					onClick={() => navigate('/dashboard/invoices/list')}
					className='text-xs text-primary hover:underline font-semibold w-full'
				>
					{isArabic ? 'عرض جميع الفواتير' : 'View all invoices'}
				</button>
			</div>
		</div>
	);

	return (
		<header className='flex items-center justify-between p-4 border-b bg-white dark:bg-gray-900'>
			<div className='flex items-center gap-3'>
				<PrimaryBtn
					type='button'
					disabled={false}
					className='md:hidden'
					onClick={onMobileMenuClick}
				>
					<Menu className='w-5 h-5' />
				</PrimaryBtn>
				<SidebarButton
					collapsed={collapsed}
					toggleCollapse={toggleCollapse}
				/>

				<h2 className='text-lg md:text-xl font-semibold text-primary dark:text-gray-100'>
					{title}
				</h2>
			</div>
			<SearchBar />
			<div className='flex items-center gap-4'>
				<LanguageSwitcher />
				<div className='flex gap-4 items-center'>
					<HeaderIcon
						icon={<Bell size={20} />}
						gradientClass='bg-gradient1'
						tooltip={isArabic ? 'الإشعارات' : 'Notifications'}
						count={5}
						popoverContent={notificationsContent}
					/>
					<HeaderIcon
						icon={<Mail size={20} />}
						gradientClass='bg-gradient2'
						tooltip={isArabic ? 'الرسائل' : 'Messages'}
						count={unreadMessagesCount}
						popoverContent={messagesContent}
					/>
					<HeaderIcon
						icon={<Inbox size={20} />}
						gradientClass='bg-gradient3'
						tooltip={isArabic ? 'الفواتير المعلقة' : 'Pending Invoices'}
						count={10}
						popoverContent={invoicesContent}
					/>
					<ThemeToggle />
			</div>
				<PrimaryBtn
					type='button'
					disabled={false}
					icon={<Plus className='w-4 h-4' />}
					onClick={() => navigate('/dashboard/invoices/create')}
				>
					{t("Create Invoice")}
				</PrimaryBtn>
			</div>
		</header>
	);
}
