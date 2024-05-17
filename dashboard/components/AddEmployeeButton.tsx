import { Button } from '@chakra-ui/react';
import { AddIcon } from '@chakra-ui/icons';

function AddEmployeeButton() {
  return (
    <Button leftIcon={<AddIcon />} colorScheme='teal' variant='solid'>
      Adicionar Funcionário
    </Button>
  );
}

export default AddEmployeeButton;
