import { Flex, Heading } from '@chakra-ui/react';
import EmployeeTable from './../components/EmployeeTable';
import AddEmployeeButton from './../components/AddEmployeeButton';

export default function Home() {
  return (
    <Flex direction='column' p={8}>
      <Heading mb={4}>Dashboard</Heading>
      <AddEmployeeButton />
      <EmployeeTable />
    </Flex>
  );
}
