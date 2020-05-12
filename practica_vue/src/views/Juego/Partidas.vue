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
          <button @click="$router.push({name:'partida',params:{no_partida:A6YA43QKhj7zSSB9KVKP}}).catch(err => {})">Hola</button>
              <img  class="profilePhoto mx-auto rounded-circle" :src="user.photo"/><br>

          <label class="mx-auto usuarioNombre">{{user.nombre}}</label>
          <br>
          <br>
          <button class="btn btn-edit" @click="Perfil"> <img src="@/assets/portfolio.png" width="40px"> Editar perfil</button>
          <br>
          <br>
          <button class="btn btn-logout" @click="logout">Log Out</button>
          </div>
          <Partida></Partida>
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
              <ul class="list-group">
                <li  v-for="partida in partidasSel"
              :key="partida.id"
              class="list-group-item ">
                    <div class="row">
                <div class="col">
                  <h3 class="animated infinite pulse">🏆</h3>

                </div>
                <div class="col">
                  <h4 v-if="partida.participantes.includes(user.uid)">⭐</h4>
                </div>
                <div
                  v-if="partida.usuario_1==='' || partida.usuario_2===''"
                  class="col"
                >
                  <h4
                    class="animated infinite pulse"
                    v-if="partida.usuario_1==='' && partida.participantes.indexOf(user.uid) === 0"
                  >⏰</h4>
                  <h4
                    class="animated infinite pulse"
                    v-if="partida.usuario_2==='' && partida.participantes.indexOf(user.uid) === 1"
                  >⏰</h4>
                </div>
                <div
                  v-if="partida.usuario_1===''"
                  class="col"
                >
                  <h4 class="animated infinite pulse">1️⃣</h4>
                </div>
                <div
                  v-if="partida.usuario_2===''"
                  class="col"
                >
                  <h4 class="animated infinite pulse">2️⃣</h4>
                   <strong>Player 1: </strong> {{partida.names[0]}}
              <br>
              <strong>Player 2: </strong> {{partida.names[1]?partida.names[1]:'Sin Retador'}}
                      <div class="btn-group">
                <button
                  class="btn mb-2 btn-outline-info btn-sm animated infinite"
                  :class="partida.names.length===1?'pulse':''"
                  @click="$router.push({name:'partida',params:{no_partida:partida.id}}).catch(err => {})"
                >
                  {{partida.participantes.length===1&&!partida.participantes.includes(user.uid)  ?'Retar':'Ver'}}
                </button>
              </div>
                </div>
              </div>
                </li>
              </ul>

            </section>
            <section id="content2">

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
import collect from 'collect.js'
import Partida from '@/views/Juego/Partida'
const partidas = Firebase.firestore().collection('juego-1')
export default {
  name: 'partidas',
  data () {
    return {
      collect,
      partidasSel: [],
      partidas: [],
      showError: false,
      errorMessage: '',
      errorCode: '',
      user: {
        nombre: '',
        photo: ''
      }
    }
  },
  components: {
    Partida
  },
  firestore: {
    partidas: Firebase.firestore().collection('juego-1')
  },
  watch: {
    partidas: {
      deep: true,
      immediate: true,
      handler: function (part) {
        this.user = Auth.getUser()
        this.$bind('partida', partidas.doc(part.no_partida))
        this.partidasSel = collect(part).sortByDesc('participantes').all()
      }
    }
  },
  beforeRouteEnter (to, from, next) {
    next(async vm => {
      // vm.obtenerPartida(to.params.no_partida)
      // vm.user = await Auth.getUser()
      vm.$bind('user', Auth.getUser())
      vm.user = vm.obtenerUser()
      vm.$bind('partida', partidas.doc(to.params.no_partida))
    })
  },
  mounted () {
    this.user = Auth.getUser()
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
        name: [this.user.displayName == null ? 'Usuario 1' : this.user.displayName],
        'usuario_1': ' ',
        'usuario_2': ' ',
        'ganador': ' ',
        completed: false
      })
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
