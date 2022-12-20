<template>
  <v-card class="high" rounded="0" v-if="!$vuetify.breakpoint.mobile">
    <v-navigation-drawer
      :mini-variant.sync="mini"
      v-model="drawer"
      class="high pa-0"
      width="12vw"
      app
    >
      <!-- Headers -->
      <div v-if="mini" class="d-flex justify-center mb-10 mt-5">
        <v-btn icon @click.stop="mini = !mini">
          <v-icon color="white">mdi-menu</v-icon>
        </v-btn>
      </div>
      <div v-else>
        <v-divider v-if="!mini"></v-divider>

        <div class="d-flex justify-center mt-4">
          <!-- ><span class="name">TS</span> -->
          <v-avatar size="128" color="white">
            <v-avatar size="120">
              <v-img
                src="https://randomuser.me/api/portraits/men/85.jpg"
              ></v-img>
            </v-avatar>
          </v-avatar>
        </div>

        <div class="d-flex justify-center mb-2 mt-5">
          <b class="white--text">{{ currentUser.name }}</b>
        </div>

        <div class="d-flex justify-end">
          <v-btn icon @click.stop="mini = !mini">
            <v-icon color="white">mdi-chevron-left</v-icon>
          </v-btn>
        </div>
        <v-divider color="white" v-if="!mini"></v-divider>
      </div>
      <!-- Content -->
      <v-list dense nav>
        <div class="" v-for="(item, index) in items" :key="index">
          <!-- v-if="hasPermission(...item.permissions)" -->
          <v-list-item
            v-if="item.name == 'Administração'"
            class="mt-5"
            disabled
            link
          >
            <v-list-item-icon>
              <v-icon :color="item.color">{{ item.icon }}</v-icon>
            </v-list-item-icon>

            <v-list-item-content>
              <v-list-item-title class="text-h9 white--text">
                {{ item.name }}
              </v-list-item-title>
            </v-list-item-content>
          </v-list-item>
          <v-list-item
            v-else
            class="mt-5"
            :to="
              item.path
                ? {
                    path: item.path,
                  }
                : ''
            "
            @click="item.method ? onClick(item.method) : ''"
            link
          >
            <v-list-item-icon>
              <v-icon :color="item.color">{{ item.icon }}</v-icon>
            </v-list-item-icon>

            <v-list-item-content>
              <v-list-item-title class="text-h9 white--text">
                {{ item.name }}
              </v-list-item-title>
            </v-list-item-content>
          </v-list-item>
        </div>
        <v-row class="d-flex justify-center mt-10">
          <router-link :to="{ name: 'Login' }">
            <v-btn color="white" icon @click="logout">
              <v-icon class="ml-3">mdi-logout</v-icon>
            </v-btn>
          </router-link>
        </v-row>
      </v-list>

      <template v-if="!mini" v-slot:append>
        <v-col class="down" cols="12">
          <v-img aspect-ratio="3" src="../../assets/logoMenuBranco.png" />
        </v-col>
      </template>

      <template v-else v-slot:append>
        <v-col cols="12">
          <v-row class="pa-2" align-center="center" justify="center">
            <v-img src="../../assets/P.png" />
          </v-row>
        </v-col>
      </template>
    </v-navigation-drawer>
  </v-card>
</template>

<script>
import { mapState, mapActions } from "vuex";

export default {
  data: () => ({
    selectedItem: 1,
    openBeforeCreatePatient: false,
    openCreatePatient: false,
    openCreatedPatient: false,
    lastPatientCreatedId: null,
    administrationOptions: [
      {
        name: "Clientes",
        icon: "mdi-account",
        path: "/master/painel",
        color: "white",
      },
      {
        name: "Agendamento",
        icon: "mdi-clipboard-text-clock",
        path: "/client/processos",
        color: "white",
      },
      {
        name: "Financeiro",
        icon: "mdi-credit-card-check-outline",
        path: "/master/financeiro",
        color: "white",
      },
    ],
    items: [
      {
        name: "Clientes",
        icon: "mdi-account",
        path: "/master/painel",
        color: "white",
      },
      {
        name: "Agendamento",
        icon: "mdi-clipboard-text-clock",
        path: "/master/agendamento",
        color: "white",
      },
      {
        name: "Financeiro",
        icon: "mdi-credit-card-check-outline",
        path: "/master/financeiro",
        color: "white",
      },
      {
        name: "Administração",
        icon: "mdi-briefcase-edit",
        path: "/client/suporte",
        color: "grey",
      },
    ],
    drawer: true,
    mini: true,
  }),
  methods: {
    ...mapActions("authentication", ["logout"]),
    async signOut() {
      try {
        this.logout();
      } catch (error) {
        console.log("Logout account error: ", error);
      }
    },
    onClick(method) {
      switch (method) {
        case "openBeforeCreatePatient":
          this.openBeforeCreatePatient = true;
          break;
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
.high {
  background: rgb(36, 21, 62);
  background: linear-gradient(
    0deg,
    rgba(36, 21, 62, 1) 12%,
    rgba(52, 16, 59, 1) 47%,
    rgba(36, 21, 62, 1) 72%
  );
}
.down {
  background: #24153e;
  /* background: linear-gradient(to right bottom, #34103b 50%, #dddfdd 50%);

  display: inline-block;
  padding: 0.75em 2em;
  margin: 0.5em 0; */
}
.name {
  color: #34103b;
}
.logo {
  color: #34103b;
}
.sublogo {
  font-size: 8px;
  color: #34103b;
}
</style>
