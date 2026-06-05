import {
  TrendingUp,
  AlertTriangle,
  Trophy,
  Percent,
} from 'lucide-react';
import { useTranslation } from 'react-i18next';

interface Props {
  revenue: number;
  outstanding: number;
  collectionRate: number;
  bestClient?: {
    name: string;
    total: number;
  } | null;
}

export default function SmartInsights({
  revenue,
  outstanding,
  collectionRate,
  bestClient,
}: Props) {
  const { t } = useTranslation('common');

  const insights = [
    {
      icon: TrendingUp,
      title: t('dashboard.revenue'),
      value: `$${revenue.toLocaleString()}`,
      color: 'text-emerald-600',
    },
    {
      icon: AlertTriangle,
      title: t('dashboard.outstanding'),
      value: `$${outstanding.toLocaleString()}`,
      color: 'text-orange-500',
    },
    {
      icon: Trophy,
      title: t('dashboard.bestClient'),
      value: bestClient?.name || '-',
      color: 'text-yellow-500',
    },
    {
      icon: Percent,
      title: t('dashboard.collection_rate'),
      value: `${collectionRate.toFixed(0)}%`,
      color: 'text-blue-500',
    },
  ];

  return (
    <div className="rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-6 shadow-sm">
      <h2 className="text-lg font-semibold mb-5">
        {t('dashboard.smartInsights')}
      </h2>

      <div className="space-y-4">
        {insights.map((item) => {
          const Icon = item.icon;

          return (
            <div
              key={item.title}
              className="flex items-center justify-between"
            >
              <div className="flex items-center gap-3">
                <div className="h-10 w-10 rounded-xl bg-slate-100 dark:bg-slate-800 flex items-center justify-center">
                  <Icon
                    size={18}
                    className={item.color}
                  />
                </div>

                <div>
                  <p className="text-sm text-slate-500">
                    {item.title}
                  </p>

                  <p className="font-semibold">
                    {item.value}
                  </p>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}