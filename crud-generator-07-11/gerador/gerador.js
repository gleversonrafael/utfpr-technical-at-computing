// on launch
//let codigoFonte = "";
//let atributosObjetos = []; // atributos em objetos que facilitam o manuseio

let geradorAtual = new GeradorCRUD("");

gerarEventos();

////////////////////////////////////////////////////////////////////
//  PREPARAÇÃO
function gerarEventos() {
    document.getElementById("botaoBaixarArquivo").addEventListener("click", () => {
        baixarArquivo();
    })    
}

function definaNomeClasse() 
{
    geradorAtual.nomeClasse = document.getElementById("inputNomeClasse").value;
}

function gerarObjetosAtributos() {
    atributosObjetos = [];

    let atributos = document.getElementById("inputAtributos").value,
        tiposAtributos = document.getElementById("inputTiposAtributos").value
    ;

    if(atributos && tiposAtributos) {
        atributos = atributos.split(";");
        tiposAtributos = tiposAtributos.split(";");
        
        geradorAtual.setarObjetosAtributos([atributos, tiposAtributos]);
    }
}

function atualizarSaidaHTML(tipoArquivo, stringComplementar)
{
    const CODIGO_FONTE_HTML = document.getElementById("taCodigoFonte");

    CODIGO_FONTE_HTML.textContent = geradorAtual.codigoFonte;
    CODIGO_FONTE_HTML.dataset.filename = primeiraMaiuscula(geradorAtual.nomeClasse);

    if(typeof(stringComplementar) == "string" && stringComplementar.length > 0) // Ex: Controle
    {
        CODIGO_FONTE_HTML.dataset.filename += stringComplementar; 
    }

    CODIGO_FONTE_HTML.dataset.filename += "." + tipoArquivo;

    // Depuração
    //console.clear();
    //console.log(this.codigoFonte);

}

////////////////////////////////////////////////////////////////////
function crieEstrutura(tipo) 
{
    let tipoArquivo, stringComplementar;

    switch(tipo)
    {
        case "model":
            tipoArquivo = "js";
            geradorAtual.gerarModel();
            break;

        case "view":
            tipoArquivo = "html";
            geradorAtual.gerarView();
            break;

        case "controller":
            tipoArquivo = "js";
            geradorAtual.gerarController();
            stringComplementar = "Controle";
            break;
    }

    atualizarSaidaHTML(tipoArquivo, stringComplementar);
}

////////////////////////////////////////////////////////////////////
function baixarArquivo() {
    let dados, nome;

    try 
    {
        dados = document.getElementById("taCodigoFonte").value;
        nome = document.getElementById("taCodigoFonte").dataset.filename;

        if(!(dados && nome)) 
        {
            throw new Error("Não há dados ou um tipo adequado a ser baixado.");
        }
    } 
    catch(error) 
    {
        alert(error);
        return;
    }


    const TEMPORARY_ANCHOR = document.createElement("a");
    const TEMPORARY_URL = URL.createObjectURL(new Blob([dados], {type: ' text/plain'}));

    TEMPORARY_ANCHOR.href = TEMPORARY_URL;
    TEMPORARY_ANCHOR.download = nome;

    TEMPORARY_ANCHOR.click();

    URL.revokeObjectURL(TEMPORARY_URL);
}

//////////////////////////////////////////////////////////////////// OUTROS
function primeiraMaiuscula(stringRecebida) {
    let stringRetornada = "";

    stringRetornada = stringRecebida.replace(stringRecebida[0], stringRecebida[0].toUpperCase());

    return stringRetornada;
}

function obterTipoHTML(tipoAtributo) 
{
    let tipoHTML;
    
    switch(tipoAtributo) 
    {
        case "int": case "float": case "double":
            tipoHTML = "number";
            break;

        case "string":
            tipoHTML = "text";
            break;

        case "boolean":
            tipoHTML = "checkbox";
            break;

        case "date":
            tipoHTML = tipoAtributo;
            break;
    }

    return tipoHTML;
}

function obterValidadores(atributoObjeto)
{
    //  atributoObjeto = {nome, tipo, idHTML, tipoHTML}
    switch(atributoObjeto.tipo)
    {
        case "int":
            // tipo
            atributoObjeto.validador = `!isNaN(${atributoObjeto.nome}) && Number.isInteger(${atributoObjeto.nome})`;

            // html
            atributoObjeto.validadorHTML = `parseInt(document.getElementById("input${atributoObjeto.idHTML}").value))`;
            
            break;

        case "float":
            atributoObjeto.validador = `!isNaN(${atributoObjeto.nome}) && !Number.isInteger(${atributoObjeto.nome})`;

            atributoObjeto.validadorHTML = `parseFloat(document.getElementById("input${atributoObjeto.idHTML}").value)`;

            break;

        default:
    }
    
}

function mostrarGeradorAtual() 
{
    console.log(geradorAtual);
}

