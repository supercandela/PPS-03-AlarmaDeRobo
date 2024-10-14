import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { addIcons } from 'ionicons';
import { logoIonic } from 'ionicons/icons';
import { AuthService } from '../auth/auth.service';
import { CompartidoService } from '../compartido.service';

import { ModalController } from '@ionic/angular';
import { ModalClaveComponent } from '../modal-clave/modal-clave.component'; // Importa el modal

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage implements OnInit {
  isAlarmaActivada: boolean = false;
  clave: string = '';

  constructor(
    private authService: AuthService,
    private router: Router,
    private compartido: CompartidoService,
    private modalCtrl: ModalController
  ) {
    addIcons({ logoIonic });
   }

  ngOnInit() {
    this.compartido.valor$.subscribe((valor) => {
      this.clave = valor; // Recibir el valor actualizado
    });
  }

  async onMainButtonClick () {
    if (this.isAlarmaActivada) {
      const modal = await this.modalCtrl.create({
        component: ModalClaveComponent,
      });
      await modal.present();
  
      // Recibir el valor de la clave cuando se cierre el modal
      const { data } = await modal.onWillDismiss();
      if (data) {
        if (data === this.clave) {
          this.isAlarmaActivada = !this.isAlarmaActivada;
        } else {
          return;
        }
      }
    } else {
      this.isAlarmaActivada = !this.isAlarmaActivada;
    }
    if (this.isAlarmaActivada) {
      console.log("luces y sonidos");
    }
  }

  onLogoutClick () {
    this.authService.logout();
    this.router.navigateByUrl('/auth');
  }
}