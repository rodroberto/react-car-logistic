import {
  Box,
  Button,
  FormControl,
  FormLabel,
  Input,
  VStack,
  FormErrorMessage,
  useToast,
  Text,
  Flex,
} from '@chakra-ui/react';
import Page from '../../components/common/Page';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from '../../components/axios';

const Register = () => {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    confirmPassword: '',
  });

  const navigate = useNavigate();
  const [error, setError] = useState<string>('');
  const toast = useToast(); // Chakra UI toast for success/error messages

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();

    // Double-check password confirmation
    if (formData.password !== formData.confirmPassword) {
      setError('Passwords do not match');
      return;
    }

    setError(''); // Reset error if passwords match

    // Send registration data to the server API using Axios
    try {
      const response = await axios.post('/auth/register', {
        first_name: formData.firstName,
        last_name: formData.lastName,
        email: formData.email,
        password: formData.password,
      });

      // Show success message if registration is successful
      toast({
        title: 'Registration successful!',
        description: 'You can now log in.',
        status: 'success',
        duration: 5000,
        isClosable: true,
      });

      navigate('/');
    } catch (err: any) {
      // Show error message if registration fails
      setError(err.message || 'Something went wrong. Please try again.');
      toast({
        title: 'Error',
        description: err.message,
        status: 'error',
        duration: 5000,
        isClosable: true,
      });
    }
  };

  return (
    <Page title='Register'>
      <Box
        maxW='400px'
        mx='auto'
        mt='10'
        p='8'
        borderRadius='lg'
        boxShadow='lg'
        bg='white'
      >
        <VStack spacing={4} as='form' onSubmit={handleRegister}>
          <FormControl id='firstName' isRequired>
            <FormLabel>First Name</FormLabel>
            <Input
              type='text'
              name='firstName'
              value={formData.firstName}
              onChange={handleInputChange}
              placeholder='Enter your first name'
            />
          </FormControl>

          <FormControl id='lastName' isRequired>
            <FormLabel>Last Name</FormLabel>
            <Input
              type='text'
              name='lastName'
              value={formData.lastName}
              onChange={handleInputChange}
              placeholder='Enter your last name'
            />
          </FormControl>

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

          <FormControl id='confirmPassword' isRequired isInvalid={!!error}>
            <FormLabel>Confirm Password</FormLabel>
            <Input
              type='password'
              name='confirmPassword'
              value={formData.confirmPassword}
              onChange={handleInputChange}
              placeholder='Confirm your password'
            />
            <FormErrorMessage>{error}</FormErrorMessage>
          </FormControl>

          <Button colorScheme='teal' width='full' type='submit'>
            Register
          </Button>
          <Flex>
            <Text>Already have an account?</Text>
            <Text
              color='teal'
              cursor='pointer'
              onClick={() => navigate('/login')}
              _hover={{
                color: 'blue.500', // Change color on hover
                textDecoration: 'underline', // Add underline on hover
              }}
            >
              Login
            </Text>
          </Flex>
        </VStack>
      </Box>
    </Page>
  );
};

export default Register;
