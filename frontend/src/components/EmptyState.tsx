interface Props {
  filtered: boolean;
}

export function EmptyState({ filtered }: Props) {
  return (
    <div className="flex flex-col items-center justify-center py-20 text-gray-500">
      <p className="text-lg font-medium">
        {filtered
          ? 'Nenhum velório encontrado para este registro.'
          : 'Nenhum velório em andamento no momento.'}
      </p>
    </div>
  );
}
