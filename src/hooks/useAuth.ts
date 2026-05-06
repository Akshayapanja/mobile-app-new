import { useQuery } from '@tanstack/react-query';
import { authService } from '../services';
import { useAuthStore } from '../stores';

export const useAuth = () => {
  const { user, token, isAuthenticated, setUser, clearAuth } = useAuthStore();

  const { data: profile } = useQuery({
    queryKey: ['profile'],
    queryFn: () => authService.getMe(),
    enabled: isAuthenticated,
    retry: 0,
  });

  return {
    user: (profile as any)?.data || user,
    token,
    isAuthenticated,
    setUser,
    clearAuth,
  };
};

