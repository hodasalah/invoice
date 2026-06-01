import type { RootState } from '@/store';
import { useAppSelector } from '@/store/hooks';
import type { Client, InvoiceData, InvoiceItem } from '@/types/types';
import { ArrowLeft, Globe, Mail, MapPin, Phone, Plus, RotateCcw, Save, Trash2 } from 'lucide-react';
import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';

interface InvoiceFormProps {
	editData?: InvoiceData | null;
	onSave: (data: InvoiceData) => void;
	onClose: () => void;
	clients: Client[];
	mode?: 'page' | 'modal';
}

/** Generate initials logo from company name */
const CompanyLogo = ({ name }: { name: string }) => {
	const initials = name
		.split(/\s+/)
		.filter(Boolean)
		.slice(0, 2)
		.map((w) => w[ 0 ].toUpperCase())
		.join('');

	return (
		<div
			className='w-14 h-14 rounded-xl flex items-center justify-center shrink-0 text-white font-black text-xl shadow-md select-none'
			style={{ background: 'linear-gradient(135deg, var(--color-primary), var(--color-primary-hover))' }}
		>
			{initials || '?'}
		</div>
	);
};

const InvoiceForm = ({ editData, onSave, clients = [], onClose }: InvoiceFormProps) => {
	const { t } = useTranslation('common');
	const currentUser = useAppSelector((state: RootState) => state.user.currentUser);
	const [ originalData, setOriginalData ] = useState<InvoiceData | null>(null);

	const defaultInvoiceData: InvoiceData = {
		invoiceNumber: '',
		date: new Date().toISOString().split('T')[ 0 ],
		dueDate: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString().split('T')[ 0 ],
		currency: 'USD',
		status: 'unpaid',
		clientId: '',
		clientName: '',
		clientEmail: '',
		clientPhone: '',
		clientAddress: {
			street: '',
			city: '',
			state: '',
			country: '',
			zip: '',
		},
		items: [
			{
				id: '1',
				description: '',
				quantity: 1,
				price: 0,
				total: 0,
			},
		],
		subTotal: 0,
		vat: 0,
		total: 0,
		senderName: currentUser?.companyName || 'My Company',
		senderAddress: currentUser?.address
			? `${currentUser.address.street || ''}, ${currentUser.address.city || ''}`.trim().replace(/^,\s*|,\s*$/g, '') || '123 Anywhere St., Any City'
			: '123 Anywhere St., Any City',
		senderPhone: currentUser?.phone || '+123-456-7890',
		senderEmail: currentUser?.email || 'hello@company.com',
		senderWebsite: 'www.company.com',
		paymentDetails: "Bank Transfer / Credit Card / E-Wallet / PayPal\nLarana Bank\nAccount Name: Your Name\n+123-456-7890",
		notes: "Thank you for your business!\nPlease make payment by the due date.",
	};

	const [ data, setData ] = useState<InvoiceData>(defaultInvoiceData);

	// Load editData
	useEffect(() => {
		if (editData) {
			setData(editData);
			setOriginalData(editData);
		}
	}, [ editData ]);

	// Prefill sender details from currentUser once loaded
	useEffect(() => {
		if (currentUser && !editData) {
			setData((prev) => ({
				...prev,
				senderName: prev.senderName || currentUser.companyName || 'My Company',
				senderAddress: prev.senderAddress || (currentUser.address
					? `${currentUser.address.street || ''}, ${currentUser.address.city || ''}`.trim().replace(/^,\s*|,\s*$/g, '')
					: '123 Anywhere St., Any City'),
				senderPhone: prev.senderPhone || currentUser.phone || '+123-456-7890',
				senderEmail: prev.senderEmail || currentUser.email || 'hello@company.com',
			}));
		}
	}, [ currentUser, editData ]);

	const handleClientChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
		const client = clients.find((c) => c.id === e.target.value);
		if (!client) {
			setData((prev) => ({
				...prev,
				clientId: '',
				clientName: '',
				clientEmail: '',
				clientPhone: '',
				clientAddress: { street: '', city: '', state: '', country: '', zip: '' },
			}));
			return;
		}

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
			items: [ ...prev.items, newItem ],
		}));
	};

	const removeItem = (index: number) => {
		const updated = data.items.filter((_, i) => i !== index);
		updateTotals(updated);
	};

	const handleItemChange = (index: number, field: 'description' | 'quantity' | 'price', value: string | number) => {
		const updated = [ ...data.items ];
		if (field === 'description') {
			updated[ index ].description = value as string;
		} else if (field === 'quantity') {
			updated[ index ].quantity = Math.max(0, value as number);
		} else if (field === 'price') {
			updated[ index ].price = Math.max(0, value as number);
		}
		updated[ index ].total = updated[ index ].quantity * updated[ index ].price;
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
		} else {
			setData(defaultInvoiceData);
		}
	};

	const handleSave = () => {
		if (!data.clientId) {
			alert('Please select a client.');
			return;
		}
		if (data.items.length === 0) {
			alert('Please add at least one item.');
			return;
		}
		onSave(data);
	};

	if (!data) return null;

	// Primary color derived from CSS variable
	const PRIMARY = '#44814E';
	const PRIMARY_LIGHT = '#d1e7d5'; // light tint for borders / strips

	return (
		<div className='w-full min-h-screen flex flex-col bg-gray-50 dark:bg-gray-900'>
			{/* Page Header / Toolbar */}
			<div className='flex justify-between items-center px-6 py-4 bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 shadow-sm sticky top-0 z-20'>
				<div className='flex items-center gap-3'>
					<button
						onClick={onClose}
						className='flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors font-medium'
					>
						<ArrowLeft className='w-4 h-4' />
						{t('back')}
					</button>
					<span className='text-gray-300 dark:text-gray-600'>|</span>
					<h1 className='text-lg font-bold text-gray-800 dark:text-white'>
						{editData ? t('edit_invoice') : t('new_invoice')}
					</h1>
				</div>
				<div className='flex gap-2'>
					<button
						onClick={handleReset}
						className='flex items-center gap-2 px-4 py-2 border border-gray-300 dark:border-gray-600 hover:bg-gray-50 dark:hover:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-lg text-sm font-medium transition-colors'
					>
						<RotateCcw className='w-4 h-4' />
						{t('reset')}
					</button>
					<button
						onClick={handleSave}
						className='flex items-center gap-2 px-5 py-2 text-white rounded-lg text-sm font-medium transition-colors shadow-sm'
						style={{ backgroundColor: PRIMARY }}
						onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = '#32603a')}
						onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = PRIMARY)}
					>
						<Save className='w-4 h-4' />
						{t('save_invoice')}
					</button>
				</div>
			</div>

			{/* A4-Style Invoice Sheet */}
			<div className='flex-1 flex justify-center p-6 lg:p-10'>
				<div
					className='w-full max-w-[860px] bg-white text-gray-800 shadow-xl border border-gray-200 flex flex-col relative overflow-hidden font-sans p-0'
					style={{ minHeight: '1100px' }}
				>
					{/* Top Accent Strip */}
					<div
						className='h-7 w-full relative overflow-hidden flex justify-between px-4 select-none'
						style={{ backgroundColor: PRIMARY_LIGHT }}
					>
						<div className='flex gap-1 h-full items-center'>
							<span className='w-1.5 h-full bg-white transform -skew-x-[30deg]'></span>
							<span className='w-3 h-full bg-white transform -skew-x-[30deg]'></span>
							<span className='w-6 h-full bg-white transform -skew-x-[30deg]'></span>
							<span className='w-1.5 h-full bg-white transform -skew-x-[30deg]'></span>
							<span className='w-12 h-full bg-white transform -skew-x-[30deg]'></span>
						</div>
						<div className='flex gap-1 h-full items-center'>
							<span className='w-12 h-full bg-white transform -skew-x-[30deg]'></span>
							<span className='w-1.5 h-full bg-white transform -skew-x-[30deg]'></span>
							<span className='w-6 h-full bg-white transform -skew-x-[30deg]'></span>
							<span className='w-3 h-full bg-white transform -skew-x-[30deg]'></span>
							<span className='w-1.5 h-full bg-white transform -skew-x-[30deg]'></span>
						</div>
					</div>

					{/* Invoice Body */}
					<div className='px-10 py-8 flex-1 flex flex-col'>

						{/* Logo and Contact Info Header */}
						<div className='flex flex-col sm:flex-row justify-between items-start gap-6 mb-8'>
							{/* Left: Company Logo (initials) + Editable Company Name */}
							<div className='flex items-center gap-3'>
								<CompanyLogo name={data.senderName || 'C'} />
								<div>
									<input
										type='text'
										value={data.senderName || ''}
										onChange={(e) => setData({ ...data, senderName: e.target.value })}
										className='text-xl font-extrabold bg-transparent border-b border-transparent hover:border-gray-300 focus:outline-none w-full font-sans tracking-wide py-0.5'
										style={{ color: PRIMARY }}
										placeholder={t('company_name')}
									/>
									<span className='text-[10px] uppercase tracking-[0.25em] text-gray-400 font-bold block mt-0.5 select-none'>
										{t('company')}
									</span>
								</div>
							</div>

							{/* Right: Contact Details */}
							<div className='grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-2 text-[11px] text-gray-600 w-full sm:max-w-md'>
								<div className='flex items-center gap-2 border-b border-transparent hover:border-gray-200 px-1 py-0.5'>
									<MapPin className='w-3.5 h-3.5 shrink-0' style={{ color: PRIMARY }} />
									<input
										type='text'
										value={data.senderAddress || ''}
										onChange={(e) => setData({ ...data, senderAddress: e.target.value })}
										className='bg-transparent focus:outline-none w-full text-gray-700 font-medium'
										placeholder={t('address_city')}
									/>
								</div>
								<div className='flex items-center gap-2 border-b border-transparent hover:border-gray-200 px-1 py-0.5'>
									<Mail className='w-3.5 h-3.5 shrink-0' style={{ color: PRIMARY }} />
									<input
										type='email'
										value={data.senderEmail || ''}
										onChange={(e) => setData({ ...data, senderEmail: e.target.value })}
										className='bg-transparent focus:outline-none w-full text-gray-700 font-medium'
										placeholder={t('email')}
									/>
								</div>
								<div className='flex items-center gap-2 border-b border-transparent hover:border-gray-200 px-1 py-0.5'>
									<Phone className='w-3.5 h-3.5 shrink-0' style={{ color: PRIMARY }} />
									<input
										type='text'
										value={data.senderPhone || ''}
										onChange={(e) => setData({ ...data, senderPhone: e.target.value })}
										className='bg-transparent focus:outline-none w-full text-gray-700 font-medium'
										placeholder={t('phone')}
									/>
								</div>
								<div className='flex items-center gap-2 border-b border-transparent hover:border-gray-200 px-1 py-0.5'>
									<Globe className='w-3.5 h-3.5 shrink-0' style={{ color: PRIMARY }} />
									<input
										type='text'
										value={data.senderWebsite || ''}
										onChange={(e) => setData({ ...data, senderWebsite: e.target.value })}
										className='bg-transparent focus:outline-none w-full text-gray-700 font-medium'
										placeholder={t('website')}
									/>
								</div>
							</div>
						</div>

						{/* INVOICE Divider */}
						<div className='flex items-center justify-center my-7 select-none'>
							<div className='flex-1 h-[5px] rounded-full' style={{ backgroundColor: PRIMARY_LIGHT }}></div>
							<span className='mx-6 text-3xl font-black tracking-[0.3em] uppercase' style={{ color: PRIMARY }}>{t('invoice')}</span>
							<div className='flex-1 h-[5px] rounded-full' style={{ backgroundColor: PRIMARY_LIGHT }}></div>
						</div>

						{/* Bill To & Invoice Meta Box */}
						<div className='flex flex-col md:flex-row justify-between items-start gap-8 mb-8'>
							{/* Bill To Column */}
							<div className='flex-1 w-full'>
								<h3 className='text-xs font-black uppercase tracking-[0.15em] mb-2 select-none' style={{ color: PRIMARY }}>{t('bill_to')}</h3>

								<div className='mb-3'>
									<select
										value={data.clientId || ''}
										onChange={handleClientChange}
										className='border border-gray-200 bg-white px-2 py-1.5 rounded text-xs focus:outline-none w-full max-w-[280px] transition-colors'
										style={{ outline: 'none' }}
										onFocus={(e) => (e.currentTarget.style.borderColor = PRIMARY)}
										onBlur={(e) => (e.currentTarget.style.borderColor = '#e5e7eb')}
									>
										<option value=''>-- {t('select_client')} --</option>
										{clients?.map((c) => (
											<option key={c.id} value={c.id}>
												{c.name}
											</option>
										))}
									</select>
								</div>

								{data.clientId ? (
									<div className='text-xs text-gray-700 space-y-1 bg-gray-50 border border-gray-100 p-3 rounded-lg max-w-[320px]'>
										<p className='font-bold' style={{ color: PRIMARY }}>{data.clientName}</p>
										<p className='text-gray-500'>{data.clientEmail}</p>
										<p className='text-gray-500'>{data.clientPhone}</p>
										<p className='text-gray-500 whitespace-pre-line'>
											{data.clientAddress?.street && `${data.clientAddress.street}, `}
											{data.clientAddress?.city && `${data.clientAddress.city}`}
											{data.clientAddress?.country && `, ${data.clientAddress.country}`}
										</p>
									</div>
								) : (
									<div className='border border-dashed border-red-200 bg-red-50/50 text-red-500 text-xs p-3 rounded-lg max-w-[320px] italic'>
										{t('select_client')}
									</div>
								)}
							</div>

							{/* Info Box */}
							<div className='border-2 p-4 text-xs text-gray-700 space-y-3 w-full md:w-auto md:min-w-[300px] shrink-0' style={{ borderColor: PRIMARY_LIGHT }}>
								<div className='flex items-center justify-between gap-2 border-b border-gray-100 pb-1.5'>
									<span className='font-bold uppercase tracking-wide' style={{ color: PRIMARY }}>{t('invoice_number')}:</span>
									<input
										type='text'
										value={data.invoiceNumber || ''}
										onChange={(e) => setData({ ...data, invoiceNumber: e.target.value })}
										className='bg-transparent focus:outline-none text-right font-semibold w-36 py-0.5'
										style={{ color: PRIMARY }}
										placeholder='INV-2026-001'
									/>
								</div>
								<div className='flex items-center justify-between gap-2 border-b border-gray-100 pb-1.5'>
									<span className='font-bold uppercase tracking-wide' style={{ color: PRIMARY }}>{t('date')}:</span>
									<input
										type='date'
										value={data.date || ''}
										onChange={(e) => setData({ ...data, date: e.target.value })}
										className='bg-transparent focus:outline-none text-right w-36 py-0.5 text-gray-700 font-medium'
									/>
								</div>
								<div className='flex items-center justify-between gap-2 border-b border-gray-100 pb-1.5'>
									<span className='font-bold uppercase tracking-wide' style={{ color: PRIMARY }}>{t('due_date')}:</span>
									<input
										type='date'
										value={data.dueDate || ''}
										onChange={(e) => setData({ ...data, dueDate: e.target.value })}
										className='bg-transparent focus:outline-none text-right w-36 py-0.5 text-gray-700 font-medium'
									/>
								</div>
								<div className='flex items-center justify-between gap-2'>
									<span className='font-bold uppercase tracking-wide' style={{ color: PRIMARY }}>{t('status')}:</span>
									<select
										value={data.status || 'unpaid'}
										onChange={(e) => setData({ ...data, status: e.target.value as 'paid' | 'unpaid' })}
										className='bg-transparent focus:outline-none text-right w-36 py-0.5 font-semibold cursor-pointer'
										style={{
											color: data.status === 'paid' ? '#15803d' : '#b45309',
											outline: 'none',
										}}
									>
										<option value='unpaid' style={{ color: '#b45309' }}>{t('unpaid')}</option>
										<option value='paid' style={{ color: '#15803d' }}>{t('paid')}</option>
									</select>
								</div>
							</div>
						</div>

						{/* Table Section */}
						<div className='mb-8'>
							<h3 className='text-xs font-black uppercase tracking-[0.15em] mb-2 select-none' style={{ color: PRIMARY }}>{t('project_service_details')}</h3>
							<div className='border overflow-hidden' style={{ borderColor: PRIMARY_LIGHT }}>
								<table className='w-full border-collapse text-xs'>
									<thead>
										<tr className='bg-white font-black border-b select-none' style={{ color: PRIMARY, borderColor: PRIMARY_LIGHT }}>
											<th className='py-2.5 px-3 text-center w-12 border-r' style={{ borderColor: PRIMARY_LIGHT }}>{t('no')}</th>
											<th className='py-2.5 px-3 text-left border-r' style={{ borderColor: PRIMARY_LIGHT }}>{t('project_service')}</th>
											<th className='py-2.5 px-3 text-center w-16 border-r' style={{ borderColor: PRIMARY_LIGHT }}>{t('qty')}</th>
											<th className='py-2.5 px-3 text-center w-24 border-r' style={{ borderColor: PRIMARY_LIGHT }}>{t('rate')}</th>
											<th className='py-2.5 px-3 text-right w-28'>{t('amount')}</th>
											<th className='py-2.5 px-2 text-center w-10 border-l print:hidden bg-[#fbfbfb]' style={{ borderColor: PRIMARY_LIGHT }}></th>
										</tr>
									</thead>
									<tbody>
										{data.items?.map((item, i) => (
											<tr key={item.id || i} className='border-b hover:bg-gray-50/50 group' style={{ borderColor: PRIMARY_LIGHT }}>
												<td className='py-2.5 px-3 text-center text-gray-500 font-bold border-r select-none' style={{ borderColor: PRIMARY_LIGHT }}>
													{String(i + 1).padStart(2, '0')}
												</td>
												<td className='p-1 border-r' style={{ borderColor: PRIMARY_LIGHT }}>
													<input
														type='text'
														value={item.description}
														onChange={(e) => handleItemChange(i, 'description', e.target.value)}
														className='w-full bg-transparent focus:outline-none px-2 py-1 text-gray-700 font-medium'
														placeholder={t('project_service')}
													/>
												</td>
												<td className='p-1 border-r text-center' style={{ borderColor: PRIMARY_LIGHT }}>
													<input
														type='number'
														value={item.quantity === 0 ? '' : item.quantity}
														onChange={(e) => handleItemChange(i, 'quantity', Number(e.target.value))}
														className='w-full bg-transparent focus:outline-none text-center px-1 py-1 text-gray-700 font-medium'
														min='0'
														placeholder='1'
													/>
												</td>
												<td className='p-1 border-r text-center' style={{ borderColor: PRIMARY_LIGHT }}>
													<input
														type='number'
														value={item.price === 0 ? '' : item.price}
														onChange={(e) => handleItemChange(i, 'price', Number(e.target.value))}
														className='w-full bg-transparent focus:outline-none text-center px-1 py-1 text-gray-700 font-medium'
														min='0'
														step='0.01'
														placeholder='0.00'
													/>
												</td>
												<td className='py-2.5 px-3 text-right text-gray-800 font-semibold select-none'>
													{item.total.toFixed(2)}
												</td>
												<td className='p-1 text-center border-l print:hidden bg-[#fbfbfb]' style={{ borderColor: PRIMARY_LIGHT }}>
													<button
														type='button'
														onClick={() => removeItem(i)}
														className='text-red-400 hover:text-red-600 transition-colors p-1'
														title='Delete Row'
													>
														<Trash2 className='w-4 h-4 mx-auto' />
													</button>
												</td>
											</tr>
										))}

										{/* Spacer empty rows */}
										{data.items.length < 3 && Array.from({ length: 3 - data.items.length }).map((_, spacerIndex) => (
											<tr key={`spacer-${spacerIndex}`} className='border-b h-10 select-none' style={{ borderColor: PRIMARY_LIGHT }}>
												<td className='border-r py-2 px-3 text-center text-gray-300 font-bold' style={{ borderColor: PRIMARY_LIGHT }}>
													{String(data.items.length + spacerIndex + 1).padStart(2, '0')}
												</td>
												<td className='border-r' style={{ borderColor: PRIMARY_LIGHT }}></td>
												<td className='border-r' style={{ borderColor: PRIMARY_LIGHT }}></td>
												<td className='border-r' style={{ borderColor: PRIMARY_LIGHT }}></td>
												<td></td>
												<td className='border-l bg-[#fbfbfb] print:hidden' style={{ borderColor: PRIMARY_LIGHT }}></td>
											</tr>
										))}

										{/* Add Line Row */}
										<tr className='print:hidden select-none bg-gray-50/30'>
											<td colSpan={5} className='p-2 text-left border-r' style={{ borderColor: PRIMARY_LIGHT }}>
												<button
													type='button'
													onClick={addItem}
													className='flex items-center gap-1.5 text-xs font-extrabold py-1 px-3 transition-colors hover:opacity-75'
													style={{ color: PRIMARY }}
												>
													<Plus className='w-4 h-4' /> {t('add_item')}
												</button>
											</td>
											<td className='bg-[#fbfbfb] border-l' style={{ borderColor: PRIMARY_LIGHT }}></td>
										</tr>
									</tbody>
								</table>
							</div>
						</div>

						{/* Bottom: Payment Info & Totals */}
						<div className='grid grid-cols-1 md:grid-cols-12 gap-8 items-start mb-8'>
							{/* Left: Payment Info */}
							<div className='md:col-span-7 text-xs'>
								<span className='font-bold uppercase tracking-wide block mb-2 select-none' style={{ color: PRIMARY }}>{t('payment_methods_accepted')}</span>
								<textarea
									value={data.paymentDetails || ''}
									onChange={(e) => setData({ ...data, paymentDetails: e.target.value })}
									className='w-full h-28 bg-white border p-3 rounded-none focus:outline-none text-gray-700 leading-relaxed font-medium resize-none transition-colors'
									style={{ borderColor: PRIMARY_LIGHT }}
									onFocus={(e) => (e.currentTarget.style.borderColor = PRIMARY)}
									onBlur={(e) => (e.currentTarget.style.borderColor = PRIMARY_LIGHT)}
									placeholder='Provide bank details, transfer instructions...'
								/>
							</div>

							{/* Right: Totals */}
							<div className='md:col-span-5 text-xs flex flex-col justify-end w-full select-none'>
								<div className='border border-b-0 py-3 px-4 flex justify-between items-center bg-white' style={{ borderColor: PRIMARY_LIGHT }}>
									<span className='font-black uppercase tracking-wide' style={{ color: PRIMARY }}>{t('vat')}</span>
									<span className='font-bold text-gray-800 text-sm'>{data.vat.toFixed(2)}</span>
								</div>
								<div className='border py-3.5 px-4 flex justify-between items-center bg-white font-black text-base border-t-2' style={{ borderColor: PRIMARY_LIGHT, borderTopColor: PRIMARY }}>
									<span className='uppercase tracking-wide' style={{ color: PRIMARY }}>{t('total_due')}</span>
									<span style={{ color: PRIMARY }}>{data.total.toFixed(2)}</span>
								</div>
							</div>
						</div>

						{/* Notes Section */}
						<div className='text-xs mt-auto'>
							<span className='font-bold uppercase tracking-wide block mb-2 select-none' style={{ color: PRIMARY }}>{t('notes')}</span>
							<textarea
								value={data.notes || ''}
								onChange={(e) => setData({ ...data, notes: e.target.value })}
								className='w-full h-20 bg-white border p-3 rounded-none focus:outline-none text-gray-600 leading-relaxed font-medium resize-none transition-colors'
								style={{ borderColor: PRIMARY_LIGHT }}
								onFocus={(e) => (e.currentTarget.style.borderColor = PRIMARY)}
								onBlur={(e) => (e.currentTarget.style.borderColor = PRIMARY_LIGHT)}
								placeholder='Add customized terms, notes, or messages...'
							/>
						</div>
					</div>

					{/* Bottom Accent Strip */}
					<div
						className='h-7 w-full relative overflow-hidden flex justify-between px-4 select-none mt-auto'
						style={{ backgroundColor: PRIMARY_LIGHT }}
					>
						<div className='flex gap-1 h-full items-center'>
							<span className='w-1.5 h-full bg-white transform -skew-x-[30deg]'></span>
							<span className='w-3 h-full bg-white transform -skew-x-[30deg]'></span>
							<span className='w-6 h-full bg-white transform -skew-x-[30deg]'></span>
							<span className='w-1.5 h-full bg-white transform -skew-x-[30deg]'></span>
							<span className='w-12 h-full bg-white transform -skew-x-[30deg]'></span>
						</div>
						<div className='flex gap-1 h-full items-center'>
							<span className='w-12 h-full bg-white transform -skew-x-[30deg]'></span>
							<span className='w-1.5 h-full bg-white transform -skew-x-[30deg]'></span>
							<span className='w-6 h-full bg-white transform -skew-x-[30deg]'></span>
							<span className='w-3 h-full bg-white transform -skew-x-[30deg]'></span>
							<span className='w-1.5 h-full bg-white transform -skew-x-[30deg]'></span>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};

export default InvoiceForm;
