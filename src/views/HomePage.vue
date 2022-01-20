<template>
    <div>
        <v-app>
            <v-row style="display: grid; justify-content: center;margin-top: 120px; margin-bottom: 60px">
                <v-col>
                    <v-img
                        style="margin: auto"
                        max-height="150"
                        max-width="290"
                        src="@/assets/DashBoard__1 (1).png"
                    ></v-img>
                    <v-row >
                        <v-text-field
                            label="Digite o nome"
                            style="margin-top: 40px"
                        ></v-text-field>
                    </v-row>
                </v-col>
            </v-row>
        </v-app>

    </div>
</template>

<script>
    export default {
        data: () => ({
            
        }),
  }

</script>

<style>
    
</style>
