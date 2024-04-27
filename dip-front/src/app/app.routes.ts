import { Routes } from '@angular/router';
import {WelcomeComponent} from "./pages/welcome/welcome.component";
import {SignUpComponent} from "./pages/sign-up/sign-up.component";
import {SignInComponent} from "./pages/sign-in/sign-in.component";
import {MainPageComponent} from "./pages/main-page/main-page.component";

export const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: '/welcome' },
  { path: 'welcome',component:WelcomeComponent},
  { path: 'signup',component:SignUpComponent},
  { path: 'signin',component:SignInComponent},
  { path: 'main', component: MainPageComponent },
];

