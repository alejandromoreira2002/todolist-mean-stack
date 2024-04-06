import { Routes } from '@angular/router';
import { MainComponent } from './main/main.component';
import { LoginComponent } from './login/login.component';
import { authGuard } from './auth.guard';
import { SignupComponent } from './signup/signup.component';

export const routes: Routes = [
    {
        path: '',
        component: MainComponent,
        canActivate: [authGuard],
    },
    {
        path: 'login',
        component: LoginComponent,
        title: 'Log in'
    },
    {
        path: 'signup',
        component: SignupComponent,
        title: 'Sign up'
    }
];
