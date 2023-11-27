CREATE DATABASE IF NOT EXISTS crudgame;

-- Uso do banco de dados
USE crudgame;

-- Criação da tabela de tarefas
CREATE TABLE IF NOT EXISTS tasks (
  id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  time VARCHAR(5) NOT NULL,
  priority VARCHAR(255) NOT NULL
);

-- Exemplo de inserção de dados iniciais (opcional)
INSERT INTO tasks (name, time, priority) VALUES
  ('Tarefa 1', '08:00', 'Alta'),
  ('Tarefa 2', '10:00', 'Média'),
  ('Tarefa 3', '12:00', 'Baixa');