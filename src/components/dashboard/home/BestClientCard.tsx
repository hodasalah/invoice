import {
  Crown,
  TrendingUp,
  Trophy,
  Receipt,
} from 'lucide-react';
import { useTranslation } from 'react-i18next';

interface Props {
  client: {
    name: string;
    total: number;
  } | null;
}

export default function BestClientCard({
  client,
}: Props) {
  const { t } = useTranslation('common');

  if (!client) return null;

  return (
    <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-emerald-500 to-green-600 p-6 min-h-[260px]">

     

      

      {/* Content */}
      <div className="relative z-10 h-full flex flex-col justify-between">

        {/* Header */}
        <div className="flex items-center justify-between">

          <div className="flex items-center gap-2 text-white">
            <Crown
              size={24}
              className="text-yellow-300"
            />

            <h3 className="text-xl font-semibold">
              {t('dashboard.bestClient')}
            </h3>
          </div>

          <div className="rounded-xl bg-white/15 px-3 py-1 text-white text-sm font-medium">
            #1
          </div>

        </div>

        {/* Main */}
        <div className="flex justify-end">

          <div className="text-right text-white">

            <p className="text-emerald-100 text-sm mb-1">
              VIP Client
            </p>

            <h2 className="text-4xl font-bold">
              {client.name}
            </h2>

            <p className="mt-4 text-emerald-100">
              {t('dashboard.totalRevenue')}
            </p>

            <div className="mt-1 text-5xl font-black">
              ${client.total.toLocaleString()}
            </div>

          </div>

        </div>

        {/* Footer Stats */}
        <div className="grid grid-cols-3 gap-3">

          <div className="rounded-2xl bg-white/10 backdrop-blur-sm p-3 text-white">

            <div className="flex items-center justify-between mb-2">
              <Trophy size={18} />
              <span className="text-xs opacity-80">
                Rank
              </span>
            </div>

            <div className="text-xl font-bold">
              #1
            </div>

          </div>

          <div className="rounded-2xl bg-white/10 backdrop-blur-sm p-3 text-white">

            <div className="flex items-center justify-between mb-2">
              <TrendingUp size={18} />
              <span className="text-xs opacity-80">
                Growth
              </span>
            </div>

            <div className="text-xl font-bold">
              +18%
            </div>

          </div>

          <div className="rounded-2xl bg-white/10 backdrop-blur-sm p-3 text-white">

            <div className="flex items-center justify-between mb-2">
              <Receipt size={18} />
              <span className="text-xs opacity-80">
                Invoices
              </span>
            </div>

            <div className="text-xl font-bold">
              12
            </div>

          </div>

        </div>

      </div>
      {/* Illustration */}
      <img
        src="/assets/bestClient.svg"
        alt=""
        className="
          absolute
          right-0
          bottom-0
          h-full
          opacity-10
          select-none
        "
      />
    </div>
  );
}