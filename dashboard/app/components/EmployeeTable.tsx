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
} from '@chakra-ui/react';
import { SearchIcon, TriangleDownIcon, TriangleUpIcon } from '@chakra-ui/icons';
import Link from 'next/link';

interface Employee {
  _id: string; // Use _id para o ID do MongoDB
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

  return (
    <>
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
            <Tr key={employee._id}> {/* Use _id como chave */}
              <Td>{employee.nome}</Td>
              <Td>{employee.cargo}</Td>
              <Td>{employee.departamento}</Td>
              <Td>
                <Link href={`/edit-employee/${employee._id}`}>
                  <Button colorScheme="yellow" size="sm" mr={2}>
                    Editar
                  </Button>
                </Link>
                <Button colorScheme="red" size="sm">
                  Excluir
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
