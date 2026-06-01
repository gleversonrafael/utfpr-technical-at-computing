# 📋 Tutorial e Exercícios: Comunicação Cliente/Servidor

Este guia consolida o funcionamento da arquitetura **Cliente/Servidor** utilizando **Node.js, Express e HTML**, seguido de exercícios práticos para fixação.

---

## 🎯 Objetivo
Entender como dados trafegam da interface do usuário (Cliente) para a lógica de processamento (Servidor) e retornam como resposta.



## 🔄 Funcionamento da Comunicação

1.  **Cliente** captura dados de um formulário.
2.  **Cliente** empacota esses dados em um formato chamado **JSON**.
3.  **Cliente** envia os dados via protocolo **HTTP** (usando o método **POST**).
4.  **Servidor** recebe o pacote, lê o **JSON** e executa uma ação (cálculo, busca, etc).
5.  **Servidor** envia uma resposta de texto ou objeto de volta.
6.  **Cliente** recebe a resposta e atualiza a tela para o usuário.

---

## 🛠️ Ferramentas Principais

* **Express**: Framework para Node.js que facilita a criação de rotas (caminhos de rede).
* **Fetch API**: Função do JavaScript no navegador para enviar requisições.
* **Middleware (express.json)**: Instrução para o servidor entender dados no formato JSON.
* **CORS**: Mecanismo que permite que o navegador aceite respostas de um servidor que está em um endereço ou porta diferente.

---

## 📝 Exercícios Práticos

Aplique os conceitos acima para resolver as situações abaixo. Em todos os casos, o servidor deve processar a lógica e o cliente deve exibir o resultado final.

### 1. 🍽️ Garçom e Cozinha (O Pedido)
**Objetivo:** Simular o fluxo de trabalho de um serviço.
* **O Cliente:** Envia o nome de um prato (ex: "Lasanha") e o número da mesa.
* **O Servidor:** Recebe o pedido e simula um status.
* **O Retorno:** O servidor deve responder: *"O pedido [Prato] da mesa [X] foi recebido pela cozinha e está sendo preparado!"*.

### 2. 🔧 Oficina e Estoque de Peças
**Objetivo:** Trabalhar com validação de dados simples.
* **O Cliente:** Envia o nome de uma peça de carro.
* **O Servidor:** Possui uma lista interna de peças (ex: `["Amortecedor", "Filtro de Óleo", "Pneu"]`).
* **O Retorno:** Se a peça enviada estiver na lista, responde *"Peça em estoque"*. Se não estiver, responde *"Peça não encontrada no sistema"*.

### 3. 🍎 Aluno e Professor (Feedback de Nota)
**Objetivo:** Praticar lógica condicional (`if/else`) no servidor.
* **O Cliente:** Envia o nome do aluno e sua nota final (0 a 10).
* **O Servidor:** Verifica se a nota é maior ou igual a 7.
* **O Retorno:** Se aprovado, responde *"Parabéns [Nome]! Você foi aprovado!"*. Caso contrário, *"Olá [Nome], você precisará de recuperação"*.

### 4. 🏫 Secretaria Escolar (Consulta por RA)
**Objetivo:** Simular busca em um "Banco de Dados" (Objeto/Array).
* **O Cliente:** Envia o número do **RA** (Registro Acadêmico) e o tipo de documento desejado (Boletim, Histórico ou Declaração).
* **O Servidor:** Possui uma lista de objetos como esta:
    ```javascript
    const alunos = [
        { ra: "123", nome: "Ana Silva" },
        { ra: "456", nome: "Bruno Costa" }
    ];
    ```
* **Lógica:** O servidor deve percorrer a lista para encontrar o RA.
* **O Retorno:** Se encontrar o RA, responde: *"Olá [Nome], sua solicitação de [Documento] foi processada"*. Se o RA não existir na lista, responde: *"Erro: Aluno não localizado no sistema"*.

---

## 🚀 Conclusão
Dominar a troca de mensagens entre **Cliente** e **Servidor** é o primeiro passo para criar qualquer sistema moderno, de redes sociais a aplicativos de banco. Praticar esses exercícios ajudará a consolidar como o **JSON** e o **HTTP** conectam o que o usuário vê com o que o computador processa.
```