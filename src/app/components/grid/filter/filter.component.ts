import { Component, input, model } from '@angular/core';
import { MatInput } from '@angular/material/input';
import { MatFormField,MatLabel } from '@angular/material/input';
import { FormsModule } from '@angular/forms';

const MATERIAL_MODULES = [MatInput,MatFormField,MatLabel];
@Component({
  selector: 'app-filter',
  standalone: true,
  imports: [MATERIAL_MODULES,FormsModule],
  template: `
    <mat-form-field>
      <mat-label>{{ label() }}</mat-label>
      <input matInput type="text" [(ngModel)]="filter" [placeholder]="placeholder()">
    </mat-form-field>
  `,
  styles: ``
})

export class FilterComponent {
  filter = model('');
  label = input<string>('Buscar');
  placeholder = input<string>('Ex. nombre')
}
