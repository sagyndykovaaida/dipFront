import { Routes } from '@angular/router';
import {WelcomeComponent} from "./pages/welcome/welcome.component";
import {SignUpComponent} from "./pages/sign-up/sign-up.component";

export const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: '/welcome' },
  { path: 'welcome',component:WelcomeComponent},
  { path: 'signup',component:SignUpComponent},

];
