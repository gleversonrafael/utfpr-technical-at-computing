DROP TABLE IF EXISTS public.dispensaBasica;

CREATE TABLE IF NOT EXISTS public.dispensaBasica(
	id_produto SERIAL PRIMARY KEY,
	nome_produto TEXT,

	quantidade_produto INT DEFAULT 0,
	quantidade_minima_produto INT NOT NULL,
	quantidade_maxima_produto INT NOT NULL
);

INSERT INTO public.dispensaBasica(nome_produto, quantidade_produto, quantidade_minima_produto, quantidade_maxima_produto) 
VALUES
('Bolo', 4, 3, 10),
('Doce', 6, 5, 10),
('Bala', 11, 10, 15),
('Pão', 21, 20, 50);
