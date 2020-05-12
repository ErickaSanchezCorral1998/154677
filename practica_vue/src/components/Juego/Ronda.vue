<template >
<section>
    <div class="tarjetas p-3">
        <div class="container-fluid ronda">
            <div class="row">
                <div class="col col-4 p-2">
                    <h6 class="mx-auto">0</h6>
                    <small><transition-group>

                    </transition-group></small>
                </div>
                <div class="col col-4 p-2">
                    <h6 class="mx-auto">Ronda 1</h6>
                </div>
                <div class="col col-4 p-2">
                    <h6 class="mx-auto">0</h6>
                    <small>Otro</small>
                </div>
            </div>
        </div>
    </div>
</section>
</template>
<script lang="js">
export default {
  name: 'Ronda',
  methods: {

  }
}
</script>
<style lang="scss">
@import "./../recursos/css/ronda.css";
</style>
