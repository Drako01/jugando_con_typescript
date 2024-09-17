import { Alumno } from "./models/Alumno.js";
import { Profesor } from "./models/Profesor.js";
import { Administrador } from "./models/Aministrador.js";

const alumno1: Alumno = new Alumno(1, 'Juan', 'Pérez', new Date('2003-09-20'), 12345678, 'A001');
console.log(alumno1.mostrarDatos());  

const profesor1: Profesor = new Profesor(2, 'Ana', 'Gómez', new Date('1985-06-15'), 87654321, 'Matemáticas');
console.log(profesor1.mostrarDatos());  

const admin1: Administrador = new Administrador(3, 'Carlos', 'Fernández', new Date('1975-03-10'), 11223344, 'Recursos Humanos');
console.log(admin1.mostrarDatos());  
