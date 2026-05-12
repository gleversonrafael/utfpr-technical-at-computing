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

**Com CORS liberado (permite acesso):**
```
Admin do Bloco B → Adiciona site A na lista de permissões
Porteiro do Bloco B → Agora tem uma placa: "PERMITIDO: bloco A"
Você (Site A) → Tenta entrar
Porteiro → "Ah, você está na lista! PODE ENTRAR. ✅"
```

### 2. Analogia do "Carimbo de visto"

```
Seu site = Seu passaporte
API que quer acessar = País estrangeiro

Sem CORS = País com fronteira fechada (ninguém entra)
Com CORS liberado = País concede visto (você pode entrar)
CORS seletivo = País concede visto APENAS para certos países
```

### 3. Analogia do "Segurança de shows"

```
Backstage de um show (API)
Fã (seu frontend)

Segurança: "Só quem está na lista VIP pode entrar"
Fã: "Quero entrar!"
Segurança: "Seu nome está na lista? Não? BLOQUEADO!"

(Adiciona nome na lista = Configura CORS no backend)
Fã: "Agora meu nome está na lista!"
Segurança: "Pode entrar! ✅"
```

---

## O problema básico (Same-Origin Policy)

Navegadores implementam uma regra chamada **"Mesma Origem" (Same-Origin Policy)**:

```
URL: https://meusite.com/pagina

Origem = protocolo + domínio + porta
         https://meusite.com:443

Pode acessar? ✅ https://meusite.com/outra-pagina  (mesmo domínio)
Pode acessar? ✅ https://meusite.com/api/dados      (mesmo domínio)
Pode acessar? ❌ https://outrosite.com/api          (domínio diferente)
Pode acessar? ❌ http://meusite.com                 (protocolo diferente - https vs http)
Pode acessar? ❌ https://api.meusite.com            (subdomínio diferente)
```

**POR QUE ISSO EXISTE?** Segurança! Impede que sites maliciosos leiam dados de bancos, emails, redes sociais onde você está logado.

---

## Exemplo prático do erro CORS

### Cenário que causa erro

```javascript
// Seu site: https://meusite.com
// Tentando acessar: https://api.outroservidor.com/dados

fetch('https://api.outroservidor.com/dados')
  .then(res => res.json())
  .then(data => console.log(data));

// ERRO no console do navegador:
// Access to fetch at 'https://api.outroservidor.com/dados' from origin 
// 'https://meusite.com' has been blocked by CORS policy
```

**Visual do erro:**
```
🚫 BLOQUEADO PELO CORS 🚫

Seu site (meusite.com) tentou acessar api.outroservidor.com
Mas o servidor NÃO autorizou meusite.com
```

---

## Como resolver CORS?

### Solução 1: Backend libera (O MAIS COMUM)

No servidor da API (`api.outroservidor.com`), adicionar headers CORS:

```javascript
// Exemplo com Express (Node.js)
const express = require('express');
const app = express();

// Libera tudo (PERIGOSO!)
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*'); // Qualquer site pode acessar
  res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
  res.header('Access-Control-Allow-Headers', 'Content-Type');
  next();
});

// Ou usa o pacote cors
const cors = require('cors');
app.use(cors()); // Libera tudo
```

### Solução 2: Liberar apenas sites específicos

```javascript
// Libera APENAS seu site
const cors = require('cors');

const opcoesCors = {
  origin: 'https://meusite.com', // Só esse site pode acessar
  methods: ['GET', 'POST'],
  allowedHeaders: ['Content-Type']
};

app.use(cors(opcoesCors));
```

### Solução 3: Configurar múltiplas origens

```javascript
const allowedOrigins = [
  'https://meusite.com',
  'https://meusite-dev.com',
  'http://localhost:3000'
];

app.use(cors({
  origin: function(origin, callback) {
    if (allowedOrigins.indexOf(origin) !== -1 || !origin) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  }
}));
```

---

## Exemplo completo - Frontend + Backend

### Frontend (React/Vue/HTML)
```javascript
// https://meufrontend.com
async function buscarUsuarios() {
  try {
    const resposta = await fetch('https://minhaapi.com/usuarios');
    const dados = await resposta.json();
    console.log(dados); // Funciona se CORS estiver liberado
  } catch (erro) {
    console.error('Erro de CORS:', erro);
  }
}
```

### Backend (Node.js/Express)
```javascript
// https://minhaapi.com
const express = require('express');
const cors = require('cors');
const app = express();

// ✅ LIBERA CORS para o frontend específico
app.use(cors({
  origin: 'https://meufrontend.com'
}));

app.get('/usuarios', (req, res) => {
  res.json([
    { id: 1, nome: 'João' },
    { id: 2, nome: 'Maria' }
  ]);
});

app.listen(3000);
```

---

## Tipos de requisições CORS

### 1. Requisições "simples" (GET, POST com headers padrão)
```javascript
fetch('https://api.exemplo.com/dados', {
  method: 'GET' // Simples - navegador já tenta automaticamente
});
```

### 2. Requisições "pré-voo" (Preflight)
Para métodos PUT, DELETE ou headers personalizados:

```javascript
fetch('https://api.exemplo.com/usuarios', {
  method: 'DELETE', // Método não-simples
  headers: {
    'Authorization': 'Bearer token123', // Header personalizado
    'Content-Type': 'application/json'
  }
});

// Navegador PRIMEIRO envia uma requisição OPTIONS (pré-voo)
// Perguntando: "Pode enviar DELETE com Authorization?"
// Servidor responde: "Sim, pode!"
// SÓ DEPOIS envia o DELETE de verdade
```

---

## O erro CORS mais comum

```javascript
// Frontend (localhost:3000) tentando acessar backend (localhost:5000)

fetch('http://localhost:5000/api/dados')
// ERRO! Portas diferentes = origens diferentes

// SOLUÇÃO: Configurar CORS no backend localhost:5000
app.use(cors({
  origin: 'http://localhost:3000' // Libera seu frontend
}));
```

---

## Por que CORS não aparece no Postman/Insomnia?

```
Postman ≠ Navegador
Postman IGNORA regras CORS porque não é um navegador web

No Postman: Funciona perfeito! ✅
No Navegador: BLOQUEADO pelo CORS! ❌

Isso confunde muitos desenvolvedores!
```

---

## Resumo final

| Conceito | Analogia | Solução |
|----------|----------|---------|
| **CORS** | Porteiro/segurança que bloqueia acesso de outros sites | Configurar backend para liberar origens específicas |
| **Erro CORS** | "Você não está na lista de convidados" | Adicionar headers `Access-Control-Allow-Origin` |
| **Pré-voo** | Segurança pergunta "Pode entrar com essa mochila?" | Backend responde com `OPTIONS` |
| **Mesma origem** | Mesmo prédio = acesso livre | URLs com mesmo protocolo+domínio+porta |

---

## Checklist para resolver CORS

```
✅ 1. Identificar qual site está tentando acessar
✅ 2. No BACKEND, instalar/importar CORS
✅ 3. Configurar origin: 'https://seusite.com'
✅ 4. Para desenvolvimento: origin: 'http://localhost:3000'
✅ 5. Testar com ferramenta como Postman primeiro
✅ 6. Verificar headers necessários (Authorization, etc.)
```

---

**Mensagem final:** CORS é uma **medida de segurança do navegador**, não um bug! Configurar corretamente no backend resolve 99% dos problemas. 😊