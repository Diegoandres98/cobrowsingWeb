import { Chip } from '@mui/material';

export const StatusIcon = ({ status }) => {
  return <Chip label={status ? 'activo' : 'inactivo'} color={status ? 'success' : 'warning'} />;
};
