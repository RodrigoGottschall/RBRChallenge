import { Flex, Heading } from '@chakra-ui/react';
import EmployeeTable from './app/components/EmployeeTable';
import AddEmployeeButton from './app/components/AddEmployeeButton';

export default function Home() {
  return (
    <Flex direction='column' p={8}>
      <Heading mb={4}>Dashboard</Heading>
      <AddEmployeeButton />
      <EmployeeTable />
    </Flex>
  );
}
