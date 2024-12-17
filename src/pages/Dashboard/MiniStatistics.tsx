import {
  Card,
  CardBody,
  Flex,
  IconButton,
  Stat,
  StatHelpText,
  StatLabel,
  StatNumber,
  useColorModeValue,
  Box,
  Icon,
} from '@chakra-ui/react';
import { IconType } from 'react-icons';

interface MiniStatisticsProps {
  title: string;
  amount: number;
  percentage: number;
  icon: IconType; // Accepting an IconType
}

const MiniStatistics = ({
  title,
  amount,
  percentage,
  icon,
}: MiniStatisticsProps) => {
  const iconTeal = useColorModeValue('teal.300', 'teal.300');
  const textColor = useColorModeValue('gray.700', 'white');
  const iconBg = useColorModeValue('teal.50', 'teal.700');

  // Formatting the percentage correctly
  const formattedPercentage =
    percentage > 0 ? `+${percentage}%` : `${percentage}%`;

  return (
    <Card minH='100px' borderRadius='lg' boxShadow='md' variant='outline'>
      <CardBody>
        <Flex direction='row' align='center' justify='space-between' w='100%'>
          <Stat>
            <StatLabel
              fontSize='sm'
              color='gray.400'
              fontWeight='bold'
              pb='.1rem'
            >
              {title}
            </StatLabel>
            <Flex align='center'>
              <StatNumber fontSize='lg' color={textColor}>
                ${amount}
              </StatNumber>
              <StatHelpText
                alignSelf='flex-end'
                justifySelf='flex-end'
                m='0px'
                color={percentage > 0 ? "green.400" : "red.400"}
                fontWeight='bold'
                ps='3px'
                fontSize='md'>
                {formattedPercentage}
              </StatHelpText>
            </Flex>
          </Stat>

          {/* IconBox container with a circular background */}
          <Box
            bg={iconBg}
            borderRadius="md"
            p='12px'
            display='flex'
            alignItems='center'
            justifyContent='center'
          >
            <Icon as={icon} color={iconTeal} fontSize='xl' />
          </Box>
        </Flex>
      </CardBody>
    </Card>
  );
};

export default MiniStatistics;
