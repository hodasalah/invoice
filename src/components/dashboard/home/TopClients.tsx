import { useTranslation } from 'react-i18next';

interface Props {
  clients: {
    name: string;
    total: number;
  }[];
}

export default function TopClients({
  clients,
}: Props) {
  const {t} = useTranslation("common");
  return (
    <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-6">

      <h3 className="font-semibold text-lg mb-6">
        {t('dashboard.topClients')}
      </h3>

      <div className="space-y-4">
        {clients.map((client) => (
          <div
            key={client.name}
            className="flex justify-between"
          >
            <span>{client.name}</span>

            <span className="font-semibold">
              ${client.total.toLocaleString()}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}