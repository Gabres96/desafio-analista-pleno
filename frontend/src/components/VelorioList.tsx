import type { ListVelorioDto } from '../types/velorio';
import { VelorioCard } from './VelorioCard';
import { EmptyState } from './EmptyState';

interface Props {
  velorios: ListVelorioDto[];
  filtered: boolean;
}

export function VelorioList({ velorios, filtered }: Props) {
  if (velorios.length === 0) return <EmptyState filtered={filtered} />;

  return (
    <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
      {velorios.map((v) => (
        <VelorioCard key={v.id} velorio={v} />
      ))}
    </div>
  );
}
