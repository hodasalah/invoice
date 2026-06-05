import { useTranslation } from 'react-i18next';

interface Props {
  payments: any[];
}

export default function RecentPayments({
  payments,
}: Props) {
  const {t} = useTranslation("common");
  return (
    <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-6">

      <h3 className="font-semibold text-lg mb-6">
        {t('dashboard.recentPayments')}
      </h3>

      <div className="space-y-4">
        {payments.map((payment) => (
          <div
            key={payment.id}
            className="flex justify-between"
          >
            <div>
              <p className="font-medium">
                {payment.transactionId}
              </p>

              <p className="text-xs text-slate-500">
                {payment.method}
              </p>
            </div>

            <p className="font-semibold text-emerald-600">
              +${payment.amount}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}