<template>
  <v-app-bar
    v-if="!$vuetify.breakpoint.mobile"
    app
  >
    <v-row class="align-end">
      <!-- App bar -->
    </v-row>
  </v-app-bar>
</template>

<script>
import { mapState } from "vuex";
export default {
  data() {
    return {
    };
  },
  computed: {
    ...mapState({
      currentUser: (state) => state.authentication.currentUser,
    }),
  },
};
</script>

<style></style>
