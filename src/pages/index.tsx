import { TableBuilder, TextColumn } from '@mrii/react-table-builder';
import { DashboardLayout } from '$ui/components/layouts/dashboard';
import type { NextPage } from 'next';

const Home: NextPage = () => {
  return (
    <div>
      <TableBuilder rows={[{ id: 'pizza', a: 'pizza' }]} autoHeight>
        <TextColumn source='a' />
      </TableBuilder>
    </div>
  );
};

Home.layout = DashboardLayout;

export default Home;
