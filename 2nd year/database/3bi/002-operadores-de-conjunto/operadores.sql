-- Dificuldades
-- [A] Fritou o coco
-- [B] Doeu um pouco
-- [C] Pensei um pouco
-- [D] Nem pensei

-- EXERCÍCIO 1: Qual é a receita total gerada por cada departamento? Liste o nome do
-- departamento e o valor total de vendas, ordenando do maior para o menor valor.
-- Apenas mostre departamentos com receita superior a R$ 5.000,00. 

-- (Dificuldade: A+), 
-- Lembre-se de usar having invés de where, problemas em ordenar
SELECT nome_departamento, SUM(valor_total) 
FROM DEPARTAMENTOS D 
INNER JOIN PRODUTOS P
ON (P.id_departamento = D.id_departamento)
INNER JOIN VENDAS V
ON (P.id_produto = V.id_produto)
GROUP BY D.id_departamento
HAVING SUM(valor_total) > 5000
ORDER BY SUM(valor_total) DESC;


-- EXERCÍCIO 2: Liste o nome e o preço de todos os produtos cujo preço está acima
-- da média de preços de TODOS os produtos cadastrados na loja. 

-- (Dificuldade: [C])
SELECT nome_produto, preco
FROM PRODUTOS
WHERE preco > (
	SELECT AVG(preco) 
	FROM PRODUTOS
);



-- EXERCÍCIO 3: Encontre o nome dos clientes que fizeram pelo menos uma compra de
-- um produto pertencente ao departamento de 'Eletrônicos'. Utilize subconsultas
-- com a cláusula IN (sem usar JOIN para chegar ao departamento). 

-- Dificuldade: [C]
SELECT nome 
FROM CLIENTES 
WHERE id_cliente IN (
	SELECT id_cliente
	FROM VENDAS
	WHERE id_produto IN
		(
			SELECT id_produto
			FROM PRODUTOS
			WHERE id_departamento IN
				(
					SELECT id_departamento
					FROM DEPARTAMENTOS
					WHERE nome_departamento = 'Eletrônicos'
				)
		)
);


-- EXERCÍCIO 4: Utilizando operadores de conjunto EXCEPT, liste os IDs
-- e nomes dos produtos que NUNCA foram vendidos.

-- Dificuldade: [C]
(SELECT id_produto, nome_produto
FROM PRODUTOS)
EXCEPT 
(SELECT P.id_produto, nome_produto
FROM PRODUTOS P INNER JOIN VENDAS V
ON (P.id_produto = V.id_produto)
);


-- EXERCÍCIO 5: Descubra quais clientes compraram produtos do departamento de
-- 'Eletrônicos' E TAMBÉM do departamento de 'Móveis'. Utilize o operador INTERSECT.

-- Dificuldade: [D]
(SELECT C.id_cliente, nome
FROM CLIENTES C JOIN VENDAS V
ON (C.id_cliente = V.id_cliente)
INNER JOIN PRODUTOS P 
ON (V.id_produto = P.id_produto)
INNER JOIN DEPARTAMENTOS D
ON (P.id_departamento = D.id_departamento)
WHERE nome_departamento = 'Eletrônicos'
)

INTERSECT

(SELECT C.id_cliente, nome
FROM CLIENTES C JOIN VENDAS V
ON (C.id_cliente = V.id_cliente)
INNER JOIN PRODUTOS P 
ON (V.id_produto = P.id_produto)
INNER JOIN DEPARTAMENTOS D
ON (P.id_departamento = D.id_departamento)
WHERE nome_departamento = 'Móveis'
);


-- EXERCÍCIO 6: Lista de "Clientes Destaque". Um cliente é destaque se:
-- 1. O valor total de suas compras é maior que a média do valor gasto por cliente. OU SE
-- 2. Ele comprou mais de 10 itens no total.
-- Utilize UNION para juntar as duas condições. O relatório deve conter apenas o nome.

-- Lembre-se de referenciar aqueles ids que aparecem repetidamente no select
-- Dificuldade: [S+]
(	
	SELECT nome
	FROM CLIENTES C JOIN VENDAS V
	ON (C.id_cliente = V.id_cliente)
	GROUP BY C.id_cliente
	HAVING SUM(valor_total) > (
		SELECT AVG(valor_por_cliente) -- MÉDIA DO VALOR GASTO POR CLIENTE
		FROM 
			( -- VALORES GASTOS POR CLIENTE
				SELECT C.id_cliente, SUM(valor_total) AS valor_por_cliente
				FROM CLIENTES C JOIN VENDAS V
				ON (C.id_cliente = V.id_cliente)
				GROUP BY C.id_cliente
				ORDER BY C.id_cliente ASC
			)
))

UNION

(
	SELECT nome
	FROM CLIENTES C JOIN VENDAS V 
	ON (C.id_cliente = V.id_cliente)
	GROUP BY C.id_cliente
	HAVING SUM(quantidade) > 10
);



-- EXERCÍCIO 7: Liste o nome do departamento e a quantidade total de produtos
-- cadastrados em cada um deles, mas exiba apenas os departamentos que possuem
-- mais de 1 produto cadastrado.

-- Dificuldade: [C+]
SELECT nome_departamento, COUNT(id_produto)
FROM DEPARTAMENTOS D JOIN PRODUTOS P 
ON (D.id_departamento = P.id_departamento)
GROUP BY D.id_departamento
HAVING COUNT(id_produto) > 1;



-- EXERCÍCIO 8: Encontre o produto mais caro cadastrado em cada departamento.
-- Retorne o nome do departamento e o maior preço encontrado.

-- Dificuldade: [B+, plausível a A-]
SELECT nome_departamento, MAX(preco) AS maior_preco_encontrado
FROM DEPARTAMENTOS D JOIN PRODUTOS P
ON (D.id_departamento = P.id_departamento)
GROUP BY D.id_departamento;


-- EXERCÍCIO 9: Encontre o nome e o preço do produto mais caro da loja inteira
-- utilizando uma subconsulta com a função MAX.

-- Dificuldade: [C]
SELECT nome_produto, preco
FROM PRODUTOS
WHERE preco = ANY(SELECT MAX(preco) FROM PRODUTOS);


-- EXERCÍCIO 10: Liste os clientes (nome e estado) que NÃO realizaram nenhuma compra.
-- Utilize subconsulta com NOT IN.

-- Dificuldade: [D]
SELECT nome, estado
FROM CLIENTES
WHERE id_cliente NOT IN (
	SELECT id_cliente 
	FROM VENDAS
);


-- EXERCÍCIO 11: Liste o nome dos clientes e a soma total gasta por cada um deles,
-- considerando apenas os clientes que gastaram mais de R$ 1.000,00 no total.

-- [B inicialmente, mas C após o 6]
SELECT nome, SUM(valor_total)
FROM CLIENTES C JOIN VENDAS V
ON (C.id_cliente = V.id_cliente)
GROUP BY C.id_cliente
HAVING SUM(valor_total) > 1000;


-- EXERCÍCIO 12: Utilizando subconsulta correlacionada, liste os produtos cujo preço
-- seja superior à média de preço dos produtos do seu próprio departamento.

-- Dificuldade: [D]
SELECT * 
FROM PRODUTOS P1
WHERE preco > (
	SELECT AVG(preco) 
	FROM PRODUTOS P2
	WHERE P1.id_departamento = P2.id_departamento
);


-- EXERCÍCIO 13: Encontre o nome dos clientes que compraram o produto 'Notebook Pro'
-- utilizando uma subconsulta encadeada (sem JOIN direto com a tabela produtos).

-- Dificuldade: [D]
SELECT nome
FROM CLIENTES
WHERE id_cliente IN 
(
	SELECT id_cliente 
	FROM VENDAS
	WHERE id_produto IN
		(
			SELECT id_produto
			FROM PRODUTOS
			WHERE nome_produto = 'Notebook Pro'
		)
);


-- EXERCÍCIO 14: Liste os nomes dos departamentos que possuem produtos com preço
-- superior a R$ 2.000,00, utilizando uma subconsulta com a cláusula IN.

-- Dificuldade: [D]
SELECT nome_departamento
FROM DEPARTAMENTOS
WHERE id_departamento IN 
(
	SELECT id_departamento 
	FROM PRODUTOS
	WHERE preco > 2000
);

-- EXERCÍCIO 15: Crie um relatório consolidado de produtos vendidos que combine
-- (via UNION ALL) duas consultas: uma listando produtos com preço acima de R$ 2.000,00
-- e outra listando produtos que tiveram quantidade vendida em uma única venda maior que 5.
-- (Traga o nome do produto e a origem/critério descrita em texto).

-- Dificuldade: [B]
-- NOVA IDEIA! STRINGS LITERAIS NAS COLUNAS
(
	SELECT nome_produto, 'Preco acima de R$2000' AS criterio, preco AS criterio_analisado
	FROM PRODUTOS P JOIN VENDAS V 
	ON (P.id_produto = V.id_produto)
	WHERE preco > 2000
)
UNION ALL
(
	SELECT nome_produto, 'Quantidade vendida em uma única venda maior que 5' AS criterio, quantidade AS criterio_analisado
	FROM PRODUTOS P JOIN VENDAS V
	ON (P.id_produto = V.id_produto)
	WHERE quantidade > 5
);


-- EXERCÍCIO 16: Calcule a média da quantidade de itens vendidos por venda para cada
-- cliente. Mostre o nome do cliente e a média arredondada, mas exiba apenas aqueles
-- cuja média de quantidade seja maior ou igual a 2.

-- Dificuldade: [A]
SELECT nome, SUM(quantidade)
FROM VENDAS V JOIN CLIENTES C
ON (V.id_cliente = V.id_cliente)
GROUP BY C.id_cliente;


-- EXERCÍCIO 17: Utilizando o operador EXCEPT (ou MINUS), liste os nomes dos clientes
-- que compraram no departamento 'Eletrônicos' EXCETO aqueles que também compraram
-- no departamento 'Móveis'.

-- EXERCÍCIO 18: Encontre o departamento que gerou a maior receita total consolidada.
-- Utilize subconsulta e agrupamento.

-- EXERCÍCIO 19: Liste todos os estados dos clientes que realizaram compras cujo
-- valor total da venda individual foi superior a R$ 2.000,00, removendo eventuais
-- repetições com UNION (ou DISTINCT, mas utilizando UNION para demonstrar consolidação).

-- EXERCÍCIO 20: Desafio Avançado: Liste o nome do cliente, o nome do produto e o
-- valor total da venda, apenas para aquelas vendas cujo valor total seja superior
-- à média de valor de todas as vendas registradas na tabela VENDAS.
