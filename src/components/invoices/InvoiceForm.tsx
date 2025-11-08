import { useEffect, useState } from 'react';
import type { Client, InvoiceData, InvoiceItem } from '@/types/types';
interface InvoiceFormProps {
	editData?: InvoiceData | null;
	onSave: (data: InvoiceData) => void;
	onClose: () => void;
	clients: Client[];
}

const InvoiceForm = ({ editData, onSave, clients = [], onClose }: InvoiceFormProps) => {
	const [originalData, setOriginalData] = useState<InvoiceData | null>(null);

	const [data, setData] = useState<InvoiceData>({
		id: undefined,
		invoiceNumber: '',
		date: '',
		dueDate: '',
		currency: 'USD',

		clientId: '',
		clientName: '',
		clientEmail: '',
		clientPhone: '',
		clientAddress: {
			street: '',
			city: '',
			state: '',
			zip: '',
			country: '',
		},

		items: [],
		subTotal: 0,
		vat: 0,
		total: 0,
		status: 'unpaid',
	});

	useEffect(() => {
		if (editData) {
			setData(editData);
			setOriginalData(editData);
		}
	}, [editData]);

	const handleClientChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
		const client = clients.find((c) => c.id === e.target.value);
		if (!client) return;

		setData((prev) => ({
			...prev,
			clientId: client.id!,
			clientName: client.name,
			clientEmail: client.email,
			clientPhone: client.phone,
			clientAddress: {
				street: client.address.street,
				city: client.address.city,
				state: client.address.state,
				zip: client.address.zip,
				country: client.address.country,
			},
		}));
	};

	const addItem = () => {
		const newItem: InvoiceItem = {
			id: Date.now().toString(),
			description: '',
			quantity: 1,
			price: 0,
			total: 0,
		};

		setData((prev) => ({
			...prev,
			items: [...prev.items, newItem],
		}));
	};

	const handleItemChange = (index: number, field: 'description' | 'quantity' | 'price', value: string | number) => {
		const updated = [...data.items];
		if (field === 'description') {
			updated[index].description = value as string;
		} else if (field === 'quantity') {
			updated[index].quantity = value as number;
		} else if (field === 'price') {
			updated[index].price = value as number;
		}
		updated[index].total = updated[index].quantity * updated[index].price;
		updateTotals(updated);
	};

	const updateTotals = (items: InvoiceItem[]) => {
		const sub = items.reduce((sum, i) => sum + i.total, 0);
		const vat = sub * 0.15;
		const total = sub + vat;

		setData((prev) => ({
			...prev,
			items,
			subTotal: sub,
			vat,
			total,
		}));
	};

	const handleReset = () => {
		if (originalData) {
			setData(originalData);
			updateTotals(originalData.items);
		}
	};

	const handleSave = () => onSave(data);
	if (!data) return null;

	return (
		<div className='bg-white p-6 rounded-xl shadow-lg w-full max-w-2xl'>
			<h2 className='text-xl font-bold mb-4'>
				{editData ? 'Edit Invoice' : 'Create Invoice'}
			</h2>

			{/* اختيار العميل */}
			<label className='block mb-2 text-sm font-medium'>
				Select Client
			</label>
			<select
				name='clientId'
				value={data.clientId}
				onChange={handleClientChange}
				className='border p-2 rounded w-full mb-3'
			>
				<option value=''>Select Client</option>
				{clients?.map((c) => (
					<option
						key={c.id}
						value={c.id}
					>
						{c.name}
					</option>
				))}
			</select>

			{/* بيانات العميل */}
			<input
				className='border p-2 rounded w-full mb-2'
				value={data.clientName}
				placeholder='Client Name'
				readOnly
			/>
			<input
				className='border p-2 rounded w-full mb-2'
				value={data.clientEmail}
				placeholder='Email'
				readOnly
			/>
			<input
				className='border p-2 rounded w-full mb-2'
				value={data.clientPhone}
				placeholder='Phone'
				readOnly
			/>
			<textarea
				className='border p-2 rounded w-full mb-2'
				value={`${data.clientAddress.street}, ${data.clientAddress.city}, ${data.clientAddress.state}, ${data.clientAddress.zip}, ${data.clientAddress.country}`}
				placeholder='Address'
				readOnly
			/>

			{/* Items */}
			<h3 className='font-semibold my-3 flex justify-between'>
				Invoice Items
				<button
					className='bg-green-500 text-white px-2 py-1 rounded'
					onClick={addItem}
				>
					+ Add Item
				</button>
			</h3>

			{data.items?.map((item, i) => (
				<div
					key={item.id}
					className='grid grid-cols-4 gap-2 mb-2 items-center'
				>
					<input
						className='border p-2 rounded'
						value={item.description}
						onChange={(e) =>
							handleItemChange(i, 'description', e.target.value)
						}
						placeholder='Description'
					/>

					<input
						className='border p-2 rounded'
						type='number'
						value={item.quantity}
						onChange={(e) =>
							handleItemChange(
								i,
								'quantity',
								Number(e.target.value),
							)
						}
						placeholder='Qty'
					/>

					<input
						className='border p-2 rounded'
						type='number'
						value={item.price}
						onChange={(e) =>
							handleItemChange(i, 'price', Number(e.target.value))
						}
						placeholder='Price'
					/>

					<span className='font-medium text-right'>
						{item.total.toFixed(2)}
					</span>
				</div>
			))}

			{/* totals */}
			<div className='mt-4 border-t pt-3 text-right'>
				<p>Subtotal: {data.subTotal.toFixed(2)}</p>
				<p>VAT (15%): {data.vat.toFixed(2)}</p>
				<p className='font-bold text-lg'>
					Total: {data.total.toFixed(2)}
				</p>
			</div>

			{/* Action buttons */}
			<div className='flex justify-end gap-3 mt-5'>
				<button
					className='bg-gray-300 px-4 py-2 rounded'
					onClick={onClose}
				>
					Cancel
				</button>

				{editData && (
					<button
						className='bg-yellow-500 text-white px-4 py-2 rounded'
						onClick={handleReset}
					>
						Reset
					</button>
				)}

				<button
					className='bg-blue-600 text-white px-4 py-2 rounded'
					onClick={handleSave}
				>
					Save
				</button>
			</div>
		</div>
	);
};

export default InvoiceForm;
