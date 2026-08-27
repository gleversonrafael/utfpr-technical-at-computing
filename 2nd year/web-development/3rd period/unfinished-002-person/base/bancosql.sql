DROP TABLE IF EXISTS public.pessoa;
CREATE TABLE IF NOT EXISTS public.pessoa (
    id_pessoa INTEGER PRIMARY KEY,
    nome_pessoa VARCHAR(100) NOT NULL,
    data_nascimento DATE NOT NULL,
    nome_mae VARCHAR(50) 
);

INSERT INTO public.pessoa (id_pessoa, nome_pessoa, data_nascimento, nome_mae)
VALUES
    (1, 'João da Silva', '1990-05-15', 'Maria da Silva'),
    (2, 'Ana Souza', '1985-11-20', 'Helena Souza'),
    (3, 'Carlos Oliveira', '1995-03-10', 'Luciana Oliveira'),
    (4, 'Mariana Santos', '2000-08-25', 'Patrícia Santos'),
    (5, 'Pedro Almeida', '1992-12-05', 'Sandra Almeida'),
    (6, 'Juliana Costa', '1988-06-18', 'Rosa Costa'),
    (7, 'Rafael Pereira', '1997-09-30', 'Cláudia Pereira'),
    (8, 'Fernanda Lima', '1993-01-12', 'Márcia Lima');


SELECT * FROM public.produto;
