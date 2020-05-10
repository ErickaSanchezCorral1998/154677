<template >
  <!--Container nos da un ancho maximo de 1140px-->
  <div :style="{'background-color':'#fefcfd', 'background-size': 'cover', 'height':'88.7vh'}">
    <div class="container">
      <div
        class="card"
        style="border-color: #ffebeb"
      >
        <div class="row">
      <div class="col-4-lg col-12-md col-12-xs datos">
        <div class="infoUsuario">
              <img  class="profilePhoto mx-auto rounded-circle" :src="user.photo"/><br>

          <label class="mx-auto usuarioNombre">{{user.nombre}}</label>
          <br>
          <br>
          <button class="btn btn-edit" @click="Perfil"> <img src="@/assets/portfolio.png" width="40px"> Editar perfil</button>
          <br>
          <br>
          <button class="btn btn-logout" @click="logout">Log Out</button>
          </div>
      </div>
      <div class="col columnaDer">
        <div class="row">
          <div class="col"></div>
          <div class="col-3-lg col-6-md col-6-sm">
            <button
            class="btn btn-pink btn-block"
            @click="crearPartida"
          >Create new game</button>
          </div>
        </div>

        <div class="tab-main mx-auto columnaDer">
            <input id="tab1" type="radio" name="tabs" checked>
            <label for="tab1">Partidas propias</label>
            <input id="tab2" type="radio" name="tabs" >
            <label for="tab2">Partidas disponibles</label>
            <section id="content1">
              <PartidasDisponibles></PartidasDisponibles>
               <Partida></Partida>
            </section>
            <section id="content2">
              <label>asdasd</label>
            </section>
        </div>

      </div>
      </div>
      </div>
    </div>
  </div>
</template>

<script lang="js">
import Auth from '@/config/auth.js'
import Firebase from '@/config/_firebase.js'
import PartidasDisponibles from '@/components/Juego/PartidasDisponibles'
import Partida from '@/views/Juego/Partida'
const partida = Firebase.firestore().collection('juego-1')
export default {
  name: 'partidas',
  components: {
    PartidasDisponibles,
    Partida
  },
  beforeRouteEnter (to, from, next) {
    next(async vm => {
      // vm.obtenerPartida(to.params.no_partida)
      // vm.user = await Auth.getUser()
      vm.$bind('user', Auth.getUser())
      vm.user = vm.obtenerUser()
      vm.$bind('partida', partida.doc(to.params.no_partida))
    })
  },
  data () { // Variables y metodos(funciones que vamos  a utilizar)
    return {
      showError: false,
      errorMessage: '',
      errorCode: '',
      user: {
        nombre: '',
        photo: ''
      }
    }
  },
  mounted () {
    let userC = Firebase.auth().currentUser
    this.user.nombre = userC.displayName
    this.user.photo = userC.photoURL
  },
  methods: {
    Perfil () {
      this.$router.push({ name: 'profile' })
    },
    logout () {
      return Auth.logOut()
    },
    async obtenerUser () {
      this.user = await Auth.getUser()
    },
    // metodo para generar nueva partida
    crearPartida () {
      this.user = Auth.getUser()
      let uid = this.user.uid
      // Escribe en la base de datos
      Firebase.firestore().collection('juego-1').add({
        participantes: [uid],
        name: [this.user.displayName == null ? 'Usuario' : this.user.displayName],
        'usuario_1': ' ',
        'usuario_2': ' ',
        'ganador': ' '
      })
      this.$router.push({ name: 'juego-1/:no_partida' })
    }
  }
}
</script>
<style lang="scss">
.datos{
  background-color: #eb7b7e;
  border-radius: 5px;
}
.columnaDer{
  color: #FDCDD0;
}
.profilePhoto{
  margin: 40px;
  width: 40%;
}
.usuarioNombre{
  color: #fff;
  font-size:50px;
}
.btn.btn-edit{
  border: #fff solid 3px;
  color: #ffffff;
  &:hover{
    background-color: #fdcdd0;
    color: #eb7b7e;
  }
}
.btn.btn-logout{
  border: #fff solid 3px;
  color: #ffffff;
  &:hover{
    background-color: #fdcdd0;
    color: #eb7b7e;
  }
}
.infoUsuario{
  border: #fff solid 4px;
  margin: 10px;
  padding: 15px;
}
@media (max-width: 576px) {
  .profilePhoto {
    width: 50%;
  }
}
@media (max-width: 768px) {
 .profilePhoto {
    width: 50%;
  }
}
.tab-main section {
    display: none;
    padding: 2em 0 0;
    border-top: 1px solid #abc;
}
.tab-main section{
  margin: 40px;
  width: 90%;
}
.tab-main input {
    display: none;
}

.tab-main label {
    display: inline-block;
    margin: 0 0 -1px;
    width: 32.8%;
    text-align: left;
    color: #CD787D;
    padding: 0.2em 0em;
    letter-spacing: 1px;
    background: bottom;
    font-size: 20px;
    border-left: 4px solid transparent;
    font-weight: 600;
    text-transform: uppercase;
}

.tab-main label:before {
    font-family: fontawesome;
    font-weight: normal;
    margin-right: 10px;
    opacity: 0;
}

.tab-main label:hover {
    cursor: pointer;
}

.tab-main input:checked + label {
    border-bottom: 1px solid #fff;
    color: #FF6C70;
    border-bottom: 2px solid;
    background: #f8f9fa;
    font-size: 20px;
    padding: 0.2em 0em;
    font-weight: 600;
    text-transform: uppercase;
}

.tab-main #tab1:checked ~ #content1,
.tab-main #tab2:checked ~ #content2 {
    display: block;
}
</style>
