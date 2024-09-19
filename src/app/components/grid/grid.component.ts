import { Component, inject, input, OnInit, signal, viewChild } from '@angular/core';
import { FilterComponent } from './filter/filter.component';
import { MatSort,MatSortModule } from '@angular/material/sort';
import {MatPaginator, MatPaginatorModule} from '@angular/material/paginator';
import {MatTableDataSource, MatTableModule} from '@angular/material/table';
import { ContactService } from '@features/contacts/contact.service';
import { ModalService } from '@components/modal/modal.service';
import { SnackBarService } from '@shared/service/snack-bar.service';

const MATERIAL_MODULES = [MatTableModule,MatPaginatorModule,MatSortModule];
@Component({
  selector: 'app-grid',
  standalone: true,
  imports: [MATERIAL_MODULES,FilterComponent],
  templateUrl: './grid.component.html',
  styleUrl: './grid.component.scss'
})

export class GridComponent<DATA> implements OnInit {
// T: es un tipo genérico que se utiliza para definir el tipo de datos que se mostrarán en la tabla.
  valueToFilter = signal('');
  private readonly _sort = viewChild.required<MatSort>(MatSort);
  private readonly _contactSvc = inject(ContactService);
  private readonly _modalSvc = inject(ModalService);
  private readonly _snacBarSvc = inject(SnackBarService);

  //displayedColumns = ['name', 'position', 'weight', 'symbol'];
  displayedColumns = input.required<string[]>();
  data = input.required<DATA[]>();
  sortableColumns = input<string[]>([]);
  dataSource = new MatTableDataSource<DATA>();

  ngOnInit(){
    this.dataSource.data = this.data();
    this.dataSource.sort = this._sort();
  }

}
