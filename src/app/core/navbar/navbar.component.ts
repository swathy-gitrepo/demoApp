import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/features/auth/services/auth.service';
import { User } from 'src/app/features/contacts/Models/user';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent{
  userLoggedIn : boolean  = false;
  constructor(private authService: AuthService,
    private router: Router) {
      this.authService.userLoggedIn$.subscribe((loggedIn) => {
        this.userLoggedIn = loggedIn;
      });
  }

  onLogout(): void {
    this.authService.logout();
    this.router.navigateByUrl('/login');
  }
}
