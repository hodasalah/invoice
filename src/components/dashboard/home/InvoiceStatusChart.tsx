import { useTranslation } from 'react-i18next';
import {
  Cell,
  Pie,
  PieChart,
  ResponsiveContainer,
  Tooltip,
} from 'recharts';

interface Props {
  paid: number;
  unpaid: number;
}

const COLORS = [
  '#10b981',
  '#ef4444',
];

export default function InvoiceStatusChart({
  paid,
  unpaid,
}: Props) {
  const data = [
    {
      name: 'Paid',
      value: paid,
    },
    {
      name: 'Unpaid',
      value: unpaid,
    },
  ];
const {t} = useTranslation("common");
  return (
    <div className="bg-white dark:bg-slate-900 rounded-2xl p-6 border border-slate-200 dark:border-slate-800 shadow-sm">

      <h3 className="font-semibold text-lg mb-6">
        {t('dashboard.invoiceStatus')}
      </h3>

      <div className="h-[320px]">
        <ResponsiveContainer>
          <PieChart>
            <Pie
              data={data}
              innerRadius={70}
              outerRadius={100}
              paddingAngle={4}
              dataKey="value"
            >
              {data.map((_, index) => (
                <Cell
                  key={index}
                  fill={COLORS[ index ]}
                />
              ))}
            </Pie>

            <Tooltip />
          </PieChart>
        </ResponsiveContainer>
      </div>

      <div className="flex justify-center gap-6 mt-4 text-sm">

        <div className="flex items-center gap-2">
          <div className="w-3 h-3 rounded-full bg-emerald-500" />
          {t('paid')} ({paid})
        </div>

        <div className="flex items-center gap-2">
          <div className="w-3 h-3 rounded-full bg-red-500" />
          {t('unpaid')} ({unpaid})
        </div>

      </div>
    </div>
  );
}