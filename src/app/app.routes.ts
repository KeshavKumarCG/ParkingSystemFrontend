import { Routes } from '@angular/router';
import { LoginComponent } from './pages/login/login.component';
import { UserHomePageComponent } from './pages/user-home-page/user-home-page.component';
import { ValetinfopageComponent } from './pages/valetinfopage/valetinfopage.component';
import { ValetLandingPageComponent } from './pages/valet-landing-page/valet-landing-page.component';
import { NotificationsComponent } from './pages/notifications/notifications.component';
import { UnauthorisedLoginPageComponent } from './pages/unauthorised-login-page/unauthorised-login-page.component';
import { AuthGuard } from './Services/auth.guard.service';

export const routes: Routes = [
    { path: 'login', component: LoginComponent },
    
    { path: 'user/home/:id', component: UserHomePageComponent, canActivate: [AuthGuard], data: { role: 'User' } },
    { path: 'valet/home/:id', component: ValetLandingPageComponent, canActivate: [AuthGuard], data: { role: 'Valet' } },
    { path: 'valet/info', component: ValetinfopageComponent, canActivate: [AuthGuard], data: { role: 'User' } },
    { path: 'valet/notifications', component: NotificationsComponent, canActivate: [AuthGuard], data: { role: 'Valet' } },
    
   
    { path: '**', component: UnauthorisedLoginPageComponent }
];
