import InvoiceForm from '@/components/invoices/InvoiceForm';
import { fetchClientsByUser } from '@/features/clients/clientsSlice';
import {
	addInvoice,
	fetchInvoicesByUser,
} from '@/features/invoices/invoiceSlice';
import { addData } from '@/firebaseConfigs/firestore';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import type { Client, InvoiceData } from '@/types/types';
import { useEffect } from 'react';
import { useNavigate } from 'react-router';
import { toast } from 'sonner';

const CreateInvoice = () => {
	const dispatch = useAppDispatch();
	const currentUser = useAppSelector((state) => state.user.currentUser);
	const clients = useAppSelector((state) => state.clients.clients) as Client[];
	const navigate = useNavigate();

	// Check authorization
	useEffect(() => {
		if (currentUser?.role === 'client') {
			toast.error('❌ You are not authorized to create invoices.');
			navigate('/dashboard/invoices/list');
		}
	}, [currentUser, navigate]);

	useEffect(() => {
		if (currentUser?.uid) {
			dispatch(fetchClientsByUser(currentUser.uid));
		}
	}, [currentUser?.uid, dispatch]);

	console.log('Clients from Redux:', clients);

	const generateInvoiceNumber = () => {
		const random = Math.floor(100 + Math.random() * 900);
		const year = new Date().getFullYear();
		return `INV-${year}-${random}`;
	};

	const handleSave = async (invoice: InvoiceData) => {
		try {
			if (!currentUser?.uid) return;

			const { id, ...dataWithoutId } = invoice;

			const invoiceNumber =
				dataWithoutId.invoiceNumber || generateInvoiceNumber();

			const date =
				dataWithoutId.date || new Date().toISOString().split('T')[0];

			const invoiceToSave = {
				...dataWithoutId,
				invoiceNumber,
				date,
				userId: currentUser.uid,
			};

			const savedRef = await addData('invoices', invoiceToSave);

			const savedInvoice = {
				id: savedRef.id,
				...invoiceToSave,
				customer: invoiceToSave.clientName || '',
				amount: invoiceToSave.total || 0,
			};

			dispatch(addInvoice(savedInvoice as any));
			dispatch(fetchInvoicesByUser(currentUser.uid));

			toast.success('✅ Invoice Saved Successfully');
			navigate('/dashboard/invoices/list');
		} catch (err) {
			console.error(err);
			toast.error('❌ Error saving invoice');
		}
	};


	const handleClose = () => {
		window.history.back();
	};

	return (
		<InvoiceForm
			onSave={handleSave}
			onClose={handleClose}
			clients={clients}
		/>
	);
};

export default CreateInvoice;
