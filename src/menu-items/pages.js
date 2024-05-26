// assets
import { IconKey } from '@tabler/icons';
import { IconRoute } from '@tabler/icons';
// constant
const icons = {
  IconKey,
  IconRoute
};

// ==============================|| EXTRA PAGES MENU ITEMS ||============================== //

const pages = {
  id: 'businnes',
  title: 'Negocio',
  caption: 'Operar empresa',
  type: 'group',
  children: [
    {
      id: 'routes',
      title: 'Rutas',
      type: 'collapse',
      icon: icons.IconRoute,

      children: [
        {
          id: 'Crear una ruta',
          title: 'Crear Ruta Collector',
          type: 'item',
          url: '/rutas/create',
          target: false
        }
      ]
    },
    {
      id: 'authentication',
      title: 'Autenticacion',
      type: 'collapse',
      icon: icons.IconKey,

      children: [
        {
          id: 'login3',
          title: 'Cambiar clave a cobrador',
          type: 'item',
          url: '/pages/login/login3',
          target: true
        },
        {
          id: 'register3',
          title: 'Cambiar mi clave',
          type: 'item',
          url: '/pages/register/register3',
          target: true
        }
      ]
    }
  ]
};

export default pages;
