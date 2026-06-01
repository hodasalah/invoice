import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router';
import { getDocById, updateData } from '@/firebaseConfigs/firestore';

import { fetchClientsByUser } from '@/features/clients/clientsSlice';
import type { InvoiceData } from '@/types/types';
import InvoiceForm from '@/components/invoices/InvoiceForm';
import { ArrowLeft } from 'lucide-react';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { editInvoice } from '@/features/invoices/invoiceSlice';
import { toast } from 'sonner';
/**
 * Page for editing an existing invoice.
 * It loads the invoice data by ID, pre‑populates the InvoiceForm,
 * and re‑uses the same save logic as the CreateInvoice page.
 */
const EditInvoice = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const currentUser = useAppSelector((state) => state.user.currentUser);
  const clients = useAppSelector((state) => state.clients.clients) as any[];
  const [invoice, setInvoice] = useState<InvoiceData | null>(null);
  const [loading, setLoading] = useState(true);

  // Check authorization
  useEffect(() => {
    if (currentUser?.role === 'client') {
      toast.error('❌ You are not authorized to edit invoices.');
      navigate('/dashboard/invoices/list');
    }
  }, [currentUser, navigate]);

  // Fetch invoice data
  useEffect(() => {
    const fetchInvoice = async () => {
      if (!id) return;
      setLoading(true);
      try {
        const data = (await getDocById('invoices', id)) as InvoiceData;
        setInvoice(data);
      } catch (err) {
        console.error('Failed to load invoice:', err);
      } finally {
        setLoading(false);
      }
    };
    fetchInvoice();
  }, [id]);

  // Fetch clients for the form dropdown
  useEffect(() => {
    if (currentUser?.uid) {
      dispatch(fetchClientsByUser(currentUser.uid) as any);
    }
  }, [currentUser?.uid, dispatch]);

  const handleClose = () => {
    navigate('/dashboard/invoices/list');
  };
  const handleSave = async (updatedData: InvoiceData) => {
    try {
      if (!id || !currentUser?.uid) return;
      const { id: _unused, ...dataWithoutId } = updatedData;
      await updateData('invoices', id, dataWithoutId);
      const updatedInvoice = { id, userId: currentUser.uid, ...dataWithoutId } as any;
      dispatch(editInvoice(updatedInvoice));
      toast.success('✅ Invoice updated successfully');
      navigate('/dashboard/invoices/list');
    } catch (err) {
      console.error(err);
      toast.error('❌ Error updating invoice');
    }
  };
  if (loading) {
    return <div className="p-8 text-center text-gray-600">Loading invoice...</div>;
  }

  if (!invoice) {
    return <div className="p-8 text-center text-red-600">Invoice not found.</div>;
  }

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col p-4 md:p-8">
      {/* Toolbar */}
      <div className="max-w-4xl w-full mx-auto flex flex-col sm:flex-row items-center gap-4 mb-6">
        <button
          onClick={handleClose}
          className="flex items-center text-gray-600 hover:text-gray-900 transition-colors"
        >
          <ArrowLeft className="w-4 h-4 mr-1" />
          Back to Invoices
        </button>
        <h1 className="text-xl font-bold text-gray-800">Edit Invoice</h1>
      </div>

      <div className="max-w-4xl w-full mx-auto bg-white rounded-xl shadow-lg border border-gray-100 overflow-hidden mb-12">
        <div className="p-8 md:p-16">
          <InvoiceForm editData={invoice} onSave={handleSave} onClose={handleClose} clients={clients} mode="page" />
        </div>
      </div>
    </div>
  );
};

export default EditInvoice;
