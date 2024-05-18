'use client';

import { useEffect, useState } from 'react';
import {
  Table, Thead, Tbody, Tr, Th, Td, Button, Input, InputGroup, InputLeftElement,
} from '@chakra-ui/react';
import { SearchIcon, TriangleDownIcon, TriangleUpIcon } from '@chakra-ui/icons';

interface Employee {
  id: number;
  nome: string;
  cargo: string;
  departamento: string;
}

const EmployeeTable = () => {
  const [employees, setEmployees] = useState<Employee[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [sortColumn, setSortColumn] = useState('');
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
    setSearchTerm(event.target.value.toLowerCase()); // Convertendo para minúsculo para uma busca que não diferencia maiúsculas de minúsculas
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
      .sort((a, b) => {
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
            {/* ... (outros cabeçalhos da tabela) */}
          </Tr>
        </Thead>
        <Tbody>
          {getSortedEmployees().map((employee) => (
            <Tr key={employee.id}>
              <Td>{employee.nome}</Td>
              {/* ... (outros campos da tabela) */}
            </Tr>
          ))}
        </Tbody>
      </Table>
    </>
  );
};

export default EmployeeTable;
