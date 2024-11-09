import { Component } from '@angular/core';
import * as QRCode from 'qrcode';
import { NavController } from '@ionic/angular';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-profesor-home',
  templateUrl: './profesor-home.page.html',
  styleUrls: ['./profesor-home.page.scss'],
})
export class ProfesorHomePage {
  sessionId: string = '';
  generatedQRCode: string = '';

  constructor(private navCtrl: NavController) {}

  async generateQRCode() {
    // Generar un sessionId único si no está configurado
    if (!this.sessionId) {
      this.sessionId = 'session_' + new Date().getTime();
    }

    try {
      // Genera el código QR a partir del sessionId
      this.generatedQRCode = await QRCode.toDataURL(this.sessionId, { width: 256 });
    } catch (err) {
      console.error("Error al generar el QR:", err);
    }
  }

  confirmLogout() {
    Swal.fire({
      title: '¿Estás seguro de que deseas salir?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Sí, salir',
      cancelButtonText: 'No',
      reverseButtons: true,
    }).then((result) => {
      if (result.isConfirmed) {
        this.navCtrl.navigateRoot('/login'); // Redirige a la página de login
      }
    });
  }
}
