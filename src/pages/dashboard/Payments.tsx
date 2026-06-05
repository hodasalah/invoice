import { useAppSelector } from '@/store/hooks';
import { collection, getDocs, query, where } from 'firebase/firestore';
import {
  ArrowDownLeft,
  CreditCard,
  DollarSign,
  RefreshCw,
  Search
} from 'lucide-react';
import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { db } from '../../firebaseConfigs/firebase';

interface PaymentRecord {
  id: string;
  userId: string;
  invoiceId: string;
  amount: number;
  method: 'cash' | 'credit_card' | 'bank_transfer';
  transactionId: string;
  date: string;
  invoiceNumber?: string;
  clientName?: string;
}

interface InvoiceRecord {
  invoiceNumber: string;
  clientName: string;
}

const Payments: React.FC = () => {
  const { t } = useTranslation();
  const currentUser = useAppSelector((state) => state.user.currentUser);

  const [ payments, setPayments ] = useState<PaymentRecord[]>([]);
  const [ filteredPayments, setFilteredPayments ] = useState<PaymentRecord[]>([]);
  const [ loading, setLoading ] = useState<boolean>(true);
  const [ searchQuery, setSearchQuery ] = useState<string>('');

  const fetchPaymentsData = async () => {
    if (!currentUser?.uid) return;
    try {
      setLoading(true);

      const paymentsQuery = query(
        collection(db, 'payments'),
        where('userId', '==', currentUser.uid)
      );
      const paymentSnapshot = await getDocs(paymentsQuery);
      const paymentsList = paymentSnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data()
      })) as PaymentRecord[];

      const invoicesQuery = query(
        collection(db, 'invoices'),
        where('userId', '==', currentUser.uid)
      );
      const invoiceSnapshot = await getDocs(invoicesQuery);
      const invoicesMap: Record<string, InvoiceRecord> = {};

      invoiceSnapshot.docs.forEach((doc) => {
        const data = doc.data();
        invoicesMap[ doc.id ] = {
          invoiceNumber: data.invoiceNumber || 'N/A',
          clientName: data.clientName || 'Unknown Client'
        };
      });

      const combinedData = paymentsList.map((payment) => {
        const matchedInvoice = invoicesMap[ payment.invoiceId ];
        return {
          ...payment,
          invoiceNumber: matchedInvoice ? matchedInvoice.invoiceNumber : 'N/A',
          clientName: matchedInvoice ? matchedInvoice.clientName : 'Unknown Client'
        };
      });

      combinedData.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());

      setPayments(combinedData);
      setFilteredPayments(combinedData);
    } catch (error) {
      console.error('Error fetching payments:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPaymentsData();
  }, [ currentUser?.uid ]);

  useEffect(() => {
    const lowerQuery = searchQuery.toLowerCase();
    const filtered = payments.filter(
      (p) =>
        p.transactionId.toLowerCase().includes(lowerQuery) ||
        (p.invoiceNumber && p.invoiceNumber.toLowerCase().includes(lowerQuery)) ||
        (p.clientName && p.clientName.toLowerCase().includes(lowerQuery))
    );
    setFilteredPayments(filtered);
  }, [ searchQuery, payments ]);

  const getMethodBadge = (method: string) => {
    switch (method) {
      case 'credit_card':
        return (
          <span className="inline-flex items-center gap-1 w-fit px-3 py-1 text-xs rounded-lg border bg-purple-50 text-purple-600 border-purple-100 dark:bg-purple-500/10 dark:text-purple-300 dark:border-purple-500/20">
            <CreditCard size={12} className="text-purple-400 dark:text-purple-300" />
            {t('Credit Card', 'Credit Card')}
          </span>
        );
      case 'bank_transfer':
        return (
          <span className="inline-flex items-center gap-1 w-fit px-3 py-1 text-xs rounded-lg border bg-blue-50 text-blue-600 border-blue-100 dark:bg-blue-500/10 dark:text-blue-300 dark:border-blue-500/20">
            <RefreshCw size={12} className="text-blue-400 dark:text-blue-300" />
            {t('Bank Transfer', 'Bank Transfer')}
          </span>
        );
      default:
        return (
          <span className="inline-flex items-center gap-1 w-fit px-3 py-1 text-xs rounded-lg border bg-amber-50 text-amber-600 border-amber-100 dark:bg-amber-500/10 dark:text-amber-300 dark:border-amber-500/20">
            <DollarSign size={12} className="text-amber-400 dark:text-amber-300" />
            {t('Cash', 'Cash')}
          </span>
        );
    }
  };

  const totalReceived = filteredPayments.reduce((sum, p) => sum + p.amount, 0);
  const creditCardCount = filteredPayments.filter((p) => p.method === 'credit_card').length;
  const bankCount = filteredPayments.filter((p) => p.method === 'bank_transfer').length;

  return (
    <div className="min-h-screen p-6 bg-gray-50 text-slate-700 dark:bg-gray-950 dark:text-gray-200">
      <div className="mb-6">
        <h1 className="flex items-center gap-2 text-lg font-bold text-slate-800 dark:text-white">
          <ArrowDownLeft className="rounded bg-emerald-50 p-0.5 text-emerald-500 dark:bg-emerald-500/10 dark:text-emerald-400" size={24} />
          {t('Payments History', 'Payments History')}
        </h1>
        <p className="mt-0.5 text-[11px] text-slate-400 dark:text-slate-500">
          {t('Track all incoming transactions and monetary updates', 'Track all incoming transactions and monetary updates')}
        </p>
      </div>

      <div className="mb-6 flex justify-end">
        <div className="relative w-full sm:w-64">
          <Search className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 dark:text-slate-500" size={14} />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder={t('Search transactions...', 'Search transactions...')}
            className="w-full rounded-lg border border-slate-200 bg-slate-50/70 py-1.5 pl-4 pr-9 text-xs text-slate-700 placeholder-slate-400 outline-none transition-colors focus:border-slate-300 dark:border-gray-800 dark:bg-gray-900 dark:text-gray-100 dark:placeholder-slate-500 dark:focus:border-gray-700"
          />
        </div>
      </div>

      {loading ? (
        <div className="flex h-48 flex-col items-center justify-center gap-2 text-slate-400 dark:text-slate-500">
          <div className="h-5 w-5 animate-spin rounded-full border-2 border-emerald-500 border-t-transparent"></div>
          <p className="text-[11px]">Loading...</p>
        </div>
      ) : filteredPayments.length === 0 ? (
        <div className="rounded-xl border border-dashed border-slate-200 py-12 text-center text-xs text-slate-400 dark:border-gray-800 dark:text-slate-500">
          {t('No data available', 'No data available')}
        </div>
      ) : (
        <>
          <div className="mb-6 grid grid-cols-1 gap-4 md:grid-cols-3">
            <div className="rounded-xl border border-slate-100 bg-slate-50/70 p-4 shadow-sm dark:border-gray-800 dark:bg-gray-900">
              <p className="text-xs font-medium uppercase text-slate-400 dark:text-slate-500">Total Income</p>
              <p className="mt-1 text-xl font-bold text-emerald-600 dark:text-emerald-400">
                +${totalReceived.toLocaleString(undefined, { minimumFractionDigits: 2 })}
              </p>
            </div>

            <div className="rounded-xl border border-slate-100 bg-slate-50/70 p-4 shadow-sm dark:border-gray-800 dark:bg-gray-900">
              <p className="text-xs font-medium uppercase text-slate-400 dark:text-slate-500">Card Transactions</p>
              <p className="mt-1 text-xl font-bold text-slate-700 dark:text-gray-100">
                {creditCardCount} Payments
              </p>
            </div>

            <div className="rounded-xl border border-slate-100 bg-slate-50/70 p-4 shadow-sm dark:border-gray-800 dark:bg-gray-900">
              <p className="text-xs font-medium uppercase text-slate-400 dark:text-slate-500">Bank Transfers</p>
              <p className="mt-1 text-xl font-bold text-slate-700 dark:text-gray-100">
                {bankCount} Transfers
              </p>
            </div>
          </div>

          <div className="overflow-x-auto rounded-2xl border border-slate-100 bg-white shadow-sm dark:border-gray-800 dark:bg-gray-900">
            <table className="min-w-[750px] w-full border-collapse text-left">
              <thead>
                <tr className="border-b border-slate-100 bg-slate-50/70 text-[11px] font-bold uppercase tracking-wider text-slate-400 dark:border-gray-800 dark:bg-gray-950/40 dark:text-slate-500">
                  <th className="px-4 py-3 font-bold"># TRANSACTION ID</th>
                  <th className="px-4 py-3 font-bold">INVOICE NUMBER</th>
                  <th className="px-4 py-3 font-bold">CLIENT</th>
                  <th className="px-4 py-3 font-bold">DATE</th>
                  <th className="px-4 py-3 font-bold">METHOD</th>
                  <th className="px-4 py-3 text-right font-bold">AMOUNT</th>
                </tr>
              </thead>

              <tbody className="text-xs text-slate-600 dark:text-slate-300">
                {filteredPayments.map((payment) => (
                  <tr
                    key={payment.id}
                    className="border-b border-slate-50/80 transition-colors hover:bg-slate-50/60 dark:border-gray-800/80 dark:hover:bg-gray-800/40"
                  >
                    <td className="px-4 py-4 font-medium text-emerald-500 dark:text-emerald-400">
                      {payment.transactionId}
                    </td>

                    <td className="px-4 py-4">
                      <span className="rounded border border-slate-100 bg-slate-50 px-2 py-0.5 text-[11px] font-medium text-slate-600 dark:border-gray-700 dark:bg-gray-800 dark:text-slate-300">
                        {payment.invoiceNumber}
                      </span>
                    </td>

                    <td className="px-4 py-4 font-semibold text-slate-700 dark:text-gray-100">
                      {payment.clientName}
                    </td>

                    <td className="px-4 py-4 text-slate-400 dark:text-slate-500">
                      {new Date(payment.date).toLocaleDateString('en-US', {
                        year: 'numeric',
                        month: '2-digit',
                        day: '2-digit'
                      })}
                    </td>

                    <td className="px-4 py-4">
                      {getMethodBadge(payment.method)}
                    </td>

                    <td className="px-4 py-4 text-right font-bold text-emerald-600 dark:text-emerald-400">
                      +${payment.amount.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </>
      )}
    </div>
  );
};

export default Payments;