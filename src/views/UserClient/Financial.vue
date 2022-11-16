<template>
  <v-row class="fill-height">
    <v-col cols="12">
      <v-card outlined height="91vh" elevation="0" color="white" class="pa-2">
        <v-card-title> Financeiro </v-card-title>
        <v-card-subtitle>
          Aqui você pode conferir a situação financeira do seu processo.
        </v-card-subtitle>
        <v-divider class="mx-4"></v-divider>
        <v-row class="mt-16" align="center" justify="center">
          <!--  COMPROVANTE DE PAGAMENTO  -->
          <v-col cols="12" class="d-flex justify-center">
            <v-card
              outlined
              width="75vw"
              min-height="7vh"
              height="7vh"
              max-height="10vh"
              class="d-flex justify-center"
            >
              <v-row justify="center">
                <v-col cols="10" sm="9" md="9" class="text">
                  <p class="cardDescription pa-4">COMPROVANTE DE PAGAMENTO</p>
                </v-col>
                <v-col cols="2" sm="3" md="3" class="text">
                  <v-icon class="pa-4" icon size="4vh" color="success"
                    >mdi-check-decagram-outline</v-icon
                  >
                  <v-icon icon size="4vh" color="success"
                    >mdi-arrow-down</v-icon
                  >
                </v-col>
              </v-row>
            </v-card>
          </v-col>

          <!-- NOTA FISCAL DO CLIENTE - “ nome do cliente”  -->
          <v-col cols="12" class="d-flex justify-center mb-10">
            <v-card
              outlined
              width="75vw"
              min-height="7vh"
              height="7vh"
              max-height="10vh"
              class="d-flex justify-center"
            >
              <v-row justify="center">
                <v-col cols="10" sm="9" md="9" class="text">
                  <p class="cardDescription pa-4">
                    NOTA FISCAL DO CLIENTE - {{ currentUser.name }}
                  </p>
                </v-col>
                <v-col cols="2" sm="3" md="3" class="text">
                  <v-icon class="pa-4" icon size="4vh" color="success"
                    >mdi-check-decagram-outline</v-icon
                  >
                  <v-icon icon size="4vh" color="success"
                    >mdi-arrow-down</v-icon
                  >
                </v-col>
              </v-row>
            </v-card>
          </v-col>

          <!-- SITUAÇÃO FINANCEIRA -->
          <v-col cols="12" class="mt-10">
            <v-row justify="center">
              <div class="d-flex">
                <v-card color="#7ED957" height="20vh" width="40vw">
                  <v-row>
                    <v-col cols="6" class="d-flex justify-center">
                      <div>
                        <n class="situationNumber white--text">0</n
                        ><n class="situationText white--text">boletos pagos</n>
                      </div>
                    </v-col>
                    <v-divider vertical light class="my-10 ml-2"  width="10"></v-divider>
                    <v-col cols="5" class="d-flex justify-center">
                      <div>
                        <n class="situationNumber white--text">0</n
                        ><n class="situationText white--text">boletos restantes</n>
                      </div>
                    </v-col>
                  </v-row>
                </v-card>
              </div>
            </v-row>
          </v-col>
        </v-row>
      </v-card>
    </v-col>
  </v-row>
</template>

<script>
import { mapState } from "vuex";

export default {
  components: {},
  data: () => ({}),
  mounted() {},
  methods: {},
  computed: {
    ...mapState({
      currentUser: (state) => state.authentication.currentUser,
    }),
  },
};
</script>

<style>
.access {
  color: white;
}
.cardDescription {
  font-size: 2.5vmin;
}
.text {
  text-align: center;
}
.situationNumber {
  font-size: 15vmin;
}
.situationText {
  font-size: 2vmin;
}
</style>
