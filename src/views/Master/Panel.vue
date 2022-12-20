<template>
  <!-- <v-row :style="{ height: deviceHeight * 0.3 + 'px' }"> -->
  <v-row class="fill-height">
    <Overlay v-if="loading == true" />
    <v-col cols="12">
      <v-card outlined height="98vh" elevation="0" color="white" class="pa-2">
        <v-card-title> Consultar clientes</v-card-title>
        <v-card-subtitle> Listagem de clientes </v-card-subtitle>
        <v-divider class="mx-4"></v-divider>
        <v-row class="mt-16" justify="center">
          <v-col cols="12" md="8">
            <v-text-field
              v-model="search"
              outlined
              label="Pesquisar usuário"
              class="ml-5"
            />
          </v-col>
          <v-spacer></v-spacer>
          <v-col>
            <v-card
              @click="routeTo('register')"
              width="15em"
              height="40px"
              elevation="1"
              outlined
              color="primary"
              class="
                text-center
                d-flex
                flex-column
                align-center
                justify-center
                mt-1
              "
            >
              <a class="white--text">NOVO CLIENTE</a>
            </v-card>
          </v-col>

          <v-col cols="12" class="">
            <v-data-table
              :server-items-length="paginationParams.total"
              :search="search"
              @pagination="pagination"
              :headers="headers"
              :items="users"
            >
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
          </v-col>
        </v-row>
      </v-card>
    </v-col>
  </v-row>
</template>

<script>
import "sweetalert2/dist/sweetalert2.min.css";
import Overlay from "../../components/Overlay/Overlay.vue";

export default {
  components: {
    Overlay,
  },
  data: () => ({
    createClientDialog: false,
    rules: [
      {
        file: [
          (value) =>
            !value ||
            value.size < 2000000 ||
            "Tamanho da imagem maximo de 2mb !",
        ],
      },
    ],
    paginationParams: {
      page: 1,
      per_page: 10,
      total: 0,
      // sort_by: "id",
      // sort_direction: "asc"
      clients: true,
    },
    search: "",
    users: [],
    user: {
      role: "client",
    },
    page: 1,
    perfil: {
      show: false,
      user: {},
    },
    loading: false,
    loadingPerfil: false,
  }),
  mounted() {
    this.pagination();
  },
  methods: {
    routeTo(r) {
      switch (r) {
        case "register":
          this.$router.push({ name: "Register" });
        // case "perfil":
        //   this.$router.push({name: "ClientPerfil", params: {id}});
      }
    },
    async fetchUsers() {
      try {
        this.loading = true;
        const response = await this.$axios("users/", {
          params: this.paginationParams,
        });

        if (response.data) {
          this.paginationParams.total = response.data.pagination_params.total;
          this.users = response.data.data.map((user) => {
            return {
              id: user.id,
              name: user.name,
              email: user.email,
              role: this.formatRole(user.role),
              created_at: user.created_at
                ? this.formatDateTime(user.created_at)
                : "",
              updated_at: user.updated_at
                ? this.formatDateTime(user.updated_at)
                : "",
              menu: "mdi-dots-vertical",
            };
          });
        }
        this.loading = false;
      } catch (error) {
        this.loading = false;
        console.log(error);
      }
    },

    async newUser() {
      try {
        this.user.password = "123456";
        await this.$axios.post("users/", { user: this.user });

        console.log(this.user);
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
          text: "Não foi possível criar o usuário, por favor tente novamente mais tarde !",
        });
      }
    },
    formatRole(e) {
      switch (e) {
        case "client":
          return {
            title: "Cliente",
          };
        case "master":
          return {
            title: "Master",
          };
        case "disabled":
          return {
            title: "Inativo",
          };
      }
    },
    goToPerfil(id) {
      if (id) {
        this.$router.push({ name: "ClientPerfil", params: { id } });
      }
    },
    openCreateDialog() {
      this.createClientDialog = true;
    },
    closeDialog() {
      this.createClientDialog = false;
    },
    deviceHeight() {
      return this.$vuetify.breakpoint.height;
    },
    deviceWidth() {
      return this.$vuetify.breakpoint.width;
    },
    pagination({ page, itemsPerPage }) {
      this.fetchUsers();

      page
        ? (this.paginationParams.page = page)
        : (this.paginationParams.page = 1);
      this.paginationParams.per_page = itemsPerPage;
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
        { text: "CPF", value: "cpf", align: "center", sortable: false },
        { text: "Email", value: "email", align: "center" },
        {
          text: "Data de Criação",
          value: "created_at",
          align: "center",
          sortable: false,
        },
        {
          text: "Tipo de Usuário",
          value: "role.title",
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
};
</script>

<style></style>
