<template>
  <div class="col columnaDer">
    <div class="tab-main mx-auto columnaDer">
      <input id="tab1" type="radio" name="tabs" checked />
      <label for="tab1">Partidas propias</label>
      <input id="tab2" type="radio" name="tabs" />
      <label for="tab2">Partidas disponibles</label>
      <section id="content1">
        <ul class="list-group">
            <li
              v-if="collect(partidas).isEmpty()"
              class="list-group-item"
            >
              Sin Partidas Disponibles 🥺
              <button
                :disabled="!user"
                :class="user?'btn-outline-success':'btn-outline-light'"
                class="btn mb-2"
                @click="crearPartida"
              >
                Crear Partida 🥳
              </button>
            </li>
            <li
              v-for="partida in partidasSort"
              :key="partida.id"
              class="list-group-item "
            >
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
                </div>
              </div>
              <h4>{{partida.ganador_nombre}}</h4>
              <br>
              <strong>Player 1: </strong> {{partida.name[0]}}
              <br>
              <strong>Player 2: </strong> {{partida.name[1]?partida.name[1]:'Sin Retador'}}
              <br>
              <strong>Creada:</strong> {{moment(partida.created_at.toDate()).format('LLL')}}
              <br>
              <div class="btn-group">
                <button
                  class="btn mb-2 btn-outline-info btn-sm animated infinite"
                  :class="partida.name.length===1?'pulse':''"
                  @click="$router.push({name:'partidas',params:{no_partida:partida.id}}).catch(err => {})"
                >
                  {{partida.participantes.length===1&&!partida.participantes.includes(user.uid)  ?'Retar':'Ver'}}
                </button>
              </div>
            </li>
          </ul>
      </section>
      <section id="content2">
        <button
          :class="user?'btn-outline-success':'btn-outline-light'"
          class="btn mb-2"
          @click="crearPartida"
        >
          Nueva Partida 👾
        </button>
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
  data () {
    return {
      collect,
      moment,
      partidasSort: [],
      partidas: [],
      user: {}
    }
  },
  beforeRouteEnter (to, from, next) {
    // next(async vm => {
    next(vm => {
      vm.obtenerPartida(to.params.no_partida)
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
  firestore: {
    partidas: fireApp.firestore().collection('juego-1')
  },
  watch: {
    partidas: {
      deep: true,
      immediate: true,
      handler: function (val) {
        this.partidasSort = collect(val).sortByDesc('created_at').all()
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
    crearPartida () {
      let now = moment().toDate()
      let uid = this.user.uid
      // Escribe en la base de datos
      partidas.add({
        participantes: [uid],
        name: [this.user.displayName == null ? 'Usuario 1' : this.user.displayName],
        'usuario_1': '',
        'usuario_2': '',
        'ganador': ' ',
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
