<template>
  <v-row>
    <v-col cols="12">
      <v-card outlined height="91vh" elevation="0" color="white" class="pa-2">
        <v-card-title> Suporte </v-card-title>
        <v-card-subtitle>
          Contato de suporte para ajuda via telefone.
        </v-card-subtitle>
        <v-divider class="mx-4"></v-divider>
        <v-row
          align="center"
          justify="center"
          :style="{ height: deviceHeight * 0.6 + 'px' }"
        >
          <!-- HEADSET -->
          <v-col
            cols="12"
            xs="12"
            sm="12"
            md="12"
            lg="6"
            class="d-flex justify-center"
          >
            <div class="pt-3">
              <v-sheet outlined color="primary" rounded>
                <v-card class="pa-3" width="600" outlined elevation="3">
                  <v-row
                    align="center"
                    justify="center"
                    :style="{ height: deviceHeight * 0.32 + 'px' }"
                  >
                    <v-col class="fill-height" height="300">
                      <v-card
                        class="
                          elevation-0
                          text-center
                          d-flex
                          flex-column
                          align-center
                          justify-center
                        "
                        height="100%"
                      >
                        <div>
                          <v-icon size="80" color="primary">mdi-headset</v-icon>
                          <h1 class="mt-10">0800 591 4358</h1>
                        </div>
                      </v-card>
                    </v-col>
                  </v-row>
                </v-card>
              </v-sheet>
            </div>
          </v-col>

          <!-- CHAT -->
          <v-col
            cols="12"
            xs="12"
            sm="12"
            md="12"
            lg="6"
            class="d-flex justify-center"
          >
            <div class="pt-3">
              <v-sheet outlined color="primary" rounded>
                <v-card class="pa-3" width="600" oulined elevation="3">
                  <v-row
                    align="center"
                    justify="center"
                    :style="{ height: deviceHeight * 0.32 + 'px' }"
                  >
                    <v-col class="fill-height" height="300">
                      <v-card
                        class="
                          elevation-0
                          text-center
                          d-flex
                          flex-column
                          align-center
                          justify-center
                        "
                        height="100%"
                      >
                        <div>
                          <v-icon size="80" color="primary">mdi-forum</v-icon>
                          <!-- <h1 class="mt-10">0800 770 2821</h1> -->
                        </div>
                      </v-card>
                    </v-col>
                  </v-row>
                </v-card>
              </v-sheet>
            </div>
          </v-col>

          <!-- DESCRIÇÃO -->
        </v-row>
        <v-row align="center" justify="center">
          <b>
            De segunda à sexta-feira, das 9h às 18h, mediante fila de
            atendimento.E aos sábados, plantão emergencial para clientes, das
            10h às 17h. <b class="description">Clique aqui</b> para enviar uma
            solicitação por e-mail.
          </b>
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
    deviceHeight() {
      return this.$vuetify.breakpoint.height;
    },
    deviceWidth() {
      return this.$vuetify.breakpoint.width;
    },
  },
};
</script>

<style>
.access {
  color: white;
}
.text {
  font-size: 5vmin;
}
.description {
  font-weight: bolder;
  color: #7ed957;
}
</style>
