import { lazy } from 'react';

// project imports
import Loadable from 'ui-component/Loadable';
// import MinimalLayout from 'layout/MinimalLayout';

const AuthLogin = Loadable(lazy(() => import('views/pages/authentication/authentication/Login')));

// ==============================|| AUTHENTICATION ROUTING ||============================== //

const AuthenticationRoutes = {
  path: '/',
  element: <AuthLogin />,
  // element: <MinimalLayout />,
  children: [
    {
      path: '/login',
      element: <AuthLogin />
    }
  ]
};

export default AuthenticationRoutes;
