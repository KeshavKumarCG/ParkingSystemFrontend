import { Routes } from '@angular/router';
import { LoginComponent } from './pages/login/login.component';
import { UserHomePageComponent } from './pages/user-home-page/user-home-page.component';
import { WelcomePageComponent } from './pages/welcome-page/welcome-page.component';
import { ValetinfopageComponent } from './pages/valetinfopage/valetinfopage.component';
import { ValetLandingPageComponent } from './pages/valet-landing-page/valet-landing-page.component';
import { NotificationsComponent } from './pages/notifications/notifications.component';
import { UnauthorisedLoginPageComponent } from './pages/unauthorised-login-page/unauthorised-login-page.component';

export const routes: Routes = [
    { path: '', component: WelcomePageComponent },  // Default route
    { path: 'login', component: LoginComponent },
    { path: 'user/home', component: UserHomePageComponent },
    { path: 'valet', component: ValetLandingPageComponent },
    { path: 'valet/info', component: ValetinfopageComponent },
    { path: 'valet/notifications', component: NotificationsComponent },
    { path: 'carstatus', component: UnauthorisedLoginPageComponent },
    { path: '**', redirectTo: '' }  // Redirect unknown routes to WelcomePageComponent
];
