<template>
  <v-row>
    <v-col cols="4">
      <v-card outlined height="91vh" elevation="0" color="white" class="pa-2">
        <v-card-title>
          Selecione o processo que deseja acompanhar
        </v-card-title>
        <v-divider class="mx-4"></v-divider>
        <v-list flat>
          <v-subheader>Processos disponíveis para acompanhamento</v-subheader>
          <v-list-item-group v-model="selectedItem" color="primary">
            <v-list-item v-for="(proccess, i) in proccesses.id" :key="i">
              <v-list-item-content>
                <v-list-item-title>Processo de n°{{proccess}}</v-list-item-title>
              </v-list-item-content>
            </v-list-item>
          </v-list-item-group>
        </v-list>
      </v-card>
    </v-col>
    <v-col cols="8">
      <v-card outlined height="91vh" elevation="0" color="white" class="pa-2">
        <v-card-title> Processo </v-card-title>
        <v-card-subtitle>
          Acompanhamento em tempo real do processo n° {{ proccesses.id }}
        </v-card-subtitle>
        <v-divider class="mx-4"></v-divider>
        <v-card-text>
          <v-row align="center" justify="center">
            <v-col cols="8">
              <v-timeline align-top reverse>
                <v-timeline-item v-for="(phase, i) in phases" :key="i" dot>
                  <v-card outlined elevation="2" width="500" height="100">
                    <v-card-text class="pa-2 font-weight-normal">
                      <strong>Equipe Plural</strong> {{ phase.created_at }}
                    </v-card-text>
                    <div class="pa-2">{{ phase.description }}</div>
                  </v-card>
                </v-timeline-item>
              </v-timeline>
            </v-col>
          </v-row>
        </v-card-text>
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
        { text: 'Real-Time'},
        { text: 'Audience' },
        { text: 'Conversions' },
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
.logo {
  color: #34103b;
}
</style>
