<template>
  <v-row class="fill-height">
    <Overlay v-if="loading == true" />
    <v-col cols="12">
      <v-card outlined height="98vh" elevation="0" color="white" class="pa-2">
        <v-card-title> Agendamento </v-card-title>
        <v-card-subtitle> Ordem de agendamentos </v-card-subtitle>
        <v-divider class="mx-4"></v-divider>

        <v-data-table class="mt-16" :headers="headers" :items="schedules">
          <template v-slot:[`item.menu`]="{ item }">
            <div>
              <v-menu offset-y>
                <template v-slot:activator="{ attrs, on }">
                  <v-btn v-bind="attrs" v-on="on" text>
                    <v-icon dark>{{ item.menu }}</v-icon>
                  </v-btn>
                </template>

                <v-list>
                  <v-list-item @click="goToPerfil(item.id)" link>
                    <v-list-item-title style="color: #64676c">
                      Marcar como concluído
                    </v-list-item-title>
                  </v-list-item>
                  <v-list-item @click="goToPerfil(item.id)" link>
                    <v-list-item-title style="color: red">
                      Deletar
                    </v-list-item-title>
                  </v-list-item>
                </v-list>
              </v-menu>
            </div>
          </template>
        </v-data-table>
      </v-card>
    </v-col>
  </v-row>
</template>

<script>
import Overlay from "../../components/Overlay/Overlay.vue";

export default {
  components: {
    Overlay,
  },
  data: () => ({
    loading: false,
    schedules: [],
  }),
  mounted() {
    this.getSchedules();
  },
  methods: {
    async getSchedules() {
      this.loading = true;
      try {
        this.loading = false;
        const response = await this.$axios("schedules/");
        
        if (response.data) {
          this.schedules = response.data.map((schedule) => {
            return {
              id: schedule.id,
              name: schedule.user,
              sorting_status: schedule.sorting_status,
              legal_status: schedule.legal_status,
              financial_status: schedule.financial_status,
              service_date: this.formatDate(schedule.service_date),
              created_at: this.formatDateTime(schedule.created_at),
              menu: "mdi-dots-vertical",
            };
          });
        }
      } catch (error) {
        this.loading = false;
        console.log(error);
      }
    },
    formatDate(date) {
      const year = date.slice(0, 4);
      const month = date.slice(5, 7);
      const day = date.slice(8, 10);

      return `${day}/${month}/${year}`;
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
    headers() {
      return [
        { text: "Nome", value: "name", align: "center" },
        {
          text: "Data do agendamento",
          value: "service_date",
          align: "center",
        },
        {
          text: "Data de criação",
          value: "created_at",
          align: "center",
        },
        {
          text: "Informações",
          value: "menu",
          align: "center",
          sortable: false,
        },
      ];
    },
  },
};
</script>

<style lang="stylus" scoped></style>
