/* eslint-disable react/prop-types */
import InfoIcon from '@mui/icons-material/Info';
import IconButton from '@mui/material/IconButton';

export const DetailIcon = ({ row, callback }) => {
  return (
    <>
      <IconButton aria-label="detail" onClick={() => callback('info', row)}>
        <InfoIcon fontSize="medium" color="primary" />
      </IconButton>
    </>
  );
};
