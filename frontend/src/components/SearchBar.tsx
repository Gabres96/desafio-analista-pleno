interface Props {
  value: string;
  onChange: (value: string) => void;
  onSearch: () => void;
}

export function SearchBar({ value, onChange, onSearch }: Props) {
  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') onSearch();
  };

  return (
    <div className="flex gap-2">
      <input
        type="text"
        placeholder="Filtrar por número de registro de óbito..."
        value={value}
        onChange={(e) => onChange(e.target.value)}
        onKeyDown={handleKeyDown}
        className="flex-1 rounded-lg border border-stone-300 px-4 py-2 text-sm focus:border-amber-500 focus:outline-none"
      />
      <button
        onClick={onSearch}
        className="rounded-lg bg-amber-600 px-4 py-2 text-sm font-medium text-white hover:bg-amber-700"
      >
        Buscar
      </button>
      {value && (
        <button
          onClick={() => onChange('')}
          className="rounded-lg border border-stone-300 px-4 py-2 text-sm text-stone-600 hover:bg-stone-100"
        >
          Limpar
        </button>
      )}
    </div>
  );
}
