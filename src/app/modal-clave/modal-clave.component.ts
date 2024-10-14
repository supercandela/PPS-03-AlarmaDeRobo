import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ModalController } from '@ionic/angular';
import { IonicModule } from '@ionic/angular';

@Component({
  selector: 'app-modal-clave',
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule],
  templateUrl: './modal-clave.component.html',
  styleUrls: ['./modal-clave.component.scss'],
})
export class ModalClaveComponent {
  clave: string = '';

  constructor(private modalCtrl: ModalController) {}

  cerrarModal() {
    this.modalCtrl.dismiss();
  }

  guardarClave() {
    console.log('Clave ingresada:', this.clave);
    // Puedes hacer algo con la clave, como enviarla a un servicio
    this.modalCtrl.dismiss(this.clave); // Cierra el modal y pasa la clave de vuelta
  }
}
