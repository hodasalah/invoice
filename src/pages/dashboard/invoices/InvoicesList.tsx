import InvoiceViewModal from '@/components/invoices/InvoiceViewModal';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogFooter,
	DialogHeader,
	DialogTitle,
} from '@/components/ui/dialog';
import { fetchClientsByUser } from '@/features/clients/clientsSlice';
import { fetchInvoicesByUser } from '@/features/invoices/invoiceSlice';
import type { RootState } from '@/store';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import type { InvoiceData } from '@/types/types';
import { Eye, Pencil, Plus, Trash2 } from 'lucide-react';
import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router';
import { toast } from 'sonner';
import { deleteData } from '../../../firebaseConfigs/firestore';

const Invoices = () => {
	const { t } = useTranslation('common');
	const [ selected, setSelected ] = useState<InvoiceData | null>(null);
	const [ invoiceToDelete, setInvoiceToDelete ] = useState<string | null>(null);
	const navigate = useNavigate();

	const dispatch = useAppDispatch();
	const currentUser = useAppSelector(
		(state: RootState) => state.user.currentUser,
	);
	const clients = useAppSelector((state: RootState) => state.clients.clients);
	const {
		list: invoices,
		loading,
		error,
	} = useAppSelector((state: RootState) => state.invoices);

	useEffect(() => {
		if (currentUser?.uid) {
			dispatch(fetchInvoicesByUser(currentUser.uid));
			dispatch(fetchClientsByUser(currentUser.uid));
		}
	}, [ currentUser?.uid, dispatch ]);

	if (!currentUser) return <div>{t('loading_invoice')}</div>;

	return (
		<div className='p-6'>
			<div className='flex justify-between items-center'>
				<h1 className='text-2xl font-semibold'>{t('Invoices')}</h1>
				{currentUser?.role !== 'client' && (
					<Button
						onClick={() => {
							navigate('/dashboard/invoices/create');
						}}
					>
						<Plus className='w-4 h-4 mr-2' /> {t('new_invoice')}
					</Button>
				)}
			</div>

			{loading && <p>{t('loading_invoices')}</p>}
			{error && <p className='text-red-600'>{error}</p>}

			<Card className='overflow-x-auto p-4 mt-6'>
				<table className='min-w-full text-sm'>
					<thead className='border-b bg-gray-50 text-left font-medium text-gray-600'>
						<tr>
							<th className='p-3'>{t('invoice_number')}</th>
							<th className='p-3'>{t('client')}</th>
							<th className='p-3'>{t('date')}</th>
							<th className='p-3'>{t('total')}</th>
							<th className='p-3'>{t('status')}</th>
							<th className='p-3 text-right'>{t('actions')}</th>
						</tr>
					</thead>
					<tbody>
						{invoices.length === 0 ? (
							<tr>
								<td
									colSpan={6}
									className='text-center p-4 text-gray-500'
								>
									{t('no_invoices_found')}
								</td>
							</tr>
						) : (
							invoices.map((inv) => (
								<tr
									key={inv.id}
									className='border-b dark:hover:bg-gray-200 hover:bg-primary dark:hover:text-black hover:text-white'
								>
									<td className='p-3 font-medium'>
										{inv?.invoiceNumber}
									</td>
									<td className='p-3'>
										{clients?.find(
											(c) => c?.id === inv.clientId,
										)?.name || inv.clientName || 'عميل محذوف'}
									</td>
									<td className='p-3'>{inv?.date}</td>
									<td className='p-3'>
										{inv?.total} {inv?.currency}
									</td>
									<td className='p-3'>
										<span
											className={`px-2 py-1 rounded-full text-xs font-medium ${inv.status === 'paid'
													? 'bg-green-100 text-green-700'
													: inv.status === 'unpaid'
														? 'bg-yellow-100 text-yellow-700'
														: 'bg-red-100 text-red-700'
												}`}
										>
											{t(inv.status)}
										</span>
									</td>
									<td className='p-3 text-right space-x-2'>
										<Button
											size='icon'
											variant='ghost'
											onClick={() => navigate(`/dashboard/invoices/${inv.id}`)}
										>
											<Eye className='w-4 h-4' />
										</Button>

										{currentUser?.role !== 'client' && (
											<Button
												size='icon'
												variant='ghost'
												onClick={() => navigate(`/dashboard/invoices/edit/${inv.id}`)}
											>
												<Pencil className='w-4 h-4' />
											</Button>
										)}

										{currentUser?.role === 'admin' && (
											<Button
												size='icon'
												variant='ghost'
												className='text-red-600'
												onClick={() => setInvoiceToDelete(inv.id)}
											>
												<Trash2 className='w-4 h-4' />
											</Button>
										)}
									</td>
								</tr>
							))
						)}
					</tbody>
				</table>
			</Card>

			<Dialog open={!!invoiceToDelete} onOpenChange={(open) => !open && setInvoiceToDelete(null)}>
				<DialogContent>
					<DialogHeader>
						<DialogTitle>{t('confirm_delete') || 'تأكيد الحذف'}</DialogTitle>
						<DialogDescription>
							{t('confirm_delete_invoice_desc') || 'هل أنت متأكد أنك تريد حذف هذه الفاتورة؟ لا يمكن التراجع عن هذا الإجراء.'}
						</DialogDescription>
					</DialogHeader>
					<DialogFooter className="gap-2 sm:gap-0">
						<Button variant="outline" onClick={() => setInvoiceToDelete(null)}>
							{t('cancel') || 'إلغاء'}
						</Button>
						<Button
							variant="destructive"
							onClick={async () => {
								if (!invoiceToDelete) return;
								try {
									await deleteData('invoices', invoiceToDelete);
									dispatch(fetchInvoicesByUser(currentUser.uid));
									toast.success(t('invoice_deleted') || 'تم حذف الفاتورة بنجاح', {
										className: 'bg-green-500 text-white border-green-600',
									});
								} catch (error) {
									toast.error(t('delete_error') || 'حدث خطأ أثناء الحذف');
								}
								setInvoiceToDelete(null);
							}}
						>
							{t('confirm') || 'تأكيد الحذف'}
						</Button>
					</DialogFooter>
				</DialogContent>
			</Dialog>

			{selected && (
				<InvoiceViewModal
					invoice={{
						inv: selected,
						clientName: clients?.find((c) => c?.id === selected.clientId)?.name || 'Unknown'
					}}
					onClose={() => setSelected(null)}
				/>
			)}
		</div>
	);
};

export default Invoices;
