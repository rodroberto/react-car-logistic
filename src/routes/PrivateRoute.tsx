// src/routes/PrivateRoute.tsx
import { useState } from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { Flex, Spinner } from '@chakra-ui/react';
import { useAuth } from '../lib/contexts/AuthContext'; // Assuming you have AuthContext for authentication
import { Sidebar } from '../components/Sidebar'; // Import Sidebar here

const PrivateRoute = () => {
  const [collapse, setCollapse] = useState(false);
  const { isAuthenticated, loading } = useAuth();
  console.log('isAuthenticated', isAuthenticated);

  if (loading) {
    return (
      <Flex justifyContent='center' alignItems='center' height='100vh'>
        <Spinner size='lg' />
      </Flex>
    );
  }

  // If not authenticated, redirect to login page
  if (!isAuthenticated) {
    return <Navigate to='/login' />;
  }

  // If authenticated, render the protected content (sidebar + main content)
  return (
    <>
      <Flex
        as='aside'
        w={collapse ? '350px' : '100px'}
        h='full'
        bg='white'
        alignItems='start'
        padding={6}
        flexDirection='column'
        justifyContent='space-between'
        transition='max-width 0.3s ease'
        borderRadius='xl'
        boxShadow='md'
      >
        {/* Sidebar is only visible when authenticated */}
        <Sidebar
          collapse={collapse}
          onCollapse={(collapse: boolean) => setCollapse(collapse)}
        />
      </Flex>
      {/* Render the main content (Protected Routes) */}
      <Flex
        as='main'
        w='full'
        h='full'
        bg='white'
        flexDirection='column'
        borderRadius='xl'
        boxShadow='lg'
      >
        <Outlet />
      </Flex>
    </>
  );
};

export default PrivateRoute;
