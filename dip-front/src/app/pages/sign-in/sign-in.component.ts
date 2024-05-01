import { Component } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
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
import {AuthService} from "../../services/auth.service";
import {Router, RouterLink} from "@angular/router";
import {NzSpinComponent} from "ng-zorro-antd/spin";

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
        NgIf,
        RouterLink,
        NzSpinComponent
    ],
   templateUrl: './sign-in.component.html',
  styleUrl: './sign-in.component.scss'
})
export class SignInComponent {
  validateForm: FormGroup;
  isResetPassword = false;
  isLoading = false;
  constructor(private fb: FormBuilder,
              private authService: AuthService,
              private router: Router,) {
    this.validateForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required]],
    });
  }

    submitForm(): void {
    if (this.validateForm.valid) {
      this.isLoading = true;
      this.authService.login(this.validateForm.value.email, this.validateForm.value.password)
        .subscribe(
          response => {
            this.isLoading = false;
            console.log(response);
            this.authService.saveToken(response.token);
            this.router.navigate(['/main']);
          },
          error => {
            console.error(error);
          }
        );
    } else {
      Object.values(this.validateForm.controls).forEach(control => {
        if (control.invalid) {
          control.markAsDirty();
          control.updateValueAndValidity({ onlySelf: true });
        }
      });
    }
  }
  toggleResetPassword(): void {
    this.isResetPassword = !this.isResetPassword;
  }
}
