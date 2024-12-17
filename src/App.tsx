import { HStack } from '@chakra-ui/react';
import AppRoutes from './routes'; // Import the AppRoutes component
import { AuthProvider } from './lib/contexts/AuthContext';

function App() {
  return (
    <HStack w='full' h='100vh' bg='gray.100' padding={4}>
      <AuthProvider>
        <AppRoutes />
      </AuthProvider>
    </HStack>
  );
}

export default App;
