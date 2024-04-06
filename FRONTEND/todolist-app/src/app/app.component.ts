import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { AdvicesComponent } from './advices/advices.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, AdvicesComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent{
  
}
