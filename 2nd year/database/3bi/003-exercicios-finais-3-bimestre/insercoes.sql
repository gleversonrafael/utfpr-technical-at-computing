/* ==========================================
   2. INSERÇÃO DE DADOS (DML)
========================================== */

-- Departamentos
INSERT INTO DEPARTAMENTOS (id_departamento, nome_departamento) VALUES 
(1, 'Eletrônicos'),
(2, 'Móveis'),
(3, 'Vestuário'),
(4, 'Livros');

-- Clientes
INSERT INTO CLIENTES (id_cliente, nome, estado) VALUES 
(1, 'Ana Clara Souza', 'SP'),
(2, 'Marcos Oliveira', 'RJ'),
(3, 'Beatriz Lima', 'MG'),
(4, 'João Pedro Santos', 'PR'),
(5, 'Camila Fernandes', 'SC');

-- Produtos
INSERT INTO PRODUTOS (id_produto, nome_produto, preco, id_departamento) VALUES 
(101, 'Notebook Pro', 4500.00, 1),
(102, 'Smartphone', 1500.00, 1),
(103, 'Sofá de Couro', 2500.00, 2),
(104, 'Mesa de Jantar', 1200.00, 2),
(105, 'Camiseta Básica', 50.00, 3),
(106, 'Cadeira Ergonômica', 850.00, 2), -- Produto sem vendas (para EXCEPT)
(107, 'Livro de SQL', 120.00, 4);

-- Vendas
INSERT INTO VENDAS (id_venda, id_cliente, id_produto, data_venda, quantidade, valor_total) VALUES 
(1001, 1, 101, '2026-09-01', 1, 4500.00),
(1002, 1, 103, '2026-09-05', 1, 2500.00),
(1003, 2, 105, '2026-09-10', 12, 600.00),
(1004, 3, 104, '2026-09-11', 1, 1200.00),
(1005, 3, 107, '2026-09-12', 2, 240.00),
(1006, 4, 102, '2026-09-13', 2, 3000.00);