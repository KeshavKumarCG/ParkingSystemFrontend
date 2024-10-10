import { Routes } from '@angular/router';
import { LoginComponent } from './pages/login/login.component';
import { UserHomePageComponent } from './pages/user-home-page/user-home-page.component';
import { WelcomePageComponent } from './pages/welcome-page/welcome-page.component';
import { ValetinfopageComponent } from './pages/valetinfopage/valetinfopage.component';

export const routes: Routes = [
    { path: '', component: WelcomePageComponent },  // Default route
    { path: 'login', component: LoginComponent },
    { path: 'user/home', component: UserHomePageComponent },
    { path: 'valet/home', component: LoginComponent },
    { path: 'valet/info', component: ValetinfopageComponent },
    { path: '**', redirectTo: '' }  // Redirect unknown routes to WelcomePageComponent
];
