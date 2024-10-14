import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CompartidoService {

  private clave = new BehaviorSubject<string>(''); // Valor inicial vacío
  valor$ = this.clave.asObservable(); // Observable que los componentes pueden suscribirse

  setValor(valor: string) {
    this.clave.next(valor); // Actualiza el valor
  }
}
