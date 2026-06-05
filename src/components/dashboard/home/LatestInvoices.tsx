import { t } from 'i18next';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router';

interface Props {
  invoices: any[];
}

export default function LatestInvoices({
  invoices,
}: Props) {
  const {t}=useTranslation("common");
  return (
    <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-6">

      <div className="flex justify-between items-center mb-6">
        <h3 className="font-semibold text-lg">
          {t('dashboard.recentInvoices')}
        </h3>

        <Link
          to="/dashboard/invoices/list"
          className="text-emerald-600 text-sm"
        >
          {t('dashboard.viewAll')}
        </Link>
      </div>

      <div className="space-y-4">
        {invoices.map((invoice) => (
          <div
            key={invoice.id}
            className="flex items-center justify-between border-b border-slate-100 dark:border-slate-800 pb-4"
          >
            <div>
              <p className="font-medium">
                {invoice.invoiceNumber}
              </p>

              <p className="text-sm text-slate-500">
                {invoice.clientName}
              </p>
            </div>

            <div className="flex gap-2 items-center">
              <p className="font-semibold">
                ${invoice.total}
              </p>

              <span
                className={`text-xs px-2 py-1 rounded-full ${invoice.status === 'paid'
                    ? 'bg-emerald-100 text-emerald-700'
                    : 'bg-red-100 text-red-700'
                  }`}
              >
                {t(invoice.status)}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}