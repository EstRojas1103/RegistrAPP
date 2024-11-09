import { bootstrapApplication } from '@angular/platform-browser';
import { RouteReuseStrategy, provideRouter, withPreloading, PreloadAllModules } from '@angular/router';
import { IonicRouteStrategy, provideIonicAngular } from '@ionic/angular/standalone';

import { routes } from './app/app.routes';
import { AppComponent } from './app/app.component';

// Importar las funciones necesarias de Firebase
import { initializeApp } from 'firebase/app';

// Configuración de Firebase
const firebaseConfig = {
  apiKey: "AIzaSyDlunm4rDdVzL84x5p-Ac29Rp3P7Id6OUM",
  authDomain: "registrapp-c4e98.firebaseapp.com",
  projectId: "registrapp-c4e98",
  storageBucket: "registrapp-c4e98.appspot.com",
  messagingSenderId: "644850635167",
  appId: "1:644850635167:web:baef9f183f53bbc6092daa",
  measurementId: "G-VL3LKTLR34"
};

// Inicializar Firebase
initializeApp(firebaseConfig);

bootstrapApplication(AppComponent, {
  providers: [
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy },
    provideIonicAngular(),
    provideRouter(routes, withPreloading(PreloadAllModules)),
  ],
});
