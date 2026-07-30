import { useAppSelector } from '@/store'
import { Navigate, Outlet } from 'react-router-dom';
import { Spinner } from "@/components/ui/atoms/Spinner";

export const PublicOnlyRoute = () => {
  const { isAuthenticated, isLoading } = useAppSelector(state => state.auth);

  if (isLoading) {
    return <Spinner isFullPage size="md" />;
  }

  if (isAuthenticated) {
    return <Navigate to="/profile" replace />
  }

  return <Outlet />
}