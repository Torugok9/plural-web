<template>
  <!-- v-if="!$vuetify.breakpoint.mobile" -->

  <v-app-bar app elevate-on-scroll color="white">
    <v-spacer></v-spacer>
    <v-badge dot bordered overlap>
      <v-btn icon>
        <v-icon>mdi-bell-outline</v-icon>
      </v-btn>
    </v-badge>
    <div>
      <router-link :to="{ name: 'Login' }">
        <v-btn icon @click="logout">
          <v-icon class="ml-3">mdi-logout</v-icon>
        </v-btn>
      </router-link>
    </div>
  </v-app-bar>
</template>

<script>
import { mapState, mapActions } from "vuex";
export default {
  data() {
    return {};
  },
  methods: {
    ...mapActions("authentication", ["logout"]),
    async signOut() {
      try {
        this.logout();
      } catch (error) {
        console.log("Logout account error: ", error);
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
    rgba(36, 21, 62, 1) 0%,
    rgba(52, 16, 59, 1) 83%,
    rgba(36, 21, 62, 1) 100%
  );
}
</style>
