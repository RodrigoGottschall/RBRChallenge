'use client';

import { useState, useEffect } from 'react';
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
import { useRouter, useParams } from 'next/navigation';

interface EmployeeData {
  _id: string; // Adicione o campo _id para o ID do MongoDB
  nome: string;
  cargo: string;
  departamento: string;
  dataAdmissao: string;
}

export default function EditEmployee() {
  const router = useRouter();
  const params = useParams();
  const employeeId = params.id as string;

  const [formData, setFormData] = useState<EmployeeData>({
    _id: '', // Inicialize o _id como string vazia
    nome: '',
    cargo: '',
    departamento: '',
    dataAdmissao: '',
  });
  const [errors, setErrors] = useState<Partial<EmployeeData>>({});

  useEffect(() => {
    const fetchEmployee = async () => {
      try {
        const response = await fetch(`http://localhost:3001/api/employees/${employeeId}`);
        if (response.ok) {
          const data = await response.json();
          setFormData(data);
        } else {
          console.error('Erro ao buscar funcionário:', response.statusText);
        }
      } catch (error) {
        console.error('Erro ao buscar funcionário:', error);
      }
    };

    fetchEmployee();
  }, [employeeId]);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [event.target.name]: event.target.value });
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    // Validação dos campos (mesma lógica do AddEmployee)
    const newErrors: Partial<EmployeeData> = {};
    if (!formData.nome) newErrors.nome = 'Nome é obrigatório';
    if (!formData.cargo) newErrors.cargo = 'Cargo é obrigatório';
    if (!formData.departamento) newErrors.departamento = 'Departamento é obrigatório';
    if (!formData.dataAdmissao) newErrors.dataAdmissao = 'Data de admissão é obrigatória';
    setErrors(newErrors);

    if (Object.keys(newErrors).length === 0) {
      try {
        const response = await fetch(`http://localhost:3001/api/employees/${employeeId}`, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(formData),
        });

        if (response.ok) {
          router.push('/'); // Redirecionar para a página inicial após o sucesso
        } else {
          console.error('Erro ao editar funcionário:', response.statusText);
        }
      } catch (error) {
        console.error('Erro ao editar funcionário:', error);
      }
    }
  };

  return (
    <Flex justifyContent="center" alignItems="center" height="100vh">
      <Box p={8} borderWidth={1} borderRadius="lg">
        <Heading mb={4}>Editar Funcionário</Heading>
        <form onSubmit={handleSubmit}>
          {/* Campos do formulário iguais ao AddEmployee, mas com os valores de formData preenchidos */}
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
            Salvar
          </Button>
        </form>
      </Box>
    </Flex>
  );
}
