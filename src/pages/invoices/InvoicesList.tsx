import InvoiceViewModal from '@/components/invoices/InvoiceViewModal';

import type { InvoiceData } from '@/components/invoices/InvoiceForm';
import InvoiceForm from '@/components/invoices/InvoiceForm';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { fetchClientsByUser } from '@/features/clients/clientsSlice';
import { fetchInvoicesByUser, setInvoices } from '@/features/invoices/invoiceSlice';
import type { RootState } from '@/store';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { Eye, Pencil, Plus, Trash2 } from 'lucide-react';
import { useEffect, useState } from 'react';
import { deleteData, updateData } from '../../firebaseConfigs/firestore';

const Invoices = () => {
	const [selected, setSelected] = useState<any | null>(null);
	const [isFormOpen, setIsFormOpen] = useState(false);
	const [editData, setEditData] = useState<any | null>(null);
	const [invoiceMode, setInvoiceMode] = useState<'page' | 'modal'>('page');

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
console.log(clients)
	useEffect(() => {
		if (currentUser?.uid) {
			dispatch(fetchInvoicesByUser(currentUser.uid));
			dispatch(fetchClientsByUser(currentUser.uid));
		}
	}, [currentUser?.uid, dispatch]);

	if (!currentUser) return <div>Loading user...</div>;

	const handleDelete = async (id: string) => {
		if (confirm('Are you sure you want to delete this invoice?')) {
			await deleteData('invoices', id);
			dispatch(fetchInvoicesByUser(currentUser.uid));
		}
	};

	const handleSave = async (invoice: InvoiceData) => {
		await updateData('invoices', invoice.id, invoice);
		dispatch(fetchInvoicesByUser(currentUser.uid));
		setIsFormOpen(false);
		setEditData(null);
	};
	return (
		<div className='p-6 '>
			<div className='flex justify-between items-center'>
				<h1 className='text-2xl font-semibold'>Invoices</h1>
				<Button
					onClick={() => {
						setIsFormOpen(true);
						setEditData(null);
					}}
				>
					<Plus className='w-4 h-4 mr-2' /> New Invoice
				</Button>
			</div>

			{/* حالة التحميل أو الخطأ */}
			{loading && <p>Loading invoices...</p>}
			{error && <p className='text-red-600'>{error}</p>}

			<Card className='overflow-x-auto p-4 mt-6'>
				<table className='min-w-full text-sm '>
					<thead className='border-b bg-gray-50 text-left font-medium text-gray-600'>
						<tr>
							<th className='p-3'>Invoice #</th>
							<th className='p-3'>Client</th>
							<th className='p-3'>Date</th>
							<th className='p-3'>Total</th>
							<th className='p-3'>Status</th>
							<th className='p-3 text-right'>Actions</th>
						</tr>
					</thead>
					<tbody>
						{invoices.length === 0 ? (
							<tr>
								<td
									colSpan={6}
									className='text-center p-4 text-gray-500'
								>
									No invoices found
								</td>
							</tr>
						) : (
							invoices.map((inv) => (
								<tr
									key={inv.id}
									className='border-b hover:bg-gray-50'
								>
									<td className='p-3 font-medium'>
										{inv?.invoiceNumber}
									</td>
									<td className='p-3'>
										{' '}
										{clients?.find(
											(c) => c?.id === inv.clientId,
										)?.name || 'Unknown'}
									</td>
									<td className='p-3'>{inv?.date}</td>
									<td className='p-3'>
										{inv?.total} {inv?.currency}
									</td>
									<td className='p-3'>
										<span
											className={`px-2 py-1 rounded-full text-xs font-medium ${
												inv.status === 'paid'
													? 'bg-green-100 text-green-700'
													: inv.status === 'unpaid'
													? 'bg-yellow-100 text-yellow-700'
													: 'bg-red-100 text-red-700'
											}`}
										>
											{inv.status}
										</span>
									</td>
									<td className='p-3 text-right space-x-2'>
										<Button
											size='icon'
											variant='ghost'
											onClick={() => {
												const data = {
													inv,
													clientName:
														clients.find(
															(c) =>
																c.id ===
																inv.clientId,
														)?.name || 'Unknown',
												};
												setSelected(data);
											}}
										>
											<Eye className='w-4 h-4' />
										</Button>
										<Button
											size='icon'
											variant='ghost'
											onClick={() => {
												const clientData = clients.find(
													(c) =>
														c.id === inv.clientId,
												);

												// ندمج بيانات الفاتورة + العميل
												const merged = {
													...inv,
													clientId: inv.clientId,
													clientName:
														clientData?.name || '',
													clientEmail:
														clientData?.email || '',
													clientPhone:
														clientData?.phone || '',
													clientAddress:
														clientData?.address.country + " " + clientData?.address.city ||
														'',
												};

												setEditData(merged);
												setIsFormOpen(true);
												setInvoiceMode('modal');
											}}
										>
											<Pencil className='w-4 h-4' />
										</Button>

										<Button
											size='icon'
											variant='ghost'
											className='text-red-600'
											onClick={() => handleDelete(inv.id)}
										>
											<Trash2 className='w-4 h-4' />
										</Button>
									</td>
								</tr>
							))
						)}
					</tbody>
				</table>
			</Card>

			{/* Add/Edit Invoice Modal */}
			{editData && (
				<div className='fixed inset-0 bg-black/70 flex items-center justify-center z-50'>
					<InvoiceForm
						onClose={() => {
							setIsFormOpen(false);
							setEditData(null);
							setInvoiceMode('page');
						}}
						onSave={handleSave}
						editData={editData}
						clients={clients}
						mode={invoiceMode}
					/>
				</div>
			)}

			{/* View Invoice Modal */}
			{selected && (
				<InvoiceViewModal
					invoice={selected}
					onClose={() => setSelected(null)}
				/>
			)}
		</div>
	);
};

export default Invoices;
