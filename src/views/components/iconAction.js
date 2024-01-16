/* eslint-disable react/prop-types */
import EditOutlined from '@mui/icons-material/EditOutlined';
import Delete from '@mui/icons-material/RemoveCircle';
import Add from '@mui/icons-material/AddCircle';
import IconButton from '@mui/material/IconButton';

export const ActionIcon = ({ row, callback }) => {
  return (
    <>
      <IconButton aria-label="edit" onClick={() => callback('edit', row)}>
        <EditOutlined fontSize="medium" color="info" />
      </IconButton>
      {row.status ? (
        <IconButton aria-label="delete" onClick={() => callback('add-delete', row)}>
          <Delete fontSize="medium" color="error" />
        </IconButton>
      ) : (
        <IconButton aria-label="add" onClick={() => callback('add-delete', row)}>
          <Add fontSize="medium" color="success" />
        </IconButton>
      )}
    </>
  );
};
