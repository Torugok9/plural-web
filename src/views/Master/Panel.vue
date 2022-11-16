<template>
  <v-row :style="{ height: deviceHeight * 0.3 + 'px' }">
    <Overlay v-if="loading == true" />
    <v-dialog v-model="createClientDialog">
      <v-card
        outlined
        height="40rem"
        width="100rem"
        elevation="1"
        color="white"
        class="text-center d-flex flex-column align-center justify-center"
      >
        <v-col cols="12" class="">
          <div class="d-flex justify-center mb-2">
            <!-- ><span class="name">TS</span> -->
            <v-avatar size="128" color="primary">
              <v-avatar size="120">
                <v-img
                  src="https://randomuser.me/api/portraits/men/90.jpg"
                ></v-img>
              </v-avatar>
            </v-avatar>
          </div>
          <v-file-input
            v-model="user.image"
            :rules="rules[1]"
            color="primary"
            accept="image/png, image/jpeg, image/bmp"
            placeholder="Pick an avatar"
            append-icon="mdi-camera"
            label="Alterar Foto de usuário"
            width="30px"
          >
            <template v-slot:selection="{ index, text }">
              <v-chip
                v-if="index < 2"
                color="deep-purple accent-4"
                dark
                label
                small
              >
                {{ text }}
              </v-chip>

              <span
                v-else-if="index === 2"
                class="text-overline grey--text text--darken-3 mx-2"
              >
                +{{ user.image.length - 2 }} File(s)
              </span>
            </template>
          </v-file-input>

          <v-text-field
            class="mt-10"
            v-model="user.name"
            outlined
            dense
            label="Nome de usuário"
          />

          <v-text-field v-model="user.email" outlined dense label="Email" />

          <v-text-field
            v-model="user.cpf"
            outlined
            dense
            label="CPF do usuário"
            v-mask="'###.###.###-##'"
          />
          <div class="d-flex justify-center mb-2">
            <v-card
              @click="closeDialog"
              width="15em"
              height="40px"
              elevation="0"
              outlined
              color="white"
              class="text-center d-flex flex-column align-center justify-center"
            >
              <a class="primary--color">Cancelar</a>
            </v-card>
            <v-card
              @click="newUser"
              width="15em"
              height="40px"
              elevation="1"
              outlined
              color="primary"
              class="
                ml-5
                text-center
                d-flex
                flex-column
                align-center
                justify-center
              "
            >
              <a class="white--text">CADASTRAR CLIENTE</a>
            </v-card>
          </div>
        </v-col>
      </v-card>
    </v-dialog>
    <v-col cols="12">
      <v-card outlined height="88vh" elevation="0" color="transparent">
        <v-row>
          <v-col cols="12" md="6" class="d-flex justify-center">
            <v-card
              outlined
              height="15vh"
              width="50rem"
              elevation="1"
              color="#24153e"
              class="text-center d-flex flex-row align-center justify-center"
            >
              <v-col cols="12">
                <div class="white--text">{{ paginationParams.total }}</div>
                <div class="white--text"><h3>PROCESSOS</h3></div>
              </v-col>
            </v-card>
          </v-col>
          <v-col cols="12" md="6" class="d-flex justify-center">
            <v-card
              outlined
              height="15vh"
              width="50rem"
              elevation="1"
              color="#24153e"
              class="text-center d-flex flex-row align-center justify-center"
            >
              <v-col cols="12">
                <div class="white--text">{{ paginationParams.total }}</div>
                <div class="white--text"><h3>CLIENTES</h3></div>
              </v-col>
            </v-card>
          </v-col>
        </v-row>

        <v-row>
          <v-col cols="8">
            <v-card
              outlined
              height="40rem"
              width="100%"
              elevation="1"
              color="white"
              class="text-center d-flex flex-row justify-center"
            >
              <v-col cols="12">
                <v-row>
                  <v-col cols="4" md="4">
                    <v-text-field
                      v-model="search"
                      dense
                      append-icon="mdi-magnify"
                      placeholder="BUSCAR POR EMAIL"
                      outlined
                      single-line
                    ></v-text-field>
                  </v-col>
                  <v-col cols="8" md="8" class="d-flex flex-row-reverse">
                    <v-card
                      @click="openCreateDialog"
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
                      "
                    >
                      <a class="white--text">NOVO CLIENTE</a>
                    </v-card>
                  </v-col>
                </v-row>
                <v-data-table
                  :server-items-length="paginationParams.total"
                  @pagination="pagination"
                  :headers="headers"
                  :items="users"
                  :search="search"
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
                          <v-list-item @click="clearPerfil(item.id)" link>
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
            </v-card>
          </v-col>
          <v-col cols="4" v-if="!perfil.user.id">
            <v-card
              outlined
              height="40rem"
              width="100%"
              elevation="1"
              color="white"
              class="text-center d-flex flex-row align-center justify-center"
            >
              <v-row>
                <v-col cols="12" class="">
                  <v-icon icon size="5rem">mdi-account-question</v-icon>
                </v-col>
                <v-col cols="12">
                  <v-icon icon>Por favor selecione um usuário</v-icon>
                </v-col>
              </v-row>
            </v-card>
          </v-col>
          <v-col cols="4" v-else>
            <v-card
              outlined
              height="40rem"
              width="100%"
              elevation="1"
              color="white"
              class="text-center d-flex flex-column align-center justify-center"
            >
              <v-col cols="12" class="">
                <div class="d-flex justify-center mb-2">
                  <!-- ><span class="name">TS</span> -->
                  <v-avatar size="128" color="primary">
                    <v-avatar size="120">
                      <v-img :src="require(perfil.user.image)" aspect-ratio="1"></v-img>
                    </v-avatar>
                  </v-avatar>
                </div>

                <v-file-input
                  v-model="perfil.user.image"
                  :rules="rules[1]"
                  color="primary"
                  accept="image/png, image/jpeg, image/bmp"
                  placeholder="Pick an avatar"
                  append-icon="mdi-camera"
                  label="Alterar Foto de usuário"
                  width="30px"
                >
                  <template v-slot:selection="{ index, text }">
                    <v-chip
                      v-if="index < 2"
                      color="deep-purple accent-4"
                      dark
                      label
                      small
                    >
                      {{ text }}
                    </v-chip>

                    <span
                      v-else-if="index === 2"
                      class="text-overline grey--text text--darken-3 mx-2"
                    >
                      +{{ user.image.length - 2 }} File(s)
                    </span>
                  </template>
                </v-file-input>
                <v-text-field
                  class="mt-10"
                  v-model="perfil.user.name"
                  outlined
                  dense
                  label="Nome de usuário"
                />

                <v-text-field
                  v-model="perfil.user.email"
                  outlined
                  dense
                  label="Email"
                />

                <v-text-field
                  v-model="perfil.user.cpf"
                  outlined
                  dense
                  label="CPF do usuário"
                  v-mask="'###.###.###-##'"
                />
              </v-col>
            </v-card>
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
        this.loading = false
        console.log(error);
      }
    },
    async seePerfil(id) {
      this.loading = true;
      try {
        const response = await this.$axios("users/" + id);

        console.log("seeperfilll ::::::: " + JSON.stringify(response.data));

        this.perfil.user = response.data;
        this.loading = false;
      } catch (error) {
        console.log(error.message);
      }
    },
    async newUser() {
      try {
        this.user.password = "123456";
        await this.$axios.post("users/", {user: this.user});

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
        case 'master':
          return{
            title: 'Master'
          }
        case 'disabled':
          return{
            title: 'Inativo'
          }
      }
    },
    clearPerfil(id) {
      if (id) {
        this.seePerfil(id);
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
        { text: "Nome", value: "name", align: "center", sortable: false },
        { text: "CPF", value: "cpf", align: "center", sortable: false },
        { text: "Email", value: "email", align: "center", sortable: false },
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
          sortable: false,
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
