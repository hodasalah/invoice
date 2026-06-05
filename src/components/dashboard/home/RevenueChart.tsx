import { useTranslation } from 'react-i18next';
import {
  Area,
  AreaChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts';

interface Props {
  data: {
    name: string;
    revenue: number;
  }[];
}

export default function RevenueChart({
  data,
}: Props) {
  const {t}=useTranslation('common')
  return (
    <div className="bg-white dark:bg-slate-900 rounded-2xl p-6 border border-slate-200 dark:border-slate-800 shadow-sm">

      <div className="mb-6">
        <h3 className="font-semibold text-lg">
          {t('revenueOverview')}
        </h3>

        <p className="text-sm text-slate-500">
          {t('monthlyPaidInvoicesRevenue')}
        </p>
      </div>

      <div className="h-[320px]">
        <ResponsiveContainer>
          <AreaChart data={data}>
            <defs>
              <linearGradient
                id="revenue"
                x1="0"
                y1="0"
                x2="0"
                y2="1"
              >
                <stop
                  offset="5%"
                  stopColor="#10b981"
                  stopOpacity={0.4}
                />

                <stop
                  offset="95%"
                  stopColor="#10b981"
                  stopOpacity={0}
                />
              </linearGradient>
            </defs>

            <CartesianGrid strokeDasharray="3 3" />

            <XAxis dataKey="name" />

            <YAxis />

            <Tooltip />

            <Area
              type="monotone"
              dataKey="revenue"
              stroke="#10b981"
              fillOpacity={1}
              fill="url(#revenue)"
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}