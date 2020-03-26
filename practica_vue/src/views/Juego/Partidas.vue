<template >
  <!--Container nos da un ancho maximo de 1140px-->
  <div :style="{'background-color':'#eb7b7e', 'background-size': 'cover', 'height':'88.7vh'}">
    <div class="cointainer fondoInfo">
        <h1 class="titulo1"><b>Partidas</b></h1>
        <div class="row">
          <div class="col-4-md">
            <div class="fotoUsuario">
              <img  class="profilePhoto mx-auto" :src="user.photo"/><br>
            </div>
            <label class="mx-auto nombreUsuario">{{user.nombre}}</label>
              <div class="partidasGanadas">
                <label>Partidas ganadas</label><br>
                <label>0</label>
            </div>
          </div>
          <div class="col-6 .container-fluid justify-center">
            <div class="row">
              <div class="col-6 justify-center">
                <label class="encabezadoPartidas" >Nombre contricante</label>
              </div>
              <div class="col-4 justify-center">
                <label  class="encabezadoPartidas" >Estatus</label>
              </div>
              <div class="col-2">
              </div>
            </div>
            <div class="card">
              <div class="row partidasLista">
                  <div class="col-6  justify-center">
                    <label class="datosPartida">Usuario</label>
                  </div>
                  <div class="col-4  justify-center">
                    <label class="datosPartida">Activa</label>
                  </div>
                  <div class="col-2  justify-center">
                    <button class="btn btn-danger">Terminar</button>
                  </div>
                  <label class="separador"></label>
                </div>
                <div class="row partidasLista">
                  <div class="col-6  justify-center">
                    <label class="datosPartida">Usuario</label>
                  </div>
                  <div class="col-4  justify-center">
                    <label class="datosPartida">Activa</label>
                  </div>
                  <div class="col-2  justify-center">
                    <button class="btn btn-danger">Terminar</button>
                  </div>
                  <label class="separador"></label>
                </div>
              </div>
          </div>
        </div>
      </div>
  </div>
</template>

<script lang="js">
import Firebase from '@/config/_firebase.js'
export default {
  name: 'partidas',
  data () { // Variables y metodos(funciones que vamos  a utilizar)
    return {
      showError: false,
      errorMessage: '',
      errorCode: '',
      user: {
        nombre: '',
        photo: ''
      }
    }
  },
  mounted () {
    let userC = Firebase.auth().currentUser
    this.user.nombre = userC.displayName
    this.user.photo = userC.photoURL
  }
}
</script>
<style lang="scss">
.titulo1{
  color: #fff;
}
#coverImgHeader{
  height: 80vh;
}
.tituloU{
color: #eb7b7e;
}
.container{
  height: 80vh;
}
.nombreUsuario{
  color: #fff;
  font-size: 30px;
}
.encabezadoPartidas{
  color: #fff;
  text-align: center;
  font-weight: bold;
}
.partidasGanadas{
  color:#fff;
  font-weight: bold;;
}
.separador{
  height: 5px;
  width:100%;
  background-color: #eb7b7e;;
}
.fondoHeader{
  background-color: #eb7b7e;
  padding: 10vh;
  border-radius: 5px;
}
.columnaDer{
margin-left: 0px;
}
.datosPartida{
  font-weight: bold;
  vertical-align: middle;
  padding: 15px;
}
.partidasLista .btn{
  margin: 10px;
}
.fondoInfo{
  background-color: #eb7b7e;
  padding: 20px;
  border-radius: 5px;
}
.profilePhoto{
  width: 55%;
  border: solid 10px #fff
}

.nameUser{
  height: 30px;
}

@media (max-width: 576px) {
  .profilePhoto {
    width: 50%;
  }
}
@media (max-width: 768px) {
 .profilePhoto {
    width: 50%;
  }
}

</style>
