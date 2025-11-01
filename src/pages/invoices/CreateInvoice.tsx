import InvoiceForm, {
	type InvoiceData,
} from '@/components/invoices/InvoiceForm';
import React from 'react';

const CreateInvoice: React.FC = () => {
	const handleSave = async (invoice: InvoiceData) => {
		console.log('Saving invoice:', invoice);
		alert('Invoice saved successfully!');
		// Here you can save to database or global state
	};

	return <InvoiceForm onSave={handleSave} />;
};

export default CreateInvoice;
