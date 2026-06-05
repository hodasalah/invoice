import {
  CreditCard,
  DollarSign,
  FileText,
  Percent,
  Receipt,
  TrendingUp,
  Users,
  Wallet,
  type LucideIcon,
} from 'lucide-react';
import { useTranslation } from 'react-i18next';

interface Props {
  stats: {
    revenue: number;
    outstanding: number;
    clients: number;
    payments: number;
    invoices: number;
    walletBalance: number;
    averageInvoice: number;
    collectionRate: number;
  };
}

interface StatCardProps {
  title: string;
  value: string;
  icon: LucideIcon;
  subtitle?: string;
}

function StatCard({
  title,
  value,
  icon: Icon,
  subtitle,
}: StatCardProps) {
  const {t} = useTranslation('common');
  return (
    <div
      className="
        bg-white
        dark:bg-slate-900
        rounded-2xl
        p-5
        border
        border-slate-200
        dark:border-slate-800
        shadow-sm
        hover:shadow-md
        transition-all
      "
    >
      <div className="flex justify-between items-start">
        <div>
          <p className="text-sm text-slate-500 dark:text-slate-400">
           {t(`dashboard.${title}`)} 
          </p>

          <h3 className="mt-3 text-3xl font-bold text-slate-900 dark:text-white">
            {value}
          </h3>

          {subtitle && (
            <p className="mt-2 text-xs text-emerald-500">
              {t(`dashboard.${subtitle}`)}
            </p>
          )}
        </div>

        <div className="h-12 w-12 rounded-xl bg-emerald-100 dark:bg-emerald-900/20 flex items-center justify-center">
          <Icon
            size={22}
            className="text-emerald-600"
          />
        </div>
      </div>
    </div>
  );
}

export default function StatsCards({
  stats,
}: Props) {
  const { t } = useTranslation();

  const cards = [
    {
      title: t('revenue'),
      value: `$${stats.revenue.toLocaleString()}`,
      icon: DollarSign,
    },
    {
      title: t('outstanding'),
      value: `$${stats.outstanding.toLocaleString()}`,
      icon: Receipt,
    },
    {
      title: t('wallet_balance'),
      value: `$${stats.walletBalance.toLocaleString()}`,
      icon: Wallet,
    },
    {
      title: t('average_invoice'),
      value: `$${stats.averageInvoice.toFixed(0)}`,
      icon: TrendingUp,
    },
    {
      title: t('Invoices'),
      value: stats.invoices.toLocaleString(),
      icon: FileText,
    },
    {
      title: t('Clients'),
      value: stats.clients.toLocaleString(),
      icon: Users,
    },
    {
      title: t('Payments'),
      value: stats.payments.toLocaleString(),
      icon: CreditCard,
    },
    {
      title: t('collection_rate'),
      value: `${stats.collectionRate.toFixed(0)}%`,
      icon: Percent,
    },
  ];

  return (
    <div className="grid gap-5 sm:grid-cols-2 xl:grid-cols-4">
      {cards.map((card) => (
        <StatCard
          key={card.title}
          title={card.title}
          value={card.value}
          icon={card.icon}
        />
      ))}
    </div>
  );
}