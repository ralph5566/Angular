import {
  Component,
  computed,
  Input,
  signal,
  input,
  Output,
  EventEmitter,
  output,
} from '@angular/core';

// import { DUMMY_USERS } from '../dummy-user';

import { User } from './user.model';
import { CardComponent } from '../shared/card/card.component';

// const randomIndex = Math.floor(Math.random() * DUMMY_USERS.length);

// type User = {
//   id: string;
//   avatar: string;
//   name: string;
// };

// interface User {
//   id: string;
//   avatar: string;
//   name: string;
// }

@Component({
  selector: 'app-user',
  standalone: true,
  imports: [CardComponent],
  templateUrl: './user.component.html',
  styleUrl: './user.component.css',
})
export class UserComponent {
  // selectedUser = signal(DUMMY_USERS[randomIndex]);
  // imagePath = computed(() => 'assets/users/' + this.selectedUser().avatar);

  // selectedUser = DUMMY_USERS[randomIndex];
  // get imagePath() {
  //   // return 'assets/users/' + this.selectedUser.avatar;
  //   return 'assets/users/' + this.selectedUser.avatar;
  // }

  // ? Input
  // @Input({ required: true }) id!: string;
  // @Input({ required: true }) avatar!: string;
  // @Input({ required: true }) name!: string;
  @Input({ required: true }) user!: User;
  @Input({ required: true }) selected!: boolean;
  //  {
  //   id: string;
  //   avatar: string;
  //   name: string;
  // }

  get imagePath() {
    return 'assets/users/' + this.user.avatar;
  }

  // ? Output
  @Output() select = new EventEmitter<string>();

  // ? output
  // select = output<string>();

  // ? input func<Type>
  // avatar = input.required<string>();
  // name = input.required<string>();
  // imagePath = computed(() => {
  //   return 'assets/users/' + this.avatar();
  // });

  onSelectUser() {
    // console.log('Click');
    // this.selectedUser = DUMMY_USERS[randomIndex];

    // ? signal 用法
    // const randomIndex = Math.floor(Math.random() * DUMMY_USERS.length);
    // this.selectedUser.set(DUMMY_USERS[randomIndex]);

    // ? Output
    this.select.emit(this.user.id);
  }
}
