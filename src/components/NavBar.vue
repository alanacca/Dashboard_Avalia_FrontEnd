<template>
  <nav>
    <v-toolbar>
        <v-spacer></v-spacer>
        <v-btn text @click="home">
          <i class="fas fa-home"></i>
        </v-btn>
        <v-btn text @click="manutencao">
        <span>Manutenção</span>
        <i class="fas fa-plus"></i>
      </v-btn>
    </v-toolbar>
  </nav>
</template>

<script>

export default {
    data: () => {
        return {

        }
        
    },
    methods: {
        manutencao(){
          if(this.$router.currentRoute.path !== '/manutencao') this.$router.push("/manutencao")
        },
        home(){
          if(this.$router.currentRoute.path !== '/') this.$router.push("/")
        }
    }
}
</script>
