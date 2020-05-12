<template>
<section >
  <img
      class="logoflotante"
      src="../../assets/KACHIPU-07.png"
    >
    <div class="logogame">
      <ProfileFormMain></ProfileFormMain>
      <img
        class="logogameimg"
        src="../../assets/KACHIPU-12.png"
      >
    </div>
    <div class="p-5">
    <h1 class="tituloJuego">{{$route.params.no_partida.replace('-',' ')}}</h1>
      <div class="row row-fluid">
        <div class="col ml-3">
      <button class="btn btn-new-partidas"  @click="crearPartida">Nueva Partida</button>
      </div>

      <div class="col col-md-2">
        <!--&& user.uid!=partida.participantes[0]" -->
        <button  v-if="!partida.name[1]"  class="btn" @click="retar">💰</button>
      </div>
      <div class="col mr-3">
          <div class="contadores">
            <div v-if="partida.completed">
              <h5> G: {{partida.ganador_nombre}}</h5>
            </div>
          </div>
        </div>
      </div>
<div class="row mr-3">
  <div class="col col-sm-12 col-lg-8 p-2 bg-light">
    <juego  @opcion="getOpcion"
            :userOpcion="partida.usuario_2!=''||(partida.participantes[0] === user.uid) ? partida.usuario_1:(partida.usuario_1 && partida.usuario_2)?partida.usuario_1:''"
            :displayName="!user.displayName?partida.name[0]!== user.displayName?partida.name[0]:'':user.displayName"></juego>
  </div>
<div
          class="col col-sm-12 col-lg-4 p-2"
          style="background-color:black;"
        >
      <juego @opcion="getOpcion"
        :userOpcion="partida.usuario_1!=''||(partida.participantes[1] === user.uid) ? partida.usuario_2:(partida.usuario_1 && partida.usuario_2)?partida.usuario_2:''"
        :displayName="!partida.name[1]?'Esperando Retador':partida.name[1]" ></juego>
</div>
</div>

   <b> {{partida}}</b>
    </div>
  </section>
</template>
<script lang="js">
import Juego from '@/components/Juego/Juego'
import fireApp from '../../config/_firebase.js'
import Auth from '@/config/auth'
import collect from 'collect.js'
const partidas = fireApp.firestore().collection('juego-1')
export default {
  name: 'Partida',
  props: ['usuario_opcion'],
  components: {
    Juego
  },
  beforeCreate: function () {
    document.body.className = 'game'
  },
  beforeRouteEnter (to, from, next) {
    // next(async vm => {
    next(vm => {
      /* vm.obtenerPartida(to.params.no_partida)
      // vm.user = await Auth.getUser()
      vm.$bind('user', Auth.getUser())
      vm.user = vm.obtenerUser()
      vm.$bind('partida', partida.doc(to.params.no_partida)) */
      // vm.user = Auth.getUser()
      vm.$bind('partida', partidas.doc(to.params.no_partida))
    })
  },
  beforeRouteUpdate (to, from, next) {
    this.$bind('partida', partidas.doc(to.params.no_partida))
    next()
  },
  data () {
    return {
      partida: {},
      // partidas: [],
      user: {},
      collect
    }
  },
  /*
  firestore: {
    // partidas: fireApp.firestore().collection('juego-1')
    partidas: fireApp.firestore().collection('juego-1')

  }, */
  // Helper para asignar objetos o variables que necesitan ser detectados en sus cambios para ejecutar metodos
  watch: {
    '$route.params': {
      deep: true,
      immediate: true,
      handler (value) {
        this.user = Auth.getUser()
        this.$bind('partida', partidas.doc(value.no_partida))
      }
    }
  },
  mounted () {
    this.user = Auth.getUser()
  }, /*,  updated (opcion) {
    let participantes = this.partida.participantes
    if (((participantes.indexOf(this.user.uid) === 0) && opcion) === 'tijeras') {
      if (((participantes.indexOf(this.user.uid) === 0) && opcion) === 'tijeras') {
        console.log('as')
      }
    }
  }, */

  methods: {
    async obtenerUser () {
      this.user = await Auth.getUser()
    },
    // metodo para generar nueva partida
    crearPartida () {
      this.user = Auth.getUser()
      let uid = this.user.uid
      // Escribe en la base de datos
      partidas.add({
        participantes: [uid],
        name: [this.user.displayName == null ? 'Usuario 1' : this.user.displayName],
        'usuario_1': '',
        'usuario_2': '',
        'ganador': ' ',
        completed: false
      })
    },
    // Cargar los datos de la partifda del firestore
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
    retar () {
      this.user = Auth.getUser()
      // eslint-disable-next-line no-unused-vars
      let uid = this.user.uid
      // Escribe en la base de datos
      this.partida.name.push(this.user.displayName == null ? 'Usuario' : this.user.displayName)
      this.partida.participantes.push(this.user.uid)
      partidas.doc(this.$route.params.no_partida).update(this.partida)
    },
    getOpcion (opcion) {
      let participantes = this.partida.participantes
      console.log(participantes.indexOf(this.user.uid))
      let data = {}
      if (!this.partida.completed) {
        if (participantes.indexOf(this.user.uid) === 0) {
          data = {
            'usuario_1': opcion
          }
        } else {
          data = {
            'usuario_2': opcion
          }
        }
      }
      console.log('Hola', this.partida.usuario_1)
      partidas.doc(this.$route.params.no_partida).update(data).then((result) => {
        if (this.partida.usuario_1 !== '' && this.partida.usuario_2 !== '') {
          this.ganar()
        }
      }).catch((err) => {
        console.log(err)
      })
    },
    ganar () {
      let partida = {
        completed: true,
        ganador: '',
        ganador_nombre: ''
      }
      switch (this.partida.usuario_1) {
        case 'tijeras':
          switch (this.partida.usuario_2) {
            case 'piedra':
              partida.ganador_nombre = this.partida.name[1]
              partida.ganador = this.partida.participantes[1]
              console.log('usuario 1 pierde')
              console.log('usuario 2 gana')
              break
            case 'papel':
              partida.ganador_nombre = this.partida.name[0]
              partida.ganador = this.partida.participantes[0]
              console.log('usuario 1 gano')
              console.log('usuario 2 pierde')
              break
            case 'tijeras':
              partida.ganador_nombre = 'Empate'
              console.log('empatados')
              break
          }
          break
        case 'papel':
          switch (this.partida.usuario_2) {
            case 'piedra':
              partida.ganador_nombre = this.partida.name[0]
              partida.ganador = this.partida.participantes[0]
              console.log('usuario 1 gana')
              console.log('usuario 2 pierde')
              break
            case 'papel':
              console.log('empatados')
              partida.ganador_nombre = 'Empate'
              break
            case 'tijeras':
              partida.ganador_nombre = this.partida.name[1]
              partida.ganador = this.partida.participantes[1]
              console.log('usuario 1 pierde')
              console.log('usuario 2 gana')
              break
          }
          break
        case 'piedra':
          switch (this.partida.usuario_2) {
            case 'piedra':
              partida.ganador_nombre = 'Empate'
              console.log('empatados')
              break
            case 'papel':
              partida.ganador_nombre = this.partida.name[1]
              partida.ganador = this.partida.participantes[1]
              console.log('usuario 1 pierde')
              console.log('usuario 2 gana')
              break
            case 'tijeras':
              partida.ganador_nombre = this.partida.name[0]
              partida.ganador = this.partida.participantes[0]
              console.log('usuario 1 gana')
              console.log('usuario 2 pierde')
              break
          }
          break
        default:
          console.log('sin opcion')
          break
      }
      partidas.doc(this.$route.params.no_partida).update(partida)
    }
  }
}
</script>
<style lang="scss">
@import "./../../components/recursos/css/game.css";
</style>
