import { useEffect, useState } from 'react';
import { api } from './services/api';
import type { ListVelorioDto } from './types/velorio';

export default function App() {
  const [velorios, setVelorios] = useState<ListVelorioDto[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    api
      .getVelorios()
      .then(setVelorios)
      .catch(() => setError(true))
      .finally(() => setLoading(false));
  }, []);

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="border-b border-gray-200 bg-white px-6 py-4 shadow-sm">
        <h1 className="text-2xl font-bold text-gray-900">Dashboard de Velórios</h1>
        <p className="text-sm text-gray-500">Memorial Luto Curitiba — atendimentos em andamento</p>
      </header>

      <main className="mx-auto max-w-4xl px-6 py-8">
        {loading && <p className="text-gray-500">Carregando...</p>}
        {error && <p className="text-red-500">Erro ao carregar velórios.</p>}
        {!loading && !error && velorios.length === 0 && (
          <p className="text-gray-500">Nenhum velório em andamento no momento.</p>
        )}
        <div className="flex flex-col gap-4">
          {velorios.map((v) => (
            <div
              key={v.id}
              className="flex items-center justify-between rounded-xl border border-gray-200 bg-white px-6 py-4 shadow-sm"
            >
              <span className="text-lg font-medium text-gray-900">{v.nomeCompleto}</span>
              <button
                onClick={() => api.downloadBanner(v.id, v.nomeCompleto)}
                className="rounded-lg bg-gray-900 px-4 py-2 text-sm font-medium text-white hover:bg-gray-700"
              >
                Exportar Banner
              </button>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
}
