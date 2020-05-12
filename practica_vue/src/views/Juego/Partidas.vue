<template >
    <div class="container">
      <div>
      <div class="row">
      <div class="col-lg-5 left">
        <div class="contenedor">
          <div class="new"></div>
          <button class="btn btn-create" @click="crearPartida">NEW GAME</button>
          <button class="btn btn-create" @click="$router.push({name:'partidas',params:{no_partida:this.hola.holasad}}).catch(err => {})">Ver</button>
          </div>
      </div>
        <div class="col-lg-7 mt pt" style="background-color:#000; min-height:400px;">
          <ProfileFormMain></ProfileFormMain>
          <Partida class="mt" style="background-color:transparent"></Partida>
      </div>
      </div>
    </div>
    </div>
</template>

<script lang="js">
import Auth from '@/config/auth.js'
import ProfileFormMain from '@/components/ProfileFormMain'
import Firebase from '@/config/_firebase.js'
import collect from 'collect.js'
import Partida from '@/views/Juego/Partida'
const partidas = Firebase.firestore().collection('juego-1')

export default {
  name: 'partidas',
  data () {
    return {
      hola: {
        holasad: '8WPqZ9bhB8eR3d2XKOIb'
      } }
  },
  components: {
    Partida,
    ProfileFormMain
  },
  beforeCreate: function () {
    document.body.className = 'main'
  },
  mounted () {
    this.user = Auth.getUser()
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
  methods: {

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
@import "./../../components/recursos/css/profilemain.css";
</style>
