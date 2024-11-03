import { Routes } from '@angular/router';
import { AboutComponent } from './about/about.component';
import { LandingComponent } from './landing/landing.component';
import { RegisterComponent } from './register/register.component';
import { LoginComponent } from './login/login.component';
import { FuncionalidadesComponent } from './funcionalidades/funcionalidades.component';
import { AboutUsComponent } from './about-us/about-us.component';
import { ChatComponent } from './chat/chat.component';
import { ArtigoComponent } from './artigo/artigo.component'; // Importar ArtigoComponent
import { NoticiaComponent } from './noticia/noticia.component'; // Importar NoticiaComponent

export const routes: Routes = [
    { path: 'about', component: AboutComponent },
    { path: 'landing', component: LandingComponent },
    { path: 'about-us', component: AboutUsComponent },
    { path: 'login', component: LoginComponent },
    { path: 'register', component: RegisterComponent },
    { path: 'funcionalidades', component: FuncionalidadesComponent },
    { path: 'chat', component: ChatComponent },
    { path: 'artigo', component: ArtigoComponent }, // Adicionar rota para ArtigoComponent
    { path: 'noticia', component: NoticiaComponent }, // Adicionar rota para NoticiaComponent
    { path: '', redirectTo: '/landing', pathMatch: 'full' }
];