import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import {MatCardModule} from '@angular/material/card';
import {ToolbarComponent} from '@components/toolbar/toolbar.component';

const MATERIAL_MODULES = [MatCardModule];
@Component({
  selector: 'app-layout',
  standalone: true,
  imports: [RouterOutlet,MATERIAL_MODULES,ToolbarComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})

export class AppComponent {
 title = 'Daniel NR';
  parrafo = 'Bienvenidos a mi página web';
}
