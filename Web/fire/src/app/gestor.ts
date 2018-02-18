export class Gestor {
  nombre: string;
  email: string;
  uid: string;

  constructor(action: Gestor) {
    this.nombre = action.nombre;
    this.email = action.email;
    this.uid = action.uid;
  }

}
