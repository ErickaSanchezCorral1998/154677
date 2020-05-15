<template >
<section>
    <div class="container container3">
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
<!--{{partida}}-->
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
const partidas = Firebase.firestore().collection('juego-1')
export default {
  name: 'partidas',
  data () {
    return {
      moment,
      partida: {},
      partidas: [],
      partidasDisponibles: [],
      partidasPropias: [],
      user: {}
    }
  },
  components: {
    PartidasDisponibles,
    ProfileFormMain
  },
  beforeCreate: function () {
    document.body.className = 'main'
  },
  beforeRouteEnter (to, from, next) {
    // next(async vm => {
    next(vm => {
      vm.user = Auth.getUser()
      vm.obtenerPartida(to.params.no_partida)
      /* vm.obtenerPartida(to.params.no_partida)
      // vm.user = await Auth.getUser()
      vm.$bind('user', Auth.getUser())
      vm.user = vm.obtenerUser()
      vm.$bind('partida', partida.doc(to.params.no_partida)) */
      // vm.user = Auth.getUser()
      vm.partidas = []
      vm.$bind('partidas', partidas.doc(to.params.no_partida))
    })
  },
  beforeRouteUpdate (to, from, next) {
    this.$bind('partida', partidas.doc(to.params.no_partida))
    next()
  },
  mounted () {
    this.user = Auth.getUser()
  },
  firestore: {
    partida: (partidas.where('contricante', '==', ''))
  },
  watch: {
    '$route.params': {
      deep: true,
      immediate: true,
      handler (value) {
        this.user = Auth.getUser()
        this.coleccionDePartidas = []
        this.$bind('partidasDisponilbes', partidas.where('completed', '==', false))
        this.$bind('partida', partidas.doc(value.no_partida))
      }
    }
  },
  methods: {
    async obtenerUser () {
      this.user = await Auth.getUser()
    },
    obtenerPartida (partida) {
      /* fireApp.firestore().collection('juego-1').doc(this.partida).get().then((result) => {
        console.log(result.data())
      })
      fireApp.firestore().collection('juego-1').where('participantes', '==', this.user.uid).get().then((result) => {
        console.log('Hay partidas')
      }) */
      partidas.doc(partida).get().then((result) => {
        console.log(result.data())
      })
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
        'usuario_1': '',
        'usuario_2': '',
        'ganador': ' ',
        contrincante: '',
        retador: uid,
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
