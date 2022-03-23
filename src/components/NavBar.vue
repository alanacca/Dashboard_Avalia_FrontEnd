<template>
  <nav>
    <v-toolbar>
        <v-spacer></v-spacer>
        <v-btn text @click="home">
          <i class="fas fa-home"></i>
        </v-btn>
        <v-menu offset-y>
          <template v-slot:activator="{ on, attrs }">
            <v-btn text v-bind="attrs" v-on="on">
              <span>Ações</span>
            </v-btn>
          </template>
          <v-list>
            <v-list-item>
              <v-btn text @click="manutencao()">Adicionar Docente</v-btn>
            </v-list-item>
            <v-list-item>
              <v-btn text @click="vinculo()">Adicionar Vínculo</v-btn>
            </v-list-item>
            <v-list-item>
              <v-btn text @click="mestrado()">Calculo Mestrado</v-btn>
            </v-list-item>
          </v-list>
        </v-menu>
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
        mestrado(){
          if(this.$router.currentRoute.path !== '/calculoMestrado') this.$router.push("/calculoMestrado")
        },
        vinculo(){
          if(this.$router.currentRoute.path !== '/vinculo') this.$router.push("/vinculo")
        },
        manutencao(){
          if(this.$router.currentRoute.path !== '/manutencao') this.$router.push("/manutencao")
        },
        home(){
          if(this.$router.currentRoute.path !== '/') this.$router.push("/")
        }
    }
}
</script>
