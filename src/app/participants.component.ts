import { Component, Input,  OnChanges, SimpleChanges } from '@angular/core';
import {
  trigger,
  state,
  style,
  animate,
  transition,
  query,
  stagger,
} from '@angular/animations';
import { NgClass, NgFor } from '@angular/common';

@Component({
  imports: [NgFor, NgClass],
  selector: 'app-participants',
  templateUrl: './participants.component.html',
  styleUrls: ['./participants.component.css'],
  animations: [
    trigger('listAnimation', [
      state('active', style({})),
      transition('* => active', [
        query(
          'div.updated',
          [
            style({ opacity: 0, transform: 'translateX(40px)' }),
            stagger(
              '50ms',
              animate('500ms cubic-bezier(0.35, 0, 0.25, 1)')
              // animate(
              //   '500ms ease-out',
              //   style({ opacity: 1, transform: 'translateX(0)' })
              // )
            ),
          ],
          { optional: true }
        ),
      ]),
      // transition('* => *', [
      //   // Initial state of each item
      //   query(
      //     ':enter',
      //     [
      //       style({ opacity: 0, transform: 'translateX(20px)' }),
      //       stagger(
      //         '50ms',
      //         animate(
      //           '300ms ease-out',
      //           style({ opacity: 1, transform: 'translateX(0)' })
      //         )
      //       ),
      //     ],
      //     { optional: true }
      //   ),
      //   // Animates items that are removed
      //   query(
      //     ':leave',
      //     [
      //       stagger(
      //         '50ms',
      //         animate(
      //           '300ms ease-in',
      //           style({ opacity: 0, transform: 'translateX(20px)' })
      //         )
      //       ),
      //     ],
      //     { optional: true }
      //   ),
      // ]),
    ]),
  ],
})
export class ParticipantsComponent {
  @Input()
  participants: any[] = [];
  animationState: string = 'inactive';

  updateParticipants() {
    const current = this.participants;

    // shuffle the array
    const shuffled = [...current].sort(() => 0.9 - Math.random());

    for (let i = 0; i < shuffled.length; i++) {
      shuffled[i].updated = shuffled[i].id === current[i].id;
    }

    this.participants = shuffled;
    this.animationState = 'active';
    // Reset the state after animation completes
    setTimeout(() => (this.animationState = 'inactive'), 500);
  }


  ngOnChanges(changes: SimpleChanges) {
    console.log('changes', changes);
    if (changes['participants']) {
      this.animationState = 'active';
      // Reset the state after animation completes
      setTimeout(() => (this.animationState = 'inactive'), 500);
    }
  }


  trackByParticipant(index: number, participant: any) {
    return participant;
  }

  constructor() {
    this.participants = [
      { id: 1, name: 'Aaa', score: 100 },
      { id: 2, name: 'Bbb' , score: 80 },
      { id: 3, name: 'Ccc' , score: 70 },
      { id: 4, name: 'Ddd' , score: 50 },
      { id: 5, name: 'Eee' , score: 30 },
      { id: 6, name: 'Fff' , score: 10 },
      { id: 7, name: 'Ggg' , score: 5 },
    ];
  }
}
