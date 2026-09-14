-- ==========================================
-- EXERCÍCIOS DE UNION, EXCEPT E INTERSECT
-- ==========================================

-- 1 - [UNION] Crie uma consulta que retorne uma lista única contendo os nomes dos clientes que moram no estado de São Paulo ('SP') e os nomes dos clientes 
-- que moram no Paraná ('PR').
(SELECT * FROM CLIENTES WHERE estado = 'PR'
UNION
SELECT * FROM CLIENTES WHERE ESTADO = 'SP');

-- 2 - [UNION] Liste os nomes e os preços de todos os produtos que pertencem ao departamento de 'Eletrônicos' (id_departamento = 1) 
-- UNIDOS aos produtos que custam menos de R$ 1000.00 (independentemente do departamento).
(SELECT nome, preco
FROM PRODUTOS
WHERE id_departamento = 1)

UNION 

(SELECT nome, preco
FROM PRODUTOS
WHERE preco < 1000);

-- 3 - [INTERSECT] Liste os IDs dos produtos que foram comprados pela cliente 'Ana Silva' (id_cliente = 1) e que 
-- TAMBÉM (interseção) foram comprados pelo cliente 'Carlos Souza' (id_cliente = 3).
(SELECT id_produto
FROM VENDAS
WHERE id_cliente = 1)

INTERSECT

(SELECT id_produto
FROM VENDAS
WHERE id_cliente = 3);

-- 4 - [INTERSECT] Retorne os nomes dos clientes que possuem um limite de crédito superior a R$ 2000.00 e que, 
-- ao mesmo tempo, já realizaram pelo menos uma compra na loja. (Use INTERSECT entre as duas lógicas).
(SELECT nome
FROM CLIENTES
WHERE limite_credito > 2000)

INTERSECT 

(SELECT nome
FROM CLIENTES C INNER JOIN VENDAS V
ON C.id_cliente = V.id_cliente);

-- 5 - [EXCEPT] Liste os nomes de todos os clientes cadastrados no sistema, EXCETO os nomes daqueles que já realizaram alguma compra. 
-- (Esta é uma forma alternativa de resolver o exercício 2 da lista anterior).
(SELECT nome FROM CLIENTES)

EXCEPT

(SELECT nome FROM 
CLIENTES C INNER JOIN VENDAS V
ON (C.id_cliente = V.id_cliente));

-- 6 - [EXCEPT] Liste os IDs e os nomes dos produtos pertencentes ao departamento de 'Móveis' (id_departamento = 2), 
-- EXCETO aqueles que já possuem registro na tabela de vendas.
(SELECT id_produto, nome
FROM PRODUTOS 
WHERE id_produto = 2)

EXCEPT

(SELECT P.id_produto, nome
FROM PRODUTOS P INNER JOIN VENDAS V
ON (P.id_produto = V.id_produto)
);


-- 7 - [UNION ALL vs UNION] Crie uma consulta que retorne os IDs de todos os clientes que 
-- compraram no dia '2023-11-04' e una com os IDs dos clientes que compraram no dia '2023-11-06'. 
-- Faça uma versão com UNION (que remove duplicatas) e outra com UNION ALL 
-- (que mantém duplicatas) para notar a diferença, 
-- já que o cliente 1 comprou em ambas as datas.
(SELECT id_cliente FROM VENDAS
WHERE data_venda = '2023-11-06')
UNION 
(SELECT id_cliente FROM VENDAS
WHERE data_venda = '2023-11-06');

(SELECT id_cliente FROM VENDAS
WHERE data_venda = '2023-11-06')
UNION ALL 
(SELECT id_cliente FROM VENDAS
WHERE data_venda = '2023-11-06');


-- 8 - [MISTO] Construa uma consulta que retorne os nomes dos produtos do departamento de 'Eletrônicos' (id = 1)
-- UNIDOS aos nomes dos produtos do departamento de 'Móveis' (id = 2), EXCETO os produtos cujo preço seja superior a R$ 3000.00.
(SELECT nome FROM PRODUTOS
WHERE id_departamento = 1

UNION
SELECT nome FROM PRODUTOS
WHERE id_departamento = 2
)
EXCEPT 
SELECT nome FROM PRODUTOS
WHERE preco > 3000;
