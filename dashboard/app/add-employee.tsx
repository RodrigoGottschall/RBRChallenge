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

interface EmployeeData {
  nome: string;
  cargo: string;
  departamento: string;
  dataAdmissao: string;
}

export default function AddEmployee() {
  const router = useRouter();
  const [formData, setFormData] = useState<EmployeeData>({
    nome: '',
    cargo: '',
    departamento: '',
    dataAdmissao: '',
  });
  const [errors, setErrors] = useState<Partial<EmployeeData>>({});

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [event.target.name]: event.target.value });
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    // Validação dos campos
    const newErrors: Partial<EmployeeData> = {};
    if (!formData.nome) newErrors.nome = 'Nome é obrigatório';
    if (!formData.cargo) newErrors.cargo = 'Cargo é obrigatório';
    if (!formData.departamento) newErrors.departamento = 'Departamento é obrigatório';
    if (!formData.dataAdmissao) newErrors.dataAdmissao = 'Data de admissão é obrigatória';
    setErrors(newErrors);

    if (Object.keys(newErrors).length === 0) {
      try {
        const response = await fetch('http://localhost:3001/api/employees', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(formData),
        });

        if (response.ok) {
          // Limpar o formulário
          setFormData({ nome: '', cargo: '', departamento: '', dataAdmissao: '' });
          setErrors({});

          // Redirecionar para a página inicial após o sucesso
          router.push('/');
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
          <FormControl isInvalid={!!errors.cargo} mb={4}>
            <FormLabel htmlFor="cargo">Cargo</FormLabel>
            <Input id="cargo" name="cargo" value={formData.cargo} onChange={handleChange} />
            <FormErrorMessage>{errors.cargo}</FormErrorMessage>
          </FormControl>
          <FormControl isInvalid={!!errors.departamento} mb={4}>
            <FormLabel htmlFor="departamento">Departamento</FormLabel>
            <Input id="departamento" name="departamento" value={formData.departamento} onChange={handleChange} />
            <FormErrorMessage>{errors.departamento}</FormErrorMessage>
          </FormControl>
          <FormControl isInvalid={!!errors.dataAdmissao} mb={4}>
            <FormLabel htmlFor="dataAdmissao">Data de Admissão</FormLabel>
            <Input id="dataAdmissao" name="dataAdmissao" type="date" value={formData.dataAdmissao} onChange={handleChange} />
            <FormErrorMessage>{errors.dataAdmissao}</FormErrorMessage>
          </FormControl>
          <Button type="submit" colorScheme="teal" mt={4}>
            Adicionar
          </Button>
        </form>
      </Box>
    </Flex>
  );
}
