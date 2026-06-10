const express = require('express');
const os = require('os');
const { Pool } = require('pg');
require('dotenv').config();

const app = express();
const port = process.env.PORT || 3001;

// Configuração do pool de conexão com PostgreSQL
const pool = new Pool({
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    database: process.env.DB_NAME,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
});

// Middleware para parsear JSON
app.use(express.json());

// Middleware CORS para permitir qualquer origem
app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', 'GET, POST');
    res.header('Access-Control-Allow-Headers', 'Content-Type');
    next();
});

// Rota para listar os itens do estoque
app.get('/listarEstoque', async (req, res) => {
    try {
        const QUERY = 'SELECT * FROM public.dispensaBasica';
        const QUERY_LISTAR = await pool.query(QUERY);

        res.json({
            status: true,
            linhas: QUERY_LISTAR.rows,
            quantidade_linhas: QUERY_LISTAR.rows.length
        });
    }
    catch(listError) 
    {
        res.json({
            status: false,
            erro: listError
        })
    }
})

// Rota para enviar Internetina
app.get('/verificarReposicao', 
    async (req, res) => 
    {
        try 
        {
            // E
            const REQUISICAO_SERVIDORINA = await pool.query("SELECT * FROM public.dispensaBasica");

            let mensagemEnviada, reposicao = [];

            // P
            REQUISICAO_SERVIDORINA.rows.forEach((row) => 
            {
                if(row.quantidade_produto < row.quantidade_minima_produto)
                {
                    let objetoReposto = 
                    {
                        id_produto: row.id_produto,
                        nome_produto: row.nome_produto,
                        
                        quantidade_produto: row.quantidade_produto,

                        quantidade_minima_produto: row.quantidade_minima_produto,
                        quantidade_maxima_produto: row.quantidade_maxima_produto,
                        
                        quantidade_reposta: row.quantidade_maxima_produto - row.quantidade_produto
                    } 

                    reposicao.push(objetoReposto);
                }
            })

            if(reposicao.length > 0) {
                mensagemEnviada = "Os itens a seguir devem ser repostos!";
            
            } else {
                mensagemEnviada = "Tudo OK!";
            }

            // S
            res.json
            ({
                status: 'sucesso',
                mensagem: mensagemEnviada,
                adicional: reposicao
            })
        }
        catch(error)
        {
            res.json
            ({
                status: 'erro',
                mensagem: 'LOBO INTERCEPTOU!',
                adicional: error
            })
        }               
    }
)


////////////////////////////////////////////////////
// Rota para listar todas as pessoas
app.get('/pessoas', async (req, res) => {
    try {
        const query = 'SELECT cpf_pessoa, nome_pessoa, data_nascimento_pessoa FROM public.pessoa ORDER BY nome_pessoa';
        const result = await pool.query(query);
        
        res.json({ 
            sucesso: true, 
            pessoas: result.rows,
            quantidade: result.rows.length
        });
        
    } catch (error) {
        console.error('Erro ao listar pessoas:', error);
        res.status(500).json({ 
            sucesso: false, 
            mensagem: 'Erro interno do servidor' 
        });
    }
});
// Rota para buscar pessoa por CPF (PK)
app.get('/pessoa/cpf/:cpf', async (req, res) => {
    try {
        const { cpf } = req.params; // Extrai o CPF dos parâmetros da URL. Extração usando desestruturação para obter o valor diretamente da propriedade 'cpf' do objeto 'req.params'.

        // const cpf = req.params.cpf; // Extrai o CPF dos parâmetros da URL. Acessa diretamente a propriedade 'cpf' do objeto 'req.params' para obter o valor do CPF fornecido na URL.
        
        const query = 'SELECT cpf_pessoa, nome_pessoa, data_nascimento_pessoa FROM public.pessoa WHERE cpf_pessoa = $1';
        const result = await pool.query(query, [cpf]);
        
        if (result.rows.length === 0) {
            return res.status(404).json({ 
                sucesso: false, 
                mensagem: 'Pessoa não encontrada com este CPF' 
            });
        }
        
        res.json({ 
            sucesso: true, 
            pessoa: result.rows[0] 
        });
        
    } catch (error) {
        console.error('Erro ao buscar por CPF:', error);
        res.status(500).json({ 
            sucesso: false, 
            mensagem: 'Erro interno do servidor' 
        });
    }
});
// Rota para buscar pessoa por nome (contém)
app.get('/pessoa/nome/:nome', async (req, res) => {
    try {
        const { nome } = req.params;
        
        const query = 'SELECT cpf_pessoa, nome_pessoa, data_nascimento_pessoa FROM public.pessoa WHERE nome_pessoa ILIKE $1';
        const result = await pool.query(query, [`%${nome}%`]);
        
        if (result.rows.length === 0) {
            return res.status(404).json({ 
                sucesso: false, 
                mensagem: 'Nenhuma pessoa encontrada com este nome' 
            });
        }
        
        res.json({ 
            sucesso: true, 
            pessoas: result.rows,
            quantidade: result.rows.length
        });
        
    } catch (error) {
        console.error('Erro ao buscar por nome:', error);
        res.status(500).json({ 
            sucesso: false, 
            mensagem: 'Erro interno do servidor' 
        });
    }
});


const obterIP = () => {
    const interfaces = os.networkInterfaces();
    for (let nomeInterface in interfaces) {
        for (let info of interfaces[nomeInterface]) {
            if (info.family === 'IPv4' && !info.internal) return info.address;
        }
    }
    return 'localhost';
};

const ip = obterIP();

app.listen(port, '0.0.0.0', () => {
    console.log(`Servidor rodando em http://${ip}:${port}`);
    console.log(`Rotas disponíveis:`);
    console.log(`  GET http://${ip}:${port}/pessoas - Listar todas as pessoas`);
    console.log(`  GET http://${ip}:${port}/pessoa/cpf/:cpf - Buscar por CPF`);
    console.log(`  GET http://${ip}:${port}/pessoa/nome/:nome - Buscar por nome`);
});