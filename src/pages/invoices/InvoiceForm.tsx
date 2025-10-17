/*************  ✨ Windsurf Command ⭐  *************/
import React, { useState } from 'react';

interface InvoiceData {
	id: string;
	date: string;
	clientName: string;
	clientEmail: string;
	clientPhone: string;
	paymentTerms: string;
	items: any[];
	discount: string;
	taxRate: string;
	grandTotal: string;
	note: string;
}

interface InvoiceFormProps {
	onClose?: () => void;
	editData?: InvoiceData | null;
}

const InvoiceForm: React.FC<InvoiceFormProps> = ({ onClose, editData = null }) => { // eslint-disable-line @typescript-eslint/no-unused-vars
	const [invoiceData, setInvoiceData] = useState<InvoiceData>(editData || {
		id: '',
		date: '',
		clientName: '',
		clientEmail: '',
		clientPhone: '',
		paymentTerms: '',
		items: [],
		discount: '',
		taxRate: '',
		grandTotal: '',
		note: '',
	});

	const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const { name, value } = e.target;
		setInvoiceData((prevState) => {
			return { ...prevState, [name]: value };
		});
	};

	return (
		<div className='grid grid-cols-1 lg:grid-cols-2 gap-6'>
			<div className='space-y-6'>
				<label
					htmlFor='date'
					className='block text-sm font-medium text-gray-700 dark:text-gray-300'
				>
					Invoice Date
				</label>
				<input
					id='date'
					name='date'
					type='date'
					className='mt-1 block w-full'
					placeholder='DD/MM/YYYY'
					value={invoiceData.date}
					onChange={handleInputChange}
				/>
			</div>

			<div className='space-y-6'>
				<label
					htmlFor='clientName'
					className='block text-sm font-medium text-gray-700 dark:text-gray-300'
				>
					Client Name
				</label>
				<input
					id='clientName'
					name='clientName'
					type='text'
					className='mt-1 block w-full'
					placeholder='John Doe'
					value={invoiceData.clientName}
					onChange={handleInputChange}
				/>
			</div>

			<div className='space-y-6'>
				<label
					htmlFor='clientEmail'
					className='block text-sm font-medium text-gray-700 dark:text-gray-300'
				>
					Client Email
				</label>
				<input
					id='clientEmail'
					name='clientEmail'
					type='email'
					className='mt-1 block w-full'
					placeholder='john@example.com'
					value={invoiceData.clientEmail}
					onChange={handleInputChange}
				/>
			</div>

			<div className='space-y-6'>
				<label
					htmlFor='clientPhone'
					className='block text-sm font-medium text-gray-700 dark:text-gray-300'
				>
					Client Phone
				</label>
				<input
					id='clientPhone'
					name='clientPhone'
					type='tel'
					className='mt-1 block w-full'
					placeholder='+1 555 1234'
					value={invoiceData.clientPhone}
					onChange={handleInputChange}
				/>
			</div>

			<div className='space-y-6'>
				<label
					htmlFor='paymentTerms'
					className='block text-sm font-medium text-gray-700 dark:text-gray-300'
				>
					Payment Terms
				</label>
				<input
					id='paymentTerms'
					name='paymentTerms'
					type='text'
					className='mt-1 block w-full'
					placeholder='30 days'
					value={invoiceData.paymentTerms}
					onChange={handleInputChange}
				/>
			</div>

			<div className='space-y-6'>
				<label
					htmlFor='discount'
					className='block text-sm font-medium text-gray-700 dark:text-gray-300'
				>
					Discount
				</label>
				<input
					id='discount'
					name='discount'
					type='number'
					className='mt-1 block w-full'
					placeholder='10'
					value={invoiceData.discount}
					onChange={handleInputChange}
				/>
			</div>

			<div className='space-y-6'>
				<label
					htmlFor='taxRate'
					className='block text-sm font-medium text-gray-700 dark:text-gray-300'
				>
					Tax Rate
				</label>
				<input
					id='taxRate'
					name='taxRate'
					type='number'
					className='mt-1 block w-full'
					placeholder='20'
					value={invoiceData.taxRate}
					onChange={handleInputChange}
				/>
			</div>

			<div className='space-y-6'>
				<label
					htmlFor='grandTotal'
					className='block text-sm font-medium text-gray-700 dark:text-gray-300'
				>
					Grand Total
				</label>
				<input
					id='grandTotal'
					name='grandTotal'
					type='number'
					className='mt-1 block w-full'
					placeholder='1000'
					value={invoiceData.grandTotal}
					onChange={handleInputChange}
				/>
			</div>

			<div className='space-y-6'>
				<label
					htmlFor='note'
					className='block text-sm font-medium text-gray-700 dark:text-gray-300'
				>
					Note
				</label>
				<input
					id='note'
					name='note'
					type='text'
					className='mt-1 block w-full'
					placeholder='Thank you for your business'
					value={invoiceData.note}
					onChange={handleInputChange}
				/>
			</div>
		</div>
	);
};

export default InvoiceForm;
