import {
  afterNextRender,
  Component,
  DestroyRef,
  inject,
  viewChild,
} from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { debounceTime } from 'rxjs';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
})
export class LoginComponent {
  // >249 Interacting With The Underlying Form Object In The Component
  private form = viewChild.required<NgForm>('form');
  private destroyRef = inject(DestroyRef);

  constructor() {
    afterNextRender(() => {
      // ?250 Updating Form Values Programmatically
      const savedForm = window.localStorage.getItem('saved-login-form');
      if (savedForm) {
        const loadedFormData = JSON.parse(savedForm);
        const savedEmail = loadedFormData.email;
        setTimeout(() => {
          this.form().setValue({
            email: savedEmail,
            password: '',
          });
        }, 100);
      }

      const subscription = this.form()
        .valueChanges?.pipe(debounceTime(500))
        .subscribe({
          // next: (value) => console.log(value.email),
          next: (value) =>
            window.localStorage.setItem(
              'saved-login-form',
              JSON.stringify({
                email: value.email,
              }),
            ),
        });

      this.destroyRef.onDestroy(() => subscription?.unsubscribe());
    });
  }

  // ?244 Getting Access to the Angular-managed Form
  // onSubmit(form: NgForm) {
  //   console.log(form);
  //   console.log(form.form.value);
  // }

  // >245 Extracting User Input Values
  onSubmit(formData: NgForm) {
    const enteredEmail = formData.form.value.email;
    const enteredPassWord = formData.form.value.password;

    console.log(enteredEmail, enteredPassWord);

    if (formData.form.valid) {
      console.log(formData.form.errors);
      console.log(formData.form.valid);
      return;
    }

    // >249 Interacting With The Underlying Form Object In The Component
    formData.form.reset();
  }
}
