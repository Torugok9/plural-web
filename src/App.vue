<template>
  <v-app class="ma-0 pa-0">
    <!-- Add MenuBar -->
    <!-- <Menu v-if="!hideMenu" /> -->

    <!-- Add TopAppBar -->
    <!-- <AppBar v-if="!hideMenu" /> -->
    <v-main>
      <!-- Provides the application the proper gutter -->
      <v-container fill-height>
        <!-- If using vue-router -->
        <router-view></router-view>
      </v-container>
    </v-main>
  </v-app>
</template>

<script>
// import Menu from "./components/Menu/Menu.vue";
// import AppBar from "./components/AppBar/AppBar.vue";

export default {
  name: "Frontend",

  components: {
    // Menu,
    // AppBar,
  },

  data: () => ({
  }),
  computed: {
    hideMenu() {
      return this.$route.meta.hideMenu || false
    },
  }
};
</script>