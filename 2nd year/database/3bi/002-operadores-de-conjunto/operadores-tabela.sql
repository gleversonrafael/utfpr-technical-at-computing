-- ==========================================
-- CRIAÇÃO DAS TABELAS
-- ==========================================

CREATE TABLE DEPARTAMENTOS (
    id_departamento INT PRIMARY KEY,
    nome_departamento VARCHAR(50) NOT NULL
);

CREATE TABLE PRODUTOS (
    id_produto INT PRIMARY KEY,
    nome VARCHAR(100) NOT NULL,
    preco DECIMAL(10, 2) NOT NULL,
    id_departamento INT,
    FOREIGN KEY (id_departamento) REFERENCES DEPARTAMENTOS(id_departamento)
);

CREATE TABLE CLIENTES (
    id_cliente INT PRIMARY KEY,
    nome VARCHAR(100) NOT NULL,
    estado CHAR(2),
    limite_credito DECIMAL(10, 2)
);

CREATE TABLE VENDAS (
    id_venda INT PRIMARY KEY,
    id_cliente INT,
    id_produto INT,
    data_venda DATE,
    quantidade INT,
    FOREIGN KEY (id_cliente) REFERENCES CLIENTES(id_cliente),
    FOREIGN KEY (id_produto) REFERENCES PRODUTOS(id_produto)
);

-- ==========================================
-- INSERÇÃO DE DADOS
-- ==========================================

INSERT INTO DEPARTAMENTOS (id_departamento, nome_departamento) VALUES
(1, 'Eletrônicos'), (2, 'Móveis'), (3, 'Vestuário'), (4, 'Livros');

INSERT INTO PRODUTOS (id_produto, nome, preco, id_departamento) VALUES
(201, 'Smartphone Top', 3500.00, 1),
(202, 'Notebook Dev', 5500.00, 1),
(203, 'Cadeira Ergonômica', 800.00, 2),
(204, 'Mesa de Escritório', 1200.00, 2),
(205, 'Camisa Social', 150.00, 3),
(206, 'Livro de SQL Avançado', 90.00, 4),
(207, 'Monitor 27', 1100.00, 1),
(208, 'Sofá de Canto', 2100.00, 2);

INSERT INTO CLIENTES (id_cliente, nome, estado, limite_credito) VALUES
(1, 'Ana Silva', 'SP', 6000.00),
(2, 'Bruno Costa', 'RJ', 1500.00),
(3, 'Carlos Souza', 'MG', 2500.00),
(4, 'Diana Mendes', 'SP', 900.00),
(5, 'Eduardo Lima', 'PR', 8000.00),
(6, 'Fernanda Alves', 'SC', 400.00);

INSERT INTO VENDAS (id_venda, id_cliente, id_produto, data_venda, quantidade) VALUES
(3001, 1, 202, '2023-11-01', 1),
(3002, 1, 206, '2023-11-02', 2),
(3003, 2, 205, '2023-11-03', 3),
(3004, 3, 203, '2023-11-04', 1),
(3005, 3, 204, '2023-11-04', 1),
(3006, 5, 201, '2023-11-05', 2),
(3007, 1, 205, '2023-11-06', 1);

-- ==========================================
-- EXERCÍCIOS DE UNION, EXCEPT E INTERSECT
-- ==========================================

-- 1 - [UNION] Crie uma consulta que retorne uma lista única contendo os nomes dos clientes que moram no estado de São Paulo ('SP') e os nomes dos clientes que moram no Paraná ('PR').

-- 2 - [UNION] Liste os nomes e os preços de todos os produtos que pertencem ao departamento de 'Eletrônicos' (id_departamento = 1) UNIDOS aos produtos que custam menos de R$ 1000.00 (independentemente do departamento).

-- 3 - [INTERSECT] Liste os IDs dos produtos que foram comprados pela cliente 'Ana Silva' (id_cliente = 1) e que TAMBÉM (interseção) foram comprados pelo cliente 'Carlos Souza' (id_cliente = 3).

-- 4 - [INTERSECT] Retorne os nomes dos clientes que possuem um limite de crédito superior a R$ 2000.00 e que, ao mesmo tempo, já realizaram pelo menos uma compra na loja. (Use INTERSECT entre as duas lógicas).

-- 5 - [EXCEPT] Liste os nomes de todos os clientes cadastrados no sistema, EXCETO os nomes daqueles que já realizaram alguma compra. (Esta é uma forma alternativa de resolver o exercício 2 da lista anterior).

-- 6 - [EXCEPT] Liste os IDs e os nomes dos produtos pertencentes ao departamento de 'Móveis' (id_departamento = 2), EXCETO aqueles que já possuem registro na tabela de vendas.

-- 7 - [UNION ALL vs UNION] Crie uma consulta que retorne os IDs de todos os clientes que compraram no dia '2023-11-04' e una com os IDs dos clientes que compraram no dia '2023-11-06'. Faça uma versão com UNION (que remove duplicatas) e outra com UNION ALL (que mantém duplicatas) para notar a diferença, já que o cliente 1 comprou em ambas as datas.

-- 8 - [MISTO] Construa uma consulta que retorne os nomes dos produtos do departamento de 'Eletrônicos' UNIDOS aos nomes dos produtos do departamento de 'Móveis', EXCETO os produtos cujo preço seja superior a R$ 3000.00.
