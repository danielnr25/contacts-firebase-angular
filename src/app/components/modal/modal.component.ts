import { Component, inject, OnInit } from '@angular/core';
import { MatFormField, MatLabel } from '@angular/material/form-field';
import { MAT_DIALOG_DATA, MatDialogModule } from '@angular/material/dialog';
import { MatInput } from '@angular/material/input';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatOptionModule } from '@angular/material/core';
import {MatSelectModule} from '@angular/material/select';
import {MatButtonModule} from '@angular/material/button';
import { CommonModule } from '@angular/common';
import { ContactService } from '@features/contacts/contact.service';
import { ModalService } from './modal.service';
import { APP_CONSTANTS } from '@shared/constants';
import { SnackBarService } from '@shared/service/snack-bar.service';
const MATERIAL_MODULES = [MatLabel,MatInput,MatDialogModule,MatFormField,MatSelectModule,MatOptionModule,CommonModule,MatButtonModule];

@Component({
  selector: 'app-modal',
  standalone: true,
  imports: [ReactiveFormsModule,MATERIAL_MODULES],
  templateUrl: './modal.component.html',
  styleUrl: './modal.component.scss'
})


export class ModalComponent implements OnInit { //
  contactForm!: FormGroup; // es una variable para el formulario de contacto
  countries = APP_CONSTANTS.COUNTRIES; // es una variable para los paises
  private readonly _formbuilder = inject(FormBuilder);
  private readonly _matDialog   = inject(MAT_DIALOG_DATA);
  private readonly _contactSvc = inject(ContactService);
  private readonly _modalSvc = inject(ModalService);
  private readonly _snackBarSvc = inject(SnackBarService);

  ngOnInit(): void { // es un método que se ejecuta cuando se inicia el componente
    this._buildForm();
    this.contactForm.patchValue(this._matDialog.data); // patchValue: es un método que se utiliza para establecer los valores de los campos del formulario de contacto
  }

  getTitle(): string{
    return this._matDialog.data ? 'Editar ' : 'Registrar ';
  }

  async onSubmit(){
    let message = APP_CONSTANTS.MESSAGES.CONTACT_UPDATED;

    const contact = this.contactForm.value;

    if(this._matDialog.data){ // si el dialogo tiene datos, entonces se actualizará el contacto
      this._contactSvc.updateContact(this._matDialog.data.id,contact);
    }else{
      await this._contactSvc.newContact(contact);
      message = APP_CONSTANTS.MESSAGES.CONTACT_CREATED;
    }

    this._snackBarSvc.openSnackBar(message,'ok');
    this._modalSvc.closeModal(); // cerrar el modal de contacto cuando se haya registrado o actualizado

  }

  private _buildForm():void{
    this.contactForm = this._formbuilder.nonNullable.group({
      name:['',Validators.required],
      email:['',Validators.required],
      phone:['',Validators.required],
      country:['',Validators.required],
    });
  }


}
