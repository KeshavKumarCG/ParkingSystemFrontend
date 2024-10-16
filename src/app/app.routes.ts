import { Routes } from '@angular/router';
import { LoginComponent } from './pages/login/login.component';
import { UserHomePageComponent } from './pages/user-home-page/user-home-page.component';
import { ValetinfopageComponent } from './pages/valetinfopage/valetinfopage.component';
import { ValetLandingPageComponent } from './pages/valet-landing-page/valet-landing-page.component';
import { NotificationsComponent } from './pages/notifications/notifications.component';
import { UnauthorisedLoginPageComponent } from './pages/unauthorised-login-page/unauthorised-login-page.component';

// Import AuthGuard
import { AuthGuard } from './Services/auth.guard.service';

export const routes: Routes = [
    { path: 'login', component: LoginComponent },
    
    // Protect these routes with AuthGuard
    { path: 'user/home', component: UserHomePageComponent, canActivate: [AuthGuard], data: { role: 'User' } },
    { path: 'valet/home', component: ValetLandingPageComponent, canActivate: [AuthGuard], data: { role: 'Valet' } },
    { path: 'valet/info', component: ValetinfopageComponent, canActivate: [AuthGuard], data: { role: 'Valet' } },
    { path: 'valet/notifications', component: NotificationsComponent, canActivate: [AuthGuard], data: { role: 'Valet' } },
    
    // Unprotected routes
    { path: 'carstatus', component: UnauthorisedLoginPageComponent },
    { path: '', redirectTo: 'login', pathMatch: 'full' },
    { path: '**', redirectTo: '' }  // Redirect unknown routes to WelcomePageComponent
];
