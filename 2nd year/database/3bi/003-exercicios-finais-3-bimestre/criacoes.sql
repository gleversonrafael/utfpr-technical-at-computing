/* ==========================================
   1. CRIAÇÃO DAS TABELAS (DDL)
========================================== */
DROP TABLE IF EXISTS VENDAS, PRODUTOS, DEPARTAMENTOS, CLIENTES;
CREATE TABLE CLIENTES (
    id_cliente INT PRIMARY KEY,
    nome VARCHAR(100) NOT NULL,
    estado CHAR(2) NOT NULL
);

CREATE TABLE DEPARTAMENTOS (
    id_departamento INT PRIMARY KEY,
    nome_departamento VARCHAR(50) NOT NULL
);

CREATE TABLE PRODUTOS (
    id_produto INT PRIMARY KEY,
    nome_produto VARCHAR(100) NOT NULL,
    preco DECIMAL(10, 2) NOT NULL,
    id_departamento INT,
    FOREIGN KEY (id_departamento) REFERENCES DEPARTAMENTOS(id_departamento)
);

CREATE TABLE VENDAS (
    id_venda INT PRIMARY KEY,
    id_cliente INT,
    id_produto INT,
    data_venda DATE,
    quantidade INT NOT NULL,
    valor_total DECIMAL(10, 2) NOT NULL,
    FOREIGN KEY (id_cliente) REFERENCES CLIENTES(id_cliente),
    FOREIGN KEY (id_produto) REFERENCES PRODUTOS(id_produto)
);
