import { Categoria } from "./Categoria.js";
import { Alumno } from './Alumno.js';
import { Profesor } from './Profesor.js';

export class Curso {
    id: number;
    nombre: string;
    fechaInicio: string;
    fechaFinalizacion: string;
    estado?: boolean;
    cantidadAlumnos?: number;
    categoria?: Categoria;
    alumnos: Alumno[];  
    profesores: Profesor[];
    comision?: any;

    constructor(
        id: number,
        nombre: string,
        fechaInicio: string,
        fechaFinalizacion: string,
        estado: boolean = true,
        cantidadAlumnos: number = 0,
        categoria?: Categoria,
        profesor?: Profesor,
        comision?: any
    ) {
        this.id = id;
        this.nombre = nombre;
        this.fechaInicio = fechaInicio;
        this.fechaFinalizacion = fechaFinalizacion;
        this.estado = estado;
        this.cantidadAlumnos = cantidadAlumnos;
        this.categoria = categoria;
        this.alumnos = []; 
        this.profesores = profesor ? [profesor] : [];
        this.comision = comision;
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
