import { useQuery } from '@tanstack/react-query';
import { getApiHealth } from '@/api/health.api';

export const useApiHealth = () =>
  useQuery({
    queryKey: ['api-health'],
    queryFn: getApiHealth,
    retry: 1,
    refetchInterval: 60_000,
  });
