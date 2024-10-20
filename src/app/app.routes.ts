import { Routes } from '@angular/router';
import { AboutComponent } from './about/about.component';
import { LandingComponent } from './landing/landing.component';
import { RegisterComponent } from './register/register.component';
import { LoginComponent } from './login/login.component';
import { FuncionalidadesComponent } from './funcionalidades/funcionalidades.component';
import { AboutUsComponent } from './about-us/about-us.component';

export const routes: Routes = [
    { path: 'about', component: AboutComponent },
    { path: 'landing', component: LandingComponent },
    { path: 'about-us', component: AboutUsComponent },
    { path: 'login', component: LoginComponent },
    { path: 'register', component: RegisterComponent },
    { path: 'funcionalidades', component: FuncionalidadesComponent },
    { path: '', redirectTo: '/landing', pathMatch: 'full' }
];
