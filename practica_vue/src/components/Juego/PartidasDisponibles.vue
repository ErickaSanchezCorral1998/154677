<template>
  <div class="col columnaDer">
    <div class="tab-main mx-auto columnaDer">
      <input id="tab1" type="radio" name="tabs" checked />
      <label for="tab1"> Propias</label>
      <input id="tab2" type="radio" name="tabs" />
      <label for="tab2">Disponibles</label>
      <section id="content1">
        <ul class="list-group">

            <li
              v-for="partidas in partidasPropias"
              :key="partidas.id"
              class="list-group-item "
            >
              <div class="row">
                <div class="col">

                </div>
                <div class="col">
                  <h4 v-if="partidas.participantes.includes(user.uid)">⭐</h4>
                </div>
                <div
                  v-if="partidas.usuario_1==='' || partidas.usuario_2===''"
                  class="col"
                >
                  <h4  v-if="partidas.usuario_1==='' && partidas.participantes.indexOf(user.uid) === 0"
                  >Usuario</h4>
                  <h4 v-if="partidas.usuario_2==='' && partidas.participantes.indexOf(user.uid) === 1"
                  >Usuario</h4>
                </div>
                <div
                  v-if="partidas.usuario_1===''"
                  class="col"
                >
                  <h4 >Usuario 1</h4>
                </div>
                <div
                  v-if="partidas.usuario_2===''"
                  class="col"
                >
                  <h4 >Usuario 2</h4>
                </div>
              </div>
              <h4 class="text-dark">{{partidas.ganador_nombre}}</h4>
              <br>
              <strong class="text-dark">Player 1: </strong> {{partida.name[0]}}
              <br>
              <strong class="text-dark">Player 2: </strong> {{partidas.name[1]?partidas.name[1]:'Sin Retador'}}
              <div class="btn-group">
                <button
                  class="btn mb-2 btn-outline-warning btn-sm "
                  :class="partidas.name.length===1?'pulse':''"
                  @click="$router.push({name:'partidas',params:{no_partida:partidas.id}}).catch(err => {})"
                >
                  {{partidas.participantes.length===1&&!partidas.participantes.includes(user.uid)  ?'Retar':'Ver'}}
                </button>
              </div>
            </li>
          </ul>
      </section>
      <section id="content2">
           <ul class="list-group">

            <li
              v-for="partidas in partidasDisponibles"
              :key="partidas.id"
              class="list-group-item "
            >
              <div class="row">
                <div class="col">

                </div>
                <div class="col">
                  <h4 v-if="partidas.participantes.includes(user.uid)">⭐</h4>
                </div>
                <div
                  v-if="partidas.usuario_1==='' || partidas.usuario_2===''"
                  class="col"
                >
                  <h4  v-if="partidas.usuario_1==='' && partidas.participantes.indexOf(user.uid) === 0"
                  >Usuario</h4>
                  <h4 v-if="partidas.usuario_2==='' && partidas.participantes.indexOf(user.uid) === 1"
                  >Usuario</h4>
                </div>
                <div
                  v-if="partidas.usuario_1===''"
                  class="col"
                >
                  <h4 >Usuario 1</h4>
                </div>
                <div
                  v-if="partidas.usuario_2===''"
                  class="col"
                >
                  <h4 >Usuario 2</h4>
                </div>
              </div>
              <h4 class="text-dark">{{partidas.ganador_nombre}}</h4>
              <br>
              <strong class="text-dark">Player 1: </strong> {{partida.name[0]}}
              <br>
              <strong class="text-dark">Player 2: </strong> {{partidas.name[1]?partidas.name[1]:'Sin Retador'}}
              <div class="btn-group">
                <button
                  class="btn mb-2 btn-outline-warning btn-sm "
                  :class="partidas.name.length===1?'pulse':''"
                  @click="$router.push({name:'partidas',params:{no_partida:partidas.id}}).catch(err => {})"
                >
                  {{partidas.participantes.length===1&&!partidas.participantes.includes(user.uid)  ?'Retar':'Ver'}}
                </button>
              </div>
            </li>
          </ul>
      </section>
    </div>
  </div>

</template>

<script lang="js">
import fireApp from '../../config/_firebase.js'
import collect from 'collect.js'
import moment from 'moment'
import Auth from '@/config/auth'
const partidas = fireApp.firestore().collection('juego-1')

export default {
  name: 'PartidasDisponibles',

  beforeRouteEnter (to, from, next) {
    // next(async vm => {
    next(vm => {
      vm.user = Auth.getUser()
      vm.partidasPropias = []
      vm.partidasDisponibles = []
      vm.$bind('partida', partidas.doc(to.params.no_partida))
      vm.$bind('partidasPropias', partidas.where('retador', '==', vm.user.uid))
      vm.$bind('partidasDisponibles', partidas.where('completed', '==', false))
    })
  },
  beforeRouteUpdate (to, from, next) {
    this.$bind('partida', partidas.doc(to.params.no_partida))
    next()
  },
  data () {
    return {
      collect,
      moment,
      partida: {},
      partidasSort: [],
      partidas: [],
      partidasPropias: [],
      partidasDisponibles: [],
      user: {}
    }
  },
  firestore: {
    partidas: fireApp.firestore().collection('juego-1')
  },
  watch: {
    partidas: {
      deep: true,
      immediate: true,
      handler: function (val) {
        this.partidasDisponibles = []
        this.partidasSort = collect(val).sortByDesc('created_at').all()
        this.$bind('partidasPropias', partidas.where('retador', '==', this.user.uid))
        this.$bind('partidasDisponibles', partidas.where('completed', '==', false))
      }
    },
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
    this.partidasPropias = fireApp.firestore().collection('juego-1')
  },
  methods: {
    async obtenerUser () {
      this.user = await Auth.getUser()
    },
    obtener () {

    },
    obtenerPartida (partida) {
      partidas.doc(partida).get().then((result) => {
        console.log(result.data())
      })
    },
    crearPartida () {
      let now = moment().toDate()
      let uid = this.user.uid
      partidas.add({
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
@import "./../../components/recursos/css/partidas.css";
</style>
