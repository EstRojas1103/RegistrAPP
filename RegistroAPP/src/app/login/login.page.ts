import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NavController } from '@ionic/angular';
import Swal from 'sweetalert2';
import { getAuth, signInWithEmailAndPassword } from 'firebase/auth';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  loginForm!: FormGroup;

  constructor(
    private fb: FormBuilder,
    private navCtrl: NavController
  ) {}

  ngOnInit() {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
    });
  }

  onLogin() {
    if (this.loginForm.valid) {
      const email = this.loginForm.get('email')?.value;
      const password = this.loginForm.get('password')?.value;

      console.log("Datos ingresados:", email, password);

      const auth = getAuth();
      signInWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
          const user = userCredential.user;

          if (email.endsWith('@profesorduoc.cl')) {
            this.showSuccessAlert('Inicio Exitoso', 'Bienvenido, Docente');
            this.navCtrl.navigateForward('/profesor-home');
          } else if (email.endsWith('@duocuc.cl')) {
            this.showSuccessAlert('Inicio Exitoso', 'Bienvenido, Estudiante');
            this.navCtrl.navigateForward('/estudiante-home');
          } else {
            this.showErrorAlert('Error', 'Correo no válido. Utilice un correo institucional.');
          }
        })
        .catch((error) => {
          const errorMessage = error.message;
          this.showErrorAlert('Error', `No se pudo iniciar sesión: ${errorMessage}`);
        });
    }
  }

  showSuccessAlert(title: string, text: string) {
    Swal.fire({
      title,
      text,
      icon: 'success',
      confirmButtonText: 'Aceptar',
      customClass: {
        popup: 'custom-swal-popup',
      },
      width: '400px',
      position: 'center',
      backdrop: `
        rgba(0,0,0,0.4)
      `,
      allowOutsideClick: false,
    });
  }

  showErrorAlert(title: string, text: string) {
    Swal.fire({
      title,
      text,
      icon: 'error',
      confirmButtonText: 'Aceptar',
      customClass: {
        popup: 'custom-swal-popup',
      },
      width: '400px',
      position: 'center',
      backdrop: `
        rgba(0,0,0,0.4)
      `,
      allowOutsideClick: false,
    });
  }
}
