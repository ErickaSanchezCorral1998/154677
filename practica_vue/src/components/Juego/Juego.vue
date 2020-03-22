<template>
<section >
  <div class="containerJuego">
      <div
        class="card" id="cardJuego"
      >
    <h3>{{displayName}}</h3>
    <div class="row   ">
      <div class="col-md-3 mx-auto">
        <h1 >{{opciones[userOpcion]}}</h1>
      </div>
    </div>
    <div class="row">
      <label id="separacion" class="mx-auto"></label>
      <div class="col-md-6 mx-auto">
        <div class="row">
          <div class="col col-sm-4 opcion p-3" v-for="(option,key ) in opciones" :key="key" @click="select(key)">
        {{option}}
          </div>
        </div>
      </div>
    </div>
    </div>
  </div>
  </section>
</template>
<script lang="js">
export default {
  name: 'Juego',
  props: ['userOpcion', 'displayName'],
  data () {
    return {
      opciones: {
        piedra: '🤛',
        papel: '✋',
        tijeras: '✌️'
      }
    }
  },
  methods: {
    select (key) {
      this.$emit('opcion', key)
    }
  }
}
</script>
<style lang="scss">
.containerJuego{
  height: 40vh;
}
#cardJuego{
  margin: 50px;
  border:5px solid rgb(34, 185, 160);
  border-radius: 20px;
  padding: 20px;
}
#separacion{
  background-color: rgb(2, 117, 102);
  height: 2px;
  width: 90%;
}
#opcionesIconos{
  border-color:aqua;
}
</style>
