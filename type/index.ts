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
    activo?: boolean;
}


class Persona implements IPersona {
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
    activo?: boolean;

    constructor(id: number, nombre: string, apellido: string, fechaNac: Date, dni: number, role: string, email?: string, direccion?: { calle: string; ciudad: string; provincia: string; codigoPostal: string; }, telefono?: string, nacionalidad?: string, estadoCivil?: string, genero?: 'masculino' | 'femenino' | 'otro', fechaRegistro?: Date, activo: boolean = true) {
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
        this.activo = activo;
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

class Alumno extends Persona {
    matricula: string;

    constructor(id: number, nombre: string, apellido: string, fechaNac: Date, dni: number, matricula: string, email?: string) {
        super(id, nombre, apellido, fechaNac, dni, 'Alumno', email);
        this.matricula = matricula;
    }

    mostrarDatos(): string {
        return `Alumno: ${this.nombre} ${this.apellido}, Matrícula: ${this.matricula}, Edad: ${this.calcularEdad()}`;
    }
}

class Profesor extends Persona {
    especialidad: string;

    constructor(id: number, nombre: string, apellido: string, fechaNac: Date, dni: number, especialidad: string, email?: string) {
        super(id, nombre, apellido, fechaNac, dni, 'Profesor', email);
        this.especialidad = especialidad;
    }

    mostrarDatos(): string {
        return `Profesor: ${this.nombre} ${this.apellido}, Especialidad: ${this.especialidad}, Edad: ${this.calcularEdad()}`;
    }
}

class Administrador extends Persona {
    area: string;

    constructor(id: number, nombre: string, apellido: string, fechaNac: Date, dni: number, area: string, email?: string) {
        super(id, nombre, apellido, fechaNac, dni, 'Administrador', email);
        this.area = area;
    }

    mostrarDatos(): string {
        return `Administrador: ${this.nombre} ${this.apellido}, Área: ${this.area}, Edad: ${this.calcularEdad()}`;
    }
}

const alumno1: Alumno = new Alumno(1, 'Juan', 'Pérez', new Date('2003-09-20'), 12345678, 'A001');
console.log(alumno1.mostrarDatos());  

const profesor1: Profesor = new Profesor(2, 'Ana', 'Gómez', new Date('1985-06-15'), 87654321, 'Matemáticas');
console.log(profesor1.mostrarDatos());  

const admin1: Administrador = new Administrador(3, 'Carlos', 'Fernández', new Date('1975-03-10'), 11223344, 'Recursos Humanos');
console.log(admin1.mostrarDatos());  
