import { api } from '../services/api';
import type { ListVelorioDto } from '../types/velorio';

interface Props {
  velorio: ListVelorioDto;
}

const ROOM_COLORS = [
  'border-l-indigo-500',
  'border-l-amber-500',
  'border-l-emerald-500',
  'border-l-rose-500',
  'border-l-violet-500',
  'border-l-sky-500',
];

function getRoomColor(sala: string): string {
  const hash = [...sala].reduce((acc, char) => acc + char.charCodeAt(0), 0);
  return ROOM_COLORS[hash % ROOM_COLORS.length];
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
    <div
      className={`flex flex-col gap-4 rounded-xl border border-stone-200 bg-white p-6 shadow-sm border-l-4 ${getRoomColor(velorio.sala)}`}
    >
      <div className="flex items-start justify-between gap-4">
        <div>
          <h2 className="text-xl font-semibold text-slate-900">{velorio.nomeCompleto}</h2>
          <span className="mt-1 inline-block rounded-full bg-amber-100 px-3 py-0.5 text-xs font-medium text-amber-800">
            {velorio.sala}
          </span>
        </div>
        <button
          onClick={handleExport}
          className="shrink-0 rounded-lg bg-amber-600 px-4 py-2 text-sm font-medium text-white hover:bg-amber-700"
        >
          Exportar Banner
        </button>
      </div>

      <div className="grid grid-cols-1 gap-2 border-t border-stone-100 pt-4 sm:grid-cols-2">
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
      <p className="text-xs font-medium uppercase tracking-wide text-stone-400">{label}</p>
      <p className="mt-0.5 text-sm text-slate-700">{value}</p>
    </div>
  );
}
