// Importa las funciones necesarias desde el SDK de Firebase
const { initializeApp } = require("firebase/app");
const { getAuth, createUserWithEmailAndPassword } = require("firebase/auth");
const Swal = require("sweetalert2");

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
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

// Función para crear cuentas
async function crearCuenta(email, password, role) {
    try {
        const userCredential = await createUserWithEmailAndPassword(auth, email, password);
        const user = userCredential.user;
        console.log(`Cuenta creada exitosamente para ${role} con email: ${email}`);
        
        // Muestra un mensaje de éxito
        Swal.fire({
            title: 'Cuenta Creada',
            text: `La cuenta de ${role} ha sido creada exitosamente.`,
            icon: 'success',
            confirmButtonText: 'Aceptar',
        });
    } catch (error) {
        console.error("Error al crear cuenta:", error.message);

        // Muestra un mensaje de error si la creación falla
        Swal.fire({
            title: 'Error',
            text: `No se pudo crear la cuenta: ${error.message}`,
            icon: 'error',
            confirmButtonText: 'Aceptar',
        });
    }
}

// Ejemplos de uso
crearCuenta('profesor@profesorduoc.cl', 'passwordSeguro', 'profesor');
crearCuenta('estudiante@duocuc.cl', 'passwordSeguro', 'estudiante');
