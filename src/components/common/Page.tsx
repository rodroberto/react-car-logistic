import { ReactNode } from 'react';
import { Box, Flex, Text, useBreakpointValue } from '@chakra-ui/react';
import { useAuth } from '../../lib/contexts/AuthContext';

interface PageProps {
  title: string;
  children: ReactNode;
}

const Page = ({ title, children }: PageProps) => {
  const { isAuthenticated } = useAuth();
  const isMobile = useBreakpointValue({ base: true, md: false }); // Adjust layout for mobile view

  return (
    <Flex
      flexDirection='column'
      w='full'
      h='full'
      p={isMobile ? 2 : 4} // Adjust padding based on screen size (smaller padding on mobile)
      borderRadius='xl' // Rounded corners for a modern look
      mt={2} // Top margin to separate from top of the screen
    >
      {/* Title Section */}
      {isAuthenticated && (
        <Box
          bg='teal.500' // Background color for the title section
          p={4} // Padding inside the title box
          borderRadius='md' // Rounded corners
          mb={6} // Bottom margin for spacing between title and content
          boxShadow='sm' // Small shadow to add some depth
        >
          <Text
            fontSize='2xl'
            fontWeight='bold'
            color='white' // White text color for good contrast on the teal background
          >
            {title}
          </Text>
        </Box>
      )}

      {/* Content Section */}
      <Box
        minHeight='calc(100vh - 164px)' // Minimum height for content area to give it enough space
        overflowY='auto'
      >
        {children}
      </Box>
    </Flex>
  );
};

export default Page;
