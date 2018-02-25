export class Gestor {
  nombre: string;
  email: string;
  uid: string;
  curso: string;

  constructor(action: Gestor) {
    this.nombre = action.nombre;
    this.email = action.email;
    this.uid = action.uid;
    this.curso = action.curso;
  }

}
