import {
  Box,
  Heading,
  Text,
  SimpleGrid,
  Stat,
  StatLabel,
  StatNumber,
  StatHelpText,
  Flex,
} from '@chakra-ui/react';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from 'recharts';
import { MdTrendingUp, MdTrendingDown } from 'react-icons/md';
import Page from '../../components/common/Page';

const Reports = () => {
  // Demo data for the chart
  const data = [
    { name: 'Jan', sales: 4000, expenses: 2400 },
    { name: 'Feb', sales: 3000, expenses: 1398 },
    { name: 'Mar', sales: 2000, expenses: 9800 },
    { name: 'Apr', sales: 2780, expenses: 3908 },
    { name: 'May', sales: 1890, expenses: 4800 },
    { name: 'Jun', sales: 2390, expenses: 3800 },
  ];

  return (
    <Page title='Reports'>

      <SimpleGrid columns={{ base: 1, md: 2, lg: 3 }} spacing={6}>
        {/* Demo Stats */}
        <Stat>
          <StatLabel>Sales This Month</StatLabel>
          <StatNumber>$24,000</StatNumber>
          <StatHelpText color='green.500'>
            <MdTrendingUp />
            +12%
          </StatHelpText>
        </Stat>

        <Stat>
          <StatLabel>Expenses This Month</StatLabel>
          <StatNumber>$18,000</StatNumber>
          <StatHelpText color='red.500'>
            <MdTrendingDown />
            -5%
          </StatHelpText>
        </Stat>

        <Stat>
          <StatLabel>Net Profit</StatLabel>
          <StatNumber>$6,000</StatNumber>
          <StatHelpText color='green.500'>
            <MdTrendingUp />
            +10%
          </StatHelpText>
        </Stat>
      </SimpleGrid>

      {/* Bar Chart Section */}
      <Box mt={10}>
        <Heading size='md' mb={4}>
          Monthly Sales vs Expenses
        </Heading>
        <ResponsiveContainer width='100%' height={300}>
          <BarChart data={data}>
            <CartesianGrid strokeDasharray='3 3' />
            <XAxis dataKey='name' />
            <YAxis />
            <Tooltip />
            <Legend />
            <Bar dataKey='sales' fill='#8884d8' />
            <Bar dataKey='expenses' fill='#82ca9d' />
          </BarChart>
        </ResponsiveContainer>
      </Box>

      {/* Table Section (Placeholder for any tabular data) */}
      <Box mt={10}>
        <Heading size='md' mb={4}>
          Sales Breakdown (This Year)
        </Heading>
        <Box overflowX='auto'>
          <table style={{ width: '100%', borderCollapse: 'collapse' }}>
            <thead>
              <tr>
                <th style={{ borderBottom: '1px solid #ddd', padding: '8px' }}>
                  Month
                </th>
                <th style={{ borderBottom: '1px solid #ddd', padding: '8px' }}>
                  Sales
                </th>
                <th style={{ borderBottom: '1px solid #ddd', padding: '8px' }}>
                  Expenses
                </th>
              </tr>
            </thead>
            <tbody>
              {data.map((item, index) => (
                <tr key={index}>
                  <td
                    style={{ borderBottom: '1px solid #ddd', padding: '8px' }}
                  >
                    {item.name}
                  </td>
                  <td
                    style={{ borderBottom: '1px solid #ddd', padding: '8px' }}
                  >
                    ${item.sales}
                  </td>
                  <td
                    style={{ borderBottom: '1px solid #ddd', padding: '8px' }}
                  >
                    ${item.expenses}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </Box>
      </Box>
    </Page>
  );
};

export default Reports;
