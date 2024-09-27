import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

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
  ) { }

  ngOnInit() {
    
  }

  ionViewWillEnter () {

  }

  onHeaderButtonClick (num: number) {

  }

  onMainButtonClick (num: number) {

  }

  onLogoutClick () {
    this.authService.logout();
    this.router.navigateByUrl('/auth');
  }
}
