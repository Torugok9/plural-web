<template>
  <v-row class="fill-height">
    <v-col cols="12">
      <v-card outlined height="91vh" elevation="0" color="white" class="pa-2">
        <v-card-title> Pasta Digital </v-card-title>
        <v-card-subtitle>
          Aqui você pode conferir o status do envio dos seus documentos
        </v-card-subtitle>
        <v-divider class="mx-4"></v-divider>
        <v-row v-if="!documents.lenght" class="mt-16" align="center" justify="center">
          <small>não existem documentos cadastrados em seu nome !</small>
        </v-row>
        <v-row v-else class="mt-16" align="center" justify="center">
          <!-- CONTRATO DE PRESTAÇÃO DE SERVIÇO ASSINADO  -->
          <v-col
            v-for="(document, index) in documents"
            :key="index"
            cols="12"
            class="d-flex justify-center"
          >
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
                    {{ document.name }}
                    {{ document.userName ? currentUser.name : "" }}
                  </p>
                </v-col>
                <v-col cols="2" sm="3" md="3" class="text">
                  <v-icon
                    v-if="document.status == 0"
                    class="pa-4"
                    icon
                    size="4vh"
                    color="blue"
                    >mdi-check-decagram-outline</v-icon
                  >
                  <v-icon
                    v-if="document.status == 1"
                    class="pa-4"
                    icon
                    size="4vh"
                    color="success"
                    >mdi-check-decagram-outline</v-icon
                  >
                  <v-icon
                    v-if="document.status == 2"
                    class="pa-4"
                    icon
                    size="4vh"
                    color="red"
                    >mdi-check-decagram-outline</v-icon
                  >
                  <v-icon icon size="4vh" color="gray">mdi-arrow-down</v-icon>
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
  data: () => ({
    documents: [
      {
        name: "CONTRATO DE PRESTAÇÃO DE SERVIÇO ASSINADO -",
        status: 1,
        userName: true,
      },
      { name: "PROTOCOLO DE PEDIDO DE PATENTE “data de emissão”", status: 0 },
      {
        name: "PROCURAÇÃO ASSINADA PELO CLIENTE  -",
        status: 2,
        userName: true,
      },
    ],
  }),
  mounted() {
    this.getDocuments();
  },
  methods: {
    async getDocuments() {
      try {
        const response = await this.$axios("documents/", {
          params: {
            user_id: this.currentUser.id,
            digital_paste: true,
          },
        });

        this.documents = response.data
      } catch (error) {
        this.$swal({
          color: "#ffffff",
          background: "#34103B",
          toast: true,
          position: "top",
          showConfirmButton: false,
          timer: 4000,
          icon: "error",
          title: "Plural",
          text: "Erro ao carregar seus documentos, por favor tente mais tarde !",
        });
      }
    },
  },
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
