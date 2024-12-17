import React, { useState } from 'react';
import {
  Box,
  Table as ChakraTable,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  Input,
  Button,
  Text,
  Flex,
  HStack,
} from '@chakra-ui/react';
import { ChevronLeftIcon, ChevronRightIcon } from '@chakra-ui/icons';

// Define Column Type with keyof T for accessor
type Column<T> = {
  Header: string;
  accessor: keyof T; // Ensure accessor is a key of T
  isSortable?: boolean;
};

// Define TableProps to accept generic data type
type TableProps<T> = {
  columns: Column<T>[]; // columns is an array of Column<T> objects
  data: T[]; // data is an array of objects of type T
};

function Table<T extends object>({ columns, data }: TableProps<T>) {
  const [sortColumn, setSortColumn] = useState<keyof T | null>(null);
  const [sortDirection, setSortDirection] = useState<'asc' | 'desc'>('asc');
  const [filter, setFilter] = useState<string>('');
  const [currentPage, setCurrentPage] = useState(1);
  const rowsPerPage = 10;

  // Function to sort data
  const sortData = (data: T[]) => {
    if (!sortColumn) return data;
    return data.sort((a, b) => {
      if (a[sortColumn] < b[sortColumn])
        return sortDirection === 'asc' ? -1 : 1;
      if (a[sortColumn] > b[sortColumn])
        return sortDirection === 'asc' ? 1 : -1;
      return 0;
    });
  };

  // Filter data based on search term
  const filteredData = data.filter((item) =>
    columns.some((col) =>
      String(item[col.accessor]).toLowerCase().includes(filter.toLowerCase())
    )
  );

  // Sort the filtered data
  const sortedData = sortData(filteredData);

  // Pagination logic
  const paginatedData = sortedData.slice(
    (currentPage - 1) * rowsPerPage,
    currentPage * rowsPerPage
  );

  const pageCount = Math.ceil(sortedData.length / rowsPerPage);

  const handleSort = (column: keyof T) => {
    if (sortColumn === column) {
      setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
    } else {
      setSortColumn(column);
      setSortDirection('asc');
    }
  };

  return (
    <Box>
      {/* Search Input */}
      <Box mb={4} maxWidth='250px'>
        <Input
          placeholder='Search'
          value={filter}
          onChange={(e) => setFilter(e.target.value)}
          mb={4}
        />
      </Box>

      {/* Table structure */}
      <ChakraTable variant='simple'>
        <Thead>
          <Tr>
            <Th>#</Th>
            {columns.map((column) => (
              <Th key={String(column.accessor)}>
                <Flex align='center' justify='space-between'>
                  <Text>{column.Header}</Text>
                  {column.isSortable && (
                    <Button
                      onClick={() => handleSort(column.accessor)}
                      size='sm'
                    >
                      {sortColumn === column.accessor && sortDirection === 'asc'
                        ? '↑'
                        : '↓'}
                    </Button>
                  )}
                </Flex>
              </Th>
            ))}
          </Tr>
        </Thead>
        <Tbody>
          {paginatedData.map((row, index) => (
            <Tr key={index}>
              <Td>{(currentPage - 1) * rowsPerPage + index + 1}</Td>
              {columns.map((column) => (
                  <Td key={String(column.accessor)}>
                    {String(row[column.accessor]) as React.ReactNode}
                  </Td>
              ))}
            </Tr>
          ))}
        </Tbody>
      </ChakraTable>

      {/* Pagination controls */}
      <Flex justify='space-between' align='center' mt={4}>
        <HStack>
          <Button
            onClick={() => setCurrentPage(1)}
            disabled={currentPage === 1}
          >
            {'<<'}
          </Button>
          <Button
            onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
            disabled={currentPage === 1}
          >
            <ChevronLeftIcon />
          </Button>
          <Button
            onClick={() =>
              setCurrentPage((prev) => Math.min(prev + 1, pageCount))
            }
            disabled={currentPage === pageCount}
          >
            <ChevronRightIcon />
          </Button>
          <Button
            onClick={() => setCurrentPage(pageCount)}
            disabled={currentPage === pageCount}
          >
            {'>>'}
          </Button>
        </HStack>

        <Text>
          Page <strong>{currentPage}</strong> of <strong>{pageCount}</strong>
        </Text>
      </Flex>
    </Box>
  );
}

export default Table;
