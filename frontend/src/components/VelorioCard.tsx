import { api } from '../services/api';
import type { ListVelorioDto } from '../types/velorio';

interface Props {
  velorio: ListVelorioDto;
}

function formatDate(iso: string): string {
  if (!iso) return '—';
  return new Date(iso).toLocaleString('pt-BR', {
    timeZone: 'America/Sao_Paulo',
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  });
}

export function VelorioCard({ velorio }: Props) {
  const handleExport = () => api.downloadBanner(velorio.id, velorio.nomeCompleto);

  return (
    <div className="flex flex-col gap-4 rounded-xl border border-gray-200 bg-white p-6 shadow-sm">
      <div className="flex items-start justify-between gap-4">
        <div>
          <h2 className="text-xl font-semibold text-gray-900">{velorio.nomeCompleto}</h2>
          <span className="mt-1 inline-block rounded-full bg-blue-100 px-3 py-0.5 text-xs font-medium text-blue-700">
            {velorio.sala}
          </span>
        </div>
        <button
          onClick={handleExport}
          className="shrink-0 rounded-lg bg-gray-900 px-4 py-2 text-sm font-medium text-white hover:bg-gray-700"
        >
          Exportar Banner
        </button>
      </div>

      <div className="grid grid-cols-1 gap-2 border-t border-gray-100 pt-4 sm:grid-cols-2">
        <Field label="Início do velório" value={formatDate(velorio.horarioInicioVelorio)} />
        <Field label="Início do sepultamento" value={formatDate(velorio.horarioInicioSepultamento)} />
        <Field label="Local do sepultamento" value={velorio.localSepultamento} />
        <Field label="Funerária responsável" value={velorio.funerariaResponsavel} />
        <Field label="Registro de óbito" value={velorio.numeroRegistro} />
      </div>
    </div>
  );
}

function Field({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <p className="text-xs font-medium uppercase tracking-wide text-gray-400">{label}</p>
      <p className="mt-0.5 text-sm text-gray-700">{value}</p>
    </div>
  );
}
