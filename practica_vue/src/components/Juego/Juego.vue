<template>
<section>
    <h3>Jugador 1</h3>
    <div class="row">
        🤛
    </div>
    <div class="row">
      <div v-for="(option,key ) in opciones" :key="key" @click="select(key)">
        {{option}}
    </div>
    </div>
  </section>
</template>
<script lang="js">
export default {
  name: 'Juego',
  components: {

  },
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
<style lang="scss"></style>
