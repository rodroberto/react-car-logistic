import {
  Box,
  Button,
  Flex,
  FormControl,
  FormLabel,
  Input,
  Text,
  VStack,
  useToast,
} from '@chakra-ui/react';
import Page from '../../components/common/Page';
import { useState } from 'react';
import axios from '../../components/axios';
import { useNavigate } from 'react-router-dom'; // For redirect after successful login
import { useAuth } from '../../lib/contexts/AuthContext'; // Import the context

const Login = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });

  const [error, setError] = useState<string>('');
  const toast = useToast(); // Chakra UI toast for success/error messages
  const navigate = useNavigate(); // For navigation after successful login
  const { login } = useAuth(); // Get the login function from the context

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const response = await axios.post('/auth/login', {
        email: formData.email,
        password: formData.password,
      });

      // Assuming the server returns the token in the response
      const { accessToken } = response.data;
      localStorage.setItem('auth_token', accessToken); // Save the token in localStorage
      login(response.data); // Set the authentication state in context

      // Show success message
      toast({
        title: 'Login successful!',
        description: 'You are now logged in.',
        status: 'success',
        duration: 5000,
        isClosable: true,
      });

      // Redirect to dashboard or home page
      navigate('/'); // Modify this as per your route
    } catch (err: any) {
      // Show error message if login fails
      setError(err.message || 'Invalid credentials. Please try again.');
      toast({
        title: 'Login failed',
        description: err.message || 'Invalid credentials',
        status: 'error',
        duration: 5000,
        isClosable: true,
      });
    }
  };

  return (
    <Page title='Login'>
      <Box
        maxW='400px'
        mx='auto'
        mt='10'
        p='8'
        borderRadius='lg'
        boxShadow='lg'
        bg='white'
      >
        <VStack spacing={4} as='form' onSubmit={handleLogin}>
          <FormControl id='email' isRequired>
            <FormLabel>Email</FormLabel>
            <Input
              type='email'
              name='email'
              value={formData.email}
              onChange={handleInputChange}
              placeholder='Enter your email'
            />
          </FormControl>

          <FormControl id='password' isRequired>
            <FormLabel>Password</FormLabel>
            <Input
              type='password'
              name='password'
              value={formData.password}
              onChange={handleInputChange}
              placeholder='Enter your password'
            />
          </FormControl>

          {error && (
            <Box color='red.500' fontSize='sm'>
              {error}
            </Box>
          )}

          <Button colorScheme='teal' width='full' type='submit'>
            Login
          </Button>
          <Flex>
            <Text>Don't have an account?</Text>
            <Text
              color='teal'
              cursor='pointer'
              onClick={() => navigate('/register')}
              _hover={{
                color: 'blue.500', // Change color on hover
                textDecoration: 'underline', // Add underline on hover
              }}
            >
              Register
            </Text>
          </Flex>
        </VStack>
      </Box>
    </Page>
  );
};

export default Login;
