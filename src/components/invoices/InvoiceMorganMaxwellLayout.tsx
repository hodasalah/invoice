import React from 'react';
import type { InvoiceData } from '@/types/types';
import { MapPin, Mail, Phone, Globe } from 'lucide-react';
import CompanyLogo from './CompanyLogo';
import { useTranslation } from 'react-i18next';

const PRIMARY = '#44814E';
const PRIMARY_LIGHT = '#d1e7d5';

interface InvoiceLayoutProps {
	invoice: InvoiceData;
	userProfile?: any;
}

const InvoiceMorganMaxwellLayout: React.FC<InvoiceLayoutProps> = ({ invoice, userProfile }) => {
	const { t } = useTranslation('common');
	// Utility for formatting currency
	const formatCurrency = (amount: number) => {
		return new Intl.NumberFormat('en-US', {
			style: 'currency',
			currency: invoice.currency || 'USD',
		}).format(amount);
	};

	// Fallback logic for customization
	const senderName = invoice.senderName || userProfile?.companyName || 'Arowwai Industries';
	const senderAddress = invoice.senderAddress || (userProfile?.address
		? `${userProfile.address.street || ''}, ${userProfile.address.city || ''}`.trim().replace(/^,\s*|,\s*$/g, '')
		: '123 Anywhere St., Any City');
	const senderPhone = invoice.senderPhone || userProfile?.phone || '+123-456-7890';
	const senderEmail = invoice.senderEmail || userProfile?.email || 'hello@reallygreatsite.com';
	const senderWebsite = invoice.senderWebsite || 'www.reallygreatsite.com';
	const paymentDetails = invoice.paymentDetails || "Payment Methods Accepted:\nBank Transfer / Credit Card / E-Wallet / PayPal\nLarana Bank\nOlivia Wilson\n+123-456-7890";
	const notes = invoice.notes || "Thank you for your business!\nPlease make payment by the due date.\nFor questions regarding this invoice, contact us at hello@reallygreatsite.com";

	return (
		<div
			className='w-full bg-white text-gray-800 flex flex-col relative overflow-hidden font-sans p-0 shadow-sm border border-gray-100 max-w-[860px] mx-auto'
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

			{/* Invoice Body Content */}
			<div className='px-10 py-8 flex-1 flex flex-col'>

				{/* Logo and Contact Info Header */}
				<div className='flex flex-col sm:flex-row justify-between items-start gap-6 mb-8'>
					{/* Left: Company Logo (initials) + Company Name */}
					<div className='flex items-center gap-3'>
						<CompanyLogo name={senderName || 'C'} />
						<div>
							<h1 className='text-xl font-extrabold font-sans tracking-wide leading-tight py-0.5' style={{ color: PRIMARY }}>
								{senderName}
							</h1>
							<span className='text-[10px] uppercase tracking-[0.25em] text-gray-400 font-bold block mt-0.5 select-none'>
								{t('company')}
							</span>
						</div>
					</div>

					{/* Right: Contact Details */}
					<div className='grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-2 text-[11px] text-gray-600 w-full sm:max-w-md'>
						<div className='flex items-center gap-2 px-1 py-0.5'>
							<MapPin className='w-3.5 h-3.5 shrink-0' style={{ color: PRIMARY }} />
							<span className='text-gray-700 font-medium'>{senderAddress}</span>
						</div>
						<div className='flex items-center gap-2 px-1 py-0.5'>
							<Mail className='w-3.5 h-3.5 shrink-0' style={{ color: PRIMARY }} />
							<span className='text-gray-700 font-medium'>{senderEmail}</span>
						</div>
						<div className='flex items-center gap-2 px-1 py-0.5'>
							<Phone className='w-3.5 h-3.5 shrink-0' style={{ color: PRIMARY }} />
							<span className='text-gray-700 font-medium'>{senderPhone}</span>
						</div>
						<div className='flex items-center gap-2 px-1 py-0.5'>
							<Globe className='w-3.5 h-3.5 shrink-0' style={{ color: PRIMARY }} />
							<span className='text-gray-700 font-medium'>{senderWebsite}</span>
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

						<div className='text-xs text-gray-700 space-y-1 bg-gray-50 border border-gray-100 p-3 rounded-lg max-w-[320px]'>
							<p className='font-bold' style={{ color: PRIMARY }}>{invoice.clientName}</p>
							<p className='text-gray-500'>{invoice.clientEmail}</p>
							<p className='text-gray-500'>{invoice.clientPhone}</p>
							<p className='text-gray-500 whitespace-pre-line'>
								{invoice.clientAddress?.street && `${invoice.clientAddress.street}, `}
								{invoice.clientAddress?.city && `${invoice.clientAddress.city}`}
								{invoice.clientAddress?.country && `, ${invoice.clientAddress.country}`}
							</p>
						</div>
					</div>

					{/* Info Box */}
					<div className='border-2 p-4 text-xs text-gray-700 space-y-3 w-full md:w-auto md:min-w-[300px] shrink-0' style={{ borderColor: PRIMARY_LIGHT }}>
						<div className='flex items-center justify-between gap-2 border-b border-gray-100 pb-1.5'>
							<span className='font-bold uppercase tracking-wide' style={{ color: PRIMARY }}>{t('invoice_number')}:</span>
							<span className='font-semibold text-right' style={{ color: PRIMARY }}>{invoice.invoiceNumber || invoice.id || '-'}</span>
						</div>
						<div className='flex items-center justify-between gap-2 border-b border-gray-100 pb-1.5'>
							<span className='font-bold uppercase tracking-wide' style={{ color: PRIMARY }}>{t('date')}:</span>
							<span className='font-medium text-gray-700 text-right'>{invoice.date}</span>
						</div>
						<div className='flex items-center justify-between gap-2 border-b border-gray-100 pb-1.5'>
							<span className='font-bold uppercase tracking-wide' style={{ color: PRIMARY }}>{t('due_date')}:</span>
							<span className='font-medium text-gray-700 text-right'>{invoice.dueDate}</span>
						</div>
						<div className='flex items-center justify-between gap-2'>
							<span className='font-bold uppercase tracking-wide' style={{ color: PRIMARY }}>{t('status')}:</span>
							<span
								className='font-semibold text-right px-2 py-0.5 rounded-full text-xs'
								style={{
									color: invoice.status === 'paid' ? '#15803d' : '#b45309',
									backgroundColor: invoice.status === 'paid' ? '#dcfce7' : '#fef3c7',
								}}
							>
								{invoice.status === 'paid' ? t('paid') : t('unpaid')}
							</span>
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
								</tr>
							</thead>
							<tbody>
								{invoice.items?.map((item, i) => (
									<tr key={item.id || i} className='border-b hover:bg-gray-50/50' style={{ borderColor: PRIMARY_LIGHT }}>
										<td className='py-2.5 px-3 text-center text-gray-500 font-bold border-r select-none' style={{ borderColor: PRIMARY_LIGHT }}>
											{String(i + 1).padStart(2, '0')}
										</td>
										<td className='py-2.5 px-3 border-r text-gray-700 font-medium' style={{ borderColor: PRIMARY_LIGHT }}>
											{item.description}
										</td>
										<td className='py-2.5 px-3 border-r text-center text-gray-700 font-medium' style={{ borderColor: PRIMARY_LIGHT }}>
											{item.quantity}
										</td>
										<td className='py-2.5 px-3 border-r text-center text-gray-700 font-medium' style={{ borderColor: PRIMARY_LIGHT }}>
											{formatCurrency(item.price)}
										</td>
										<td className='py-2.5 px-3 text-right text-gray-800 font-semibold select-none'>
											{formatCurrency(item.total)}
										</td>
									</tr>
								))}

								{/* Spacer empty rows */}
								{invoice.items.length < 3 && Array.from({ length: 3 - invoice.items.length }).map((_, spacerIndex) => (
									<tr key={`spacer-${spacerIndex}`} className='border-b h-10 select-none' style={{ borderColor: PRIMARY_LIGHT }}>
										<td className='border-r py-2 px-3 text-center text-gray-300 font-bold' style={{ borderColor: PRIMARY_LIGHT }}>
											{String(invoice.items.length + spacerIndex + 1).padStart(2, '0')}
										</td>
										<td className='border-r' style={{ borderColor: PRIMARY_LIGHT }}></td>
										<td className='border-r' style={{ borderColor: PRIMARY_LIGHT }}></td>
										<td className='border-r' style={{ borderColor: PRIMARY_LIGHT }}></td>
										<td></td>
									</tr>
								))}
							</tbody>
						</table>
					</div>
				</div>

				{/* Bottom: Payment Info & Totals */}
				<div className='grid grid-cols-1 md:grid-cols-12 gap-8 items-start mb-8'>
					{/* Left: Payment Info */}
					<div className='md:col-span-7 text-xs'>
						<span className='font-bold uppercase tracking-wide block mb-2 select-none' style={{ color: PRIMARY }}>{t('payment_methods_accepted')}</span>
						<p
							className='w-full bg-white border p-3 text-gray-700 leading-relaxed font-medium whitespace-pre-line min-h-[96px]'
							style={{ borderColor: PRIMARY_LIGHT }}
						>
							{paymentDetails}
						</p>
					</div>

					{/* Right: Totals */}
					<div className='md:col-span-5 text-xs flex flex-col justify-end w-full select-none'>
						<div className='border border-b-0 py-3 px-4 flex justify-between items-center bg-white' style={{ borderColor: PRIMARY_LIGHT }}>
							<span className='font-black uppercase tracking-wide' style={{ color: PRIMARY }}>{t('vat')}</span>
							<span className='font-bold text-gray-800 text-sm'>{formatCurrency(invoice.vat)}</span>
						</div>
						<div className='border py-3.5 px-4 flex justify-between items-center bg-white font-black text-base border-t-2' style={{ borderColor: PRIMARY_LIGHT, borderTopColor: PRIMARY }}>
							<span className='uppercase tracking-wide' style={{ color: PRIMARY }}>{t('total_due')}</span>
							<span style={{ color: PRIMARY }}>{formatCurrency(invoice.total)}</span>
						</div>
					</div>
				</div>

				{/* Notes Section */}
				<div className='text-xs mt-auto'>
					<span className='font-bold uppercase tracking-wide block mb-2 select-none' style={{ color: PRIMARY }}>{t('notes')}</span>
					<p
						className='w-full bg-white border p-3 text-gray-600 leading-relaxed font-medium whitespace-pre-line min-h-[64px]'
						style={{ borderColor: PRIMARY_LIGHT }}
					>
						{notes}
					</p>
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
	);
};

export default InvoiceMorganMaxwellLayout;
