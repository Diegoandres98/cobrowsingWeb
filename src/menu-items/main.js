// assets
import { IconKey } from '@tabler/icons';
import { IconUserPlus } from '@tabler/icons';
import { IconCirclePlus } from '@tabler/icons';
import { IconEditCircle } from '@tabler/icons';
import { IconUsers } from '@tabler/icons';
import { IconClipboardText } from '@tabler/icons';
import { IconReportMoney } from '@tabler/icons';
import { IconListDetails } from '@tabler/icons';
import { IconBusinessplan } from '@tabler/icons';

// constant
const icons = {
  IconKey,
  IconUserPlus,
  IconCirclePlus,
  IconEditCircle,
  IconUsers,
  IconClipboardText,
  IconReportMoney,
  IconListDetails,
  IconBusinessplan
};

// ==============================|| EXTRA PAGES MENU ITEMS ||============================== //

const main = {
  id: 'main',
  title: 'Funciones Principales',
  caption: 'lo mas usado',
  type: 'group',
  children: [
    {
      id: 'collector',
      title: 'Cobradores',
      type: 'collapse',
      icon: icons.IconUserPlus,

      children: [
        {
          id: 'create',
          title: 'Crear',
          type: 'item',
          url: 'collectors/create',
          target: false,
          icon: icons.IconCirclePlus
        },
        {
          id: 'list-collectors',
          title: 'Listar',
          type: 'item',
          url: 'collectors/list',
          target: false,
          icon: icons.IconListDetails
        }
      ]
    },
    {
      id: 'client',
      title: 'Clientes',
      type: 'collapse',
      icon: icons.IconUsers,

      children: [
        {
          id: 'create-client',
          title: 'Crear',
          type: 'item',
          url: '/clients/create',
          target: false,
          icon: icons.IconCirclePlus
        },
        {
          id: 'list-clients',
          title: 'Listar',
          type: 'item',
          url: 'clients/list',
          target: false,
          icon: icons.IconListDetails
        }
      ]
    },
    {
      id: 'operations',
      title: 'Operacion',
      type: 'collapse',
      icon: icons.IconUsers,

      children: [
        {
          id: 'base-diary',
          title: 'Base Diaria',
          type: 'item',
          url: '/clients/create',
          target: false,
          icon: icons.IconBusinessplan
        },
        {
          id: 'bills',
          title: 'Registrar Gasto',
          type: 'item',
          url: '/clients/create',
          target: false,
          icon: icons.IconReportMoney
        }
      ]
    },
    {
      id: 'reports',
      title: 'Reportes',
      type: 'collapse',
      icon: icons.IconClipboardText,

      children: [
        {
          id: 'spent',
          title: 'Gastos',
          type: 'item',
          url: '/reports/spent',
          target: false,
          icon: icons.IconClipboardText
        },
        {
          id: 'credit',
          title: 'Creditos',
          type: 'item',
          url: '/reports/credit',
          target: false,
          icon: icons.IconClipboardText
        },
        {
          id: 'payment',
          title: 'Pagos - Abonos',
          type: 'item',
          url: '/reports/payment',
          target: false,
          icon: icons.IconClipboardText
        }
      ]
    },
    {
      id: 'liquidation',
      title: 'Liquidaciones',
      type: 'collapse',
      icon: icons.IconReportMoney,

      children: [
        {
          id: 'diary',
          title: 'Dia Liquidacion Hoy',
          type: 'item',
          url: '/liquidation/diary',
          target: false,
          icon: icons.IconReportMoney
        },
        {
          id: 'month',
          title: 'Este Mes',
          type: 'item',
          url: '/liquidation/month',
          target: false,
          icon: icons.IconReportMoney
        },
        {
          id: 'year',
          title: 'Este Año',
          type: 'item',
          url: '/liquidation/year',
          target: false,
          icon: icons.IconReportMoney
        }
      ]
    }
  ]
};

export default main;
