// --- NOVA FUNÇÃO PARA ENVIAR IMAGEM ---
async function enviarImagem() {
    const enderecoServidor = document.getElementById('enderecoServidorInput').value;
    const porta = document.getElementById('inputPorta').value;
    const inputImagem = document.getElementById('inputImagem');

    // Verifica se o usuário de fato selecionou um arquivo
    if (inputImagem.files.length === 0) {
        alert('Por favor, selecione uma imagem primeiro!');
        return;
    }

    // Captura o arquivo propriamente dito
    const arquivoImagem = inputImagem.files[0];

    // IMPORTANTE: Criamos um FormData para estruturar o envio do arquivo
    const formData = new FormData();

    // O primeiro parâmetro 'foto' deve ser exatamente igual ao configurado no upload.single('foto') do servidor
    formData.append('foto', arquivoImagem);

    try {
        document.getElementById("respostaImagem").innerHTML = "Enviando...";

        // Faz a requisição FETCH enviando o formData diretamente no body
        // NOTA: Não adicionamos o 'Content-Type' nos headers. O próprio navegador define o Content-Type correto com o "boundary" necessário para multipart/form-data.
        const response = await fetch(`http://${enderecoServidor}:${porta}/enviar-imagem`, {
            method: 'POST',
            body: formData
        });

        if (!response.ok) {
            throw new Error('Falha na resposta do servidor');
        }

        const data = await response.json(); // Recebe o JSON de resposta

        // Atualiza o HTML com a mensagem retornada pelo servidor
        document.getElementById("respostaImagem").innerHTML = 
            `Status: ${data.mensagem}<br>Salvo como: <b>${data.nomeArquivo}</b>`;

    } catch (error) {
        console.error('Erro:', error);
        document.getElementById("respostaImagem").innerHTML = "Erro ao enviar.";
        alert('Erro na comunicação com o servidor ao enviar imagem');
    }
}

// --- SUA FUNÇÃO ANTERIOR MANTIDA ---
async function enviarMensagem() {            
    const enderecoServidor = document.getElementById('enderecoServidorInput').value;
    const porta = document.getElementById('inputPorta').value;
    
    const meuPacoteDeDados = {               
        x: parseFloat(document.getElementById('inputCateto1').value),
        y: parseFloat(document.getElementById('inputCateto2').value)
    };
    
    try {
        const response = await fetch(`http://${enderecoServidor}:${porta}/enviar-mensagem`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(meuPacoteDeDados),
        });
        
        const data = await response.text();
        const {hipotenusa} = JSON.parse(data); 
        
        document.getElementById("respostaDoServidor").innerHTML = " A hipotenusa é: " + hipotenusa;
    } catch (error) {
        console.error('Erro:', error);
        alert('Erro na comunicação com o servidor');
    }
}

// ENVIAR DADOS DO ALUNO
document.getElementById("formRegistrarAluno").addEventListener("submit", (event) => {
    event.preventDefault();

    obterEstadoAluno();
});

async function obterEstadoAluno()
{
    // E
    const DADOS = 
    {
        ra: document.getElementById("inputRA").value,
        nome: document.getElementById("inputNome").value,
        imgAluno: document.getElementById("inputImagemAluno").files[0],

        nota1: parseFloat(document.getElementById("inputNota1").value),
        nota2: parseFloat(document.getElementById("inputNota2").value),
        nota3: parseFloat(document.getElementById("inputNota3").value),
        nota4: parseFloat(document.getElementById("inputNota4").value)
    }

    /*if(!DADOS.imgAluno)
    {
        alert("Nenhuma imagem foi selecionada");
        return;
    }*/

    console.log(DADOS);

    const DADOS_ENVIADOS = new FormData();

    DADOS_ENVIADOS.append("ra", DADOS.ra);
    DADOS_ENVIADOS.append("nome", DADOS.nome);
    DADOS_ENVIADOS.append("imgAluno", DADOS.imgAluno);

    DADOS_ENVIADOS.append("nota1", DADOS.nota1);
    DADOS_ENVIADOS.append("nota2", DADOS.nota2);
    DADOS_ENVIADOS.append("nota3", DADOS.nota3);
    DADOS_ENVIADOS.append("nota4", DADOS.nota4);

    console.log(DADOS_ENVIADOS);
}