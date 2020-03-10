<template>
<section class="partida">
    <h1 class="tituloJuego">{{$route.params.no_partida.replace('-', ' ')}}</h1>
    <div class="row tableroJuego">
      <div class="justify-center">
    <button class="btn btn-info " @click="crearPartida">Nueva Partida</button>
  </div>
      <div class="col col-md-6 tablero ">
          <juego @opcion="getOpcion" :userOpcion="partida.usuario_1"></juego>
      </div>
      <div class="col col-md-6">
        <juego :userOpcion="partida.usuario_1!=' '?partida.usuario_2:' '" ></juego>
      </div>
    </div>
    {{partida}}
  </section>
</template>
<script lang="js">
import Juego from '@/components/Juego/Juego'
import fireApp from '../../config/_firebase.js'
const partida = fireApp.firestore().collection('juego-1')
export default {
  name: 'Partida',
  components: {
    Juego
  },
  beforeRouteEnter (to, from, next) {
    next(vm => {
      vm.obtenerPartida(to.params.no_partida)
    })
  },
  firestore: {
    partida: fireApp.firestore().collection('juego-1')
  },
  data () {
    return {
      partida: {},
      partidas: []
    }
  },
  // Helper para asignar objetos o variables que necesitan ser detectados en sus cambios para ejecutar metodos
  watch: {
    '$route.params': {
      deep: true,
      immediate: true,
      handler (value) {
        this.$bind('partida', partida.doc(value.no_partida))
      }
    }
  },
  methods: {
    // metodo para generar nueva partida
    crearPartida () {
      // Escribe en la base de datos
      fireApp.firestore().collection('juego-1').doc('partida-2').set({
        'usuario_1': ' ',
        'usuario_2': ' ',
        'ganador': ' '
      })
    },
    // Cargar los datos de la partifda del firestore
    obtenerPartida (partida) {
      fireApp.firestore().collection('juego-1').doc(partida).get().then((result) => {
        console.log(result.data())
      })
    },
    getOpcion (opcion) {
      fireApp.firestore().collection('juego-1').doc(this.$route.params.no_partida).update({
        'usuario_1': opcion
      })
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
