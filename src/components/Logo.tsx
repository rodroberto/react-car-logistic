import { Box, Flex, Icon, IconButton, Text } from '@chakra-ui/react';
import { AiFillThunderbolt, AiOutlineSearch } from 'react-icons/ai';
import { MdMenu } from 'react-icons/md';

interface LogoProps {
  collapse: boolean;
  onCollapse: (collapse: boolean) => void
}

export const Logo = ({ collapse, onCollapse }: LogoProps) => (
  <Flex
    w='full'
    alignItems='center'
    justifyContent='space-between'
    flexDirection={collapse ? 'row' : 'column'}
    gap={4}
  >
    <Box display='flex' alignItems='center' gap={2}>
      <IconButton
      aria-label='Menu Colapse'
      icon={<MdMenu />}
      onClick={() => onCollapse(!collapse)}
    />
      {collapse && (
        <Text fontWeight='bold' fontSize={16}>
          Your Logo Here
        </Text>
      )}
    </Box>
    
  </Flex>
);
