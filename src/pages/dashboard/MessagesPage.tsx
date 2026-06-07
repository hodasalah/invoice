import { db } from '@/firebaseConfigs/firebase';
import { useAppSelector } from '@/store/hooks';
import {
	addDoc,
	collection,
	onSnapshot,
	query,
	where,
} from 'firebase/firestore';
import {
	Mail,
	MessageSquareText,
	Search,
	Send,
	UserRound,
} from 'lucide-react';
import { useEffect, useMemo, useState } from 'react';
import { useTranslation } from 'react-i18next';

interface ClientRecord {
	id: string;
	name: string;
	email?: string;
	companyName?: string;
}

interface MessageRecord {
	id: string;
	userId: string;
	clientId: string;
	clientName: string;
	body: string;
	sender: 'user' | 'client';
	createdAt: string;
	isRead: boolean;
}

const formatTime = (date: string, locale: string) => {
	const parsed = new Date(date);
	if (Number.isNaN(parsed.getTime())) return '';

	return parsed.toLocaleTimeString(locale, {
		hour: '2-digit',
		minute: '2-digit',
	});
};

const getInitials = (name: string) =>
	name
		.split(' ')
		.filter(Boolean)
		.slice(0, 2)
		.map((part) => part[0])
		.join('')
		.toUpperCase() || 'C';

export default function MessagesPage() {
	const currentUser = useAppSelector((state) => state.user.currentUser);
	const { i18n } = useTranslation('common');
	const isArabic = i18n.language === 'ar';
	const locale = isArabic ? 'ar-SA' : 'en-US';

	const [clients, setClients] = useState<ClientRecord[]>([]);
	const [messages, setMessages] = useState<MessageRecord[]>([]);
	const [activeClientId, setActiveClientId] = useState<string>('');
	const [searchQuery, setSearchQuery] = useState('');
	const [messageBody, setMessageBody] = useState('');
	const [loading, setLoading] = useState(true);
	const [sending, setSending] = useState(false);

	useEffect(() => {
		if (!currentUser?.uid) {
			setLoading(false);
			return;
		}

		setLoading(true);
		let clientsReady = false;
		let messagesReady = false;

		const finishLoading = () => {
			if (clientsReady && messagesReady) setLoading(false);
		};

		const clientsQuery = query(
			collection(db, 'clients'),
			where('userId', '==', currentUser.uid),
		);

		const messagesQuery = query(
			collection(db, 'messages'),
			where('userId', '==', currentUser.uid),
		);

		const unsubscribeClients = onSnapshot(
			clientsQuery,
			(snapshot) => {
				const nextClients = snapshot.docs
					.map((clientDoc) => ({
						id: clientDoc.id,
						...clientDoc.data(),
					}) as ClientRecord)
					.sort((a, b) => a.name.localeCompare(b.name));

				setClients(nextClients);
				setActiveClientId((current) => current || nextClients[0]?.id || '');
				clientsReady = true;
				finishLoading();
			},
			(error) => {
				console.error('Error loading message clients:', error);
				clientsReady = true;
				finishLoading();
			},
		);

		const unsubscribeMessages = onSnapshot(
			messagesQuery,
			(snapshot) => {
				const nextMessages = snapshot.docs
					.map((messageDoc) => ({
						id: messageDoc.id,
						...messageDoc.data(),
					}) as MessageRecord)
					.sort(
						(a, b) =>
							new Date(a.createdAt).getTime() -
							new Date(b.createdAt).getTime(),
					);

				setMessages(nextMessages);
				messagesReady = true;
				finishLoading();
			},
			(error) => {
				console.error('Error loading messages:', error);
				messagesReady = true;
				finishLoading();
			},
		);

		return () => {
			unsubscribeClients();
			unsubscribeMessages();
		};
	}, [currentUser?.uid]);

	const clientsWithLastMessage = useMemo(
		() =>
			clients.map((client) => {
				const clientMessages = messages.filter(
					(message) => message.clientId === client.id,
				);
				const lastMessage = clientMessages[clientMessages.length - 1];
				const unreadCount = clientMessages.filter(
					(message) => message.sender === 'client' && !message.isRead,
				).length;

				return {
					...client,
					lastMessage,
					unreadCount,
				};
			}),
		[clients, messages],
	);

	const filteredClients = clientsWithLastMessage.filter((client) => {
		const queryText = searchQuery.toLowerCase();

		return (
			client.name.toLowerCase().includes(queryText) ||
			(client.email || '').toLowerCase().includes(queryText) ||
			(client.companyName || '').toLowerCase().includes(queryText)
		);
	});

	const activeClient =
		clientsWithLastMessage.find((client) => client.id === activeClientId) ||
		filteredClients[0];

	const activeMessages = messages.filter(
		(message) => message.clientId === activeClient?.id,
	);

	const handleSendMessage = async () => {
		if (!currentUser?.uid || !activeClient || !messageBody.trim()) return;

		try {
			setSending(true);
			await addDoc(collection(db, 'messages'), {
				userId: currentUser.uid,
				clientId: activeClient.id,
				clientName: activeClient.name,
				body: messageBody.trim(),
				sender: 'user',
				createdAt: new Date().toISOString(),
				isRead: true,
			});
			setMessageBody('');
		} catch (error) {
			console.error('Error sending message:', error);
		} finally {
			setSending(false);
		}
	};

	if (!currentUser) {
		return (
			<div className='min-h-screen bg-gray-50 dark:bg-gray-950 p-6' dir={isArabic ? 'rtl' : 'ltr'}>
				<div className='rounded-xl border border-gray-200 bg-white p-8 text-center text-sm font-semibold text-red-500 shadow-sm dark:border-gray-800 dark:bg-gray-900'>
					{isArabic ? 'الرجاء تسجيل الدخول أولاً.' : 'Please log in first.'}
				</div>
			</div>
		);
	}

	return (
		<div className='min-h-screen bg-gray-50 p-4 text-gray-900 dark:bg-gray-950 dark:text-white sm:p-6' dir={isArabic ? 'rtl' : 'ltr'}>
			<div className='mb-6 flex flex-wrap items-center justify-between gap-3'>
				<div>
					<h1 className='flex items-center gap-2 text-2xl font-bold'>
						<MessageSquareText className='h-6 w-6 text-primary' />
						{isArabic ? 'الرسائل' : 'Messages'}
					</h1>
					<p className='mt-1 text-sm text-gray-500 dark:text-gray-400'>
						{isArabic
							? 'إدارة المحادثات بينك وبين عملائك'
							: 'Manage conversations between you and your clients'}
					</p>
				</div>
			</div>

			<div className='grid min-h-[680px] grid-cols-1 overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm dark:border-gray-800 dark:bg-gray-900 lg:grid-cols-[320px_1fr]'>
				<aside className='border-b border-gray-200 dark:border-gray-800 lg:border-b-0 lg:border-e'>
					<div className='border-b border-gray-200 p-4 dark:border-gray-800'>
						<div className='relative'>
							<Search className={`absolute top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400 ${isArabic ? 'right-3' : 'left-3'}`} />
							<input
								value={searchQuery}
								onChange={(event) => setSearchQuery(event.target.value)}
								placeholder={isArabic ? 'بحث عن عميل...' : 'Search clients...'}
								className={`h-10 w-full rounded-xl border border-gray-200 bg-gray-50 text-sm outline-none transition focus:border-primary focus:bg-white dark:border-gray-800 dark:bg-gray-950 dark:focus:bg-gray-900 ${isArabic ? 'pr-10 pl-3' : 'pl-10 pr-3'}`}
							/>
						</div>
					</div>

					<div className='max-h-[280px] overflow-y-auto lg:max-h-[620px]'>
						{loading ? (
							<div className='flex h-32 items-center justify-center text-sm text-gray-400'>
								{isArabic ? 'جاري التحميل...' : 'Loading...'}
							</div>
						) : filteredClients.length === 0 ? (
							<div className='p-6 text-center text-sm text-gray-400'>
								{isArabic ? 'لا يوجد عملاء.' : 'No clients found.'}
							</div>
						) : (
							filteredClients.map((client) => {
								const isActive = client.id === activeClient?.id;

								return (
									<button
										key={client.id}
										onClick={() => setActiveClientId(client.id)}
										className={`flex w-full items-center gap-3 border-b border-gray-100 p-4 text-start transition dark:border-gray-800 ${
											isActive
												? 'bg-primary/10'
												: 'hover:bg-gray-50 dark:hover:bg-gray-800/60'
										}`}
									>
										<div className='flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-primary text-sm font-bold text-white'>
											{getInitials(client.name)}
										</div>
										<div className='min-w-0 flex-1'>
											<div className='flex items-center justify-between gap-2'>
												<p className='truncate text-sm font-bold text-gray-900 dark:text-white'>
													{client.name}
												</p>
												{client.lastMessage && (
													<span className='shrink-0 text-[10px] text-gray-400'>
														{formatTime(client.lastMessage.createdAt, locale)}
													</span>
												)}
											</div>
											<p className='mt-1 truncate text-xs text-gray-500 dark:text-gray-400'>
												{client.lastMessage?.body ||
													client.companyName ||
													client.email ||
													(isArabic ? 'ابدأ محادثة جديدة' : 'Start a new conversation')}
											</p>
										</div>
										{client.unreadCount > 0 && (
											<span className='flex h-5 min-w-5 items-center justify-center rounded-full bg-red-500 px-1.5 text-[10px] font-bold text-white'>
												{client.unreadCount}
											</span>
										)}
									</button>
								);
							})
						)}
					</div>
				</aside>

				<section className='flex min-h-[520px] flex-col'>
					{activeClient ? (
						<>
							<div className='flex items-center gap-3 border-b border-gray-200 p-4 dark:border-gray-800'>
								<div className='flex h-12 w-12 items-center justify-center rounded-full bg-primary text-sm font-bold text-white'>
									{getInitials(activeClient.name)}
								</div>
								<div className='min-w-0'>
									<h2 className='truncate text-base font-bold'>
										{activeClient.name}
									</h2>
									<p className='truncate text-xs text-gray-500 dark:text-gray-400'>
										{activeClient.companyName || activeClient.email || (isArabic ? 'عميل' : 'Client')}
									</p>
								</div>
							</div>

							<div className='flex-1 space-y-3 overflow-y-auto bg-gray-50 p-4 dark:bg-gray-950'>
								{activeMessages.length === 0 ? (
									<div className='flex h-full flex-col items-center justify-center text-center'>
										<div className='mb-3 flex h-14 w-14 items-center justify-center rounded-full bg-white text-primary shadow-sm dark:bg-gray-900'>
											<Mail className='h-7 w-7' />
										</div>
										<p className='text-sm font-semibold text-gray-700 dark:text-gray-200'>
											{isArabic ? 'لا توجد رسائل بعد' : 'No messages yet'}
										</p>
										<p className='mt-1 text-xs text-gray-400'>
											{isArabic ? 'اكتب أول رسالة لهذا العميل.' : 'Write the first message to this client.'}
										</p>
									</div>
								) : (
									activeMessages.map((message) => {
										const isUser = message.sender === 'user';

										return (
											<div
												key={message.id}
												className={`flex ${isUser ? 'justify-end' : 'justify-start'}`}
											>
												<div
													className={`max-w-[78%] rounded-2xl px-4 py-3 shadow-sm ${
														isUser
															? 'bg-primary text-white'
															: 'border border-gray-200 bg-white text-gray-800 dark:border-gray-800 dark:bg-gray-900 dark:text-gray-100'
													}`}
												>
													<p className='text-sm leading-6'>{message.body}</p>
													<span
														className={`mt-2 block text-[10px] ${
															isUser ? 'text-white/70' : 'text-gray-400'
														}`}
													>
														{formatTime(message.createdAt, locale)}
													</span>
												</div>
											</div>
										);
									})
								)}
							</div>

							<div className='border-t border-gray-200 bg-white p-4 dark:border-gray-800 dark:bg-gray-900'>
								<div className='flex items-end gap-3'>
									<textarea
										value={messageBody}
										onChange={(event) => setMessageBody(event.target.value)}
										onKeyDown={(event) => {
											if (event.key === 'Enter' && !event.shiftKey) {
												event.preventDefault();
												handleSendMessage();
											}
										}}
										rows={2}
										placeholder={isArabic ? 'اكتب رسالتك...' : 'Write your message...'}
										className='max-h-28 min-h-12 flex-1 resize-none rounded-xl border border-gray-200 bg-gray-50 px-4 py-3 text-sm outline-none transition focus:border-primary focus:bg-white dark:border-gray-800 dark:bg-gray-950 dark:focus:bg-gray-900'
									/>
									<button
										onClick={handleSendMessage}
										disabled={sending || !messageBody.trim()}
										className='flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-primary text-white transition hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-50'
										aria-label={isArabic ? 'إرسال الرسالة' : 'Send message'}
									>
										<Send className='h-5 w-5' />
									</button>
								</div>
							</div>
						</>
					) : (
						<div className='flex flex-1 flex-col items-center justify-center p-8 text-center'>
							<div className='mb-3 flex h-14 w-14 items-center justify-center rounded-full bg-gray-100 text-gray-500 dark:bg-gray-800'>
								<UserRound className='h-7 w-7' />
							</div>
							<p className='text-sm font-semibold'>
								{isArabic ? 'أضف عميلاً لبدء الرسائل' : 'Add a client to start messaging'}
							</p>
						</div>
					)}
				</section>
			</div>
		</div>
	);
}
