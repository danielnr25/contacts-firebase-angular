import { Timestamp } from "@angular/fire/firestore"

export type ColumnKeys<DATA> = Array<keyof DATA>;
//ColumnKeys<DATA> es un tipo genérico que recibe un tipo DATA y devuelve un array de las claves de DATA, keyof es un operador que devuelve los tipos de las claves de un objeto T(genérico)

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
