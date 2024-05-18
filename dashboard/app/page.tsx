'use client'; // Marca o componente como Client Component

import { Flex, Heading } from '@chakra-ui/react';
import EmployeeTable from './components/EmployeeTable';
import AddEmployeeButton from './components/AddEmployeeButton';
import Link from 'next/link';

export default function Home() {
  return (
    <Flex direction="column" p={8}>
      <Heading mb={4}>Dashboard</Heading>

      {/* Link para adicionar um novo funcionário */}
      <Link href="/add-employee">
        <AddEmployeeButton />
      </Link>
      
      <EmployeeTable />
    </Flex>
  );
}
