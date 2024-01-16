import { useRoutes } from 'react-router-dom';

// routes
import MainRoutes from './MainRoutes';
import AuthenticationRoutes from './AuthenticationRoutes';
import { useLocalStorage } from 'hooks/useLocalStorage';

// ==============================|| ROUTING RENDER ||============================== //
const login = (token) => {
  if (token) {
    return MainRoutes;
  } else {
    return AuthenticationRoutes;
  }
};

export default function ThemeRoutes() {
  const [token] = useLocalStorage('token', '');
  return useRoutes([login(token)]);
}
