<template >
<section>
    <div class="container">
      <div>
      <div class="row">
      <div class="col-lg-5 left">
        <div class="contenedor">
          <div class="new"></div>
          <button class="btn btn-create" @click="crearPartida">NEW GAME</button>
        </div>
        <router-view></router-view>
      </div>
        <div class="col-lg-7 mt pt" style="background-color:#000; min-height:400px;">
          <ProfileFormMain></ProfileFormMain>
          <PartidasDisponibles class="mt" style="background-color:transparent"/>

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
      moment
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
    }
  }
}
</script>
<style lang="scss">
@import "./../../components/recursos/css/profilemain.css";
</style>
