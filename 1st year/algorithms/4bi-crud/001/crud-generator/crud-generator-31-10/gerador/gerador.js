// on launch
//let codigoFonte = "";
//let atributosObjetos = []; // atributos em objetos que facilitam o manuseio

let geradorAtual = new GeradorCRUD("");

const CODIGO_FONTE_HTML = document.getElementById("taCodigoFonte");

gerarEventos();

////////////////////////////////////////////////////////////////////
//  PREPARAÇÃO
function gerarEventos() {
    document.getElementById("botaoBaixarArquivo").addEventListener("click", () => {
        baixarArquivo();
    })    
}

function setarNomeClasse() 
{
    geradorAtual.setNomeClasse()
    nomeClasse = document.getElementById("inputNomeClasse").value;
}

function gerarObjetosAtributos() {
    atributosObjetos = [];

    let atributos = document.getElementById("inputAtributos").value,
        tiposAtributos = document.getElementById("inputTiposAtributos").value
    ;

    if(atributos && tiposAtributos) {
        atributos = atributos.split(",");
        tiposAtributos = tiposAtributos.split(";");
        
        geradorAtual.objetosAtributos([atributos, tiposAtributos]);
    }

}

function atualizarSaidaHTML(tipoArquivo, stringComplementar)
{
    // Depuração
    //console.clear();
    //console.log(this.codigoFonte);

    this.codigoFonteHTML.textContent = this.codigoFonte;
    this.codigoFonteHTML.dataset.filename = primeiraMaiuscula(nomeClasse);

    if(stringComplementar && stringComplementar != "") // Ex: controller 
    {
        this.codigoFonteHTML.dataset.filename += stringComplementar; 
    }

    this.codigoFonteHTML.dataset.filename += "." + tipoArquivo;
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

