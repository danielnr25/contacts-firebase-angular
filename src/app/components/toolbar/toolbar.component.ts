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
    <mat-toolbar>
    <a>
      <mat-icon>home</mat-icon>
      <span>Home</span>
    </a>
    </mat-toolbar>
  `,
  styles: ``
})
export class ToolbarComponent {

}
