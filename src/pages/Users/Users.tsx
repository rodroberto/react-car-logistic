import { useState, useEffect } from 'react';
import {
  Box,
  Button,
  FormControl,
  FormLabel,
  Input,
  Select,
  Table,
  Tbody,
  Tr,
  Td,
  Th,
  Thead,
  useToast,
  Flex,
} from '@chakra-ui/react';
import { MdEdit, MdDelete } from 'react-icons/md';
import { ChevronLeftIcon, ChevronRightIcon } from '@chakra-ui/icons';
import { useAuth } from '../../lib/contexts/AuthContext';
import axios from '../../components/axios';
import Page from '../../components/common/Page';
import CustomModal from '../../components/common/CustomModal';

type User = {
  first_name: string;
  last_name: string;
  email: string;
  role: string;
  id: number;
};

const Users = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [formData, setFormData] = useState<User>({
    first_name: '',
    last_name: '',
    email: '',
    role: '',
    id: 0,
  });

  const [currentPage, setCurrentPage] = useState<number>(1);
  const [totalPages, setTotalPages] = useState<number>(1);
  const [pageSize, setPageSize] = useState<number>(5);
  const [loading, setLoading] = useState<boolean>(false);

  const { user } = useAuth();
  const toast = useToast();
  const role = user?.role;

  // Fetch users with pagination
  const fetchUsers = async (page: number = 1) => {
    setLoading(true);
    try {
      const { data } = await axios.get(`/users?page=${page}&limit=${pageSize}`);
      setUsers(data.users);
      setTotalPages(data.totalPages); // Ensure the API returns the totalPages
    } catch (error) {
      console.error('Failed to fetch users', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers(currentPage);
  }, [currentPage, pageSize]);

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handlePageSizeChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setPageSize(Number(e.target.value));
    setCurrentPage(1); // Reset to the first page when changing page size
  };

  const openModal = () => setIsOpen(true);
  const closeModal = () => setIsOpen(false);

  const handleDeleteUser = async (id: number) => {
    try {
      const response = await axios.delete(`/users/${id}`);

      if (response.status === 200) {
        toast({
          title: 'Success',
          description: response.data.message || 'User deleted successfully',
          status: 'success',
          duration: 5000,
          isClosable: true,
        });
        fetchUsers(currentPage); // Refresh the list after deletion
      } else {
        toast({
          title: 'Failed',
          description: response.data.message || 'Unable to delete user',
          status: 'error',
          duration: 5000,
          isClosable: true,
        });
      }
    } catch (error: any) {
      const errorMessage =
        error.response?.data?.message || 'An unexpected error occurred';
      toast({
        title: 'Failed',
        description: errorMessage,
        status: 'error',
        duration: 5000,
        isClosable: true,
      });
      console.error('Error deleting user', error);
    }
  };

  const handleUpdateUser = async () => {
    try {
      await axios.put(`/users/${formData.id}`, formData); // Updated PUT for updating user
      fetchUsers(currentPage); // Refresh the list after updating
      closeModal();
    } catch (error) {
      console.error('Error updating user', error);
    }
  };

  return (
    <Page title="Users">
      <Flex position="relative" flexDirection="column" height="full" justifyContent="space-between">
        <Table variant="simple">
          <Thead>
            <Tr>
              <Th>First Name</Th>
              <Th>Last Name</Th>
              <Th>Email</Th>
              <Th>Role</Th>
              <Th>Actions</Th>
            </Tr>
          </Thead>
          <Tbody>
            {loading ? (
              <Tr>
                <Td colSpan={5}>Loading...</Td>
              </Tr>
            ) : (
              users.map((user) => (
                <Tr key={user.id}>
                  <Td>{user.first_name}</Td>
                  <Td>{user.last_name}</Td>
                  <Td>{user.email}</Td>
                  <Td>{user.role}</Td>
                  <Td>
                    {role === 'Super Admin' && (
                      <>
                        <Button
                          colorScheme="blue"
                          leftIcon={<MdEdit />}
                          size="sm"
                          onClick={() => {
                            setFormData(user);
                            openModal();
                          }}
                        >
                          Update
                        </Button>
                        <Button
                          colorScheme="red"
                          leftIcon={<MdDelete />}
                          size="sm"
                          onClick={() => handleDeleteUser(user.id)}
                          ml={2}
                        >
                          Delete
                        </Button>
                      </>
                    )}
                  </Td>
                </Tr>
              ))
            )}
          </Tbody>
        </Table>

        {/* Pagination Section */}
        <Flex
          justifyContent="center"
          alignItems="center"
          mt={4}
          p={4}
          border="1px solid"
          borderColor="gray.200"
          borderRadius="md"
          bg="gray.50"
          boxShadow="sm"
          gap={4}
        >
          {/* Previous Button */}
          <Button
            onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
            disabled={currentPage === 1}
            colorScheme="teal"
            size="sm"
            leftIcon={<ChevronLeftIcon />}
            variant="solid"
          >
            Previous
          </Button>

          {/* Page Information */}
          <Flex alignItems="center" fontWeight="medium" fontSize="md" px={4}>
            Page{' '}
            <Box as="span" mx={1} fontWeight="bold">
              {currentPage}
            </Box>{' '}
            of{' '}
            <Box as="span" mx={1} fontWeight="bold">
              {totalPages}
            </Box>
          </Flex>

          {/* Next Button */}
          <Button
            onClick={() =>
              setCurrentPage((prev) => Math.min(prev + 1, totalPages))
            }
            disabled={currentPage === totalPages}
            colorScheme="teal"
            size="sm"
            rightIcon={<ChevronRightIcon />}
            variant="solid"
          >
            Next
          </Button>

          {/* Page Size Dropdown */}
          <Flex alignItems="center" gap={2}>
            <Box as="label" htmlFor="page-size" fontSize="sm" color="gray.600">
              Rows per page:
            </Box>
            <Select
              id="page-size"
              value={pageSize}
              onChange={handlePageSizeChange}
              size="sm"
              width="80px"
              borderColor="gray.300"
              bg="white"
              focusBorderColor="teal.500"
            >
              <option value={5}>5</option>
              <option value={10}>10</option>
              <option value={20}>20</option>
              <option value={50}>50</option>
            </Select>
          </Flex>
        </Flex>
      </Flex>

      <CustomModal
        isOpen={isOpen}
        onClose={closeModal}
        title="Update User"
        body={
          <Box as="form" onSubmit={(e: any) => e.preventDefault()}>
            <FormControl id="first_name" isRequired mb={4}>
              <FormLabel>First Name</FormLabel>
              <Input
                type="text"
                name="first_name"
                value={formData.first_name}
                onChange={handleInputChange}
                placeholder="Enter first name"
              />
            </FormControl>
            <FormControl id="last_name" isRequired mb={4}>
              <FormLabel>Last Name</FormLabel>
              <Input
                type="text"
                name="last_name"
                value={formData.last_name}
                onChange={handleInputChange}
                placeholder="Enter last name"
              />
            </FormControl>
            <FormControl id="email" isRequired mb={4}>
              <FormLabel>Email</FormLabel>
              <Input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                placeholder="Enter email"
              />
            </FormControl>
            <FormControl id="role" isRequired mb={4}>
              <FormLabel>Role</FormLabel>
              <Select
                name="role"
                value={formData.role}
                onChange={handleInputChange}
                placeholder=" "
              >
                <option value="Super Admin">Super Admin</option>
                <option value="Manager">Manager</option>
                <option value="Team Lead">Team Lead</option>
                <option value="Service Agent">Service Agent</option>
              </Select>
            </FormControl>
          </Box>
        }
        footerActions={
          <>
            <Button variant="ghost" onClick={closeModal}>
              Cancel
            </Button>
            <Button colorScheme="blue" onClick={handleUpdateUser}>
              Confirm
            </Button>
          </>
        }
      />
    </Page>
  );
};

export default Users;
