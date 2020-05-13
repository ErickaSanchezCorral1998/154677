<template>
<section >
  <div  class="tarjetas p-5">
  <div class="container-fluid pb-5">
    <div class="row ">
      <h4 class="mx-auto usuario">{{displayName}}</h4>
    </div>
    <div class="row">
      <div class="col-3 mx-auto">
        <h1 >{{opciones[userOpcion]}}</h1>
      </div>
    </div>
    <div class="row" >
      <div class="col-4 mx-auto opciones" >
        <div class="row" >
          <div class="col col-sm-4 opcion p-3"  v-for="(option,key ) in opciones" :key="key" @click="select(key)">
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

</style>
