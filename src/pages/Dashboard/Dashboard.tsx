import { SimpleGrid } from '@chakra-ui/react';
import Page from '../../components/common/Page';
import { FaApple, FaGoogle } from 'react-icons/fa';
import MiniStatistics from './MiniStatistics';

const Dashboard = () => {
  return (
    <Page title='Dashboard'>
      <SimpleGrid gap='8px' columns={{sm:2, md: 4}}>
        <MiniStatistics
          title='Brands'
          amount={100}
          percentage={20}
          icon={FaApple}
        />
        <MiniStatistics
          title='Brands'
          amount={100}
          percentage={20}
          icon={FaGoogle}
        />
        <MiniStatistics
          title='Brands'
          amount={100}
          percentage={-20}
          icon={FaApple}
        />
        <MiniStatistics
          title='Brands'
          amount={100}
          percentage={-20}
          icon={FaGoogle}
        />
      </SimpleGrid>
    </Page>
  );
};

export default Dashboard;
