import { UserRole } from './../auth/user.model';
import { AuthService } from './../auth/auth.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {
  public isUserAdmin = false;

  constructor(private authService: AuthService) {}

  ngOnInit(): void {
    this.isUserAdmin = this.authService.getUserRole() === UserRole.ADMIN;
  }

  onLogout() {
    this.authService.logout();
  }
}
