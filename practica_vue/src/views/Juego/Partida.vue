<template>
<section  class="partida">
    <h1 class="tituloJuego">{{$route.params.no_partida.replace('-',' ')}}</h1>
      <div class="justify-center">
        <button class="btn btn-info " @click="crearPartida">Nueva Partida</button>
      </div>
      <div class="row">
        <div class="col">
          <div  v-if="!partida && !user">
              Cargando
          </div>
        </div>
      </div>
      <div v-if="partida && user">

      </div>
    <div class="row tableroJuego">

      <div class="col col-md-5 tablero ">
          <juego  @opcion="partida.participantes[0] === user.uid?getOpcion:''"
            :userOpcion="(partida.participantes[0] === this.user.uid) ? partida.usuario_1:''"
            :displayName="!user.displayName?partida.name[0]!== user.displayName?partida.name[0]:'':user.displayName"></juego>
      </div>
      <div class="col col-md-2">
        <!--&& user.uid!=partida.participantes[0]" -->
        <button  v-if="!partida.name[1]"  class="btn" @click="retar">💰</button>
      </div>
      <div class="col col-md-5">
        <juego @opcion="partida.participantes[1] === user.uid?getOpcion:''" :displayName="!partida.name[1]?'Esperando Retador':partida.name[1]" :userOpcion="(partida.participantes[1] === this.user.uid) ? partida.usuario_2 :''" ></juego>
      </div>
    </div>
    {{partida}}
  </section>
</template>
<script lang="js">
import Juego from '@/components/Juego/Juego'
import fireApp from '../../config/_firebase.js'
import Auth from '@/config/auth'

const partida = fireApp.firestore().collection('juego-1')
export default {
  name: 'Partida',
  props: ['usuario_opcion'],
  components: {
    Juego
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
  data () {
    return {
      partida: {},
      partidas: [],
      user: {}
    }
  },
  firestore: {
    partidas: fireApp.firestore().collection('juego-1')
  },
  // Helper para asignar objetos o variables que necesitan ser detectados en sus cambios para ejecutar metodos
  watch: {
    '$route.params': {
      deep: true,
      immediate: true,
      handler (value) {
        this.user = Auth.getUser()
        this.$bind('partida', partida.doc(value.no_partida))
      }
    }
  },
  mounted () {
    // this.user = Auth.getUser()
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
      fireApp.firestore().collection('juego-1').add({
        participantes: [uid],
        name: [this.user.displayName == null ? 'Usuario' : this.user.displayName],
        'usuario_1': ' ',
        'usuario_2': ' ',
        'ganador': ' '
      })
    },
    // Cargar los datos de la partifda del firestore
    obtenerPartida () {
      fireApp.firestore().collection('juego-1').doc(this.partida).get().then((result) => {
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
      fireApp.firestore().collection('juego-1').doc(this.$route.params.no_partida).update(this.partida)
    },
    getOpcion (opcion) {
      let participantes = this.partida.participantes

      console.log(participantes.indexOf(this.user.uid))
      let data = {}
      if (participantes.indexOf(this.user.uid) === 0) {
        data = {
          'usuario_1': opcion
        }
      } else {
        data = {
          'usuario_2': opcion
        }
      }

      fireApp.firestore().collection('juego-1').doc(this.$route.params.no_partida).update(data).then((result) => {
        switch (opcion.usuario_1) {
          case 'piedra':
            switch (opcion.usuario_2) {
              case 'piedra':
                console.log('empate')
                break
              case 'papel':
                console.log('perder')
                break
              case 'tijeras':
                console.log('ganar')
                break
            }
            break
          case 'papel':
            switch (this.usuario_2) {
              case 'piedra':
                console.log('ganar')
                break
              case 'papel':
                console.log('empate')
                break
              case 'tijeras':
                console.log('perder')
                break
            }
            break
          case 'tijeras':
            switch (this.usuario_2) {
              case 'piedra':
                console.log('perder')
                break
              case 'papel':
                console.log('ganar')
                break
              case 'tijeras':
                console.log('empate')
                break
            }
            break
        }
      })
    },
    ganar () {
      switch (this.usuario_1) {
        case 'piedra':
          switch (this.usuario_2) {
            case 'piedra':
              console.log('empate')
              break
            case 'papel':
              console.log('perder')
              break
            case 'tijeras':
              console.log('ganar')
              break
          }
          break
        case 'papel':
          switch (this.usuario_2) {
            case 'piedra':
              console.log('ganar')
              break
            case 'papel':
              console.log('empate')
              break
            case 'tijeras':
              console.log('perder')
              break
          }
          break
        case 'tijeras':
          switch (this.usuario_2) {
            case 'piedra':
              console.log('perder')
              break
            case 'papel':
              console.log('ganar')
              break
            case 'tijeras':
              console.log('empate')
              break
          }
          break
      }
    }
  }
}
</script>
<style lang="scss">
  .partida{
    background-color: rgba(34, 185, 160, 0.575);
    padding: 50px;
  }
.tituloJuego{
  color: #fff;;
}
.tableroJuego{
  padding: 50px;;
}
</style>
