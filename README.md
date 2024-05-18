# RBRChallenge

Este projeto é um dashboard simples para gerenciar funcionários, construído com Next.js 14 (App Router), TypeScript, Chakra UI para o frontend e Node.js com Express.js e MongoDB (Mongoose) para o backend.`

Pré-requisitos

- Node.js e npm (ou yarn) instalados
- MongoDB instalado e em execução localmente

Configuração do Backend

1.Clonar o Repositório: 
    #git clone <URL_DO_SEU_REPOSITÓRIO> #cd backend

2. Instalar Dependências: 
    #yarn install

3. Configurar Variáveis de Ambiente:

- Crie um arquivo .env na raiz da pasta backend.
- Adicione a seguinte linha ao arquivo .env, substituindo seu-banco-de-dados pelo nome do seu banco de dados MongoDB:

MONGODB_URI=mongodb://127.0.0.1:27017/seu-banco-de-dados

4. Iniciar o Servidor:

    #yarn dev

O servidor backend será iniciado em http://localhost:3001 (ou na porta que você configurou).

Configuração do Frontend

Navegar para a Pasta do Frontend:
Bash

cd ../frontend

Use code with caution.

Instalar Dependências: Bash

yarn install

Use code with caution.

Iniciar o Servidor de Desenvolvimento: Bash

yarn dev

Use code with caution.

O servidor frontend será iniciado em http://localhost:3000.

Uso da Aplicação

Acesse o dashboard em http://localhost:3000.
Adicionar Funcionário: Clique no botão "Adicionar Funcionário" e preencha o formulário.
Editar Funcionário: Clique no botão "Editar" na linha do funcionário que você deseja editar.
Excluir Funcionário: Clique no botão "Excluir" na linha do funcionário que você deseja excluir.

Estrutura do Projeto

projeto ├── backend │ ├── controllers │ │ └── employeeController.js │ ├── models │ │ └── employee.js │ ├── routes │ │ └── employeeRoutes.js │ ├── config.js │ ├── errorMiddleware.js │ └── server.js ├── frontend │ ├── app │ │ ├── add-employee.tsx │ │ ├── components │ │ │ ├── AddEmployeeButton.tsx │ │ │ └── EmployeeTable.tsx │ │ ├── edit-employee │ │ │ └── [id].tsx │ │ ├── layout.tsx │ │ └── page.tsx │ ├── public │ ├── next.config.mjs │ └── package.json └── README.md

Tecnologias Utilizadas

Frontend:
    Next.js 14 (App Router)
    TypeScript
    Chakra UI
Backend:
    Node.js
    Express.js
    MongoDB
    Mongoose

Próximos Passos

Adicionar mais validação de dados no frontend e no backend.
Implementar autenticação e autorização para proteger a aplicação.
Adicionar mais funcionalidades ao dashboard, como gráficos, relatórios, etc.
Melhorar a interface do usuário com mais recursos do Chakra UI.
Escrever testes automatizados para garantir a qualidade do código.
