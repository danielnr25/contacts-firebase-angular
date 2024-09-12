import { inject, Injectable } from "@angular/core";
import { DocumentData, Firestore,addDoc,collection,deleteDoc,doc, updateDoc,getDoc,DocumentReference,orderBy,query,collectionData } from "@angular/fire/firestore";
import {Contact} from "./contact.interfaces";

import { Observable } from "rxjs"; // Son objetos que emiten valores en el tiempo, y se utilizan para manejos de eventos asincrónicos.

import {APP_CONSTANTS} from "@shared/constants";

@Injectable({providedIn: 'root'})

export class ContactService{

  private readonly _firestore = inject(Firestore); // DB Firestore, inyectamos el servicio Firestore con la base de datos de Firebase

  private readonly _contactCollection = collection(this._firestore,APP_CONSTANTS.COLLECTION_NAME); // collection(db, 'cities');

  // Método para crear un nuevo contacto
  newContact(contact:Partial<Contact>):Promise<DocumentReference<DocumentData>>{
    return addDoc(this._contactCollection,{
      ...contact,
      created:Date.now(),
      updated:Date.now()
    })
  }
  // Método para obtener un contacto por id

  // Método para actualizar un contacto

  // Método para eliminar un contacto

  // Método para obtener todos los contactos
  getAllContacts():Observable<Contact[]>{
    const queryFn = query(this._contactCollection,orderBy('created','desc'));
    return collectionData(queryFn,{idField:'id'}) as Observable<Contact[]>;
  }

}
