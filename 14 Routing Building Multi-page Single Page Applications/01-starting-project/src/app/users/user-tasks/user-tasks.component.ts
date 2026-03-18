import {
  Component,
  computed,
  DestroyRef,
  inject,
  input,
  OnInit,
} from '@angular/core';
import {
  ActivatedRoute,
  RouterOutlet,
  RouterLink,
  ResolveFn,
  RouterStateSnapshot,
  ActivatedRouteSnapshot,
} from '@angular/router';

import { UsersService } from '../users.service';

@Component({
  selector: 'app-user-tasks',
  standalone: true,
  templateUrl: './user-tasks.component.html',
  styleUrl: './user-tasks.component.css',
  imports: [RouterOutlet, RouterLink],
})
export class UserTasksComponent implements OnInit {
  // implements OnInit

  // >274 Extracting Dynamic Route Parameters via Inputs
  // userId = input.required<string>();
  // private usersService = inject(UsersService);

  // ?276 Extracting Dynamic Route Parameters via Observables
  // userName = '';
  // private activatedRoute = inject(ActivatedRoute);
  // private destroyRef = inject(DestroyRef);

  // userName = computed(
  //   () => this.usersService.users.find((u) => u.id === this.userId())?.name,
  // );

  // >291 Resolving Route-related Dynamic Data
  userName = input.required<string>();
  message = input.required<string>();

  // ?293. Accessing Route Data In Components
  private activatedRoute = inject(ActivatedRoute);

  ngOnInit(): void {
    this.activatedRoute.data.subscribe({
      next: (data) => {
        console.log(data);
      },
    });
  }

  // ?276 Extracting Dynamic Route Parameters via Observables
  // ngOnInit(): void {
  //   console.log('Input Data: ' + this.message());

  //   console.log(this.activatedRoute);

  //   console.log(this.activatedRoute.snapshot);
  //   console.log(this.activatedRoute.snapshot.paramMap.get('userId'));

  //   const subScription = this.activatedRoute.paramMap.subscribe({
  //     next: (paramMap) => {
  //       this.userName =
  //         this.usersService.users.find((u) => u.id === paramMap.get('userId'))
  //           ?.name || '';
  //     },
  //   });

  //   this.destroyRef.onDestroy(() => subScription.unsubscribe());
  // }
}

// >291 Resolving Route-related Dynamic Data
export const resolveUserName: ResolveFn<string> = (
  activatedRoute: ActivatedRouteSnapshot,
  routerState: RouterStateSnapshot,
) => {
  const usersService = inject(UsersService);
  const userName =
    usersService.users.find(
      (u) => u.id === activatedRoute.paramMap.get('userId'),
    )?.name || '';
  return userName;
};

// >295 Setting & Resolving Titles
export const resolveTitle: ResolveFn<string> = (
  activatedRoute,
  routerState,
) => {
  return resolveUserName(activatedRoute, routerState) + "'s Tasks";
};
