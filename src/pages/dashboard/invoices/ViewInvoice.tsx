import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router';
import { getDocById } from '@/firebaseConfigs/firestore';
import type { InvoiceData } from '@/types/types';
import { ArrowLeft, Download, Pen } from 'lucide-react';
import { PDFDownloadLink } from '@react-pdf/renderer';
import InvoiceMorganMaxwellLayout from '@/components/invoices/InvoiceMorganMaxwellLayout';
import InvoicePDF from '@/components/invoices/InvoicePDF';
import { useAppSelector } from '@/store/hooks';
import type { RootState } from '@/store';
import { useTranslation } from 'react-i18next';

interface UserProfile {
	firstName: string;
	lastName: string;
	companyName: string;
	email: string;
	phone: string;
	address: { street: string; city: string; state: string; zip: string; country: string };
	vatNumber?: string;
	crNumber?: string;
}

const ViewInvoice = () => {
	const { t } = useTranslation('common');
	const { id } = useParams<{ id: string }>();
	const navigate = useNavigate();
	const currentUser = useAppSelector(
		(state: RootState) => state.user.currentUser,
	);
	const [invoice, setInvoice] = useState<InvoiceData | null>(null);
	const [userProfile, setUserProfile] = useState<UserProfile | null>(null);
	const [loading, setLoading] = useState(true);

	useEffect(() => {
		const fetchInvoiceAndUser = async () => {
			if (!id) return;
			setLoading(true);
			try {
				const data = await getDocById('invoices', id) as InvoiceData;
				setInvoice(data);
				if (data.userId) {
					const userData = await getDocById('users', data.userId) as unknown as UserProfile;
					setUserProfile(userData);
				}
			} catch (error) {
				console.error('Error fetching invoice:', error);
			} finally {
				setLoading(false);
			}
		};
		fetchInvoiceAndUser();
	}, [id]);

	if (loading) {
		return <div className="p-8 text-center text-gray-600">{t('loading_invoice')}</div>;
	}

	if (!invoice) {
		return <div className="p-8 text-center text-red-600">{t('invoice_not_found')}</div>;
	}

	return (
		<div className="min-h-screen bg-gray-50 flex flex-col p-4 md:p-8">
			<div className="max-w-4xl w-full mx-auto flex flex-col sm:flex-row justify-between items-center mb-8 gap-4">
				<button 
					onClick={() => navigate('/dashboard/invoices/list')}
					className="flex items-center text-gray-600 hover:text-gray-900 transition-colors"
				>
					<ArrowLeft className="w-4 h-4 mr-2" />
					{t('back_to_invoices')}
				</button>
				{currentUser?.role !== 'client' && (
					<button
						onClick={() => navigate(`/dashboard/invoices/edit/${id}`)}
						className="flex items-center text-gray-600 hover:text-gray-900 transition-colors font-medium"
					>
						<Pen className="w-4 h-4 mr-2" />
						{t('edit_invoice')}
					</button>
				)}
				
				<PDFDownloadLink 
					document={<InvoicePDF invoice={invoice} userProfile={userProfile} t={t} />} 
					fileName={`Invoice_${invoice.invoiceNumber || invoice.id || 'Document'}.pdf`}
					className="flex items-center gap-2 px-6 py-2.5 bg-primary text-white rounded-lg shadow-sm hover:text-gray-200 transition-all font-medium ripple"
				>
					{({ loading }) => (
						<>
							<Download className="w-4 h-4" />
							{loading ? t('generating_pdf') : t('download_pdf')}
						</>
					)}
				</PDFDownloadLink>
			</div>

			<div className="max-w-4xl w-full mx-auto bg-white rounded-xl shadow-lg border border-gray-100 overflow-hidden mb-12">
				<div className="p-8 md:p-16">
					<InvoiceMorganMaxwellLayout invoice={invoice} userProfile={userProfile} />
				</div>
			</div>
		</div>
	);
};

export default ViewInvoice;
