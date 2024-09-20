export class Categoria {
    constructor(id, categoria) {
        this.id = id;
        this.categoria = categoria;
    }
    mostrarDetalles() {
        return `Categoria: ${this.categoria} Agregada con éxito.!`;
    }
}
