import React from 'react';
import InvoiceForm, { type InvoiceData } from '@/components/invoices/InvoiceForm';

const CreateInvoice: React.FC = () => {
	const handleSave = async (invoice: InvoiceData) => {
		console.log('Saving invoice:', invoice);
		alert('Invoice saved successfully!');
		// Here you can save to database or global state
	};

	return (
		<InvoiceForm
			onSave={handleSave}
			mode='page'
		/>
	);
};

export default CreateInvoice;
