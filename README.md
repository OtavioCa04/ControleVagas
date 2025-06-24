Este projeto é uma aplicação completa para gerenciamento de candidaturas a vagas de emprego, com backend em Java (Spring Boot), banco de dados MySQL e frontend em HTML, CSS e JavaScript puro.

Estrutura da Aplicação
Backend (Spring Boot + MySQL)

Model: Define a entidade Vaga, com atributos como id, empresa, cargo, data da candidatura, salário, status e descrição detalhada da vaga.
Repository: Interface que estende JpaRepository, permitindo operações básicas de banco de dados.
Service: Camada opcional para centralizar regras de negócio relacionadas às vagas.
Controller: Camada responsável por expor a API RESTful com endpoints para criar, listar, buscar, atualizar e deletar vagas.

O banco de dados MySQL é configurado no application.properties, e as tabelas são geradas automaticamente.

Frontend (HTML + CSS + JavaScript)

HTML: Formulário simples para entrada de dados das vagas (empresa, cargo, data, salário, status, descrição) e uma lista dinâmica que exibe todas as vagas cadastradas.
JavaScript: Manipula eventos do formulário, realiza chamadas fetch à API para executar operações CRUD (Create, Read, Update, Delete).
CSS: Estilização básica para organizar o layout e melhorar a experiência visual da aplicação.

Funcionalidades

Cadastro de vagas com campos completos, incluindo descrição longa.
Listagem dinâmica de todas as candidaturas.
Visualização detalhada de cada vaga.
Atualização e exclusão de vagas.
Filtro simples para ordenar as vagas por cargo ou data de candidatura.

Tecnologias utilizadas

Backend: Java 21, Spring Boot 3, Spring Data JPA, MySQL
Frontend: HTML, CSS, JavaScript
Build: Maven
