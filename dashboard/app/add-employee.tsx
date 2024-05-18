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
  useToast,
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
  const toast = useToast();

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

    const newErrors: Partial<EmployeeData> = {};

    // Validação dos campos
    Object.keys(formData).forEach((key) => {
      if (!formData[key as keyof EmployeeData]) {
        newErrors[key as keyof EmployeeData] = `${key} é obrigatório`;
      }
    });
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

          // Exibir mensagem de sucesso
          toast({
            title: 'Funcionário adicionado com sucesso!',
            status: 'success',
            duration: 3000,
            isClosable: true,
          });

          // Redirecionar para a página inicial após o sucesso
          router.push('/');
        } else {
          // Exibir mensagem de erro
          const errorData = await response.json(); // Obter a mensagem de erro do backend
          toast({
            title: 'Erro ao adicionar funcionário',
            description: errorData.error || 'Ocorreu um erro desconhecido',
            status: 'error',
            duration: 5000,
            isClosable: true,
          });
        }
      } catch (error) {
        // Exibir mensagem de erro genérica em caso de falha na requisição
        toast({
          title: 'Erro ao adicionar funcionário',
          description: 'Ocorreu um erro na requisição. Verifique sua conexão e tente novamente.',
          status: 'error',
          duration: 5000,
          isClosable: true,
        });
      }
    }
  };

  // ... (resto do código, incluindo o formulário)
}
