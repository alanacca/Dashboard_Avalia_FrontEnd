<template>
  <nav>
    <v-toolbar>
        <v-spacer></v-spacer>
        <v-btn text @click="nada">
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
        nada(){
            console.log("teste")
        }
    }
}
</script>
