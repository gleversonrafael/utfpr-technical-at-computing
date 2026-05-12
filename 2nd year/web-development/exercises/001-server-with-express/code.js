async function calcularHipotenusa() 
{
    // Catetos
    let catetoA = parseFloat(document.getElementById("catetoA").value),
        catetoB = parseFloat(document.getElementById('catetoB').value);

    // Dados a mais
    const ENDERECO_SERVIDOR = 'localhost';
    const PORTA = '3000'; 

    // Back-end
    try {
        const respostaServidor = await fetch(`http://${ENDERECO_SERVIDOR}:${PORTA}/enviar-mensagem`, 
        {
            method: 'POST',
            headers: {
                'Content-Type': 'application/JSON'
            },
            body: JSON.stringify({catetoA, catetoB})
        });

        const resultadoEmTexto = await respostaServidor.text();

        document.querySelector("h2#resultado").innerHTML = resultadoEmTexto;

    } catch(error)
    {
        console.log('Erro:' + error);
        alert("Foi encontrado um erro na comunicação com o servidor");
    }
}


/* E1 - Fetch = resultado de uma função
   E2 - Headers = objeto JSON
   E3 - Try antes da interação com backend
   S1 - Data -> Await response.text
*/