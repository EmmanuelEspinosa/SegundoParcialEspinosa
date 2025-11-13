import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { ElementList } from "../components/element-list/element-list";

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, ElementList],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  protected readonly title = signal('TP-Angular-Idra');
}
