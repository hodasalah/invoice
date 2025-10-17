import { useState } from 'react';

export const InvoiceViewModal = ({invoice}) => {
	const [invoiceData, setInvoiceData] = useState<InvoiceData>(
		{} as InvoiceData,
	);

	const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const { name, value } = e.target;
		setInvoiceData((prevState) => {
			return { ...prevState, [name]: value };
		});
	};

	return {
		invoiceData,
		handleInputChange,
		setInvoiceData,
	};
};
