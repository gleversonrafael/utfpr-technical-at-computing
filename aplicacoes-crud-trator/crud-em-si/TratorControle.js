//////////////////////////////////////////////////////////////////////
// GLOBAL DATA
// A
let listaDados = []; //conjunto de dados
let entidadeAtualGlobal = null; // dados do objeto global
let oQueEstaFazendo = ''; //variável global de controle

bloquearAtributos(true);

//backend (não interage com o html)
// A
function procurePorChavePrimaria(chave) {
    for (let i = 0; i < listaDados.length; i++) {
        const entidadeAtual = listaDados[i];
        if (entidadeAtual.id == chave) {
            entidadeAtual.posicaoNaLista = i;
            return listaDados[i];
        }
    }
    return null;//não achou
}

// Função para procurar um elemento pela chave primária   -------------------------------------------------------------
// A
function procure() {
    const id = document.getElementById("inputId").value;
    if (isNaN(id) || !Number.isInteger(Number(id))) {
        mostrarAviso("Precisa ser um número inteiro");
        document.getElementById("inputId").focus();
        return;
    }

    if (id && id > 0) { // se digitou um Id
        entidadeAtualGlobal = procurePorChavePrimaria(id);
        if (entidadeAtualGlobal) { //achou na lista
            mostrarDadosEntidade(entidadeAtualGlobal);
            visibilidadeDosBotoes('inline', 'none', 'inline', 'inline', 'none'); // Habilita botões de alterar e excluir
            mostrarAviso("Achou na lista, pode alterar ou excluir");
        } else { //não achou na lista
            limparAtributos();
            visibilidadeDosBotoes('inline', 'inline', 'none', 'none', 'none');
            mostrarAviso("Não achou na lista, pode inserir");
        }
    } else {
        document.getElementById("inputId").focus();
        return;
    }
}

//backend->frontend
// A
function inserir() {
    bloquearAtributos(false);
    visibilidadeDosBotoes('none', 'none', 'none', 'none', 'inline'); //visibilidadeDosBotoes(procure,inserir,alterar,excluir,salvar)
    oQueEstaFazendo = 'inserindo';
    mostrarAviso("INSERINDO - Digite os atributos e clique no botão salvar");
    document.getElementById("inputId").focus();

}

// Função para alterar um elemento da lista
// A = alterado / já viável
function alterar() {
    // Remove o readonly dos campos
    bloquearAtributos(false);

    visibilidadeDosBotoes('none', 'none', 'none', 'none', 'inline');

    oQueEstaFazendo = 'alterando';
    mostrarAviso("ALTERANDO - Digite os atributos e clique no botão salvar");
}

// Função para excluir um elemento da lista
// A
function excluir() {
    bloquearAtributos(false);
    visibilidadeDosBotoes('none', 'none', 'none', 'none', 'inline'); //visibilidadeDosBotoes(procure,inserir,alterar,excluir,salvar)

    oQueEstaFazendo = 'excluindo';
    mostrarAviso("EXCLUINDO - clique no botão salvar para confirmar a exclusão");
}

//backend->frontend (interage com html)
// A
function listar() {
    // nome da lista
    document.getElementById("outputSaida").innerHTML = preparaListagem(listaDados);
}

// A
function cancelarOperacao() {
    limparAtributos();
    bloquearAtributos(true);
    visibilidadeDosBotoes('inline', 'none', 'none', 'none', 'none');
    mostrarAviso("Cancelou a operação de edição");
}

// A
function mostrarAviso(mensagem) {
    //printa a mensagem na divAviso
    document.getElementById("divAviso").innerHTML = mensagem;
}

// Função para mostrar os dados da entidade global nos campos
///////////////////////////////////////////////////
// A
function mostrarDadosEntidade(entidadeObjeto) {
    for(let attribute in entidadeObjeto)
    {
        if(attribute != "posicaoNaLista")
        {
            document.getElementById("input"+primeiraMaiuscula(attribute)).value = entidadeObjeto[attribute];
        }
    }

    // Define os campos como readonly
    bloquearAtributos(true);
}

// Função para limpar os dados dos campos
///////////////////////////////////////////////////
// A
function limparAtributos() {
    document.querySelectorAll("atributoJS").forEach((atributo) => 
    atributo.value = "");
    bloquearAtributos(true);
}

///////////////////////////////////////////////////
// A
function bloquearAtributos(soLeitura) {
    let atributos = Array.from(document.querySelectorAll(".atributoJS"));

    //quando a chave primaria possibilita edicao, tranca (readonly) os outros e vice-versa
    // chave primaria
    document.getElementById("inputId").readOnly = !soLeitura;

    //outros atributos
    atributos.forEach((atributoHTML) => {
        atributoHTML.readOnly = soLeitura;
        atributoHTML.disabled = soLeitura ? true : false;
    })
}

// Função para deixar visível ou invisível os botões
// A
function visibilidadeDosBotoes(btProcure, btInserir, btAlterar, btExcluir, btSalvar) {
    //  visibilidadeDosBotoes('none', 'none', 'none', 'none', 'inline'); 
    //none significa que o botão ficará invisível (visibilidade == none)
    //inline significa que o botão ficará visível 

    document.getElementById("btProcure").style.display = btProcure;
    document.getElementById("btInserir").style.display = btInserir;
    document.getElementById("btAlterar").style.display = btAlterar;
    document.getElementById("btExcluir").style.display = btExcluir;
    document.getElementById("btSalvar").style.display = btSalvar;
    document.getElementById("btCancelar").style.display = btSalvar; // o cancelar sempre aparece junto com o salvar
    document.getElementById("inputId").focus();
}

// A
function persistirEmLocalPermanente(arquivoDestino, conteudo) {
    /*cria um blob (objeto que representa dados de arquivo) que armazena "[conteudo]" como arquivo de texto,
    criando um arquivo temporário*/
    const blob = new Blob([conteudo], { type: 'text/plain' });
    //cria o elemento "a" (link temporário) usado para adicionar o dowload do arquivo
    const link = document.createElement('a'); /*cria uma URL temporária que aponta para o blob e
    atribui ela ao href do link para que ele "aponte" para o arquivo gerado (permitindo seu download)*/
    link.href = URL.createObjectURL(blob);
    link.download = arquivoDestino; // Nome do arquivo de download
    link.click(); //inicia o processo de dowload automaticamente
    // Libera o objeto URL
    URL.revokeObjectURL(link.href); //remove a URL temporária que foi criada (liberando a memória)
}


// A
// Função para abrir o seletor de arquivos para upload (para processar o arquivo selecionado)
function abrirArquivoSalvoEmLocalPermanente() {
    const input = document.createElement('input');
    //cria o elemento input do tipo file (serve para abrir o seletor de arquivos)
    input.type = 'file';
    input.accept = '.csv'; // Aceita apenas arquivos CSV do sistema local
    input.onchange = function (event) {
        /*associa uma função de evento ao onchange, que será chamada quando o usuário selecionar um arquivo
        O evento change é disparado quando um arquivo é selecionado*/
        const arquivo = event.target.files[0]; //acessa o arquivo selecionado e armazena na variavel arquivo
        console.log(arquivo);
        if (arquivo) {
            converterDeCSVparaListaObjeto(arquivo);
        }
        /*verifica se um arquivo foi selecionado: 
        se sim, chama a função processarArquivo e passa o arquivo selecionado como argumento
        permitindo que o arquivo seja lido e processado na função processarArquivo*/
    };
    input.click(); //seletor de arquivos exibido automaticamente    
}

function salvar() 
{
    //gerencia operações inserir, alterar e excluir na lista
    // obter os dados a partir do html

    let id;
    if (entidadeAtualGlobal == null) {
        id = parseInt(document.getElementById("inputId").value);
    } else {
        id = parseInt(entidadeAtualGlobal.id);
    }

    const modelo = document.getElementById("inputModelo").value;
    const marca = document.getElementById("inputMarca").value;
    const ano_fabricacao = parseInt(document.getElementById("inputAno_fabricacao").value);
    const potencia_cv = parseFloat(document.getElementById("inputPotencia_cv").value);
    const tipo_tracao = document.getElementById("inputTipo_tracao").value;
    const horas_trabalhadas = parseInt(document.getElementById("inputHoras_trabalhadas").value);
    const horas_entre_manutencoes = parseInt(document.getElementById("inputHoras_entre_manutencoes").value);
    const data_ultima_manutencao = document.getElementById("inputData_ultima_manutencao").value;

    const eUsado = document.getElementById("inputEUsado").value;
    console.log(document.getElementById("inputEUsado"));
    console.log(eUsado);

    if(!isNaN(id) && Number.isInteger(id) && modelo && marca && !isNaN(ano_fabricacao) && Number.isInteger(ano_fabricacao) && !isNaN(potencia_cv) && tipo_tracao && !isNaN(horas_trabalhadas) && Number.isInteger(horas_trabalhadas) && !isNaN(horas_entre_manutencoes) && data_ultima_manutencao && Number.isInteger(horas_entre_manutencoes)
    && 
    ano_fabricacao <= new Date().getFullYear() && potencia_cv > 0 && horas_trabalhadas >= 0 && 
    Date.parse(data_ultima_manutencao) <= new Date().getTime()
    ) {
        switch (oQueEstaFazendo) {
            case 'inserindo':
                entidadeAtualGlobal = new Trator(id,modelo,marca,ano_fabricacao,potencia_cv,tipo_tracao,horas_trabalhadas,horas_entre_manutencoes, data_ultima_manutencao, eUsado, listaDados.length);
                listaDados.push(entidadeAtualGlobal);
                mostrarAviso("Inserido na lista");
                break;
            case 'alterando':
                let entidadeAtualAlterada = new Trator(id,modelo,marca,ano_fabricacao,potencia_cv,tipo_tracao,horas_trabalhadas,horas_entre_manutencoes, data_ultima_manutencao, eUsado, listaDados[entidadeAtualGlobal.posicaoNaLista]);

                listaDados[entidadeAtualGlobal.posicaoNaLista] = entidadeAtualAlterada;
                mostrarAviso("Alterado");
                break;
            case 'excluindo':
                let novaLista = [];
                for (let i = 0; i < listaDados.length; i++) {
                    if (entidadeAtualGlobal.posicaoNaLista != i) {
                        novaLista.push(listaDados[i]);
                    }
                }
                listaDados = novaLista;
                mostrarAviso("EXCLUIDO");
                break;
            default:
                // console.error('Ação não reconhecida: ' + oQueEstaFazendo);
                mostrarAviso("Erro aleatório");
        }
        visibilidadeDosBotoes('inline', 'none', 'none', 'none', 'none');
        limparAtributos();
        listar();
        document.getElementById("inputId").focus();

    } else {
        alert("Erro nos dados digitados");
        return;
    }
}


function preparaListagem(vetor) {
    let texto = "";
    for (let i = 0; i < vetor.length; i++) {
        const linha = vetor[i];
        console.log(linha);

        texto +=linha.id + " - " + linha.modelo + " - " + linha.marca + " - " + linha.ano_fabricacao + " - " + linha.potencia_cv + " - " + linha.tipo_tracao + " - " + linha.horas_trabalhadas + " - " + linha.horas_entre_manutencoes + " - " + 
        corrigirData
        (
            corrigirData(linha.data_ultima_manutencao, 0),
            3
        ) 
        + " - " + linha.eUsado + "<br>"
    }
    return texto;
}


///////////////////////////////////////////////////
///////////////////////////////////////////////////
// V
function prepararESalvarCSV() { //gera um arquivo csv com as informações da lista. Vai enviar da memória RAM para dispositivo de armazenamento permanente
    let nomeDoArquivoDestino = "./Trator.csv";  //define o nome do arquivo csv
    let textoCSV = "";
    for (let i = 0; i < listaDados.length; i++) {
        const linha = listaDados[i]; 
        
        textoCSV += linha.id + ";" +linha.modelo + ";" +linha.marca + ";" +linha.ano_fabricacao + ";" +linha.potencia_cv + ";" +linha.tipo_tracao + ";" +linha.horas_trabalhadas + ";" +linha.horas_entre_manutencoes + ";" + linha.data_ultima_manutencao + ";" + linha.eUsado + ";" + linha.posicaoNaLista + "\n";
    }
        persistirEmLocalPermanente(nomeDoArquivoDestino, textoCSV);
}

// Função para processar o arquivo CSV e transferir os dados para a listaPet
///////////////////////////////////////////////////
// V
function converterDeCSVparaListaObjeto(arquivo) {
    const leitor = new FileReader();  //objeto que permite ler arquivos locais no navegador 
    leitor.onload = function (e) {
        const conteudo = e.target.result; // Conteúdo do arquivo CSV
        const linhas = conteudo.split('\n'); // Separa o conteúdo por linha
        listaDados = []; // Limpa a lista atual (se necessário)
        
        for (let i = 0; i < linhas.length; i++) {
            const linha = linhas[i].trim();  //linhas[i] representa cada linha do arquivo CSV
            
            if (linha) { //verifica se a linha não está vazia
                const dados = linha.split(';'); // Separa os dados por ';'
                console.log(dados);

                if(dados.length === 11) {
                    listaDados.push({
                        id: dados[0],
                        modelo: dados[1],
                        marca: dados[2],
                        ano_fabricacao: dados[3],
                        potencia_cv: dados[4],
                        tipo_tracao: dados[5],
                        horas_trabalhadas: dados[6],
                        horas_entre_manutencoes: dados[7],
                        data_ultima_manutencao: dados[8],
                        eUsado: dados[9],
                        posicaoNaLista: dados[10]
                    });
                }
            }
        }
            listar(); //exibe a lista atualizada
    };
    leitor.readAsText(arquivo); // Lê o arquivo como texto
}


// complemento
function primeiraMaiuscula(stringRecebida) {
    let stringRetornada = "";

    stringRetornada = stringRecebida.replace(stringRecebida[0], stringRecebida[0].toUpperCase());

    return stringRetornada;
}

// Função que retorna a data em um tipo abaixo
// 0 -> dd-mm-yy com entrada do tipo 1
// 1 -> yy-mm--dd com entrada do tipo 0
// 2 -> [2, 12, 2022] com qualquer entrada
// 3 -> dd/mm/yy com entrada do tipo 0
///////////////////////////////////////////////////
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


// funcionalidades deste crud
// reaproveitável
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

// Reaproveitável
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


function listarComMaisDe500()
{
    const RESULTADOS = obterComMaisDe500();
    document.querySelector("#outputSaida").innerHTML = preparaListagem(RESULTADOS);


    function obterComMaisDe500()
    {
        let vetorResultante = [];
    
        for(let elemento of listaDados)
        {
            if(elemento.horas_trabalhadas > 500)
                vetorResultante.push(elemento);
        }

        return vetorResultante;
    }
}