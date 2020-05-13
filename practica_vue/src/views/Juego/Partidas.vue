<template >
<section>
<div class="appMainContenedor">
          <div id="app">
              <button @click="modalAction()">Ver Modal</button>
              <transition name="fade">
              <div v-if="modal" >
                <div  id="appMain">
                  <center>
                  <div class="pop">
                    <div class="pop-up">
                      <div class="trophy">🏆</div>
                      </div>
                      <div class="text">
                      <h3>Ganador:</h3>
                      <button class="btnGanar" @click="modalAction()">OK</button>
      </div>
    </div>
</center>
                </div>
              </div>
              </transition>
          </div>
          </div>
    <div class="container container2">
      <div>
      <div class="row">
      <div class="col-lg-9 left" style="background-color:whitesmoke;">
        <div class="contenedor">
          <div class="">
              <center>
                <!--<Ganador></Ganador>-->
              </center>
<router-view></router-view>
        </div>

      </div>
      <!--juego-->

          </div>

      <div class="col-lg-3">
        <div class="row">
          <div class="col-lg-12 col-sm-12 pt" style="background-color:#fff;">
              <ProfileFormMain></ProfileFormMain>
              <button
                class="btn btn-create"
                @click="crearPartida"
              >NEW GAME</button>
          </div>
          <div class="col-lg-12 col-sm-12" style="background-color:#000; min-height:200px;" >
            <PartidasDisponibles class="mt" style="background-color:transparent"/>
          </div>
        </div>
      </div>
</div>

      </div>
    </div>
    </section>
</template>

<script lang="js">
import Auth from '@/config/auth.js'
import ProfileFormMain from '@/components/ProfileFormMain'
import Firebase from '@/config/_firebase.js'
import moment from 'moment'
// import Partida from '@/views/Juego/Partida'
import PartidasDisponibles from '@/components/Juego/PartidasDisponibles'

export default {
  name: 'partidas',
  data () {
    return {
      moment,
      modal: false
    }
  },
  components: {
    PartidasDisponibles,
    ProfileFormMain
  },
  beforeCreate: function () {
    document.body.className = 'main'
  },
  mounted () {
    this.user = Auth.getUser()
  },
  methods: {

    async obtenerUser () {
      this.user = await Auth.getUser()
    },
    // metodo para generar nueva partida
    crearPartida () {
      this.user = Auth.getUser()
      let uid = this.user.uid
      let now = moment().toDate()
      // Escribe en la base de datos
      Firebase.firestore().collection('juego-1').add({
        participantes: [uid],
        name: [this.user.displayName == null ? 'Usuario 1' : this.user.displayName],
        'usuario_1': ' ',
        'usuario_2': ' ',
        'ganador': ' ',
        created_at: now,
        completed: false
      })
    },
    modalAction () {
      if (this.modal === false) {
        this.modal = true
      } else {
        this.modal = false
      }
    }
  }
}
</script>
<style lang="scss">
@import "./../../components/recursos/css/profilemain.css";
</style>
