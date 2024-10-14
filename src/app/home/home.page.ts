import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { addIcons } from 'ionicons';
import { logoIonic } from 'ionicons/icons';
import { AuthService } from '../auth/auth.service';
import { CompartidoService } from '../compartido.service';

import { ModalController, Platform } from '@ionic/angular';
import { ModalClaveComponent } from '../modal-clave/modal-clave.component'; // Importa el modal

import {
  DeviceMotion,
  DeviceMotionAccelerationData,
} from '@awesome-cordova-plugins/device-motion/ngx';
import { Flashlight } from '@awesome-cordova-plugins/flashlight/ngx';

import { Vibration } from '@awesome-cordova-plugins/vibration/ngx';

import { Subscription } from 'rxjs';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage implements OnInit, OnDestroy {
  isAlarmaActivada: boolean = false;
  clave: string = '';
  sub?: Subscription;
  subCompartido?: Subscription;
  audio: HTMLAudioElement | null = null; // Variable para almacenar el sonido actual

  constructor(
    private authService: AuthService,
    private router: Router,
    private compartido: CompartidoService,
    private modalCtrl: ModalController,
    private deviceMotion: DeviceMotion,
    private platform: Platform,
    private flashlight: Flashlight,
    private vibration: Vibration
  ) {
    addIcons({ logoIonic });
  }

  ngOnInit() {
    this.subCompartido = this.compartido.valor$.subscribe((valor) => {
      this.clave = valor; // Recibir el valor actualizado
    });
    this.platform.ready().then(() => {
      // Código para usar después de que la plataforma esté lista
    });
  }

  async onMainButtonClick() {
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
          this.detenerSonido();
          this.sub?.unsubscribe();
          this.flashlight.switchOff();
        } else {
          this.reproducirSonido('clave');
          this.flashlight.switchOn();
          this.vibration.vibrate(5000); // Vibrar durante 5 segundo
          setTimeout(() => {
            this.flashlight.switchOff();
          }, 5000);
          return;
        }
      }
    } else {
      this.isAlarmaActivada = !this.isAlarmaActivada;
    }
    if (this.isAlarmaActivada) {
      console.log('luces y sonidos');
      this.startMonitoring();
    }
  }

  onLogoutClick() {
    this.authService.logout();
    this.router.navigateByUrl('/auth');
  }

  startMonitoring() {
    // Monitorea los movimientos del dispositivo
    this.sub = this.deviceMotion
      .watchAcceleration({ frequency: 500 })
      .subscribe((acceleration: DeviceMotionAccelerationData) => {
        const { x, y, z } = acceleration;

        console.log('X: ' + x);
        console.log('Y: ' + y);
        console.log('Z: ' + z);

        // Lógica para detectar inclinaciones y reproducir sonidos
        if (x > 5) {
          // Girando hacia la derecha
          this.reproducirSonido('derecha');
          this.vibration.vibrate(5000); // Vibrar durante 5 segundo
        } else if (x < -5) {
          // Girando hacia la izquierda
          this.reproducirSonido('izquierda');
          this.vibration.vibrate(5000); // Vibrar durante 5 segundo
        } else if (y > 5) {
          // Girando hacia adelante (vertical hacia arriba)
          this.reproducirSonido('frontal');
          this.flashlight.switchOn();
          setTimeout(() => {
            this.flashlight.switchOff();
          }, 5000);
        } else if (y < -5) {
          // Girando hacia atrás (vertical hacia abajo)
          this.reproducirSonido('frontal');
        } else if (z > 5) {
          // Colocando el dispositivo con la pantalla hacia arriba
          // this.reproducirSonido('izquierda');
          console.log('sin sonido');
        } else if (z < -5) {
          // Colocando el dispositivo con la pantalla hacia abajo
          this.reproducirSonido('izquierda');
        }
      });
  }

  // Método para reproducir sonido
  reproducirSonido(sonido: string) {
    const rutaSonido = this.obtenerRutaSonido(sonido);

    if (this.audio) {
      this.detenerSonido();
    }
    this.audio = new Audio(rutaSonido);
    this.audio.play();
  }

  // Método para detener el sonido
  detenerSonido() {
    if (this.audio) {
      this.audio.pause(); // Pausa el audio
      this.audio.currentTime = 0; // Reinicia el audio desde el principio
      this.audio = null; // Limpia la referencia
    }
  }

  obtenerRutaSonido(sonido: string) {
    return `'../../assets/sounds/alarma-${sonido}.mp3`;
  }

  ngOnDestroy() {
    this.sub?.unsubscribe();
    this.subCompartido?.unsubscribe();
  }
}
