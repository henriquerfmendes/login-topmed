# Projeto de Login - TOPMED

Este repositório contém o código-fonte para um sistema de login de dois componentes: um backend em ASP.NET Core e um frontend em React.

## Visão Geral

-   **Backend**: API RESTful construída com ASP.NET Core para criação e autenticação de usuários.
-   **Frontend**: Aplicação de página única (SPA) em React com TypeScript para a interface do usuário.

## Pré-requisitos

Antes de começar, certifique-se de ter o seguinte software instalado:

- .Net 8.0
- Node.js 22 ou superior
- SQL Server (Gerenciador de SQL Server, Portal Azure ou Azure Data Studio)

## Como Configurar e Rodar o Projeto

### 1. Clonar o Repositório

```bash
git clone <URL_DO_REPOSITORIO>
cd login-topmed
```

### 2. Configurar o Backend

O backend requer uma string de conexão com o banco de dados para funcionar, a qual encaminhei por whatsapp à recrutadora da Topmed.

1.  **Navegue até a pasta da API**:
    ```bash
    cd backend/src/LoginAPI
    ```

2.  **Aplicar as Migrations**:
    Para criar o banco de dados e as tabelas, execute o seguinte comando no diretório `backend/src/LoginAPI`:

    ```bash
    dotnet ef database update
    ```
    Isso aplicará as migrations do Entity Framework e preparará o banco de dados.

3.  **Executar o Backend**:
    Ainda no diretório `backend/src/LoginAPI`, inicie a API:

    ```bash
    dotnet run
    ```
    A API estará rodando em `https://localhost:5297`. 
    Caso a porta mude ao rodar o backend, é necessário atualiza-la depois no frontend, no arquivo `/frontend/src/services/api.ts` na const API_BASE_URL.

### 3. Configurar o Frontend

1.  **Navegue até a pasta do frontend**:
    Em um novo terminal, vá para a pasta `frontend`:

    ```bash
    cd frontend
    ```

2.  **Instale as dependências**:
    ```bash
    npm install
    ```

3.  **Execute o Frontend**:
    ```bash
    npm run dev
    ```
    A aplicação React estará disponível em `http://localhost:5173`.

## Estrutura do Projeto

```
login-topmed/
├── backend/         # Código-fonte do ASP.NET Core
└── frontend/        # Código-fonte do React
```

## Tecnologias Utilizadas

-   **Backend**: ASP.NET Core, Entity Framework Core, SQL Server, JWT
-   **Frontend**: React, TypeScript, Vite, Axios, Zod, CSS Modules
-   **Banco de Dados**: SQL Server

## Screenshots

### Página de Login

![Página de Login](./frontend/src/assets/print-login.png)

### Página de Sucesso

![Página de Sucesso](./frontend/src/assets/print-success.png)