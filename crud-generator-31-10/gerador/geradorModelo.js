class GeradorCRUD 
{
    nomeClasse; atributosObjetos = [];
    codigoFonte;

    constructor(codigoFonte)
    {
        this.codigoFonte = codigoFonte;
    }

    //////////////////////////////////////////////////////////////////////
    //////////////////////////////////////////////////////////////////////
    // PREPARAÇÃO
    setarObjetosAtributos(matrixAtributos)
    {
        // matrixAtributos[0 = atributos(nomes), 1 = tiposAtributos];
        this.atributosObjetos = [];

        for(let i = 0; i < matrixAtributos[0].length; i++) 
        {
            if(matrixAtributos[0][i]) 
            {
                const objeto = 
                {
                    nome: atributos[i],
                    tipo: tiposAtributos[i],
    
                    idHTML: primeiraMaiuscula(matrixAtributos[0][i]),
                    tipoHTML: obterTipoHTML(matrixAtributos[1][i])
                };
    
                this.atributosObjetos.push(objeto);
            }
        }
    }

    setarNomeClasse(nome) 
    {
        this.nomeClasse = nome;
    }

    //////////////////////////////////////////////////////////////////////
    //////////////////////////////////////////////////////////////////////
    gerarModel() //R
    {
        let atributos = document.getElementById("inputAtributos").value;
        let vetAtributos = atributos.split(",");

        this.codigoFonte = "class " + primeiraMaiuscula(nomeClasse) + " {" + "\n";
        this.codigoFonte += "   constructor (" + atributos + ")" + " {\n";

        for (let i = 0; i < vetAtributos.length; i++) {
            const at = vetAtributos[i];
            this.codigoFonte += "          this." + at + " = " + at + ";\n";
        }

        this.codigoFonte += "          this.posicaoNaLista = null;\n"
        this.codigoFonte += "   }\n}\n";
    }

    //////////////////////////////////////////////////////////////////////
    gerarView()
    {
        const NOME_CLASSE_1MAIUSCULA = primeiraMaiuscula(nomeClasse);

        // Preparando HTML
        this.codigoFonte = `<!DOCTYPE html>
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
        this.codigoFonte += `
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

        function inserirElementosAtributos() {
            for(let i = 0; i < this.atributosObjetos.length; i++) {
                this.codigoFonte += `
            <label for="input${this.atributosObjetos[i].idHTML}"> ${this.atributosObjetos[i].idHTML}</label>
            <input class="atributoJS" id="input${this.atributosObjetos[i].idHTML}" type="${this.atributosObjetos[i].tipoHTML}" style="width: 500px"> <br> 
                `;

            }
        }
    
    }

    //////////////////////////////////////////////////////////////////////
    gerarController()
    {
        this.codigoFonte = obterCodigoJSConstante();
        criarFuncaoSalvar();
        criarFuncoesCSV();        

        function obterCodigoJSConstante()
        {
            return `
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

                if (id) { // se digitou um Id
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

            //backend
            // A
            function preparaListagem(vetor) {
                let texto = "";
                for (let i = 0; i < vetor.length; i++) {
                    const linha = vetor[i];
                    texto +=
                        linha.id + " - " +
                        linha.nome + "<br>";
                }
                return texto;
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
                // pet -> entidadeGlobal
                document.getElementById("inputId").value = entidadeObjeto.id;
                document.getElementById("inputNome").value = entidadeObjeto.nome;

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
                atributos.forEach((atributoHTML) => 
                    atributoHTML.readOnly = soLeitura
                )
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
                `
        }
    }
}