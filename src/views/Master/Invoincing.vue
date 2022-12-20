<template>
  <v-row class="fill-height">
    <Overlay v-if="loading == true" />
    <v-col cols="12">
      <v-card outlined height="98vh" elevation="0" color="white" class="pa-2">
        <v-card-title> Financeiro </v-card-title>
        <v-card-subtitle> Ordem de faturamento </v-card-subtitle>
        <v-divider class="mx-4"></v-divider>
        <v-data-table class="mt-16" :headers="headers" :items="invoincings">
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
                      Ver perfil
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
    invoincings: [],
    paginationParams: {
      page: 1,
      itemsPerPage: 10,
      total: 0,
    },
  }),
  mounted() {
    this.getInvoincing();
  },
  methods: {
    async getInvoincing() {
      this.loading = true;
      try {
        const response = await this.$axios(
          "invoincings/",
          this.paginationParams
        );

        // console.log(response.paginationParams)
        if (response.data.data) {
          this.loading = false;
          this.invoincings = response.data.data.map((invoincing) => {
            return {
              id: invoincing.id,
              name: invoincing.user,
              created_at: this.formatDateTime(invoincing.created_at),
              description: invoincing.description,
              menu: "mdi-dots-vertical",
            };
          });
        }
      } catch (error) {
        this.loading = false
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
    teste() {
      return this.paginationParams;
    },
    headers() {
      return [
        { text: "Nome", value: "name", align: "center" },
        { text: "Data", value: "created_at", align: "center", sortable: false },
        // { text: "Marcar Concluído", value: "email", align: "center" },
        {
          text: "Informações",
          value: "description",
          align: "center",
        },
        {
          text: "Opções",
          value: "menu",
          align: "center",
          width: 30,
          sortable: false,
        },
      ];
    },
  },
  watch: {
    teste() {
      console.log(this.paginationParams);
    },
  },
};
</script>

<style lang="stylus" scoped></style>
