function corrigirData(dataTexto, tipo)
{
    let retorno;

    switch(tipo)
    {
        // 2022-12-02
        case 0: case 1:
            retorno = dataTexto.split("-").reverse().join("-");
            break;

        case 2:
            retorno = dataTexto.split("-");
            break;

        case 3:
            retorno = dataTexto.replaceAll("-", "/");
            break;

        case 4:
            retorno = Date.parse(dataTexto);

        default:
    }

    return retorno;
}


// funcionalidades
function pesquisarPorCategoria()
{
    // categoria === select
    const CATEGORIA = document.getElementById("inputPesquisarPorCategoria").value,
        TEXTO_PESQUISADO = document.getElementById("inputTextoPorCategoria").value;

    if(CATEGORIA != "" && TEXTO_PESQUISADO != "")
    {
        const RESULTADOS = obterVetorPorPesquisa(CATEGORIA, TEXTO_PESQUISADO);
        document.querySelector("#outputSaida").innerHTML = preparaListagem(RESULTADOS);
    }
    else
    {
        alert("Não há uma categoria ou texto válido.");
    }
}

function obterVetorPorPesquisa(atributo, valor)
{
    let vetorResultante = [];
    
    for(let elemento of listaDados)
    {
        if(elemento[atributo] == valor)
            vetorResultante.push(elemento);
    }

    return vetorResultante;
}