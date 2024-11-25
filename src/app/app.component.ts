import { Component } from '@angular/core';
import { ParticipantsComponent } from './participants.component';

@Component({

  selector: 'app-root',
  imports: [
    ParticipantsComponent,
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'xm';
}
