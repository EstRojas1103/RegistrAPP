import { Component, OnInit } from '@angular/core';
import { Html5QrcodeScanner, Html5QrcodeSupportedFormats } from 'html5-qrcode';
import Swal from 'sweetalert2';
import { NavController } from '@ionic/angular';

@Component({
  selector: 'app-estudiante-home',
  templateUrl: './estudiante-home.page.html',
  styleUrls: ['./estudiante-home.page.scss'],
})
export class EstudianteHomePage implements OnInit {
  attendanceConfirmed: boolean = false;
  scanTimestamp: string = ''; // Almacena la fecha y hora del escaneo

  constructor(private navCtrl: NavController) {}

  ngOnInit() {
    this.startScanner();
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
        this.navCtrl.navigateRoot('/login');
      }
    });
  }

  startScanner() {
    const html5QrCode = new Html5QrcodeScanner("qr-reader", {
      fps: 10,
      qrbox: 250,
      supportedScanTypes: [Html5QrcodeSupportedFormats.QR_CODE],
    });

    html5QrCode.render(
      (decodedText: string) => {
        const now = new Date();
        this.scanTimestamp = now.toLocaleString(); // Guarda la fecha y hora en un formato legible
        this.attendanceConfirmed = true; // Muestra mensaje de confirmación
        html5QrCode.clear(); // Detiene el escáner después de escanear
        this.confirmAttendance(decodedText); // Llama a la confirmación de asistencia
      },
      (errorMessage: string) => {
        console.error("Error al escanear:", errorMessage);
      }
    );
  }

  confirmAttendance(sessionId: string) {
    Swal.fire({
      title: 'Asistencia Registrada',
      text: `Tu asistencia a la sesión ${sessionId} ha sido registrada el ${this.scanTimestamp}.`,
      icon: 'success',
      confirmButtonText: 'Aceptar',
      customClass: {
        popup: 'custom-swal-popup',
      },
      width: '400px',
      position: 'center',
      backdrop: true,
      allowOutsideClick: false,
    });
  }
}
