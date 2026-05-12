# 📋 Cliente/Servidor com HTML, JavaScript e Node.js



## 🎯 Objetivo

Como funciona a comunicação entre **cliente** e **servidor** utilizando:

- **HTML**
- **JavaScript**
- **Node.js**
- **Express**

O exemplo funciona como uma conversa:

- O **cliente** envia uma mensagem.
- O **servidor** recebe.
- O **servidor** processa a mensagem.
- O **servidor** devolve uma resposta.

---

# O que é o Protocolo HTTP?

## Definição simples

**HTTP** = **H**yper**T**ext **T**ransfer **P**rotocol (Protocolo de Transferência de Hipertexto)

**Tradução para iniciante:** É a **língua** que navegadores e servidores usam para **conversar** na internet.

## Analogia do "Restaurante"

Imagine que você vai a um **restaurante**:

VOCÊ (navegador) RESTAURANTE (servidor)

 "Esse é meu PEDIDO" (REQUEST) 

 "Aqui está sua COMIDA" (RESPONSE)


# 🧠 O que é Cliente e Servidor?

## 🖥️ Cliente

O **cliente** é quem faz a requisição. Normalmente o computador que solicita dados ou informações a outro computador (servidor).

As solicitações podem ser feitas via navegador, celular, aplicativo web, etc.

Neste projeto, o cliente será a página HTML que envia uma mensagem para o servidor, espera e ao receber a resposta ela mostra.

---

## 🖧 Servidor

O **servidor** é quem recebe pedidos e responde.

Ele pode:

- salvar dados
- consultar banco de dados
- processar informações
- devolver respostas

Neste projeto, o servidor será um programa Node.js usando Express.

---

# 🔄 Funcionamento da Comunicação

## Fluxo da comunicação

```text
Cliente (HTML)
       ↓
Envia mensagem usando fetch()
       ↓
Servidor Node.js recebe
       ↓
Servidor processa
       ↓
Servidor responde
       ↓
Cliente mostra resposta
```

---

# 📁 Arquivos do Projeto

## Arquivo do Cliente

```text
cliente.html
```

Responsável pela interface.

---

## Arquivo do Servidor

```text
server.js
```

Responsável por receber e responder mensagens.

---

# 🖥️ Parte do Cliente (HTML)

## Estrutura da página de exemplo:

O cliente possui:

- campo para endereço do servidor
- campo para porta
- campo para mensagem
- botão enviar

---

# 🧾 Código principal do Cliente

```html
<input type="text" id="inputMensagem">
<button onclick="enviarMensagem()">Enviar</button>
```

Quando o botão é clicado, a função `enviarMensagem()` é executada.

---

# 🚀 Enviando dados para o servidor

## Função fetch()

O cliente usa:

```javascript
fetch()

**A palavra fetch() em inglês tem o sentido de "buscar", "pegar", "trazer" ou "recuperar".**
```

para conversar com o servidor.

---

## Código principal

```javascript
const response = await fetch(`http://${enderecoServidor}:${porta}/enviar-mensagem`, {
    method: 'POST',
    headers: {
        'Content-Type': 'application/json',
    },
    body: JSON.stringify({ mensagem })
});
```

JSON = JavaScript Object Notation (Notação de Objeto JavaScript)

Stringify = transformar em string / converter para texto

JSON.stringify() = "converter para string no formato JSON" ou "serializar como JSON"

O que ele faz?
Pega um objeto ou valor JavaScript (como arrays, números, booleanos, etc.) e transforma em uma string JSON válida.

Exemplo (Básico)
javascript
const pessoa = {
  nome: "João",
  idade: 30,
  cidade: "São Paulo"
};

const textoJSON = JSON.stringify(pessoa);
console.log(textoJSON);
// Resultado: '{"nome":"João","idade":30,"cidade":"São Paulo"}'

---

# 🔍 Explicando cada parte

## method: 'POST'

Define que estamos enviando dados.

---

O que são métodos HTTP?

São como verbos de ação que dizem ao servidor: "Ei, eu quero fazer isso com seus dados!"

Os principais métodos
| Método | Tradução | O que faz | Analogia |
| :--- | :--- | :--- | :--- |
| **GET** | obter / buscar | Busca dados sem alterar nada | "Me mostre os dados" |
| **POST** | enviar / criar | Cria um novo recurso | "Cadastre um novo usuário" |
| **PUT** | substituir / atualizar | Substitui um recurso inteiro | "Atualize tudo deste usuário" |
| **PATCH** | modificar / ajustar | Altera apenas parte do recurso | "Só mude o e-mail" |
| **DELETE** | remover / excluir | Apaga um recurso | "Delete este usuário" |


Relembrando... (conceitos de GET e comparando com POST)

| Característica | GET | POST |
| :--- | :--- | :--- |
| **Onde os dados vão** | Na URL (query string) | No corpo da requisição (body) |
| **É visível?** | ✅ Sim, na barra de endereço | ❌ Não, fica oculto |
| **Tamanho** | Limitado (~2048 caracteres) | Ilimitado |
| **Tipo de dado** | Apenas texto (parâmetros simples) | Qualquer tipo (arquivos, JSON, etc.) |

``` 
Imagine que você quer enviar um bilhete para alguém:

GET = Você escreve o bilhete na testa e chega na pessoa (todo mundo vê)

POST = Você coloca o bilhete dentro de um envelope lacrado e entrega

``` 

## headers

Informa o formato dos dados.

```javascript
'Content-Type': 'application/json'
```

---

## JSON.stringify()

Transforma objeto JavaScript em JSON.

Exemplo:

```javascript
{ mensagem: "Olá" }
```

vira:

```json
{
  "mensagem": "Olá"
}
```

---

# 📦 O que é JSON?

## JSON significa:

```text
JavaScript Object Notation
```

É um formato muito usado para troca de dados entre cliente e servidor.

---

# 🖧 Parte do Servidor

## Importando bibliotecas

```javascript
const express = require('express');
const os = require('os');
```

---

# ⚙️ Criando o servidor

```javascript
const app = express();
const port = 3000;
```

//Analogia do Restaurante para express

express     = a COZINHA (a biblioteca/funcionalidade)

app         = o GARÇOM (quem recebe os pedidos)

app.get()   = "Quando pedirem um prato (GET), traga a comida"

app.post()  = "Quando fizerem um pedido (POST), anote e envie pra cozinha"

app.listen(3000) = "Abra o restaurante na porta 3000"

---

# 🧩 Middleware

### O que é middleware?

Tradução literal: "intermediário" ou "camada do meio"

Definição prática: Uma função que intercepta a requisição antes dela chegar no destino final (a rota principal), podendo:

Inspecionar os dados

Modificar algo

Tomar decisões (permitir, negar, redirecionar)

Encerrar a requisição

### Analogia para entender o que é um "middleware"

# O segurança da Balada (Filtro e Verificação)

Imagine que você quer entrar em uma festa. Antes de chegar à pista de dança (que é o seu objetivo final/rota), você precisa passar por várias etapas:

Middleware de Segurança: O segurança checa se você está com o ingresso (Autenticação).

Middleware de Idade: Outro funcionário checa seu RG (Autorização).

Middleware de Revista: Um terceiro checa se você está carregando objetos proibidos (Validação de dados).

Se tudo estiver certo: Eles te dão um "empurrãozinho" para a próxima etapa (o famoso comando next()).

Se algo estiver errado: O segurança te barra ali mesmo e você nem chega a ver a pista de dança (o servidor envia um erro antes de processar a lógica principal).

---

## No projeto, temos o middleware JSON

```javascript
app.use(express.json());
```

Permite que o servidor entenda JSON enviado pelo cliente.



---

# 🌍 CORS

## Problema

O navegador bloqueia comunicações entre portas diferentes.

Navegadores implementam uma regra chamada **"Mesma Origem" (Same-Origin Policy)**:

---

## Solução

Usar CORS.

```javascript
res.header('Access-Control-Allow-Origin', '*');
```

Isso libera acesso para qualquer origem.

---

# O que é CORS?

**Sigla:** Cross-Origin Resource Sharing (Compartilhamento de Recursos entre Origens Diferentes)

**Definição prática:** É um **mecanismo de segurança** implementado pelos navegadores que **restringe** requisições feitas por um site (origem) para **outro site diferente** (origem diferente).

---

## Analogias do CORS

### 1. A analogia do "porteiro desconfiado"

Imagine que a internet é um **grande condomínio** com vários blocos de apartamentos:

```
Bloco A (seusite.com)  →  Sua aplicação mora aqui
Bloco B (api.outrosite.com) → A API que você quer acessar
```

**Sem CORS (o "porteiro" ausente):**
```
Você (site A) → Tenta entrar no Bloco B sem permissão
Bloco B → "Claro, entra aí!" 🤝
PROBLEMA: QUALQUER site malicioso pode roubar dados do Bloco B!
```

**Com CORS (o "porteiro" presente):**
```
Você (site A) → "Quero entrar no Bloco B"
Porteiro do Bloco B → "Deixa eu ver... você NÃO está na lista de permissões"
Você → "Mas eu só quero uns dados..."
Porteiro → "BLOQUEADO! 🚫 Volta pro seu bloco!"

```
** na pasta tem uma explicação mais completa de CORS.


# 📬 Rota do servidor

## Rota POST

```javascript
app.post('/enviar-mensagem', (req, res) => {
```

Significa:

- se alguém enviar um POST para `/enviar-mensagem`
- execute esta função

---

# 📥 Recebendo dados

```javascript
let mensagem = req.body.mensagem;
```

O servidor pega a mensagem enviada pelo cliente.

---

# 🔠 Processando dados

```javascript
mensagem = mensagem.toUpperCase();
```

Transforma o texto em maiúsculo.

---

# 📤 Respondendo ao cliente

```javascript
res.send(resposta);
```

O servidor envia uma resposta.

---

# 🖥️ Exibindo resposta no cliente

## Código

```javascript
document.getElementById("respostaDoServidor").innerHTML = data;
```

Mostra a resposta recebida.

---

# 🌐 Descobrindo o IP da máquina

O servidor possui uma função:

```javascript
function obterIP()
```

Ela procura o IP da máquina na rede.

Arrow functions do JS

const os = require('os');// import, vai precisar disso na função


function obterIP() {
    const interfaces = os.networkInterfaces()
    for (let nomeInterface in interfaces) {
        for (let info of interfaces[nomeInterface]) {
            if (info.family === 'IPv4' && !info.internal) {
                return info.address
            }
        }
    }
    return 'localhost'
}

const obterIP = () => {
    const interfaces = os.networkInterfaces();
    for (let nomeInterface in interfaces) {
        for (let info of interfaces[nomeInterface]) {
            if (info.family === 'IPv4' && !info.internal) {
                return info.address;
            }
        }
    }
    return 'localhost';
};

// Usando a função
const ipDoServidor = obterIP();
console.log(`✅ Servidor rodando em: http://${ipDoServidor}:3000`);

# Rotas no Express - Essencial

## O que é uma rota?

**Rota** = **endereço (URL)** que o servidor responde.

```javascript
app.get('/usuarios', (req, res) => {
    res.send('Resposta para quem acessar /usuarios');
});
```

## Os 5 métodos principais

```javascript
app.get('/rota', (req, res) => res.send('BUSCAR dados'));
app.post('/rota', (req, res) => res.send('CRIAR dados'));
app.put('/rota/:id', (req, res) => res.send('SUBSTITUIR tudo'));
app.patch('/rota/:id', (req, res) => res.send('MODIFICAR parte'));
app.delete('/rota/:id', (req, res) => res.send('DELETAR dados'));
```

## Os 3 tipos de parâmetros

```javascript
// 1. ROUTE PARAMS - Na URL (obrigatório)
app.get('/usuario/:id', (req, res) => {
    req.params.id; // /usuario/5 → "5"
});

// 2. QUERY PARAMS - ?chave=valor (opcional)
app.get('/buscar', (req, res) => {
    req.query.q; // /buscar?q=joao → "joao"
});

// 3. BODY - Dentro da requisição (POST/PUT/PATCH)
app.post('/usuario', (req, res) => {
    req.body.nome; // Precisa de app.use(express.json())
});
```

## Exemplo mínimo funcional

```javascript
const express = require('express');
const app = express();
app.use(express.json()); // Para ler body JSON

// Rota GET
app.get('/', (req, res) => {
    res.send('Hello World');
});

// Rota POST
app.post('/dados', (req, res) => {
    res.json({ recebido: req.body });
});

app.listen(3000);
```

## Regra de ouro

**Ordem importa!** Rotas específicas **antes** de rotas genéricas:

```javascript
app.get('/usuarios/novo', ...);  // ✅ Específica primeiro
app.get('/usuarios/:id', ...);   // ✅ Genérica depois
```

**Nunca esquecer:** Toda rota precisa de um `res.send()` ou `res.json()` para responder.
```

---

# 📡 Exemplo de IP

```text
192.168.0.15
```

Assim outros computadores da rede podem acessar o servidor.

---

# ▶️ Iniciando o servidor

```javascript
app.listen(port, '0.0.0.0', () => {
    console.log(`Servidor rodando em http://${ip}:${port}`)
})
```

---

# 🔎 Explicação

## app.listen()

Faz o servidor começar a funcionar.

---

## 0.0.0.0

Permite acesso externo.

---

# 🧪 Exemplo de Funcionamento

## Cliente envia:

```text
Olá servidor
```

---

## Servidor recebe:

```text
Olá servidor
```

---

## Servidor transforma:

```text
OLÁ SERVIDOR
```

---

## Servidor responde:

```text
Eu sou o servidor, você mandou a mensagem "OLÁ SERVIDOR"
```

---

# 📚 Conceitos Aprendidos

## Cliente

Quem faz pedidos.

---

## Servidor

Quem responde pedidos.

---

## HTTP

Protocolo de comunicação.

---

## JSON

Formato de troca de dados.

---

## POST

Método para envio de dados.

---

## CORS

Liberação de acesso entre origens diferentes.



---

# 🧠 Resumo Final

Neste projeto:

- o **cliente** envia uma mensagem
- o **servidor** recebe
- o **servidor** processa
- o **servidor** devolve uma resposta
- o **cliente** mostra o resultado

Esse modelo é utilizado em praticamente todos os sistemas modernos:

- redes sociais
- bancos
- lojas online
- aplicativos
- jogos online

---



# 📌 Conclusão

O modelo **cliente/servidor** é a base do desenvolvimento web moderno.

Entender esse funcionamento ajuda a compreender como:

- sites
- aplicativos
- sistemas online

trocam informações pela internet.

Com poucos arquivos e pouco código já foi possível criar uma comunicação real entre cliente e servidor.