import React from 'react';

interface InvoiceProps {
	inv: {
		invoiceNumber?: string;
		clientId?: string;
		date?: string;
		total?: number;
		currency?: string;
		status?: string;
	};
	clientName?: string;
}

interface InvoiceViewModalProps {
	invoice: InvoiceProps | null;
	onClose: () => void;
}

const InvoiceViewModal: React.FC<InvoiceViewModalProps> = ({ invoice, onClose }) => {
	console.log(invoice)
	return (
		<div className=" h-full w-full fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
			<div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg max-w-md w-full">
				<h2 className="text-xl font-semibold mb-4">Invoice Details</h2>
				<div className="space-y-2">
					<p><strong>Invoice Number:</strong> {invoice?.inv.invoiceNumber}</p>
					<p><strong>Client:</strong> {invoice?.clientName}</p>
					<p><strong>Date:</strong> {invoice?.inv.date}</p>
					<p><strong>Total:</strong> {invoice?.inv.total} {invoice?.inv.currency}</p>
					<p><strong>Status:</strong>
						<span className={`ml-2 px-2 py-1 rounded-full text-xs font-medium ${
							invoice?.inv.status === 'paid' ? 'bg-green-100 text-green-700' :
							invoice?.inv.status === 'unpaid' ? 'bg-yellow-100 text-yellow-700' :
							'bg-red-100 text-red-700'
						}`}>
							{invoice?.inv.status}
						</span>
					</p>
				</div>
				<div className="mt-4 flex justify-end">
					<button
						onClick={onClose}
						className="px-4 py-2 bg-gray-500 text-white rounded hover:bg-gray-600"
					>
						Close
					</button>
				</div>
			</div>
		</div>
	);
};

export default InvoiceViewModal;
