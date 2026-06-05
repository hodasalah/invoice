import { useRef, useState } from 'react';
import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { updateUserProfile } from '@/features/user/userSlice';
import { uploadToImgBB } from '@/utils/imgbb';
import { toast } from 'sonner';
import { Building2, MapPin, User, BadgeInfo, ShieldCheck } from 'lucide-react';
import type { RootState } from '@/store';

// Import our new SaaS components
import ProfileHero from '@/components/profile/ProfileHero';
import ProfileStats from '@/components/profile/ProfileStats';
import ProfileCompletion from '@/components/profile/ProfileCompletion';
import BusinessScore from '@/components/profile/BusinessScore';
import ActivityTimeline from '@/components/profile/ActivityTimeline';
import EditableInfoSection, { EditField } from '@/components/profile/EditableInfoSection';

export default function ProfilePage() {
	const { t } = useTranslation('common');
	const dispatch = useAppDispatch();
	
	const currentUser = useAppSelector((state: RootState) => state.user.currentUser);
	const invoices = useAppSelector((state: RootState) => state.invoices?.list ?? []);
	const clients = useAppSelector((state: RootState) => state.clients?.clients ?? []);

	const p = (key: string) => t(`profilePage.${key}`);

	/* ── Local form state ── */
	const [personal, setPersonal] = useState({
		firstName: currentUser?.firstName ?? '',
		lastName: currentUser?.lastName ?? '',
		email: currentUser?.email ?? '',
		phone: currentUser?.phone ?? '',
	});
	const [company, setCompany] = useState({
		companyName: currentUser?.companyName ?? '',
		vatNumber: currentUser?.vatNumber ?? '',
		crNumber: currentUser?.crNumber ?? '',
	});
	const [address, setAddress] = useState({
		street: currentUser?.address?.street ?? '',
		city: currentUser?.address?.city ?? '',
		state: currentUser?.address?.state ?? '',
		country: currentUser?.address?.country ?? '',
		zip: currentUser?.address?.zip ?? '',
	});

	/* ── Edit mode toggles ── */
	const [editPersonal, setEditPersonal] = useState(false);
	const [editCompany, setEditCompany] = useState(false);
	const [editAddress, setEditAddress] = useState(false);

	/* ── Saving flags ── */
	const [savingPersonal, setSavingPersonal] = useState(false);
	const [savingCompany, setSavingCompany] = useState(false);
	const [savingAddress, setSavingAddress] = useState(false);

	/* ── Avatar upload ── */
	const [avatarUploading, setAvatarUploading] = useState(false);

	const handleAvatarChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
		const file = e.target.files?.[0];
		if (!file || !currentUser?.uid) return;
		setAvatarUploading(true);
		try {
			const url = await uploadToImgBB(file);
			await dispatch(updateUserProfile({ uid: currentUser.uid, data: { avatar: url } })).unwrap();
			toast.success(p('uploadSuccess'));
		} catch {
			toast.error(p('uploadError'));
		} finally {
			setAvatarUploading(false);
		}
	};

	/* ── Save handlers ── */
	const saveSection = async (
		data: Record<string, any>,
		setSaving: (v: boolean) => void,
		setEdit: (v: boolean) => void,
	) => {
		if (!currentUser?.uid) return;
		setSaving(true);
		try {
			await dispatch(updateUserProfile({ uid: currentUser.uid, data })).unwrap();
			toast.success(p('saveSuccess'));
			setEdit(false);
		} catch {
			toast.error(p('saveError'));
		} finally {
			setSaving(false);
		}
	};

	const cancelPersonal = () => {
		setPersonal({
			firstName: currentUser?.firstName ?? '',
			lastName: currentUser?.lastName ?? '',
			email: currentUser?.email ?? '',
			phone: currentUser?.phone ?? '',
		});
		setEditPersonal(false);
	};
	const cancelCompany = () => {
		setCompany({
			companyName: currentUser?.companyName ?? '',
			vatNumber: currentUser?.vatNumber ?? '',
			crNumber: currentUser?.crNumber ?? '',
		});
		setEditCompany(false);
	};
	const cancelAddress = () => {
		setAddress({
			street: currentUser?.address?.street ?? '',
			city: currentUser?.address?.city ?? '',
			state: currentUser?.address?.state ?? '',
			country: currentUser?.address?.country ?? '',
			zip: currentUser?.address?.zip ?? '',
		});
		setEditAddress(false);
	};

	/* ── Derived Stats ── */
	const totalInvoices = invoices.length;
	const paidInvoicesList = invoices.filter(i => i.status === 'paid');
	const paidInvoices = paidInvoicesList.length;
	const unpaidInvoices = totalInvoices - paidInvoices;
	const totalClients = clients.length;
	
	const revenue = paidInvoicesList.reduce((acc, curr) => acc + (curr.total || 0), 0);
	const outstanding = invoices.filter(i => i.status === 'unpaid').reduce((acc, curr) => acc + (curr.total || 0), 0);
	
	// Mock payments count for stats
	const paymentsCount = paidInvoices; 
	const collectionRate = totalInvoices > 0 ? (paidInvoices / totalInvoices) * 100 : 0;

	// Calculate completion percentage for the score
	const checks = [
		!!currentUser?.avatar,
		!!(currentUser?.firstName && currentUser?.lastName),
		!!currentUser?.email,
		!!currentUser?.phone,
		!!currentUser?.companyName,
		!!(currentUser?.address?.street && currentUser?.address?.city),
		!!currentUser?.vatNumber,
		!!currentUser?.crNumber,
	];
	const completedChecks = checks.filter(Boolean).length;
	const profilePercent = Math.round((completedChecks / checks.length) * 100);

	// Mock recent activity arrays based on existing data
	const recentInvoices = [...invoices].sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()).slice(0, 3);
	// We don't have payments in redux here, so let's mock it using paid invoices
	const recentPayments = [...paidInvoicesList].map(inv => ({ id: `pay-${inv.id}`, date: inv.date, method: 'Credit Card', amount: inv.total })).slice(0, 2);
	const topClientsList = [...clients].map(c => ({ name: c.name, total: invoices.filter(i => i.clientId === c.id).reduce((a, b) => a + (b.total || 0), 0) })).sort((a, b) => b.total - a.total).slice(0, 3);

	return (
		<div className='max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8'>
			{/* ──── Hero Banner ──── */}
			<ProfileHero 
				user={currentUser} 
				uploading={avatarUploading} 
				uploadLabel={p('uploadAvatar')} 
				memberSinceLabel={p('memberSince')}
				onFileSelect={handleAvatarChange} 
			/>

			{/* ──── KPIs ──── */}
			<ProfileStats 
				revenue={revenue}
				outstanding={outstanding}
				totalClients={totalClients}
				totalInvoices={totalInvoices}
				paidInvoices={paidInvoices}
				unpaidInvoices={unpaidInvoices}
				payments={paymentsCount}
				collectionRate={collectionRate}
				t={t}
			/>

			<div className='grid grid-cols-1 lg:grid-cols-3 gap-8 items-start'>
				{/* ──── Left Column (Timeline & Editables) ──── */}
				<div className='col-span-1 lg:col-span-2 space-y-8'>
					
					<ActivityTimeline 
						recentInvoices={recentInvoices}
						recentPayments={recentPayments}
						topClients={topClientsList}
						t={t}
					/>

					<EditableInfoSection
						icon={<User className='w-4 h-4' />}
						title={p('personalInfo')}
						editLabel={p('edit')}
						saveLabel={p('save')}
						cancelLabel={p('cancel')}
						editing={editPersonal}
						saving={savingPersonal}
						onEdit={() => setEditPersonal(true)}
						onSave={() => saveSection(personal, setSavingPersonal, setEditPersonal)}
						onCancel={cancelPersonal}
						delay={0.4}
					>
						<EditField label={p('firstName')} value={personal.firstName} editing={editPersonal} onChange={(v) => setPersonal({ ...personal, firstName: v })} />
						<EditField label={p('lastName')} value={personal.lastName} editing={editPersonal} onChange={(v) => setPersonal({ ...personal, lastName: v })} />
						<EditField label={p('email')} value={personal.email} editing={editPersonal} onChange={(v) => setPersonal({ ...personal, email: v })} type='email' />
						<EditField label={p('phone')} value={personal.phone} editing={editPersonal} onChange={(v) => setPersonal({ ...personal, phone: v })} type='tel' />
					</EditableInfoSection>

					<EditableInfoSection
						icon={<Building2 className='w-4 h-4' />}
						title={p('companyInfo')}
						editLabel={p('edit')}
						saveLabel={p('save')}
						cancelLabel={p('cancel')}
						editing={editCompany}
						saving={savingCompany}
						onEdit={() => setEditCompany(true)}
						onSave={() => saveSection(company, setSavingCompany, setEditCompany)}
						onCancel={cancelCompany}
						delay={0.5}
					>
						<EditField label={p('companyName')} value={company.companyName} editing={editCompany} onChange={(v) => setCompany({ ...company, companyName: v })} />
						<EditField label={p('vatNumber')} value={company.vatNumber} editing={editCompany} onChange={(v) => setCompany({ ...company, vatNumber: v })} />
						<EditField label={p('crNumber')} value={company.crNumber} editing={editCompany} onChange={(v) => setCompany({ ...company, crNumber: v })} />
					</EditableInfoSection>

					<EditableInfoSection
						icon={<MapPin className='w-4 h-4' />}
						title={p('addressInfo')}
						editLabel={p('edit')}
						saveLabel={p('save')}
						cancelLabel={p('cancel')}
						editing={editAddress}
						saving={savingAddress}
						onEdit={() => setEditAddress(true)}
						onSave={() => saveSection({ address }, setSavingAddress, setEditAddress)}
						onCancel={cancelAddress}
						delay={0.6}
					>
						<EditField label={p('street')} value={address.street} editing={editAddress} onChange={(v) => setAddress({ ...address, street: v })} />
						<EditField label={p('city')} value={address.city} editing={editAddress} onChange={(v) => setAddress({ ...address, city: v })} />
						<EditField label={p('state')} value={address.state} editing={editAddress} onChange={(v) => setAddress({ ...address, state: v })} />
						<EditField label={p('country')} value={address.country} editing={editAddress} onChange={(v) => setAddress({ ...address, country: v })} />
						<EditField label={p('zip')} value={address.zip} editing={editAddress} onChange={(v) => setAddress({ ...address, zip: v })} />
					</EditableInfoSection>
				</div>

				{/* ──── Right Column (Scores & Info) ──── */}
				<div className='col-span-1 space-y-8'>
					<BusinessScore 
						collectionRate={collectionRate}
						profilePercent={profilePercent}
						totalClients={totalClients}
						totalInvoices={totalInvoices}
						t={t}
					/>
					
					<ProfileCompletion 
						user={currentUser}
						t={t}
					/>

					{/* ──── Account Info footer ──── */}
					<motion.div
						initial={{ opacity: 0, scale: 0.95 }}
						animate={{ opacity: 1, scale: 1 }}
						transition={{ duration: 0.4, delay: 0.7 }}
						className='rounded-2xl border border-gray-200/80 dark:border-gray-700/50 bg-white dark:bg-gray-900/80 backdrop-blur-sm shadow-sm px-6 py-5'
					>
						<div className='flex items-center gap-2 mb-4'>
							<BadgeInfo className='w-4 h-4 text-gray-400' />
							<h3 className='font-semibold text-gray-900 dark:text-white text-sm'>{p('dangerZone')}</h3>
						</div>
						<div className='space-y-4 text-sm'>
							<div>
								<p className='text-[11px] font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-widest mb-1'>{p('accountId')}</p>
								<p className='font-mono text-gray-600 dark:text-gray-400 break-all text-xs bg-gray-50 dark:bg-gray-800/50 p-2 rounded-lg border border-gray-100 dark:border-gray-800'>{currentUser?.uid ?? '—'}</p>
							</div>
							<div>
								<p className='text-[11px] font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-widest mb-1.5'>{p('role')}</p>
								<span className='inline-flex items-center gap-1.5 px-3 py-1 rounded-md bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 text-xs font-semibold border border-gray-200 dark:border-gray-700'>
									<ShieldCheck className='w-3.5 h-3.5 text-primary' />
									{currentUser?.role ?? '—'}
								</span>
							</div>
						</div>
					</motion.div>
				</div>
			</div>
		</div>
	);
}
