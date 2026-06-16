
// ENVIAR DADOS DO ALUNO
document.getElementById("formRegistrarAluno").addEventListener("submit", async (event) => {
    event.preventDefault();
    await obterSituacaoEEnviar();
});

async function obterSituacaoEEnviar()
{
    // E
    const dadosFormulario = obterDados();

    // P
    if(await enviarFoto() == true) 
    {
        //await obterSituacao()
    }

    function obterDados()
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

        const DADOS_ENVIADOS = new FormData();

        DADOS_ENVIADOS.append("ra", "carlitos");
        DADOS_ENVIADOS.append("nome", DADOS.nome);
        DADOS_ENVIADOS.append("imgAluno", DADOS.imgAluno);

        DADOS_ENVIADOS.append("nota1", DADOS.nota1);
        DADOS_ENVIADOS.append("nota2", DADOS.nota2);
        DADOS_ENVIADOS.append("nota3", DADOS.nota3);
        DADOS_ENVIADOS.append("nota4", DADOS.nota4);

        return DADOS_ENVIADOS
    }

    async function enviarFoto()
    {
        let functionResponse = false;

        try
        {
            const SERVER_RESPONSE = await fetch(
                'http://localhost:3000/rotaImagens', 
                {
                    method: 'POST',
                    body: dadosFormulario
                }
            )

            functionResponse = true;
        }
        catch (error)
        {
            alert("Erro ao enviar imagem");
            alert(error);
        }

        return functionResponse;
    }

    /*
    async function obterSituacao()
    {
        try
        {
            const resposta = await fetch
            (
                "http://localhost:3000/rotaDadosAluno", 
                {
                    method: 'POST',
                    body: dadosFormulario
                }
            )

            const dadosRetornados = await resposta.text();
            console.log(dadosRetornados);
        } 
        catch (error) 
        {
            alert(error);
            return;
        }

    }
    */
}