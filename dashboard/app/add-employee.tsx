'use client';

import { useState } from 'react';
import {
  FormControl,
  FormLabel,
  Input,
  Button,
  Heading,
  Flex,
  Box,
  FormErrorMessage,
} from '@chakra-ui/react';
import { useRouter } from 'next/navigation';

export default function AddEmployee() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    nome: '',
    cargo: '',
    departamento: '',
    dataAdmissao: '',
  });
  const [errors, setErrors] = useState({});

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [event.target.name]: event.target.value });
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    // Validação dos campos (implementar a lógica aqui)
    const newErrors: any = {};
    if (!formData.nome) newErrors.nome = 'Nome é obrigatório';
    if (!formData.cargo) newErrors.cargo = 'Cargo é obrigatório';
    if (!formData.departamento) newErrors.departamento = 'Departamento é obrigatório';
    if (!formData.dataAdmissao) newErrors.dataAdmissao = 'Data de admissão é obrigatória';
    setErrors(newErrors);

    if (Object.keys(newErrors).length === 0) {
      // Se não houver erros, enviar os dados para o backend (implementar a lógica aqui)
      try {
        const response = await fetch('/api/employees', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(formData),
        });

        if (response.ok) {
          router.push('/'); // Redirecionar para a página inicial após o sucesso
        } else {
          console.error('Erro ao adicionar funcionário:', response.statusText);
        }
      } catch (error) {
        console.error('Erro ao adicionar funcionário:', error);
      }
    }
  };

  return (
    <Flex justifyContent="center" alignItems="center" height="100vh">
      <Box p={8} borderWidth={1} borderRadius="lg">
        <Heading mb={4}>Adicionar Funcionário</Heading>
        <form onSubmit={handleSubmit}>
          <FormControl isInvalid={!!errors.nome} mb={4}>
            <FormLabel htmlFor="nome">Nome</FormLabel>
            <Input id="nome" name="nome" value={formData.nome} onChange={handleChange} />
            <FormErrorMessage>{errors.nome}</FormErrorMessage>
          </FormControl>
          {/* Outros campos do formulário (cargo, departamento, data de admissão) */}
          <Button type="submit" colorScheme="teal" mt={4}>
            Adicionar
          </Button>
        </form>
      </Box>
    </Flex>
  );
}
