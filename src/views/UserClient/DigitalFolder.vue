<template>
  <v-row class="fill-height">
    <v-col cols="12">
      <v-card outlined height="91vh" elevation="0" color="white" class="pa-2">
        <v-card-title> Pasta Digital </v-card-title>
        <v-card-subtitle>
          Aqui você pode conferir o status do envio dos seus documentos
        </v-card-subtitle>
        <v-divider class="mx-4"></v-divider>
        <v-row class="mt-16" align="center" justify="center">
          <!-- CONTRATO DE PRESTAÇÃO DE SERVIÇO ASSINADO  -->
          <v-col cols="12" class="d-flex justify-center">
            <v-card
              outlined
              width="75vw"
              min-height="7vh"
              max-height="10vh"
              class="d-flex justify-center"
            >
              <v-row justify="center">
                <v-col cols="10" sm="9" md="9" class="text">
                  <p class="cardDescription pa-4">
                    CONTRATO DE PRESTAÇÃO DE SERVIÇO ASSINADO -
                    {{ currentUser.name }}
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

          <!-- PROTOCOLO DE PEDIDO DE PATENTE  -->
          <v-col cols="12" class="d-flex justify-center">
            <v-card
              outlined
              width="75vw"
              min-height="7vh"
              max-height="10vh"
              class="d-flex justify-center"
            >
              <v-row justify="center">
                <v-col cols="10" sm="9" md="9" class="text">
                  <p class="cardDescription pa-4">
                    PROTOCOLO DE PEDIDO DE PATENTE “data de emissão”
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

          <!-- PROCURAÇÃO ASSINADA -->
          <v-col cols="12" class="d-flex justify-center">
            <v-card
              outlined
              width="75vw"
              min-height="7vh"
              max-height="10vh"
              class="d-flex justify-center"
            >
              <v-row justify="center">
                <v-col cols="10" sm="9" md="9" class="text">
                  <p class="cardDescription pa-4">
                    PROCURAÇÃO ASSINADA PELO CLIENTE  -
                    {{ currentUser.name }}
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
          <!-- Documentos Aprovados -->
          <v-col cols="12" class="d-flex justify-center">
            <v-card
              outlined
              width="75vw"
              min-height="7vh"
              max-height="10vh"
              class="d-flex justify-center"
            >
              <v-row justify="center">
                <v-col cols="10" sm="9" md="9" class="text">
                  <p class="cardDescription pa-4">
                    DOCUMENTOS APROVADOS -
                    {{ currentUser.name }}
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
</style>
