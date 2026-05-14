assignEvents();


function assignEvents()
{
    document.querySelector("#formularioConsultar").addEventListener("submit", (event) => {
        event.preventDefault();

        consultarPeca();
    });
}

async function consultarPeca() 
{
    const ELEMENTO_RESULTADO = document.querySelector('elementoResultado');

    const PECA = document.querySelector("#peca").value;

    const RESPOSTA = await fetch('/enviar-mensagem', 
        {
            method: 'POST',
            header: {
                'Content': 'Application/Json' 
                //M !!!
            },
            body: JSON.stringify(PECA),
        }
    );

    if(await RESPOSTA.text() === true)
    {
        if(!ELEMENTO_RESULTADO.classList.contains('sucesso'))
        {
            if(ELEMENTO_RESULTADO.classList.contains('erro'))
            {
                ELEMENTO_RESULTADO.classList.remove('erro');
            }
        }

        ELEMENTO_RESULTADO.classList.add('sucesso');
    
    } else 
    {


    }
}
