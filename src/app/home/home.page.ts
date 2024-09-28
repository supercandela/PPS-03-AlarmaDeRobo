import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { addIcons } from 'ionicons';
import { logoIonic } from 'ionicons/icons';
import { AuthService } from '../auth/auth.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage implements OnInit {

  constructor(
    private authService: AuthService,
    private router: Router
  ) {
    addIcons({ logoIonic });
   }

  ngOnInit() {
    
  }

  onMainButtonClick () {

  }

  onLogoutClick () {
    this.authService.logout();
    this.router.navigateByUrl('/auth');
  }
}
