class Boletim 
{
    constructor(id, materia, nota1, nota2, nota3, nota4, posicaoNaLista) 
    {
        this.id = id;
        this.materia = materia;

        this.nota1 = nota1;
        this.nota2 = nota2;
        this.nota3 = nota3;
        this.nota4 = nota4;

        this.posicaoNaLista = posicaoNaLista; //atributo para facilitar a alteração e exclusão 
    }
}
