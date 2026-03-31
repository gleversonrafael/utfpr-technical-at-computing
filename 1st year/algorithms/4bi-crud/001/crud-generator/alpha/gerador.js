let codigoFonte = "";

let nomeClasse;
let objetosAtributos = [];


function gerarModel() { //R
    nomeClasse = document.getElementById("inputNomeClasse").value;
    let atributos = document.getElementById("inputAtributos").value;

    let vetAtributos = atributos.split(",");

    codigoFonte = "class " + nomeClasse + "{" + "\n";

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
    let atributos = document.getElementById("inputAtributos").value,
        tiposAtributos = document.getElementById("inputTiposAtributos").value;

    if(atributos && tiposAtributos) {
        atributos = atributos.split(";");
        tiposAtributos = tiposAtributos.split(";");

        for(let i = 0; i < atributos.length; i++) {
            debugger;
            let objeto = {
                nome: atributos[i],
                tipo: tiposAtributos[i],

                idHTML: `input${this.nome.toUpperCase}${this.nome[1].slice(this.nome[1])}`,
                tipoHTML: obterTipoHTML(this.tipo)
            };

            objetosAtributos[i].push(objeto);
        }
    }

    console.log(objetosAtributos);
}

function obterTipoHTML(tipoAtributo) {
    let tipoHTML;
    
    switch(tipoAtributo) {
        case "int": case "float":
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
    codigoFonte = "";
    nomeClasse = "AClasseDaNatalia";

    codigoFonte = "<!DOCTYPE html>\n" +
        "<html lang=\"en\">\n" +
        "\n" +
        "<head>\n" +
        "    <meta charset=\"UTF-8\">\n" +
        "    <meta name=\"viewport\" content=\"width=device-width, initial-scale=1.0\">\n" +
        "    <title>CRUD " + nomeClasse + "</title>\n" +
        "</head>\n" +
        "\n" +
        "<body>\n\n";
    document.getElementById("taCodigoFonte").textContent = codigoFonte;
}

// ...
function gerarController() {
    codigoFonte = ".... basta programar para gerar o Controller como aprendeu em algoritmos no segundo e terceiro bimestres...\n ";
    codigoFonte += "dá trabalho (uma vez) mas depois fica muito mais fácil\n ";
    document.getElementById("taCodigoFonte").textContent = codigoFonte;
}
