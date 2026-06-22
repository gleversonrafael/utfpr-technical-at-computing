const express = require('express');
const os = require('os');

const path = require('path');
const fs = require('fs');
const multer = require('multer');

const app = express();
const port = 3000;

// Configuração do diretório onde as imagens serão salvas
const diretorioImagens = "./imagensAlunos";

// Garante que a pasta existe, se não existir, cria ela
if(!fs.existsSync(diretorioImagens))
{
    fs.mkdirSync(diretorioImagens);    
}


// Configuração de armazenamento do Multer
const armazenamentoImagens = multer.diskStorage(
    {
        destination: function(req, file, cb) 
        {
            cb(null, diretorioImagens)
        },

        filename: function(req, file, cb) 
        {
            let nomeArquivo = 'Teste|||' + Date.now() + req.file.originalname;
            cb(null, nomeArquivo);
        }

    }
)

console.log(armazenamentoImagens);

// Inicializa o middleware do multer com a configuração de armazenamento
const middlewareMulter = multer({storage: armazenamentoImagens});

// Middlewares padrão
app.use(express.json());

// Middleware CORS adaptado para suportar o FormData e métodos necessários
app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', 'POST, GET, OPTIONS');
    res.header('Access-Control-Allow-Headers', 'Content-Type');
    next();
});


// --- ROTA: Imagens
app.post('/rotaImagens', middlewareMulter.single('imgAluno'), (req, res) => {
    console.log(req.file);
})


// --- ROTA: Dados do aluno
app.post('/rotaDadosAluno', (requisicao, resposta) => {
    console.log(requisicao.body);
    resposta.json(requisicao.body);
})


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
});