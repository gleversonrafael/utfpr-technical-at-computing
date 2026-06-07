const enderecoServidor = 'localhost';
const porta = '3001';

async function listarTodas() {
    try {
    const response = await fetch(`http://${enderecoServidor}:${porta}/pessoas`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
        }
    });

    const data = await response.json();
    console.log(data);

    if (data.sucesso && data.pessoas.length > 0) {
        let tabela = '<table>';
        tabela += '<tr><th>CPF</th><th>Nome</th><th>Data de Nascimento</th></tr>';

        data.pessoas.forEach(pessoa => {
            const dataNascimento = pessoa.data_nascimento_pessoa ? 
                new Date(pessoa.data_nascimento_pessoa).toLocaleDateString('pt-BR') : 
                'Não informada';
            
            tabela += `<tr>
                <td>${pessoa.cpf_pessoa}</td>
                <td>${pessoa.nome_pessoa}</td>
                <td>${dataNascimento}</td>
            </tr>`;
        });
        
        tabela += '</table>';
        tabela += `<p><strong>Total de registros: ${data.quantidade}</strong></p>`;
        
        document.getElementById('resultadoTodas').innerHTML = `
            <div class="sucesso">
                ${tabela}
            </div>
        `;
    } else if (data.sucesso && data.pessoas.length === 0) {
        document.getElementById('resultadoTodas').innerHTML = '<span>Nenhuma pessoa cadastrada</span>';

    } else {
        document.getElementById('resultadoTodas').innerHTML = `<span class="erro">${data.mensagem}</span>`;
    }
    } catch (error) {
        console.error('Erro:', error);
        document.getElementById('resultadoTodas').innerHTML = '<span class="erro">Erro na comunicação com o servidor</span>';
    }
}


async function buscarPorCPF() {
    const cpf = document.getElementById('inputCpf').value.trim();

    if (!cpf) {
    document.getElementById('resultadoCPF').innerHTML = '<span class="erro">Por favor, digite um CPF</span>';
    return;
    }

    try {
    const response = 
    await fetch(`http://${enderecoServidor}:${porta}/pessoa/cpf/${encodeURIComponent(cpf)}`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
        }
    });

    const data = await response.json();

    if (data.sucesso) {
        const dataNascimento = data.pessoa.data_nascimento_pessoa ? 
            new Date(data.pessoa.data_nascimento_pessoa).toLocaleDateString('pt-BR') : 
            'Não informada';
        
        document.getElementById('resultadoCPF').innerHTML = `
            <div class="sucesso">
                <strong>Pessoa encontrada:</strong><br>
                CPF: ${data.pessoa.cpf_pessoa}<br>
                Nome: ${data.pessoa.nome_pessoa}<br>
                Data de Nascimento: ${dataNascimento}
            </div>
        `;
    } else {
        document.getElementById('resultadoCPF').innerHTML = `<span class="erro">${data.mensagem}</span>`;
    }
    } catch (error) {
    console.error('Erro:', error);
    document.getElementById('resultadoCPF').innerHTML = '<span class="erro">Erro na comunicação com o servidor</span>';
    }
    }

async function buscarPorNome() {
    const nome = document.getElementById('inputNome').value.trim();

    if (!nome) {
    document.getElementById('resultadoNome').innerHTML = '<span class="erro">Por favor, digite um nome</span>';
    return;
    }

    try {
    const response = await fetch(`http://${enderecoServidor}:${porta}/pessoa/nome/${encodeURIComponent(nome)}`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
        }
    });

    const data = await response.json();

    if (data.sucesso) {
        let tabela = '<table>';
        tabela += '<tr><th>CPF</th><th>Nome</th><th>Data de Nascimento</th></tr>';
        
        data.pessoas.forEach(pessoa => {
            const dataNascimento = pessoa.data_nascimento_pessoa ? 
                new Date(pessoa.data_nascimento_pessoa).toLocaleDateString('pt-BR') : 
                'Não informada';
            
            tabela += `<tr>
                <td>${pessoa.cpf_pessoa}</td>
                <td>${pessoa.nome_pessoa}</td>
                <td>${dataNascimento}</td>
            </tr>`;
        });
        
        tabela += '</table>';
        tabela += `<p><strong>Total encontrado: ${data.quantidade}</strong></p>`;
        
        document.getElementById('resultadoNome').innerHTML = `
            <div class="sucesso">
                ${tabela}
            </div>
        `;
    } else {
        document.getElementById('resultadoNome').innerHTML = `<span class="erro">${data.mensagem}</span>`;
    }
    } catch (error) {
        console.error('Erro:', error);
        document.getElementById('resultadoNome').innerHTML = '<span class="erro">Erro na comunicação com o servidor</span>';
    }
}


// Chapéuzinho
async function listarEstoque() {
    try {
        const requisicaoListar = await fetch(
            `http://${enderecoServidor}:${porta}/listarEstoque`,
            {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                }
            }
        );

        const dadosJSON = await requisicaoListar.json();

        if (dadosJSON.status && dadosJSON.linhas.length > 0) {
            let tabela = '<table>';

            tabela += `
                <tr>
                    <th>ID</th>
                    <th>Produto</th>
                    <th>Quantidade</th>
                    <th>Quantidade Mínima</th>
                    <th>Quantidade Máxima</th>
                </tr>
            `;

            dadosJSON.linhas.forEach(produto => {
                tabela += `
                    <tr>
                        <td>${produto.id_produto}</td>
                        <td>${produto.nome_produto}</td>
                        <td>${produto.quantidade_produto}</td>
                        <td>${produto.quantidade_minima_produto}</td>
                        <td>${produto.quantidade_maxima_produto}</td>
                    </tr>
                `;

            });

            tabela += '</table>';

            tabela += `
                <p>
                    <strong>Total de registros: ${dadosJSON.quantidade_linhas}</strong>
                </p>
            `;

            document.getElementById('resultadoTodas').innerHTML = `
                <div class="sucesso">
                    ${tabela}
                </div>
            `;
        }
        else {
            document.getElementById('resultadoTodas').innerHTML =
                '<span class="erro">Nenhum produto encontrado</span>';
        }

    } 
    catch(error)
    {
        alert(error);
    }

};