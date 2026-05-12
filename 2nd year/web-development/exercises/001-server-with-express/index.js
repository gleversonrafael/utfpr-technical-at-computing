const express = require('express');
const os = require('os');

const app = express();
const port = 3000;

// P -> Pulado
app.use(express.json());

// P
app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*'); // '*' permite qualquer origem
    res.header('Access-Control-Allow-Methods', 'POST');
    res.header('Access-Control-Allow-Headers', 'Content-Type');
    next();
});


app.post('/enviar-mensagem', (clientRequest, serverResponse) => {
    console.log(clientRequest.body);
})


// P
const obterIP = () => {
    const interfaces = os.networkInterfaces();
    for (let nomeInterface in interfaces) {
        for (let info of interfaces[nomeInterface]) {
            if (info.family === 'IPv4' && !info.internal) return info.address;
        }
    }
    return 'localhost';
};

const ip = obterIP()

app.listen(port, '0.0.0.0', () => {
    console.log(`Servidor rodando em http://${ip}:${port}`)
})

/* 
    E1: existência de os
*/
