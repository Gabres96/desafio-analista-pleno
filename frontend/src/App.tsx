import { useState } from 'react';
import { SearchBar } from './components/SearchBar';
import { VelorioList } from './components/VelorioList';
import { useVelorios } from './hooks/useVelorios';

export default function App() {
  const [input, setInput] = useState('');
  const [registro, setRegistro] = useState('');

  const { data: velorios = [], isLoading, isError } = useVelorios(registro || undefined);

  const handleSearch = () => setRegistro(input.trim());

  const handleChange = (value: string) => {
    setInput(value);
    if (value === '') setRegistro('');
  };

  return (
    <div className="min-h-screen bg-stone-50">
      <header className="bg-slate-900 px-6 py-5 shadow-lg">
        <div className="mx-auto max-w-5xl">
          <h1 className="text-2xl font-bold text-white">Dashboard de Velórios</h1>
          <p className="mt-0.5 text-sm text-slate-400">
            Memorial Luto Curitiba &mdash; atendimentos em andamento
          </p>
        </div>
      </header>

      <main className="mx-auto max-w-5xl px-6 py-8">
        <div className="mb-6">
          <SearchBar value={input} onChange={handleChange} onSearch={handleSearch} />
        </div>

        {isLoading && (
          <p className="text-center text-stone-500">Carregando atendimentos...</p>
        )}

        {isError && (
          <p className="text-center text-red-500">
            Erro ao carregar os atendimentos. Tente novamente.
          </p>
        )}

        {!isLoading && !isError && (
          <>
            {velorios.length > 0 && (
              <p className="mb-4 text-sm text-stone-500">
                {registro
                  ? `${velorios.length} resultado${velorios.length !== 1 ? 's' : ''} para "${registro}"`
                  : `${velorios.length} ${velorios.length === 1 ? 'atendimento ativo' : 'atendimentos ativos'}`}
              </p>
            )}
            <VelorioList velorios={velorios} filtered={!!registro} />
          </>
        )}
      </main>
    </div>
  );
}
