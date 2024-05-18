'use client';

import { Button } from '@chakra-ui/react';
import { AddIcon } from '@chakra-ui/icons';
import { useRouter } from 'next/navigation';

const AddEmployeeButton = () => {
  const router = useRouter();

  const handleAddEmployeeClick = () => {
    router.push('/add-employee');
  };

  return (
    <Button
      leftIcon={<AddIcon />}
      colorScheme="teal"
      variant="solid"
      onClick={handleAddEmployeeClick}
    >
      Adicionar Funcionário
    </Button>
  );
};

export default AddEmployeeButton;
