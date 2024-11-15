![image](https://github.com/user-attachments/assets/8446a5d8-c63e-4733-a8a6-3105b0d3e0b6)

para iniciar:
 - docker-compose up
acessar diretrório react-front:
   - npm start
- Iniciar via vscode:
  - ApplicationStart.java

Desenvolvimento de uma aplicação Spring Boot com acesso a banco de dados e exposição de endpoints REST

Recentemente, desenvolvi uma aplicação Spring Boot que utiliza Spring Data para acessar o banco de dados e expõe endpoints REST para interação com o frontend. A aplicação segue a arquitetura baseada em entidades como Carro, Marca e Modelo. Abaixo, explico um pouco sobre as decisões tomadas e como organizei o código:

Modelagem de dados e banco de dados:

A aplicação possui entidades Carro, Marca e Modelo, todas mapeadas para tabelas no banco de dados com a ajuda do Spring Data JPA.
Cada Carro está relacionado a uma Marca e a um Modelo, sendo essas relações mapeadas utilizando anotações @ManyToOne.
Utilizei o H2 como banco de dados em ambiente de desenvolvimento, mas o código é facilmente adaptável para outros bancos, como MySQL ou PostgreSQL.
Endpoints REST:

Criei endpoints para CRUD de Carros, Marcas e Modelos. A ideia é permitir a interação fácil entre o backend e o frontend, com os dados sendo entregues em formato JSON.

A estrutura de pacotes é organizada em três camadas: Controller, Service e Repository.
Controllers lidam com as requisições HTTP.
Services contêm a lógica de negócios.
Repositories são responsáveis pela comunicação com o banco de dados.
Isso garante que o código seja bem estruturado, modular e fácil de manter.

Tecnologias utilizadas:
Spring Boot para a construção da aplicação.
Spring Data JPA para acesso ao banco de dados.
Framework React com JavaScript para o Front.
