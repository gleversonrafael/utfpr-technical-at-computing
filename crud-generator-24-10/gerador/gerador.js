// on launch
let codigoFonte = "";
const CODIGO_FONTE_HTML = document.getElementById("taCodigoFonte");

let nomeClasse;
let atributosObjetos = [];

gerarEventos();

////////////////////////////////////////////////////////////////////
function gerarModel() { //R
    let atributos = document.getElementById("inputAtributos").value;
    let vetAtributos = atributos.split(",");

    codigoFonte = "class " + primeiraMaiuscula(nomeClasse) + "{" + "\n";
    codigoFonte += "   constructor (" + atributos + ")" + "{\n";

    for (let i = 0; i < vetAtributos.length; i++) {
        const at = vetAtributos[i];
        codigoFonte += "          this." + at + " = " + at + ";\n";
    }
    codigoFonte += "          this.posicaoNaLista = null;\n"
    codigoFonte += "   }\n}\n";

    //console.log(codigoFonte);
    CODIGO_FONTE_HTML.textContent = codigoFonte;
    CODIGO_FONTE_HTML.dataset.filename = `${primeiraMaiuscula(nomeClasse)}.js`;
}


////////////////////////////////////////////////////////////////////
function gerarView() {
    const NOME_CLASSE_1MAIUSCULA = primeiraMaiuscula(nomeClasse);

    // Preparando html
    codigoFonte = `<!DOCTYPE html>
    <html lang="pt-br">

    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>CRUD ${NOME_CLASSE_1MAIUSCULA}</title>
    </head>

    <body>
        <h1>Cadastro de ${NOME_CLASSE_1MAIUSCULA}</h1>

        <label for="inputId">Id</label>
        <input type="text" name="inputId" id="inputId">
        
        <input type="button" value="Procure" id="btProcure" onclick="procure()" style="display:inline;">

        <input type="button" value="Inserir" id="btInserir" onclick="inserir()" style="display:none;">
        
        <input type="button" value="Alterar" id="btAlterar" onclick="alterar()" style="display:none;">
        
        <input type="button" value="Excluir" id="btExcluir" onclick="excluir()" style="display:none;"> <br><br>   
    `
    
    // inserindo elementos html (variáveis a cada classe)
    inserirElementosAtributos();

    // finalizando documento html
    codigoFonte += `
        <br><br>
        <div id="divAviso" style="background-color: antiquewhite;"></div>
        <br>

        <!-- botões salvar/cancelar --> 
        <input type="button" value="Salvar" id="btSalvar" onclick="salvar()" style="display:none;">
        
        <input type="button" value="Cancelar" id="btCancelar" onclick="cancelarOperacao()" style="display:none;">
        <br><br>

        <div id="outputSaida" style="background-color: aqua;">...</div>

        <!-- persistir / recuperar --> 
        <input type="button" value="Persistir" id="btPersisitir" onclick="prepararESalvarCSV()">
        
        <input type="button" value="Recuperar" id="btRecuperar" onclick="abrirArquivoSalvoEmLocalPermanente()">

        <!-- arquivos... --> 
        <script src="./${NOME_CLASSE_1MAIUSCULA}.js"></script>
        <script src="./${NOME_CLASSE_1MAIUSCULA}Controle.js"></script>
    
    </body>
</html>
   `

    CODIGO_FONTE_HTML.textContent = codigoFonte;
    CODIGO_FONTE_HTML.dataset.filename = `${NOME_CLASSE_1MAIUSCULA}.html`;


    function inserirElementosAtributos() {
        for(let i = 0; i < atributosObjetos.length; i++) {
            codigoFonte += `
        <label for="input${atributosObjetos[i].idHTML}"> ${atributosObjetos[i].idHTML}</label>
        <input class="atributoJS" id="input${atributosObjetos[i].idHTML}" type="${atributosObjetos[i].tipoHTML}" style="width: 500px"> <br> 
            `;

        }
    }
}

////////////////////////////////////////////////////////////////////
function gerarController() {
    codigoFonte = ".... basta programar para gerar o Controller como aprendeu em algoritmos no segundo e terceiro bimestres...\n ";
    codigoFonte += "dá trabalho (uma vez) mas depois fica muito mais fácil\n ";
    document.getElementById("taCodigoFonte").textContent = codigoFonte;
}



//////////////////////////////////////////////////////////////////// DOWNLOAD
// <a href="......" download="nome..."> </a>
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
function gerarEventos() {
    document.getElementById("botaoBaixarArquivo").addEventListener("click", () => {
        baixarArquivo();
    })    
}

function primeiraMaiuscula(stringRecebida) {
    let stringRetornada = "";

    stringRetornada = stringRecebida.replace(stringRecebida[0], stringRecebida[0].toUpperCase());

    return stringRetornada;
}

function obterTipoHTML(tipoAtributo) {
    let tipoHTML;
    
    switch(tipoAtributo) {
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


//////////////////////////////////////////////////////////////////// PREPARAÇÃO
function setarNomeClasse() {
    nomeClasse = document.getElementById("inputNomeClasse").value;
    console.log("t");
}


function gerarObjetosAtributos() {
    atributosObjetos = [];

    let atributos = document.getElementById("inputAtributos").value,
        tiposAtributos = document.getElementById("inputTiposAtributos").value
    ;

    if(atributos && tiposAtributos) {
        atributos = atributos.split(",");
        tiposAtributos = tiposAtributos.split(";");

        for(let i = 0; i < atributos.length; i++) {
            if(atributos[i]) {
                let objeto = {
                    nome: atributos[i],
                    tipo: tiposAtributos[i],
    
                    idHTML: primeiraMaiuscula(atributos[i]), // name -> Name

                    tipoHTML: obterTipoHTML(tiposAtributos[i])
                };
    
                atributosObjetos.push(objeto);
            }
        }
    }

}
