import { Component, effect, inject, input, OnInit, signal, viewChild } from '@angular/core';
import { MatPaginator,MatPaginatorModule } from '@angular/material/paginator';
import { MatSort, MatSortModule } from '@angular/material/sort';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { FilterComponent } from "./filter/filter.component";
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { APP_CONSTANTS } from '@shared/constants';
import { ContactService } from '@features/contacts/contact.service';
import { ModalService } from '@components/modal/modal.service';
import { ModalComponent } from '@components/modal/modal.component';
import { SnackBarService } from '@shared/service/snack-bar.service';
const MATERIAL_MODULES = [MatTableModule,MatSortModule,MatPaginatorModule, MatButtonModule,MatIconModule]; // declara los modulos de material a importar en el componente
@Component({
  selector: 'app-grid',
  standalone: true,
  imports: [MATERIAL_MODULES,FilterComponent],
  templateUrl: './grid.component.html',
  styleUrl: './grid.component.scss'
})

export class GridComponent<DATA> implements OnInit {
// T: es un tipo genérico que se utiliza para definir el tipo de datos que se mostrarán en la tabla.
displayedColumns = input.required<string[]>();
data = input.required<DATA[]>();
sortableColumns = input<string[]>([]);
dataSource = new MatTableDataSource<DATA>();


  valueToFilter = signal('');
  private readonly _sort = viewChild.required<MatSort>(MatSort);
  private readonly _contactSvc = inject(ContactService);
  private readonly _modalSvc = inject(ModalService);
  private readonly _snackBarSvc = inject(SnackBarService);
  private readonly _paginator = viewChild.required<MatPaginator>(MatPaginator);

  constructor() { // constructor
    effect(()=>{
      if(this.valueToFilter()){ // si hay un valor para filtrar
        this.dataSource.filter = this.valueToFilter().trim().toLowerCase(); // filtra los datos
      }else{
        this.dataSource.filter = ''; // si no hay valor para filtrar, muestra todos los datos
      }
      if(this.data()){
        this.dataSource.data = this.data(); // asigna los datos al objeto MatTableDataSource
      }
    },{allowSignalWrites: true});
  }
  //displayedColumns = ['name', 'position', 'weight', 'symbol'];

  ngOnInit(){
    this.dataSource.data = this.data();
    this.dataSource.sort = this._sort();
    this.dataSource.paginator = this._paginator();
  }

  applyFilter(event: Event): void{
    const filterValue = (event.target as HTMLInputElement).value; // obtiene el valor del input
    this.dataSource.filter = filterValue.trim().toLowerCase(); // fil
  }

  openEditForm(data: DATA):void{
    this._modalSvc.openModal<ModalComponent,DATA>(ModalComponent,data,true); // abre el modal de edición
  }

  deleteContact(id:string): void{
    const confirmation = confirm(APP_CONSTANTS.MESSAGES.CONFIRMATION_PROMPT); // muestra un mensaje de confirmación
    if(confirmation){ // si se confirma la eliminación
      this._contactSvc.deleteContact(id); // elimina el contacto
      this._snackBarSvc.openSnackBar(APP_CONSTANTS.MESSAGES.CONTACT_DELETED,'ok'); // muestra un mensaje de éxito
    }else{
      return; // si no se confirma la eliminación, no hace
    }
  }
}
