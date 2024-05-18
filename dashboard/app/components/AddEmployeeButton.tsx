'use client'; // Marcação como Client Component

import { Button } from '@chakra-ui/react';
import { AddIcon } from '@chakra-ui/icons'; // Importação específica do ícone

function AddEmployeeButton() {
  // Lógica para lidar com o clique do botão (abrir modal, etc.)
  const handleClick = () => {
    // Implemente a lógica para abrir o modal ou redirecionar para a página de adicionar funcionário
    console.log('Botão Adicionar Funcionário clicado!');
  };

  return (
    <Button leftIcon={<AddIcon />} colorScheme='teal' variant='solid' onClick={handleClick}>
      Adicionar Funcionário
    </Button>
  );
}

export default AddEmployeeButton;
