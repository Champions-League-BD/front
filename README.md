# React + Vite

Este projeto é uma configuração mínima para iniciar o desenvolvimento com React e Vite, incluindo Hot Module Replacement (HMR) e regras básicas de ESLint.

## Plugins Oficiais

Atualmente, há dois plugins oficiais disponíveis para integrar React com Vite:

[@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react/README.md): Utiliza o [Babel](https://babeljs.io/) para habilitar o Fast Refresh.
[@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react-swc): Utiliza o [SWC](https://swc.rs/) para habilitar o Fast Refresh.

## Instalação e Execução do Projeto

### Clonando o Repositório

Após clonar o repositório, caso ocorra algum erro com o Vite, execute o seguinte comando para garantir a instalação:

```bash
npm install vite --save-dev
```

### Instalar Dependências

Para instalar todas as dependências do projeto, incluindo o Vite, utilize:

```bash
npm install
```

### Executar o Servidor de Desenvolvimento

Para iniciar o servidor de desenvolvimento com Vite, execute:

```bash
npm run dev
```

### Configurando o JSON Server para Testes de API

Para simular uma API local, este projeto inclui o JSON Server como dependência de desenvolvimento. Para instalar, caso necessário:

```bash
npm install json-server --save-dev
```

Para iniciar o JSON Server (crie o arquivo db.json na raiz, se não houver), utilize o comando:

```bash
npm run json-server
```

## Recursos Adicionais

Para mais informações sobre Vite e React, consulte a [documentação oficial do Vite](https://vitejs.dev/) e do [React](https://reactjs.org/).
