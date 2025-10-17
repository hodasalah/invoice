// src/routes/InvoicesPage.tsx
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { collection, onSnapshot, query, where } from 'firebase/firestore';
import { Eye, Pencil, Plus, Trash2 } from 'lucide-react';
import { useEffect, useState } from 'react';
import { InvoiceViewModal } from '../../components/invoices/InvoiceViewModal';
import { db } from '../../firebaseConfigs/firebase';
import { deleteData } from '../../firebaseConfigs/firestore';
import InvoiceForm from './InvoiceForm';

const Invoices = () => {
	const [invoices, setInvoices] = useState<any[]>([]);
	const [selected, setSelected] = useState<any | null>(null);
	const [isFormOpen, setIsFormOpen] = useState(false);
	const [editData, setEditData] = useState<any | null>(null);

	const currentUserId = 'testUserId'; // Replace with your actual auth user ID

	useEffect(() => {
		const q = query(
			collection(db, 'invoices'),
			where('userId', '==', currentUserId),
		);
		const unsubscribe = onSnapshot(q, (snapshot) => {
			const data = snapshot.docs.map((d) => ({ id: d.id, ...d.data() }));
			setInvoices(data);
		});
		return unsubscribe;
	}, []);

	const handleDelete = async (id: string) => {
		if (confirm('Are you sure you want to delete this invoice?')) {
			await deleteData('invoices', id);
		}
	};

	return (
		<div className='p-6 space-y-6'>
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

			<Card className='overflow-x-auto p-4'>
				<table className='min-w-full text-sm'>
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
						{invoices.map((inv) => (
							<tr
								key={inv.id}
								className='border-b hover:bg-gray-50'
							>
								<td className='p-3 font-medium'>
									{inv.invoiceNumber}
								</td>
								<td className='p-3'>{inv.clientId}</td>
								<td className='p-3'>{inv.date}</td>
								<td className='p-3'>
									{inv.total} {inv.currency}
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
										onClick={() => setSelected(inv)}
									>
										<Eye className='w-4 h-4' />
									</Button>
									<Button
										size='icon'
										variant='ghost'
										onClick={() => {
											setEditData(inv);
											setIsFormOpen(true);
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
						))}
					</tbody>
				</table>
			</Card>

			{/* Add/Edit Invoice Modal */}
			{isFormOpen && (
				<InvoiceForm
					onClose={() => setIsFormOpen(false)}
					editData={editData}
				/>
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
