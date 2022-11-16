<template>
  <!-- v-if="!$vuetify.breakpoint.mobile" -->
  <v-card
    width="100%"
    height="10vh"
    elevation="1"
    rounded="0"
    class="text-center d-flex flex-column align-center justify-center"
    color="#34103b"
    >
    <!-- color="#34103b" -->
    <v-row
      align="center"
      justify="center"
      :style="{ height: deviceHeight * 0.6 + 'px' }"
    >
      <v-col
        cols="12"
        xs="12"
        sm="12"
        md="12"
        lg="12"
        class="d-flex justify-center mr-6"
      >
        <a
        color="white"
          class="appBar mb-0 white--text "
          @click="
            $router.push({
              name: 'Panel',
            })
          "
          >CLIENTES</a
        >

        <!-- <v-divider vertical class="mx-3" color="white" />

        <a
        color="white"
          class="appBar mb-0 white--text"
          @click="
            $router.push({
              name: 'Register',
            })
          "
          >CADASTRO</a
        > -->

        <v-divider vertical class="mx-3" color="white" />

        <router-link :to="{ name: 'Login' }">
          <v-btn class="mt-1" icon @click="logout">
            <v-icon color="white" class="ml-3">mdi-logout</v-icon>
          </v-btn>
        </router-link>
      </v-col>
    </v-row>
  </v-card>
</template>

<script>
import { mapState, mapActions } from "vuex";
export default {
  data() {
    return {};
  },
  methods: {
    ...mapActions("authentication", ["logout"]),
    deviceHeight() {
      return this.$vuetify.breakpoint.height;
    },
    deviceWidth() {
      return this.$vuetify.breakpoint.width;
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
.appBar {
  font-size: 30px;
  /* color: 'white'; */
  /* color: 'white'; */
}
.logout {
}
</style>
