import { Component } from '@angular/core';
import {
  AbstractControl,
  FormControl,
  FormGroup,
  NonNullableFormBuilder,
  ReactiveFormsModule,
  ValidatorFn,
  Validators
} from "@angular/forms";
import {NzFormDirective, NzFormModule} from "ng-zorro-antd/form";
import {NzInputModule} from "ng-zorro-antd/input";
import {NzButtonModule} from "ng-zorro-antd/button";
import {NzCheckboxModule} from "ng-zorro-antd/checkbox";
import {NzIconModule} from "ng-zorro-antd/icon";
import {NzOptionComponent, NzSelectComponent} from "ng-zorro-antd/select";
import {NzCardComponent} from "ng-zorro-antd/card";
import {NzDividerComponent} from "ng-zorro-antd/divider";
import {NgIf} from "@angular/common";

@Component({
  selector: 'app-sign-in',
  standalone: true,
  imports: [
    NzFormDirective,
    ReactiveFormsModule,
    NzFormModule,
    NzInputModule,
    NzButtonModule,
    NzCheckboxModule,
    NzIconModule,
    NzSelectComponent,
    NzOptionComponent,
    NzCardComponent,
    NzDividerComponent,
    NgIf
  ],
   templateUrl: './sign-in.component.html',
  styleUrl: './sign-in.component.scss'
})
export class SignInComponent {
  validateForm: FormGroup<{
    email: FormControl<string>;
    password: FormControl<string>;
  }> = this.fb.group({
    email: ['', [Validators.required]],
    password: ['', [Validators.required]],

  });

  submitForm(): void {
    if (this.validateForm.valid) {
      console.log('submit', this.validateForm.value);
    } else {
      Object.values(this.validateForm.controls).forEach(control => {
        if (control.invalid) {
          control.markAsDirty();
          control.updateValueAndValidity({ onlySelf: true });
        }
      });
    }
  }

  isResetPassword = false;

  toggleResetPassword(): void {
    this.isResetPassword = !this.isResetPassword;
  }


  constructor(private fb: NonNullableFormBuilder) {}
}
