import { Timestamp } from "@angular/fire/firestore"

export type ColumnKeys<T> = Array<keyof T>;
//ColumnKeys<T> es un tipo genérico que recibe un tipo T y devuelve un array de las claves de T, keyof es un operador que devuelve los tipos de las claves de un objeto T(genérico)

export interface Contact {
  id:number,
  name:string,
  email:string,
  phone:number,
  country:string,
  actions:string,
  created:Timestamp,
  updated:Timestamp
}
