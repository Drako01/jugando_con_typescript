interface IPersona {
    id: number;
    nombre: string;
    apellido: string;
    fechaNac: Date;
    email?: string;
    dni: number;
    role: string;
    direccion?: {
        calle: string;
        ciudad: string;
        provincia: string;
        codigoPostal: string;
    };
    telefono?: string;
    nacionalidad?: string;
    estadoCivil?: string;
    genero?: 'masculino' | 'femenino' | 'otro';
    fechaRegistro?: Date;
    estado?: boolean;
}


export class Persona implements IPersona {
    id: number;
    nombre: string;
    apellido: string;
    fechaNac: Date;
    email?: string;
    dni: number;
    role: string;
    direccion?: {
        calle: string;
        ciudad: string;
        provincia: string;
        codigoPostal: string;
    };
    telefono?: string;
    nacionalidad?: string;
    estadoCivil?: string;
    genero?: 'masculino' | 'femenino' | 'otro';
    fechaRegistro?: Date;
    estado?: boolean;

    constructor(
        id: number, 
        nombre: string, 
        apellido: string, 
        fechaNac: Date, 
        dni: number, 
        role: string, 
        email?: string, 
        direccion?: { 
            calle: string; 
            ciudad: string; 
            provincia: string; 
            codigoPostal: string; 
        }, 
        telefono?: string, 
        nacionalidad?: string, 
        estadoCivil?: string, 
        genero?: 'masculino' | 'femenino' | 'otro', 
        fechaRegistro?: Date, 
        estado: boolean = true
    ) {
        this.id = id;
        this.nombre = nombre;
        this.apellido = apellido;
        this.fechaNac = fechaNac;
        this.dni = dni;
        this.role = role;
        this.email = email;
        this.direccion = direccion;
        this.telefono = telefono;
        this.nacionalidad = nacionalidad;
        this.estadoCivil = estadoCivil;
        this.genero = genero;
        this.fechaRegistro = fechaRegistro || new Date();  
        this.estado = estado;
    }

    calcularEdad(): number {
        const hoy = new Date();
        let edad = hoy.getFullYear() - this.fechaNac.getFullYear();
        const mes = hoy.getMonth() - this.fechaNac.getMonth();

        if (mes < 0 || (mes === 0 && hoy.getDate() < this.fechaNac.getDate())) {
            edad--;
        }

        return edad;
    }
}