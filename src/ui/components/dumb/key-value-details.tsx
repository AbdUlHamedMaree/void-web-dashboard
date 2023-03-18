import { Typography } from '@mui/material';

export type KeyValueDetailsProps = {
  label?: React.ReactNode;
  value?: React.ReactNode;
};

export const KeyValueDetails: React.FC<KeyValueDetailsProps> = ({ label, value }) => {
  return (
    <>
      <Typography variant='overline' color='primary'>
        {label}
      </Typography>
      <Typography sx={{ mt: 1 }}>{value}</Typography>
    </>
  );
};
