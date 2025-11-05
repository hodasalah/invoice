import { editInvoice } from '@/features/invoices/invoiceSlice';
import { auth } from '@/firebaseConfigs/firebase';
import { updateData } from '@/firebaseConfigs/firestore';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import InvoiceForm from './InvoiceForm';

const EditInvoiceModal = ({ isOpen, onClose, editData }) => {
	const clients = useSelector((s) => s.clients.clients);

	const [invoiceData, setInvoiceData] = useState(null);

	useEffect(() => {
		if (editData) {
			setInvoiceData({
				id: editData.id,
				invoiceNumber: editData.invoiceNumber,
				date: editData.date,
				dueDate: editData.dueDate,
				currency: editData.currency,

				// ✅ أهم شيء
				clientId: editData.clientId,

				items: editData.items,
				notes: editData.notes,
				subTotal: editData.subTotal,
				vat: editData.vat,
				total: editData.total,
			});
		}
	}, [editData]);

	const dispatch = useDispatch();

	const handleSaveToFirebase = async () => {
		const currentUser = auth.currentUser;
		if (!invoiceData || !currentUser) return;

		await updateData('invoices', invoiceData.id, {
			invoiceNumber: invoiceData.invoiceNumber,
			date: invoiceData.date,
			dueDate: invoiceData.dueDate,
			currency: invoiceData.currency,
			clientId: invoiceData.clientId,
			items: invoiceData.items,
			notes: invoiceData.notes,
			subTotal: invoiceData.subTotal,
			vat: invoiceData.vat,
			total: invoiceData.total,
			userId: currentUser.uid,
		});

		dispatch(editInvoice(invoiceData));
		onClose();
	};

	if (!isOpen) return null;

	return (
		<div className='modal'>
			<h2>Edit Invoice</h2>

			<InvoiceForm
				invoiceData={invoiceData}
				setInvoiceData={setInvoiceData}
				onSubmit={handleSaveToFirebase}
				clients={clients} // ✅ مهم
			/>

			<button onClick={onClose}>Cancel</button>
		</div>
	);
};

export default EditInvoiceModal;
