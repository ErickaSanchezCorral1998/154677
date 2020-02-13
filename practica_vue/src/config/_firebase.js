// Imprtacion libreria
import * as firebase from 'firebase'
const firebaseConfig = {
  apiKey: 'AIzaSyC_RH0DTS9urofOeGMvqY8n5vLjDFdaFYE',
  authDomain: 'integral-web-bea5e.firebaseapp.com',
  databaseURL: 'https://integral-web-bea5e.firebaseio.com',
  projectId: 'integral-web-bea5e',
  storageBucket: 'integral-web-bea5e.appspot.com',
  messagingSenderId: '795381493023',
  appId: '1:795381493023:web:8a05e288fb92c3b59c142a'
}
// Configurar libreria
var fireApp = firebase.initializeApp(firebaseConfig)
// Para reutilizar la configuracion en las diferentes integraciones
export default fireApp
