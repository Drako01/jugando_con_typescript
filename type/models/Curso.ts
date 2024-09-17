import { Categoria } from "./Categoria.js";
import { Alumno } from './Alumno.js';
import { Profesor } from './Profesor.js';

export class Curso {
    id: number;
    nombre: string;
    fechaInicio: Date;
    fechaFinalizacion: Date;
    activo?: boolean;
    cantidadAlumnos?: number;
    categoria?: Categoria;
    alumnos: Alumno[];  
    profesores: Profesor[];

    constructor(
        id: number,
        nombre: string,
        fechaInicio: Date,
        fechaFinalizacion: Date,
        activo: boolean = true,
        cantidadAlumnos: number = 0,
        categoria?: Categoria
    ) {
        this.id = id;
        this.nombre = nombre;
        this.fechaInicio = fechaInicio;
        this.fechaFinalizacion = fechaFinalizacion;
        this.activo = activo;
        this.cantidadAlumnos = cantidadAlumnos;
        this.categoria = categoria;
        this.alumnos = []; 
        this.profesores = []; 
    }
    agregarAlumno(alumno: Alumno) {
        this.alumnos.push(alumno);
        this.cantidadAlumnos = this.alumnos.length;  
    }

    asignarProfesor(profesor: Profesor) {
        this.profesores.push(profesor);
    }

    mostrarDetalles(): string {
        return `Curso: ${this.nombre}, Alumnos: ${this.cantidadAlumnos}, Profesores: ${this.profesores.length}`;
    }
}
