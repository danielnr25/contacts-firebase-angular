import { inject, Injectable } from "@angular/core";
import {MatDialog} from '@angular/material/dialog';
import { Contact } from "@features/contacts/contact.interfaces";
import { ComponentType } from "@angular/cdk/portal";
@Injectable({providedIn: 'root'})

export class ModalService{
  private readonly dialog = inject(MatDialog);

  openModal<CT,DATA=Contact>(componenRef:ComponentType<CT>,data?:DATA,isEditing=false):void{
    const config = {data,isEditing};
    this.dialog.open(componenRef,{width:'500px',data:config});
  }

  closeModal():void{
    this.dialog.closeAll();
  }

}
