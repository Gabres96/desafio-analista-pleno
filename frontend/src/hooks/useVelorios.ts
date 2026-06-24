import { useQuery } from '@tanstack/react-query';
import { api } from '../services/api';

export function useVelorios(registro?: string) {
  return useQuery({
    queryKey: ['velorios', registro],
    queryFn: () => api.getVelorios(registro),
    refetchInterval: 30_000,
  });
}
