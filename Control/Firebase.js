import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';
import 'firebase/compat/storage';
import 'firebase/compat/database'; // Asegúrate de importar database

const settings = { timestampsInSnapshots: true, merge: true };
const config = {
    apiKey: "AIzaSyBds5QXl55ETFCkVkro_tE2hR0eg3GEsP8",
    authDomain: "control-alumnos-7be34.firebaseapp.com",
    databaseURL: "https://control-alumnos-7be34-default-rtdb.firebaseio.com",
    projectId: "control-alumnos-7be34",
    storageBucket: "control-alumnos-7be34.appspot.com",
    messagingSenderId: "270025882154",
    appId: "1:270025882154:web:d5bba9d1c90b8546f02153",
    measurementId: "G-H05SNNKT0Y"
};

if (!firebase.apps.length) {
    firebase.initializeApp(config);
}

firebase.firestore().settings(settings);

const conexion = firebase.firestore();
const auth = firebase.auth();
const storage = firebase.storage();
const database = firebase.database(); // Inicializa el objeto database

export { firebase, conexion, auth, storage, database }; // Asegúrate de exportar database
