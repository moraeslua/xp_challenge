# Desafio Técnico XP | Backend

## Descrição do projeto
API RESTful desenvolvida para o processo seletivo da XP inc na área de backend.

## Objetivos do projeto
Construir uma API em que um usuário consiga se registrar, comprar/vender ações e ter algumas funcionalidades de conta digital como saque e depósito.
Além disso, o usuário consegue obter todo o seu histórico de movimentação na conta de forma geral e também detalhes sobre seu histórico em investimentos.

## :sparkles: Funcionalidades

* Cadastro de clientes (autenticação JWT).
* Login (autenticação JWT).
* Lista de ativos disponíveis pra compra (filtrados por paginação).
* Detalhes de um ativo disponível específico.
* Investir em uma ação.
* Vender uma ação.
* Histórico de investimentos do cliente (filtrados por paginação).
* Realizar saque
* Realizar depósito
* Histórico (extrato) de todas as movimentações do cliente em sua conta (filtrados por paginação).

## Para rodar em sua máquina

### Pré-requisitos gerais

Antes de começar, você vai precisar ter instalado em sua máquina as seguintes ferramentas:
[Git](https://git-scm.com), [Node.js](https://nodejs.org/en/).

<details>
  <summary><strong> 🐳 Rodando no Docker </strong></summary><br/> 
   <h3>Pré-requisitos</h3>
   
   - Antes de clonar o repositório, você precisa ter o [Docker](https://www.docker.com/) instalado em sua máquina.  
  ---
  
  - Clone o repositório com `git clone git@github.com:moraeslua/xp_challenge.git`
  
  - Entre no diretório que acabou de ser criado `cd xp_challenge`
  
  - Rode o docker compose `docker-compose up -d`
  
  - Entre no container chamado **xp_challenge** `docker exec -it xp_challenge /bin/sh`
  
  - Rode o comando para executar as migrations e seeders do banco `npx prisma migrate dev`
  
  - Agora é só fazer as requisições com um API Client como [Insomnia](https://insomnia.rest/) ou [Postman](https://www.postman.com/), por exemplo.
  

</details>

<details>
  <summary><strong> :computer: Rodando localmente </strong></summary><br />    
   <h3>Pré-requisitos</h3>
   
   - Antes de clonar o repositório, você precisa ter o [PostgreSQL](https://www.postgresql.org/) instalado em sua máquina.  
  
  ---
   <h4> Configurando o PostgreSQL </h4>
   
   - Se conecte ao PostgreSQL pela linha de comando `sudo -i -u postgres`
   - Crie um novo banco `CREATE DATABASE xp_challenge_db;`
   - Crie um novo usuário `CREATE USER my_user WITH ENCRYPTED PASSWORD 'my_pass';`
   - Conceda privilégios desse novo usuário para se conectar a **xp_challenge_db** 
     `GRANT ALL PRIVILEGES ON DATABASE "xp_challenge_db" to my_user; `
   - Dê permissões para seu novo usuário poder criar banco de dados: `ALTER USER my_user CREATEDB;`
   
  ---
  
  - Clone o repositório com `git clone git@github.com:moraeslua/xp_challenge.git`
  
  - Entre no diretório que acabou de ser criado `cd xp_challenge`
  
  - Instale as dependências com `npm install`
  
  - Agora, você precisa configurar as variaveis de ambiente de acordo com o .env.example:
    - JWT_SECRET=seu segredo super secreto
    - DATABASE_URL=postgresql://my_user:my_pass@localhost:5432/xp_challenge_db?schema=public
    - PORT=3000
  
  - Rode o comando para executar as migrations e seeders do banco `npx prisma migrate dev`
  
  - Rode o comando para subir o servidor localmente na porta que você escolheu `npm start`
  
  - Agora é só fazer as requisições com um API Client como [Insomnia](https://insomnia.rest/) ou [Postman](https://www.postman.com/), por exemplo.
      
</details>

<details>
  <summary><strong> :page_with_curl: Lista de comandos </strong></summary><br />
  
  - Para rodar o servidor na porta determinada:
    `npm run dev`
  - Para executar migrations e seeders:
    `npx prisma migrate dev`
  - Para executar seeders:
    `npx prisma db seed`
  - Para restaurar banco de dados:
    `npm run restore`
  - Para limpar todas as informações de todas as tabelas do banco de dados:
    `npm run truncate`
  - Para executar os testes unitários:
    `npm run test`
  - Para executar a cobertura de testes:
    `npm run test:cov`

</details>

## 🛠 Tecnologias

As seguintes ferramentas foram usadas no desenvolvimento do projeto:

- [Express](https://expressjs.com/pt-br/)
- [Node.js](https://nodejs.org/en/)
- [TypeScript](https://www.typescriptlang.org/)
- [Prisma](https://www.prisma.io/)
- [PostgreSQL](https://www.postgresql.org/)
- [Jsonwebtoken](https://www.npmjs.com/package/jsonwebtoken)
- [Bcrypt](https://www.npmjs.com/package/bcrypt)
- [Ts-jest](https://kulshekhar.github.io/ts-jest/)
- [Docker](https://www.docker.com/)

## Sobre o desenvolvimento
  Para armazenar e lidar com dados:
  - Banco de dados relacional PostgreSQL através do ORM [Prisma](https://www.prisma.io/) para garantir queries mais seguras, 
  escritas durante o desenvolvimento com o [TypeScript](https://www.typescriptlang.org/) e geradas automaticamente em SQL pelo Prisma Client, que possui
  segurança de tipos.
  
    - Account <strong>(conta)</strong>: tabela responsável por armazenar todos os dados pessoais do cliente.
    - Asset <strong>(ativo)</strong>: tabela responsável por armazenaar dados referentes aos ativos e quantidade disponível pra compra.
    - Investment <strong>(investimentos)</strong>: tabela responsável por armazenar o relacionamento N:N entre "Account" e "Asset".
    - InvestmentEvents  <strong>(eventos de investimento)</strong>: tabela responsável por armazenar o histórico de compras e vendas de ações do cliente.
    - AccountEvents <strong>(eventos da conta)</strong>: tabela responsável por armazenar histórico de transações do cliente como saque e depósito.
    
  :sparkles: Na construção da tabela <strong>Investment</strong> é armazenado apenas o *id do cliente*, *id do ativo* e a *quantidade do ativo* correspondente
  que o cliente possui. *Mas e o preço que o cliente pagou pela unidade de ativo?* Como no mercado de ações o preço dos ativos são dinâmicos, a ideia é que
  quando o cliente acesse as informações sobre os investimentos que ele possui, o preço seja puxado da tabela **Asset** que é a fonte de verdade.
  Para armazenar o quanto o cliente pagou pela unidade de ativo, e outros detalhes, em cada uma de suas operações em investimentos, é utilizada a tabela **InvestmentEvents**.
  
  Para a arquitetura:
  - Modelo MSC (model, service, controller).
  - Paradigma de orientação a objeto aplicando princípios SOLID.
  - Padrão REST.
  
  :sparkles: O princípio de inversão de dependências foi fortemente utilizado neste projeto. Para isso, cada entidade possui módulos que exportam
  seus próprios controllers, services e repositories já instanciados e prontos para serem utilizados na aplicação. 
    Caso outro módulo dependa de alguma dessas entidades, eles são expostos durante o momento da criação de uma nova instância.
    Com isso, além de cada módulo e suas entidades serem instânciadas apenas uma vez durante a aplicação, a construção de testes unitários se tornou
    mais fácil pois cada entidade possui apenas o conhecimento da <strong>interface</strong> de suas dependências.
  
