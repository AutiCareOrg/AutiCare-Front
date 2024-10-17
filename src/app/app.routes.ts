import { Routes } from '@angular/router';
import { AboutComponent } from './about/about.component';
import { LandingComponent } from './landing/landing.component';
import { LoginComponent } from './login/login.component';

export const routes: Routes = [
    { path: 'about', component: AboutComponent },
    { path: 'landing', component: LandingComponent },
    { path: 'login', component: LoginComponent },
    { path: '', redirectTo: '/landing', pathMatch: 'full' }
];
