class Notebook
{
    constructor
    (
        id, modelo, fabricante, processador, fabricanteProcessador, quantidadeRam, armazenamentoPermanente, dataLancamento, posicaoNaLista
    )
    {
        // string
        this.id = id;
        this.modelo = modelo;
        this.fabricante = fabricante;
        this.processador = processador;
        this.fabricanteProcessador = fabricanteProcessador;

        //int
        this.quantidadeRam = quantidadeRam; // (in GB)
        this.armazenamentoPermanente = armazenamentoPermanente;

        //date
        this.dataLancamento = dataLancamento;
        
        this.posicaoNaLista = posicaoNaLista;
    }
}
