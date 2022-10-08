<template>
  <v-row>
    <v-col cols="12">
      <v-card outlined height="91vh" elevation="0" color="white" class="pa-2">
        <v-card-title> Envio </v-card-title>
        <v-card-subtitle>
          Envios de documentos necessários como RG, CPF, Comprovante de
          endereço, CNPJ, contrato Social.
        </v-card-subtitle>
        <v-divider class="mx-4"></v-divider>
        <v-row class="fill-height" justify="center">
          <v-col cols="3">
            <v-card class="mt-10" height="400" width="400" outlined>
              <v-row justify="center" class="fill-height">
                <v-icon icon size="200"> mdi-plus </v-icon>
              </v-row>
            </v-card>

            <v-btn
              class="mx-6 mt-4"
              color="#7ED957"
              width="350px"
              height="50px"
              depressed
              @click="authenticate"
            >
              <b class="access">Enviar</b>
            </v-btn>
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
    proccesses: [],
    phases: [],
    selectedItem: 1,
    items: [
      { text: "Real-Time" },
      { text: "Audience" },
      { text: "Conversions" },
    ],
  }),
  mounted() {
    this.getProccess();
  },
  methods: {
    async getProccess() {
      try {
        const response = await this.$axios.get(
          "proccesses/",
          this.currentUser.id
        );
        this.proccesses = response.data;
        if (response.data.phase) {
          this.phases = response.data.phase.map((el) => {
            return {
              id: el.id,
              description: el.description,
              proccess_id: el.proccess_id,
              created_at: this.formatDateTime(el.created_at),
              updated_at: this.formatDateTime(el.updated_at),
            };
          });
        }
      } catch (error) {
        console.log(error);
      }
    },
    formatDateTime(dataTime) {
      const day = dataTime.slice(8, 10);
      const month = dataTime.slice(5, 7);
      const year = dataTime.slice(0, 4);
      const time = dataTime.slice(11, 19);

      return `${day}/${month}/${year} às ${time}`;
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
</style>
