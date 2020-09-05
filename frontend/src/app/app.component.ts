import { Component } from '@angular/core';
import { ApiService} from './api.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'Angular Crud Operations And Authentication';
  navbarOpen = false;
  settingsOpen = false;
  constructor(   
    private router : Router,  
    private authService : ApiService ) { }
  ngOnInit() {}

  get isLoggedIn() { return this.authService.isLoggedIn(); }

  logout() {  
    this.authService.logout();  
    this.router.navigate(['/login']);  
  }  
  toggleNavbar() {
    this.navbarOpen = !this.navbarOpen;
  }
  toggleSettings() {
    this.settingsOpen = !this.settingsOpen;
  }

}
