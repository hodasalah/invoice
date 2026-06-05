import {
  CreditCard,
  Plus,
  UserPlus,
  Wallet,
} from 'lucide-react';

import { useNavigate } from 'react-router';

import { useTranslation } from 'react-i18next';

export default function QuickActions() {
  const navigate = useNavigate();

  const { t } = useTranslation('common');

  const actions = [
    {
      icon: Plus,
      label: t('Create Invoice'),
      path: '/dashboard/invoices/create',
    },
    {
      icon: UserPlus,
      label: t('New Client'),
      path: '/dashboard/clients/new',
    },
    {
      icon: CreditCard,
      label: t('Payments'),
      path: '/dashboard/payments',
    },
    {
      icon: Wallet,
      label: t('Wallets'),
      path: '/dashboard/wallets',
    },
  ];

  return (
    <div className="rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-6 shadow-sm">
      <h2 className="text-lg font-semibold mb-5">
        Quick Actions
      </h2>

      <div className="grid grid-cols-2 gap-3">
        {actions.map((action) => {
          const Icon = action.icon;

          return (
            <button
              key={action.label}
              onClick={() =>
                navigate(action.path)
              }
              className="
                flex
                flex-col
                items-center
                justify-center
                gap-3
                rounded-xl
                border
                border-slate-200
                dark:border-slate-700
                p-4
                hover:bg-slate-50
                dark:hover:bg-slate-800
                transition
              "
            >
              <Icon size={22} />

              <span className="text-sm font-medium">
                {action.label}
              </span>
            </button>
          );
        })}
      </div>
    </div>
  );
}