# 2025-GameLogged
Assignment for the 2025 edition of the "Web Development and the Semantic Web" course, by Arthur Tartaglia Pereira, Gianluca Schmidt Mantovaneli, João Gabriel de Barros Rocha and Karla Sancio.

# Projeto GameLogged

Este documento fornece as instruções necessárias para configurar e executar o ambiente de desenvolvimento localmente usando Docker.

## Tecnologias Utilizadas

* **Backend:** Spring Boot (Java 21)
* **Frontend:** React (com Vite)
* **Banco de Dados:** MySQL
* **Containerização:** Docker & Docker Compose
* **Gerenciador de Dependências (Backend):** Maven
* **Gerenciador de Dependências (Frontend):** NPM

## Pré-requisitos

Antes de começar, certifique-se de que você tem as seguintes ferramentas instaladas na sua máquina:

* [Docker](https://www.docker.com/get-started)

## Como Executar o Ambiente

Com o Docker em execução na sua máquina, siga os passos abaixo para iniciar toda a aplicação.

### 1. Clonar o Repositório

O primeiro passo é clonar o repositório.

```bash
git clone https://github.com/dwws-ufes/2025-GameLogged.git
cd 2025-GameLogged
```

### 2. Subir os Contêineres

Para iniciar todos os serviços (backend, frontend e banco de dados) em modo de desenvolvimento com live-reload, execute o seguinte comando na pasta raiz do projeto (onde o arquivo `docker-compose.yml` está localizado):

```bash
docker-compose up -d
```

Na primeira vez que você executar este comando, o Docker irá baixar as imagens necessárias e construir as imagens locais para o backend e frontend, o que pode levar alguns minutos.

### 3. Acessando os Serviços

Após os contêineres estarem em execução, os serviços estarão disponíveis nos seguintes endereços e portas na sua máquina local:

| Serviço             | URL                    |
| :------------------ | :----------------------|
| **Frontend (UI)**   | `http://localhost:3000`|
| **Backend (API)**   | `http://localhost:8080`|
| **Banco de Dados**  | `http://localhost:3306`|


Para testar se o container da API esta funcionando corretamente, mande uma requisição `GET` para a url `http://localhost:8080/teste/status` utilizando o Insomnia. Caso seja retornado "Teste OK" como resposta, está tudo certo.

### 4. Descer Containers

Quando terminar de trabalhar, você pode parar e remover todos os contêineres e redes associadas com um único comando:

```bash
docker-compose down
```

Se desejar parar os contêineres e também remover os dados do banco de dados, execute o comando com a flag -v:

```bash
docker-compose down -v
```

## Fluxo de Desenvolvimento

Este ambiente está configurado para live-reload, o que significa que você não precisa reiniciar os contêineres para cada mudança no código.

**Alterações no Backend:** Simplesmente salve seus arquivos .java ou .properties. O Spring Boot DevTools irá detectar a mudança e reiniciar a aplicação automaticamente.

**Alterações no Frontend:** Simplesmente salve seus arquivos .jsx, .tsx ou .css. O servidor de desenvolvimento do Vite irá atualizar a página no seu navegador instantaneamente.

### Importante: Quando Usar o --build
O live-reload funciona para alterações nos arquivos de código, mas não para alterações nas dependências do projeto.

Você PRECISA reconstruir as imagens usando a flag --build sempre que alterar:

O arquivo `pom.xml` do backend (para adicionar, remover ou atualizar dependências Maven).

O arquivo `package.json` do frontend (para adicionar, remover ou atualizar pacotes NPM).

Qualquer um dos Dockerfiles.

O comando para forçar a reconstrução é:

```bash
docker-compose up -d --build
```
