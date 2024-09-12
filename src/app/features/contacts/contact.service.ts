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
  async getContactById(id:string):Promise<Contact>{
    const docRef = this._getDocRef(id);
    const documentData = await getDoc(docRef);
    return documentData.data() as Contact;
  }

  // Método para actualizar un contacto
  updateContact(id:string,contact:Contact):void{
    const docRef = this._getDocRef(id);
    updateDoc(docRef, {...contact}); // ...contact: se va utilizar para destructurar el objeto Contact y enviarlo como un objeto independiente
  }

  // Método para eliminar un contacto
  deleteContact(id:string):void{
    const docRef = this._getDocRef(id); //doc(db, "cities", "id")
    deleteDoc(docRef);
  }

  // Método para obtener todos los contactos
  getAllContacts():Observable<Contact[]>{
    const queryFn = query(this._contactCollection,orderBy('created','desc'));
    return collectionData(queryFn,{idField:'id'}) as Observable<Contact[]>;
  }

  // método privado para obtener la referencia
  private _getDocRef(id:string){
    return doc(this._firestore,APP_CONSTANTS.COLLECTION_NAME,id);
  }

}
