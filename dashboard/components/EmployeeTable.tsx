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

function EmployeeTable() {
  const [employees, setEmployees] = useState([
    { id: 1, nome: 'João Silva', cargo: 'Desenvolvedor', departamento: 'TI' },
    { id: 2, nome: 'Maria Souza', cargo: 'Gerente', departamento: 'RH' },
    { id: 3, nome: 'Pedro Alves', cargo: 'Analista', departamento: 'Financeiro' },
  ]);

  const [searchTerm, setSearchTerm] = useState('');
  const [sortColumn, setSortColumn] = useState('');
  const [sortOrder, setSortOrder] = useState('asc');

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value);
  };

  const handleSortClick = (column: string) => {
    if (sortColumn === column) {
      setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
    } else {
      setSortColumn(column);
      setSortOrder('asc');
    }
  };

  const sortedEmployees = employees
    .filter((employee) =>
      Object.values(employee).some((value) =>
        String(value).toLowerCase().includes(searchTerm.toLowerCase())
      )
    )
    .sort((a, b) => {
      const valueA = String(a[sortColumn]).toLowerCase();
      const valueB = String(b[sortColumn]).toLowerCase();
      return sortOrder === 'asc' ? valueA.localeCompare(valueB) : valueB.localeCompare(valueA);
    });
    
    useEffect(() => {
      const fetchEmployees = async () => {
        try {
          const response = await fetch('http://localhost:3001/api/employees'); // URL da sua API
          const data = await response.json();
          setEmployees(data);
        } catch (error) {
          console.error('Erro ao buscar funcionários:', error);
        }
      };
  
      fetchEmployees();
    }, []);
    
  return (
    <>
      <InputGroup mb={4}>
        <InputLeftElement pointerEvents='none'>
          <SearchIcon color='gray.300' />
        </InputLeftElement>
        <Input
          placeholder='Buscar funcionário'
          value={searchTerm}
          onChange={handleSearchChange}
        />
      </InputGroup>
      <Table variant='simple'>
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
          {sortedEmployees.map((employee) => (
            <Tr key={employee.id}>
              <Td>{employee.nome}</Td>
              <Td>{employee.cargo}</Td>
              <Td>{employee.departamento}</Td>
              <Td>
                <Button colorScheme='yellow' size='sm' mr={2}>
                  Editar
                </Button>
                <Button colorScheme='red' size='sm'>
                  Excluir
                </Button>
              </Td>
            </Tr>
          ))}
        </Tbody>
      </Table>
    </>
  );
}

export default EmployeeTable;
