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
  Flex,
} from '@chakra-ui/react';
import { MdEdit, MdDelete } from 'react-icons/md';
import axios from '../../components/axios';
import Page from '../../components/common/Page';
import CustomModal from '../../components/common/CustomModal';
import { ChevronLeftIcon, ChevronRightIcon } from '@chakra-ui/icons';

type User = {
  first_name: string;
  last_name: string;
  role: string;
  email: string;
};

type Branch = {
  name: string;
  year: number;
  make: string;
  model: string;
  employee_id: number;
  id: number;
  user: User;
};

const Branches = () => {
  const [branches, setBranches] = useState<Branch[]>([]);
  const [employees, setEmployees] = useState<any[]>([]);
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [formData, setFormData] = useState<Branch>({
    name: '',
    year: 0,
    make: '',
    model: '',
    employee_id: 0,
    id: 0,
    user: { first_name: '', last_name: '', role: '', email: '' },
  });

  const [currentPage, setCurrentPage] = useState<number>(1);
  const [totalPages, setTotalPages] = useState<number>(1);
  const [loading, setLoading] = useState<boolean>(false);
  const [pageSize, setPageSize] = useState<number>(5); // State for dynamic page size

  // Fetch branches with pagination and search filter
  const fetchBranches = async (page: number = 1) => {
    setLoading(true);
    try {
      const { data } = await axios.get(
        `/branches?page=${page}&limit=${pageSize}&search=${searchTerm}`
      );
      setBranches(data.branches);
      setTotalPages(data.totalPages); // Ensure the API returns the totalPages
    } catch (error) {
      console.error('Failed to fetch branches', error);
    } finally {
      setLoading(false);
    }
  };

  // Fetch employees (users) for the employee selection dropdown
  const fetchEmployees = async () => {
    try {
      const { data } = await axios.get('/users'); // Assuming API endpoint to fetch users
      setEmployees(data.users);
    } catch (error) {
      console.error('Failed to fetch users', error);
    }
  };

  useEffect(() => {
    fetchBranches(currentPage);
    fetchEmployees(); // Fetch employees when the component loads
  }, [currentPage, searchTerm, pageSize]); // Re-fetch branches whenever search term, page, or pageSize changes

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

  const openModal = (branch: Branch | null = null) => {
    if (branch) {
      setFormData(branch); // Populate form data for update
    } else {
      setFormData({
        name: '',
        year: 0,
        make: '',
        model: '',
        employee_id: 0,
        id: 0,
        user: { first_name: '', last_name: '', role: '', email: '' },
      });
    }
    setIsOpen(true);
  };

  const closeModal = () => setIsOpen(false);

  const handleDeleteBranch = async (id: number) => {
    try {
      await axios.delete(`/branches/${id}`);
      fetchBranches(currentPage); // Refresh the list after deletion
    } catch (error) {
      console.error('Error deleting branch', error);
    }
  };

  const handleCreateBranch = async () => {
    try {
      await axios.post('/branches', formData);
      fetchBranches(currentPage); // Refresh the list after creating
      closeModal();
    } catch (error) {
      console.error('Error creating branch', error);
    }
  };

  const handleUpdateBranch = async () => {
    try {
      await axios.put(`/branches/${formData.id}`, formData); // Use PUT for updates
      fetchBranches(currentPage); // Refresh the list after updating
      closeModal();
    } catch (error) {
      console.error('Error updating branch', error);
    }
  };

  return (
    <Page title='Branches'>
      <Flex
        position='relative'
        flexDirection='column'
        height='full'
        justifyContent='space-between'
      >
        <Flex flexDirection='column'>
          <Box
            mb={4}
            display='flex'
            alignItems='center'
            justifyContent='flex-end'
          >
            {/* <Input
              placeholder='Search branches...'
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              size='sm'
              width='250px'
            /> */}
            <Button size='sm' onClick={() => openModal()} colorScheme='teal'>
              Add New
            </Button>
          </Box>

          <Table variant='simple'>
            <Thead>
              <Tr>
                <Th>Name</Th>
                <Th>Year</Th>
                <Th>Make</Th>
                <Th>Model</Th>
                <Th>Employee</Th>
                <Th>Actions</Th>
              </Tr>
            </Thead>
            <Tbody>
              {loading ? (
                <Tr>
                  <Td colSpan={6}>Loading...</Td>
                </Tr>
              ) : (
                branches.map((branch) => (
                  <Tr key={branch.id}>
                    <Td>{branch.name}</Td>
                    <Td>{branch.year}</Td>
                    <Td>{branch.make}</Td>
                    <Td>{branch.model}</Td>
                    <Td>{`${branch.user.first_name} ${branch.user.last_name}`}</Td>
                    <Td>
                      <Button
                        colorScheme='blue'
                        leftIcon={<MdEdit />}
                        size='sm'
                        onClick={() => openModal(branch)}
                      >
                        Update
                      </Button>
                      <Button
                        colorScheme='red'
                        leftIcon={<MdDelete />}
                        size='sm'
                        onClick={() => handleDeleteBranch(branch.id)}
                        ml={2}
                      >
                        Delete
                      </Button>
                    </Td>
                  </Tr>
                ))
              )}
            </Tbody>
          </Table>
        </Flex>

        <Flex
          justifyContent='center'
          alignItems='center'
          mt={4}
          p={4}
          border='1px solid'
          borderColor='gray.200'
          borderRadius='md'
          bg='gray.50'
          boxShadow='sm'
          gap={4}
        >
          {/* Previous Button */}
          <Button
            onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
            disabled={currentPage === 1}
            colorScheme='teal'
            size='sm'
            leftIcon={<ChevronLeftIcon />}
            variant='solid'
          >
            Previous
          </Button>

          {/* Page Information */}
          <Flex alignItems='center' fontWeight='medium' fontSize='md' px={4}>
            Page{' '}
            <Box as='span' mx={1} fontWeight='bold'>
              {currentPage}
            </Box>{' '}
            of{' '}
            <Box as='span' mx={1} fontWeight='bold'>
              {totalPages}
            </Box>
          </Flex>

          {/* Next Button */}
          <Button
            onClick={() =>
              setCurrentPage((prev) => Math.min(prev + 1, totalPages))
            }
            disabled={currentPage === totalPages}
            colorScheme='teal'
            size='sm'
            rightIcon={<ChevronRightIcon />}
            variant='solid'
          >
            Next
          </Button>

          {/* Page Size Dropdown */}
          <Flex alignItems='center' gap={2}>
            <Box as='label' htmlFor='page-size' fontSize='sm' color='gray.600'>
              Rows per page:
            </Box>
            <Select
              id='page-size'
              value={pageSize}
              onChange={handlePageSizeChange}
              size='sm'
              width='80px'
              borderColor='gray.300'
              bg='white'
              focusBorderColor='teal.500'
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
        title={formData.id ? 'Update Branch' : 'Add New Branch'}
        body={
          <Box as='form' onSubmit={(e: any) => e.preventDefault()}>
            <FormControl id='name' isRequired mb={4}>
              <FormLabel>Branch Name</FormLabel>
              <Input
                type='text'
                name='name'
                value={formData.name}
                onChange={handleInputChange}
                placeholder='Enter branch name'
              />
            </FormControl>
            <FormControl id='year' isRequired mb={4}>
              <FormLabel>Year</FormLabel>
              <Input
                type='number'
                name='year'
                value={formData.year}
                onChange={handleInputChange}
                placeholder='Enter year'
              />
            </FormControl>
            <FormControl id='make' isRequired mb={4}>
              <FormLabel>Make</FormLabel>
              <Select
                name='make'
                value={formData.make}
                onChange={handleInputChange}
                placeholder=' '
              >
                <option value='Toyota'>Toyota</option>
                <option value='Ford'>Ford</option>
                <option value='Honda'>Honda</option>
                <option value='Chevrolet'>Chevrolet</option>
                <option value='BMW'>BMW</option>
              </Select>
            </FormControl>
            <FormControl id='model' isRequired mb={4}>
              <FormLabel>Model</FormLabel>
              <Input
                type='text'
                name='model'
                value={formData.model}
                onChange={handleInputChange}
                placeholder='Enter model'
              />
            </FormControl>
            <FormControl id='employee_id' isRequired mb={4}>
              <FormLabel>Assign Employee</FormLabel>
              <Select
                name='employee_id'
                value={formData.employee_id}
                onChange={handleInputChange}
                placeholder=' '
              >
                {employees.map((employee) => (
                  <option key={employee.id} value={employee.id}>
                    {employee.first_name} {employee.last_name}
                  </option>
                ))}
              </Select>
            </FormControl>
          </Box>
        }
        footerActions={
          <>
            <Button variant='ghost' onClick={closeModal}>
              Cancel
            </Button>
            <Button
              colorScheme='blue'
              onClick={formData.id ? handleUpdateBranch : handleCreateBranch}
            >
              {formData.id ? 'Update' : 'Create'}
            </Button>
          </>
        }
      />
    </Page>
  );
};

export default Branches;
