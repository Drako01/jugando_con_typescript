export class Categoria {
    id: number;
    categoria: string;

    constructor(
        id: number, 
        categoria: string
    ){
        this.id = id;
        this.categoria = categoria;
    }

    mostrarDetalles(): string {
        return `Categoria: ${this.categoria} Agregada con éxito.!`;
    }
}