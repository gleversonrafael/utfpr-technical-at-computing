let listaBoletim = []; //conjunto de dados
let oQueEstaFazendo = ''; //variável global de controle
let boletimGlobal = null; //variavel global 
bloquearAtributos(true);
//backend (não interage com o html)
function procurePorChavePrimaria(chave) {
    for (let i = 0; i < listaBoletim.length; i++) {
        const boletimLocal = listaBoletim[i];
        if (boletimLocal.id == chave) {
            boletimLocal.posicaoNaLista = i;
            return listaBoletim[i];
        }
    }
    return null;//não achou
}

// Função para procurar um elemento pela chave primária   -------------------------------------------------------------
function procure() {
    const id = document.getElementById("inputId").value;
    if (isNaN(id) || !Number.isInteger(Number(id))) {
        mostrarAviso("Precisa ser um número inteiro");
        document.getElementById("inputId").focus();
        return;
    }

    if (id) { // se digitou um Id
        boletimGlobal = procurePorChavePrimaria(id);
        if (boletimGlobal) { //achou na lista
            mostrarDadosBoletim(boletimGlobal);
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
function inserir() {
    bloquearAtributos(false);
    visibilidadeDosBotoes('none', 'none', 'none', 'none', 'inline'); //visibilidadeDosBotoes(procure,inserir,alterar,excluir,salvar)
    oQueEstaFazendo = 'inserindo';
    mostrarAviso("INSERINDO - Digite os atributos e clic o botão salvar");
    document.getElementById("inputId").focus();

}

// Função para alterar um elemento da lista
function alterar() {

    // Remove o readonly dos campos
    bloquearAtributos(false);

    visibilidadeDosBotoes('none', 'none', 'none', 'none', 'inline');

    oQueEstaFazendo = 'alterando';
    mostrarAviso("ALTERANDO - Digite os atributos e clic o botão salvar");
}

// Função para excluir um elemento da lista
function excluir() {
    bloquearAtributos(false);
    visibilidadeDosBotoes('none', 'none', 'none', 'none', 'inline'); //visibilidadeDosBotoes(procure,inserir,alterar,excluir,salvar)

    oQueEstaFazendo = 'excluindo';
    mostrarAviso("EXCLUINDO - clic o botão salvar para confirmar a exclusão");
}

function salvar() {
    //gerencia operações inserir, alterar e excluir na lista

    // obter os dados a partir do html

    let id;
    if (boletimGlobal == null) {
        id = parseInt(document.getElementById("inputId").value);
    } else {
        id = boletimGlobal.id;
    }

    const dados = 
    {
        materia: document.getElementById("inputMateria").value,

        nota1: parseFloat(document.getElementById("inputNota1").value),
        nota2: parseFloat(document.getElementById("inputNota2").value),
        nota3: parseFloat(document.getElementById("inputNota3").value),
        nota4: parseFloat(document.getElementById("inputNota4").value),
    }

    //verificar se o que foi digitado pelo USUÁRIO está correto
    if (
        id && dados.materia && !isNaN(dados.nota1) && !isNaN(dados.nota2) && !isNaN(dados.nota3) && !isNaN(dados.nota4)

    ) {// se tudo certo 
        switch (oQueEstaFazendo) {
            case 'inserindo':
                boletimGlobal = new Boletim(
                    id,
                    dados.materia,

                    dados.nota1,
                    dados.nota2,
                    dados.nota3,
                    dados.nota4,
                    listaBoletim.length
                );

                listaBoletim.push(boletimGlobal);
                mostrarAviso("Inserido na lista");
                break;
            case 'alterando':
                boletimAlterado = new Boletim(
                    id,
                    dados.materia,

                    dados.nota1,
                    dados.nota2,
                    dados.nota3,
                    dados.nota4,
                    listaBoletim[boletimGlobal.posicaoNaLista]
                );

                listaBoletim[boletimGlobal.posicaoNaLista] = boletimAlterado;
                mostrarAviso("Alterado");
                break;
            case 'excluindo':
                let novaLista = [];
                for (let i = 0; i < listaBoletim.length; i++) {
                    if (boletimGlobal.posicaoNaLista != i) {
                        novaLista.push(listaBoletim[i]);
                    }
                }
                listaBoletim = novaLista;
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

//backend
function preparaListagem(vetor) {
    let texto = "";
    for (let i = 0; i < vetor.length; i++) {
        const linha = vetor[i];
        texto +=
            linha.id + " - " +
            linha.materia + " - " +

            linha.nota1 + " - " +
            linha.nota2 + " - " +
            linha.nota3 + " - " +
            linha.nota4 + "<br>";
    }
    return texto;
}

//backend->frontend (interage com html)
function listar() {
    document.getElementById("outputSaida").innerHTML = preparaListagem(listaBoletim);
}

function cancelarOperacao() {
    limparAtributos();
    bloquearAtributos(true);
    visibilidadeDosBotoes('inline', 'none', 'none', 'none', 'none');
    mostrarAviso("Cancelou a operação de edição");
}

function mostrarAviso(mensagem) {
    //printa a mensagem na divAviso
    document.getElementById("divAviso").innerHTML = mensagem;
}

// Função para mostrar os dados do Boletim nos campos
function mostrarDadosBoletim(boletimLocal) {
    for(let i in boletimLocal)
    {
        if(i != "posicaoNaLista")
        {
            console.log(i);
            document.getElementById(`input${primeiraMaiuscula(i)}`).value = boletimLocal[i];
        }
    }

    function primeiraMaiuscula(a)
    {
        return a.replace(a[0], a[0].toUpperCase());
    }

    //document.getElementById("inputId").value = boletimLocal.id;
    //document.getElementById("inputMateria").value = boletimLocal.materia;
    //document.getElementById("inputNota1").value = boletimLocal.nota1;
    //document.getElementById("inputNota2").value = boletimLocal.nota2;
    //document.getElementById("inputNota3").value = boletimLocal.nota3;
    //document.getElementById("inputNota4").value = boletimLocal.nota4;

    // Define os campos como readonly
    bloquearAtributos(true);
}

// Função para limpar os dados dos campos
function limparAtributos() {
    document.getElementById("inputMateria").value = "";
    document.getElementById("inputNota1").value = "";
    document.getElementById("inputNota2").value = "";
    document.getElementById("inputNota3").value = "";
    document.getElementById("inputNota4").value = "";

    bloquearAtributos(true);
}

function bloquearAtributos(soLeitura) {
    //quando a chave primaria possibilita edicao, tranca (readonly) os outros e vice-versa
    document.getElementById("inputId").readOnly = !soLeitura;

    document.getElementById("inputMateria").readOnly = soLeitura;

    document.getElementById("inputNota1").readOnly = soLeitura;
    document.getElementById("inputNota2").readOnly = soLeitura;
    document.getElementById("inputNota3").readOnly = soLeitura;
    document.getElementById("inputNota4").readOnly = soLeitura;
}

// Função para deixar visível ou invisível os botões
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

function persistirEmLocalPermanente(arquivoDestino, conteudo) {
    /*cria um blob (objeto que representa dados de arquivo) que armazena "[conteudo]" como arquivo de texto,
    criando um arquivo temporário*/
    const blob = new Blob([conteudo], { type: 'text/plain' });
    //cria o elemento "a" (link temporário) usado para adicionar o download do arquivo
    const link = document.createElement('a'); /*cria uma URL temporária que aponta para o blob e
    atribui ela ao href do link para que ele "aponte" para o arquivo gerado (permitindo seu download)*/
    link.href = URL.createObjectURL(blob);
    link.download = arquivoDestino; // Nome do arquivo de download
    link.click(); //inicia o processo de dowload automaticamente
    // Libera o objeto URL
    URL.revokeObjectURL(link.href); //remove a URL temporária que foi criada (liberando a memória)
}


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
        console.log(arquivo.name);
        if (arquivo) {
            converterDeCSVparaListaObjeto(arquivo);
        }
        /*verifica se um arquivo foi selecionado: 
        se sim, chama a função processarArquivo e passa o arquivo selecionado como argumento
        permitindo que o arquivo seja lido e processado na função processarArquivo*/
    };
    input.click(); //seletor de arquivos exibido automaticamente    
}

function prepararESalvarCSV() { //gera um arquivo csv com as informações da lista. Vai enviar da memória RAM para dispositivo de armazenamento permanente.
    let nomeDoArquivoDestino = "./Boletim.csv";  //define o nome do arquivo csv
    let textoCSV = "";
    for (let i = 0; i < listaBoletim.length; i++) {
        const linha = listaBoletim[i]; //variavel linha contem as informações de cada boletim

        //for(let property of linha)
        //{
        //    if(property != "posicaoNaLista")
        //        textoCSV += linha[property];
        //}

        console.log(linha);
        textoCSV += 
            linha.id + ";" +
            linha.materia + ";" +
            linha.nota1 + ";" +
            linha.nota2 + ";" +
            linha.nota3 + ";" +
            linha.nota4 + ";" + 
            linha.posicaoNaLista +"\n";
    }
    persistirEmLocalPermanente(nomeDoArquivoDestino, textoCSV);
}


// Função para processar o arquivo CSV e transferir os dados para a listaPet
function converterDeCSVparaListaObjeto(arquivo) {
    const leitor = new FileReader();  //objeto que permite ler arquivos locais no navegador 
    leitor.onload = function (e) {
        const conteudo = e.target.result; // Conteúdo do arquivo CSV
        const linhas = conteudo.split('\n'); // Separa o conteúdo por linha
        listaBoletim = []; // Limpa a lista atual (se necessário)
        for (let i = 0; i < linhas.length; i++) {
            const linha = linhas[i].trim();  //linhas[i] representa cada linha do arquivo CSV
            if (linha) { //verifica se a linha não está vazia
                const dados = linha.split(';'); // Separa os dados por ';'
                if (dados.length === 2) { //verifica os seis campos
                    // Adiciona os dados à listaPet como um objeto
                    listaBoletim.push(
                    {
                        id: dados[0],
                        materia: dados[1],

                        nota1: dados[2],
                        nota2: dados[3],
                        nota3: dados[4],
                        nota4: dados[5],
                    });
                }
            }
        }
        listar(); //exibe a lista atualizada
    };
    leitor.readAsText(arquivo); // Lê o arquivo como texto
}