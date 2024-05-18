'use client';

import { useEffect, useState } from 'react';
import {
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  Button,
  Input,
  InputGroup,
  InputLeftElement,
  AlertDialog,
  AlertDialogBody,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogContent,
  AlertDialogOverlay,
} from '@chakra-ui/react';
import { SearchIcon, TriangleDownIcon, TriangleUpIcon, DeleteIcon } from '@chakra-ui/icons';
import Link from 'next/link';
import React from 'react';

interface Employee {
  _id: string;
  nome: string;
  cargo: string;
  departamento: string;
  dataAdmissao: string;
}

const EmployeeTable = () => {
  const [employees, setEmployees] = useState<Employee[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [sortColumn, setSortColumn] = useState<keyof Employee>('nome');
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('asc');

  const [isOpen, setIsOpen] = useState(false);
  const [employeeIdToDelete, setEmployeeIdToDelete] = useState('');
  const onClose = () => setIsOpen(false);
  const cancelRef = React.useRef(null);

  useEffect(() => {
    const fetchEmployees = async () => {
      try {
        const response = await fetch('http://localhost:3001/api/employees');
        const data = await response.json();
        setEmployees(data);
      } catch (error) {
        console.error('Erro ao buscar funcionários:', error);
      }
    };

    fetchEmployees();
  }, []);

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value.toLowerCase());
  };

  const handleSortClick = (column: keyof Employee) => {
    setSortOrder(sortColumn === column && sortOrder === 'asc' ? 'desc' : 'asc');
    setSortColumn(column);
  };

  const getSortedEmployees = () => {
    return employees
      .filter((employee) =>
        Object.values(employee).some((value) =>
          String(value).toLowerCase().includes(searchTerm)
        )
      )
      .sort((a: Employee, b: Employee) => {
        const valueA = String(a[sortColumn]).toLowerCase();
        const valueB = String(b[sortColumn]).toLowerCase();
        return sortOrder === 'asc' ? valueA.localeCompare(valueB) : valueB.localeCompare(valueA);
      });
  };

  const handleDelete = async (employeeId: string) => {
    setIsOpen(true);
    setEmployeeIdToDelete(employeeId);
  };

  const onDeleteConfirm = async () => {
    try {
      const response = await fetch(`http://localhost:3001/api/employees/${employeeIdToDelete}`, {
        method: 'DELETE',
      });

      if (response.ok) {
        setEmployees(employees.filter((employee) => employee._id !== employeeIdToDelete));
        onClose();
      } else {
        console.error('Erro ao excluir funcionário:', response.statusText);
      }
    } catch (error) {
      console.error('Erro ao excluir funcionário:', error);
    }
  };

  return (
    <>
      <AlertDialog isOpen={isOpen} leastDestructiveRef={cancelRef} onClose={onClose}>
        <AlertDialogOverlay>
          <AlertDialogContent>
            <AlertDialogHeader fontSize='lg' fontWeight='bold'>
              Excluir Funcionário
            </AlertDialogHeader>

            <AlertDialogBody>
              Tem certeza que deseja excluir este funcionário?
            </AlertDialogBody>

            <AlertDialogFooter>
              <Button ref={cancelRef} onClick={onClose}>
                Cancelar
              </Button>
              <Button colorScheme='red' onClick={onDeleteConfirm} ml={3}>
                Excluir
              </Button>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialogOverlay>
      </AlertDialog>

      <InputGroup mb={4}>
        <InputLeftElement pointerEvents="none">
          <SearchIcon color="gray.300" />
        </InputLeftElement>
        <Input placeholder="Buscar funcionário" value={searchTerm} onChange={handleSearchChange} />
      </InputGroup>

      <Table variant="simple">
        <Thead>
          <Tr>
            <Th onClick={() => handleSortClick('nome')}>
              Nome {sortColumn === 'nome' && (sortOrder === 'asc' ? <TriangleUpIcon /> : <TriangleDownIcon />)}
            </Th>
            <Th onClick={() => handleSortClick('cargo')}>
              Cargo {sortColumn === 'cargo' && (sortOrder === 'asc' ? <TriangleUpIcon /> : <TriangleDownIcon />)}
            </Th>
            <Th onClick={() => handleSortClick('departamento')}>
              Departamento {sortColumn === 'departamento' && (sortOrder === 'asc' ? <TriangleUpIcon /> : <TriangleDownIcon />)}
            </Th>
            <Th>Ações</Th>
          </Tr>
        </Thead>
        <Tbody>
          {getSortedEmployees().map((employee) => (
            <Tr key={employee._id}>
              <Td>{employee.nome}</Td>
              <Td>{employee.cargo}</Td>
              <Td>{employee.departamento}</Td>
              <Td>
                <Link href={`/edit-employee/${employee._id}`}>
                  <Button colorScheme="yellow" size="sm" mr={2}>
                    Editar
                  </Button>
                </Link>
                <Button colorScheme="red" size="sm" onClick={() => handleDelete(employee._id)}>
                  <DeleteIcon />
                </Button>
              </Td>
            </Tr>
          ))}
        </Tbody>
      </Table>
    </>
  );
};

export default EmployeeTable;
