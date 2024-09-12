import { inject, Injectable } from "@angular/core";
import { DocumentData, Firestore,addDoc,collection,deleteDoc,doc, updateDoc,getDoc,DocumentReference,orderBy,query,collectionData } from "@angular/fire/firestore";

import { Observable } from "rxjs"; // Son objetos que emiten valores en el tiempo, y se utilizan para manejos de eventos asincrónicos.
@Injectable({providedIn: 'root'})

export class ContactService{
  
}
