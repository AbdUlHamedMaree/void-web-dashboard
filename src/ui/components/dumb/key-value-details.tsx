import { Typography } from '@mui/material';
import { Link } from '../shared/link';

export type KeyValueDetailsProps = {
  label?: React.ReactNode;
  value?: React.ReactNode;
  href?: string;
};

export const KeyValueDetails: React.FC<KeyValueDetailsProps> = ({
  label,
  value,
  href,
}) => {
  return (
    <>
      <Typography variant='overline' color='primary'>
        {label}
      </Typography>
      {href ? (
        <Link href={href} mt={1} display='block'>
          {value}
        </Link>
      ) : (
        <Typography mt={1}>{value}</Typography>
      )}
    </>
  );
};
