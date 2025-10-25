import React, { useEffect } from 'react';
import type { InvoiceData } from './InvoiceForm';
import InvoiceForm from './InvoiceForm';

interface InvoiceModalProps {
	isOpen: boolean;
	onClose: () => void;
	editData?: InvoiceData | null;
}

const EditInvoiceModal: React.FC<InvoiceModalProps> = ({
	isOpen,
	onClose,
	editData,
}) => {
	const handleSave = async (invoice: InvoiceData) => {
		console.log('Saving invoice:', invoice);
		alert('Invoice saved!');
	};

	// Close on Escape key
	useEffect(() => {
		const handleEsc = (e: KeyboardEvent) => {
			if (e.key === 'Escape') onClose();
		};
		document.addEventListener('keydown', handleEsc);
		return () => document.removeEventListener('keydown', handleEsc);
	}, [onClose]);

	if (!isOpen) return null;

	return (
		<div
			className='fixed inset-0 bg-black/50 flex items-center justify-center z-50
			opacity-0 animate-fadeIn'
			onClick={onClose} 
		>
			<div
				className='bg-white rounded-lg shadow-lg w-full max-w-3xl p-6 relative'
				onClick={(e) => e.stopPropagation()} // stop closing when clicking inside
			>
				<InvoiceForm
					onClose={onClose}
					onSave={handleSave}
					editData={editData}
					mode='modal' // always modal for edit
				/>
			</div>
		</div>
	);
};

export default EditInvoiceModal;
