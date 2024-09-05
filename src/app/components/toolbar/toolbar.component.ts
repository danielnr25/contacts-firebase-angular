import { Component } from '@angular/core';
import {MatIconModule} from '@angular/material/icon';
import {MatButtonModule} from '@angular/material/button';
import {MatToolbarModule} from '@angular/material/toolbar';

const MATERIAL_MODULES = [MatIconModule,MatButtonModule,MatToolbarModule];

@Component({
  selector: 'app-toolbar',
  standalone: true,
  imports: [MATERIAL_MODULES],
  template: `
    <mat-toolbar class="primary-color">
    <a routerLink="/" mat-button>
      <mat-icon >home</mat-icon>
      <span>Home</span>
    </a>
    <a routerLink="/contacts" mat-button>
      <mat-icon>list_all</mat-icon>
      <span>Contactos</span>
    </a>
    <span class="spacer"></span>

    <a mat-button (click)="emitClick()">
      <mat-icon color="primary">add_box</mat-icon>
      <span>Nuevo</span>
    </a>

    </mat-toolbar>
  `,

})
export class ToolbarComponent {
  emitClick():void {
    console.log('click en el botón');
  }
}
