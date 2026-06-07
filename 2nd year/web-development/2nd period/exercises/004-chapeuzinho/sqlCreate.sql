no postgresql

Crie um banco de dados chamado dw1-db-2026

Neste banco de dados, crie uma tabela chamada pessoa (em public).

CREATE TABLE public.pessoa (
	cpf_pessoa varchar(15) NOT NULL,
	nome_pessoa varchar(60) NULL,
	data_nascimento_pessoa timestamp NULL,
	CONSTRAINT pessoa_pk PRIMARY KEY (cpf_pessoa)
);

INSERT INTO public.pessoa (cpf_pessoa, nome_pessoa, data_nascimento_pessoa) VALUES 
('111', 'João Pedro da Silva', '1990-05-15 10:30:00'),
('112', 'Maria Creuza dos Santos', '1985-10-22 14:15:00'),
('113', 'Carlos Oliveira', '1998-02-03 08:00:00'),
('114', 'Ana Costa Silva', '1975-12-12 18:45:00'),
('115', 'Lucas Humberto Pereira', '2001-07-29 09:12:00'),
('116', 'Juliana Maria de Souza', '1993-04-18 22:30:00'),
('117', 'Marcos Ribeiro', '1988-11-05 07:20:00'),
('118', 'Beatriz Alves', '1995-09-14 11:55:00'),
('119', 'Rodrigo Martins', '1982-06-25 16:40:00'),
('120', 'Camila Lima', '2000-01-01 00:00:00');
