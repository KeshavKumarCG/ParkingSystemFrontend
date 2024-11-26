import { Component } from '@angular/core';
import { RouterOutlet , RouterLink} from '@angular/router';
import { NavbarComponent } from './components/navbar/navbar.component';
import { LoginComponent } from './pages/login/login.component';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms'; 
import { UserHomePageComponent } from './pages/user-home-page/user-home-page.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, RouterLink , NavbarComponent, UserHomePageComponent,LoginComponent, RouterModule,FormsModule ],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'] 
})

export class AppComponent {
  title = 'client';
}
