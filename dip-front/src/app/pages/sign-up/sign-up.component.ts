import {Component} from '@angular/core';
import {NzFormModule} from 'ng-zorro-antd/form';
import { NzInputModule } from 'ng-zorro-antd/input';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzCheckboxModule } from 'ng-zorro-antd/checkbox';
import { NzIconModule } from 'ng-zorro-antd/icon';
import {
  AbstractControl,
  FormControl,
  FormGroup,
  NonNullableFormBuilder,
  ReactiveFormsModule,
  ValidatorFn,
  Validators
} from '@angular/forms';
import { NzCardModule } from 'ng-zorro-antd/card';
import {NzOptionComponent, NzSelectComponent} from "ng-zorro-antd/select";
import {NzDividerComponent} from "ng-zorro-antd/divider";
import {AuthService} from "../../services/auth.service";
import {ActivatedRoute, Router, RouterLink} from "@angular/router";

@Component({
  selector: 'app-sign-up',
  standalone: true,
    imports: [
        NzFormModule,
        NzInputModule,
        NzButtonModule,
        NzCheckboxModule,
        NzIconModule,
        ReactiveFormsModule,
        NzSelectComponent,
        NzOptionComponent,
        NzCardModule,
        NzDividerComponent,
        RouterLink
    ],
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.scss'],

})
export class SignUpComponent {

  validateForm: FormGroup<{
    email: FormControl<string>;
    password: FormControl<string>;
    checkPassword: FormControl<string>;
    agree: FormControl<boolean>;
  }>;

  submitForm(): void {
    if (this.validateForm.valid) {

      this.authService.register(this.validateForm.value.email,this.validateForm.value.password,).subscribe(
        response => {
          console.log('User registered successfully');
          this.authService.saveToken(response.token);
          this.router.navigate(['/main']);
        },
        error => {
          console.error('There was an error during the registration process', error);
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

  updateConfirmValidator(): void {
    Promise.resolve().then(() => this.validateForm.controls.checkPassword.updateValueAndValidity());
  }
  confirmationValidator: ValidatorFn = (control: AbstractControl): { [s: string]: boolean } => {
    if (!control.value) {
      return { required: true };
    } else if (control.value !== this.validateForm.controls.password.value) {
      return { confirm: true, error: true };
    }
    return {};
  };
  constructor(private fb: NonNullableFormBuilder,
              private authService: AuthService,
              private router: Router,
              private route: ActivatedRoute,) {
    this.validateForm = this.fb.group({
      email: ['', [Validators.email, Validators.required]],
      password: ['', [Validators.required]],
      checkPassword: ['', [Validators.required, this.confirmationValidator]],
      agree: [false]
    });
  }
}
