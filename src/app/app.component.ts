import { Component } from '@angular/core';
import { RouterOutlet , RouterLink} from '@angular/router';
import { NavbarComponent } from './components/navbar/navbar.component';
import { LoginComponent } from './pages/login/login.component';
import { RouterModule } from '@angular/router';
import { UserHomePageComponent } from './pages/user-home-page/user-home-page.component';
import { WelcomePageComponent } from './pages/welcome-page/welcome-page.component';
import { ValetinfopageComponent } from './pages/valetinfopage/valetinfopage.component';


@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, RouterLink , NavbarComponent, LoginComponent, RouterModule, UserHomePageComponent, WelcomePageComponent , ValetinfopageComponent],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'] // Corrected property name
})

export class AppComponent {
  title = 'client';
}
