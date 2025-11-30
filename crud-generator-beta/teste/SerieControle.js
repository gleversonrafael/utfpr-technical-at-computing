
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

            // complemento
            function primeiraMaiuscula(stringRecebida) {
                let stringRetornada = "";

                stringRetornada = stringRecebida.replace(stringRecebida[0], stringRecebida[0].toUpperCase());

                return stringRetornada;
            }
            
            function salvar() 
            {
                //gerencia operações inserir, alterar e excluir na lista
                // obter os dados a partir do html

                let id;
                if (entidadeAtualGlobal == null) {
                    id = parseInt(document.getElementById("inputId").value);
                } else {
                    id = entidadeAtualGlobal.id;
                }
        
            const titulo = document.getElementById("inputTitulo").value;
                const temporadas = parseInt(document.getElementById("inputTemporadas").value);
                const plataforma = document.getElementById("inputPlataforma").value;
                const avaliacao = parseFloat(document.getElementById("inputAvaliacao").value);
                if(!isNaN(id) && Number.isInteger(id) && titulo && !isNaN(temporadas) && Number.isInteger(temporadas) && plataforma && !isNaN(avaliacao)) {
switch (oQueEstaFazendo) {
                        case 'inserindo':
                            entidadeAtualGlobal = new Serie(id,titulo,temporadas,plataforma,avaliacao, listaDados.length);
                            listaDados.push(entidadeAtualGlobal);
                            mostrarAviso("Inserido na lista");
                            break;
                        case 'alterando':
                            let entidadeAtualAlterada = new Serie(id,titulo,temporadas,plataforma,avaliacao, listaDados[entidadeAtualGlobal.posicaoNaLista]);

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

                    texto +=linha.id + " - " + linha.titulo + " - " + linha.temporadas + " - " + linha.plataforma + " - " + linha.avaliacao + "<br>"
                }
                return texto;
            }
            ///////////////////////////////////////////////////
            ///////////////////////////////////////////////////
            // V
            function prepararESalvarCSV() { //gera um arquivo csv com as informações da lista. Vai enviar da memória RAM para dispositivo de armazenamento permanente
                let nomeDoArquivoDestino = "./Serie.csv";  //define o nome do arquivo csv
                let textoCSV = "";
                for (let i = 0; i < listaDados.length; i++) {
                    const linha = listaDados[i]; 
                    
                    //variavel linha contem as informações de cada pet
                    
                    textoCSV += linha.id + ";" +linha.titulo + ";" +linha.temporadas + ";" +linha.plataforma + ";" +linha.avaliacao + ";" +linha.posicaoNaLista + "\n";
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

                                if(dados.length === 6) {
                                    listaDados.push({

                    id: dados[0],
titulo: dados[1],
temporadas: dados[2],
plataforma: dados[3],
avaliacao: dados[4],
posicaoNaLista: dados[5]

                                    });
                                }
                            }
                        }
                        listar(); //exibe a lista atualizada
                    };
                    leitor.readAsText(arquivo); // Lê o arquivo como texto
                }
                