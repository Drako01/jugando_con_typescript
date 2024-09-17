"use strict";
class Persona {
    constructor(id, nombre, apellido, fechaNac, dni, role, email, direccion, telefono, nacionalidad, estadoCivil, genero, fechaRegistro, activo = true) {
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
    calcularEdad() {
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
    constructor(id, nombre, apellido, fechaNac, dni, matricula, email) {
        super(id, nombre, apellido, fechaNac, dni, 'Alumno', email);
        this.matricula = matricula;
    }
    mostrarDatos() {
        return `Alumno: ${this.nombre} ${this.apellido}, Matrícula: ${this.matricula}, Edad: ${this.calcularEdad()}`;
    }
}
class Profesor extends Persona {
    constructor(id, nombre, apellido, fechaNac, dni, especialidad, email) {
        super(id, nombre, apellido, fechaNac, dni, 'Profesor', email);
        this.especialidad = especialidad;
    }
    mostrarDatos() {
        return `Profesor: ${this.nombre} ${this.apellido}, Especialidad: ${this.especialidad}, Edad: ${this.calcularEdad()}`;
    }
}
class Administrador extends Persona {
    constructor(id, nombre, apellido, fechaNac, dni, area, email) {
        super(id, nombre, apellido, fechaNac, dni, 'Administrador', email);
        this.area = area;
    }
    mostrarDatos() {
        return `Administrador: ${this.nombre} ${this.apellido}, Área: ${this.area}, Edad: ${this.calcularEdad()}`;
    }
}
const alumno1 = new Alumno(1, 'Juan', 'Pérez', new Date('2003-09-20'), 12345678, 'A001');
console.log(alumno1.mostrarDatos());
const profesor1 = new Profesor(2, 'Ana', 'Gómez', new Date('1985-06-15'), 87654321, 'Matemáticas');
console.log(profesor1.mostrarDatos());
const admin1 = new Administrador(3, 'Carlos', 'Fernández', new Date('1975-03-10'), 11223344, 'Recursos Humanos');
console.log(admin1.mostrarDatos());
