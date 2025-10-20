let codigoFonte = "";

let nomeClasse;
let atributosObjetos = [];

function gerarModel() { //R
    let atributos = document.getElementById("inputAtributos").value;
    let vetAtributos = atributos.split(";");

    codigoFonte = "class " + primeiraMaiuscula(nomeClasse) + "{" + "\n";
    codigoFonte += "   constructor (" + atributos + ")" + "{\n";

    for (let i = 0; i < vetAtributos.length; i++) {
        const at = vetAtributos[i];
        codigoFonte += "          this." + at + " = " + at + ";\n";
    }
    codigoFonte += "          this.posicaoNaLista = null;\n"
    codigoFonte += "   }\n}\n";

    //console.log(codigoFonte);
    document.getElementById("taCodigoFonte").textContent = codigoFonte;
}


function gerarObjetosAtributos() {
    atributosObjetos = [];

    let atributos = document.getElementById("inputAtributos").value,
        tiposAtributos = document.getElementById("inputTiposAtributos").value
    ;

    if(atributos && tiposAtributos) {
        atributos = atributos.split(";");
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


function gerarView() {
    let nomeClasseNoHTML = primeiraMaiuscula(nomeClasse);

    // Preparando html
    codigoFonte = `
    <!DOCTYPE html>
        <html lang="pt-br">

        <head>
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <title>CRUD ${nomeClasseNoHTML}</title>
        </head>

        <body>
            <h1>Cadastro de ${nomeClasseNoHTML}</h1>

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
            <script src="./${nomeClasseNoHTML}.js"></script>
            <script src="./${nomeClasseNoHTML}Controle.js"></script>
        
        </body>
        </html>
   `

    document.getElementById("taCodigoFonte").textContent = codigoFonte;


    function inserirElementosAtributos() {
        for(let i = 0; i < atributosObjetos.length; i++) {
            codigoFonte += `
            <label for="input${atributosObjetos[i].idHTML}"> ${atributosObjetos[i].idHTML}</label>
            <input id="input${atributosObjetos[i].idHTML}" type="${atributosObjetos[i].tipoHTML}" style="width: 500px"> <br> 
            `;

        }
    }
}

// ...
function gerarController() {
    codigoFonte = ".... basta programar para gerar o Controller como aprendeu em algoritmos no segundo e terceiro bimestres...\n ";
    codigoFonte += "dá trabalho (uma vez) mas depois fica muito mais fácil\n ";
    document.getElementById("taCodigoFonte").textContent = codigoFonte;
}



function primeiraMaiuscula(stringRecebida) {
    let stringRetornada = "";

    stringRetornada = stringRecebida.replace(stringRecebida[0], stringRecebida[0].toUpperCase());

    return stringRetornada;
}

function setarNomeClasse() {
    nomeClasse = document.getElementById("inputNomeClasse").value;
}
