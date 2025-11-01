import React, { useEffect, useMemo, useState } from 'react';

export interface InvoiceItem {
	id: string;
	description: string;
	quantity: number;
	price: number;
	total: number;
}

export interface InvoiceData {
	id: string;
	date: string;
	dueDate: string;
	clientName: string;
	clientEmail: string;
	clientPhone: string;
	clientAddress: string;
	paymentTerms: string;
	items: InvoiceItem[];
	discount: number;
	taxRate: number;
	note: string;
	status: 'draft' | 'sent' | 'paid' | 'overdue';
}

interface InvoiceFormProps {
	onClose?: () => void;
	onSave?: (invoice: InvoiceData) => void;
	editData?: InvoiceData | null;
	mode?: 'page' | 'modal';
}

const InvoiceForm: React.FC<InvoiceFormProps> = ({
	onClose,
	onSave,
	editData = null,
	mode,
}) => {
	const [ invoiceData, setInvoiceData ] = useState<InvoiceData>({
		id: `INV-${Date.now()}`,
		date: new Date().toISOString().split('T')[ 0 ],
		dueDate: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000)
			.toISOString()
			.split('T')[ 0 ],
		clientName: '',
		clientEmail: '',
		clientPhone: '',
		clientAddress: '',
		paymentTerms: 'Net 30',
		items: [ { id: '1', description: '', quantity: 1, price: 0, total: 0 } ],
		discount: 0,
		taxRate: 0,
		note: 'Thank you for your business!',
		status: 'draft',
	});

	const [ isLoading, setIsLoading ] = useState(false);

	useEffect(() => {
		if (editData) setInvoiceData(editData);
	}, [ editData ]);
	const handleInputChange = (
		e: React.ChangeEvent<
			HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
		>,
	) => {
		const { name, value, type } = e.target;
		setInvoiceData((prev) => ({
			...prev,
			[ name ]:
				type === 'number' || name === 'discount' || name === 'taxRate'
					? Number(value)
					: value,
		}));
	};

	const handleItemChange = (
		id: string,
		field: keyof InvoiceItem,
		value: string | number,
	) => {
		setInvoiceData((prev) => ({
			...prev,
			items: prev.items.map((item) => {
				if (item.id === id) {
					const updatedItem = {
						...item,
						[ field ]:
							field === 'description'
								? String(value)
								: Number(value),
					};
					if (field === 'quantity' || field === 'price') {
						updatedItem.total =
							updatedItem.quantity * updatedItem.price;
					}
					return updatedItem;
				}
				return item;
			}),
		}));
	};

	const addItem = () => {
		setInvoiceData((prev) => ({
			...prev,
			items: [
				...prev.items,
				{
					id: `${Date.now()}-${Math.random()}`,
					description: '',
					quantity: 1,
					price: 0,
					total: 0,
				},
			],
		}));
	};

	const removeItem = (id: string) => {
		if (invoiceData.items.length > 1) {
			setInvoiceData((prev) => ({
				...prev,
				items: prev.items.filter((item) => item.id !== id),
			}));
		}
	};

	const subtotal = useMemo(
		() => invoiceData.items.reduce((sum, item) => sum + item.total, 0),
		[ invoiceData.items ],
	);
	const discountAmount = useMemo(
		() => (subtotal * invoiceData.discount) / 100,
		[ subtotal, invoiceData.discount ],
	);
	const taxAmount = useMemo(
		() => ((subtotal - discountAmount) * invoiceData.taxRate) / 100,
		[ subtotal, discountAmount, invoiceData.taxRate ],
	);
	const grandTotal = useMemo(
		() => subtotal - discountAmount + taxAmount,
		[ subtotal, discountAmount, taxAmount ],
	);

	const handleSubmit = (e: React.FormEvent) => {
		e.preventDefault();
		setIsLoading(true);
		setTimeout(() => {
			if (onSave) onSave(invoiceData);
			if (onClose && mode === 'modal') onClose();
			setIsLoading(false);
		}, 500);
	};

	const formWrapperClass =
		mode === 'modal'
			? 'relative max-h-[80vh] overflow-y-auto p-4'
			: 'max-w-4xl mx-auto p-6';

	const submitButtonText =
		mode === 'modal'
			? 'Save Changes'
			: editData
				? 'Update Invoice'
				: 'Create Invoice';

	// Modal close button only in modal mode
	const showCloseButton = mode === 'modal' && onClose;

	return (
		<form
			onSubmit={handleSubmit}
			className={`${formWrapperClass} space-y-6 bg-white rounded-lg`}
		>
			{/* Close button for modal */}
			{showCloseButton && (
				<button
					type='button'
					onClick={onClose}
					className='absolute top-2 right-2 text-2xl font-bold text-primary hover:text-gray-900'
				>
					×
				</button>
			)}

			<h1 className='text-2xl font-bold'>
				{editData ? 'Edit Invoice' : 'Create New Invoice'}
			</h1>

			<div className='flex flex-col gap-2'>
				<input
					name='clientName'
					value={invoiceData.clientName}
					onChange={handleInputChange}
					placeholder='Client Name'
					className='border p-2 rounded'
				/>
				<input
					name='clientEmail'
					value={invoiceData.clientEmail}
					onChange={handleInputChange}
					placeholder='Client Email'
					className='border p-2 rounded'
				/>
				<input
					name='clientPhone'
					value={invoiceData.clientPhone}
					onChange={handleInputChange}
					placeholder='Client Phone'
					className='border p-2 rounded'
				/>
				<textarea
					name='clientAddress'
					value={invoiceData.clientAddress}
					onChange={handleInputChange}
					placeholder='Client Address'
					className='border p-2 rounded'
				/>
			</div>

			<div>
				<h2 className='text-xl font-semibold mt-4'>Items</h2>
				{invoiceData.items.map((item) => (
					<div
						key={item.id}
						className='flex gap-2 items-center mb-2'
					>
						<input
							value={item.description}
							onChange={(e) =>
								handleItemChange(
									item.id,
									'description',
									e.target.value,
								)
							}
							placeholder='Description'
							className='border p-2 rounded flex-1'
						/>
						<input
							type='number'
							value={item.quantity}
							onChange={(e) =>
								handleItemChange(
									item.id,
									'quantity',
									Number(e.target.value),
								)
							}
							className='border p-2 rounded w-20'
						/>
						<input
							type='number'
							value={item.price}
							onChange={(e) =>
								handleItemChange(
									item.id,
									'price',
									Number(e.target.value),
								)
							}
							className='border p-2 rounded w-28'
						/>
						<span className='w-24 text-right'>
							{item.total.toFixed(2)}
						</span>
						<button
							type='button'
							onClick={() => removeItem(item.id)}
							className='text-red-500 font-bold'
						>
							×
						</button>
					</div>
				))}
				<button
					type='button'
					onClick={addItem}
					className='mt-2 px-3 py-1 bg-blue-500 text-white rounded'
				>
					Add Item
				</button>
			</div>

			<div className='mt-4 space-y-1 flex items-center justify-between'>
				<p>Subtotal: {subtotal.toFixed(2)}</p>
				<p>Discount: {discountAmount.toFixed(2)}</p>
				<p>Tax: {taxAmount.toFixed(2)}</p>
				<p className='font-bold'>
					Grand Total: {grandTotal.toFixed(2)}
				</p>
			</div>

			<button
				type='submit'
				disabled={isLoading}
				className='mt-4 px-4 py-2 bg-green-500 text-white rounded'
			>
				{isLoading ? 'Saving...' : submitButtonText}
			</button>
		</form>
	);
};

export default InvoiceForm;