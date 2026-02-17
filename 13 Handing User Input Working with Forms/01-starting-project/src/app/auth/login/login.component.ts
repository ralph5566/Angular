import { Component, DestroyRef, inject, OnInit } from '@angular/core';
import {
  AbstractControl,
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { debounceTime, of } from 'rxjs';

// >255 Building Custom Validators
function mustContainQuestionMark(control: AbstractControl) {
  if (control.value.includes('?')) {
    return null;
  }

  return { doesNotContainQuestionMark: true };
}

// ?256 Creating & Using Async Validators
function emailIsUnique(control: AbstractControl) {
  if (control.value === 'test@example.com') {
    return of(null);
  }

  return of({ notUnique: true });
}

// >257 Interacting with the Form Programmatically
let initialEmailValue = '';
const savedForm = window.localStorage.getItem('saved-login-form');
if (savedForm) {
  const loadedForm = JSON.parse(savedForm);
  initialEmailValue = loadedForm.email;
}

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
})
export class LoginComponent implements OnInit {
  // >257 Interacting with the Form Programmatically
  private destroyRef = inject(DestroyRef);

  // >251 Reactive Forms: Getting Started
  form = new FormGroup({
    email: new FormControl(initialEmailValue, {
      // ?254 Adding Validators To Reactive Forms
      validators: [Validators.email, Validators.required],
      // ?256 Creating & Using Async Validators
      asyncValidators: [emailIsUnique],
    }),
    password: new FormControl('', {
      validators: [
        Validators.required,
        Validators.minLength(6),

        // >255 Building Custom Validators
        mustContainQuestionMark,
      ],
    }),
  });

  // ?254 Adding Validators To Reactive Forms
  get emailIsInvalid() {
    return (
      this.form.controls.email.touched &&
      this.form.controls.email.dirty &&
      this.form.controls.email.invalid
    );
  }
  get passwordIsInvalid() {
    return (
      this.form.controls.password.touched &&
      this.form.controls.password.dirty &&
      this.form.controls.email.invalid
    );
  }

  // >257 Interacting with the Form Programmatically
  ngOnInit() {
    // const savedForm = window.localStorage.getItem('saved-login-form');

    // if (savedForm) {
    //   const loadedForm = JSON.parse(savedForm);
    //   // this.form.controls.email.setValue(loadedForm.email);
    //   this.form.patchValue({
    //     email: loadedForm.email,
    //   });
    // }

    const subscription = this.form.valueChanges
      .pipe(debounceTime(500))
      .subscribe({
        next: (value) => {
          window.localStorage.setItem(
            'saved-login-form',
            JSON.stringify({ email: value.email }),
          );
        },
      });

    this.destroyRef.onDestroy(() => subscription.unsubscribe());
  }

  onSubmit() {
    // ?254 Adding Validators To Reactive Forms
    // this.form.controls.email.addValidators;

    console.log(this.form);

    const enteredEmail = this.form.value.email;
    const enteredPassword = this.form.value.password;
    console.log(enteredEmail, enteredPassword);
  }
}
