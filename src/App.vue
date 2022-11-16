<template>
  <v-app class="ma-0 pa-0">
    <Menu v-if="!hideMenu" />
    <AppBar v-if="!hideMenu" />
    <MasterAppBar v-if="menuMaster" />

    <v-main class="background">
      <v-container class=" full-height" fluid >
        <router-view></router-view>
      </v-container>
    </v-main>
  </v-app>
</template>

<script>
import Menu from "./components/Menu/Menu.vue";
import MasterAppBar from "./components/AppBar/MasterAppBar.vue";
import AppBar from "./components/AppBar/AppBar.vue";

export default {
  name: "Plural",

  components: {
    Menu,
    AppBar,
    MasterAppBar,
  },

  data: () => ({}),
  computed: {
    hideMenu() {
      return this.$route.meta.hideMenu || false;
    },
    menuMaster() {
      return this.$route.meta.menuMaster || false;
    },
  },
};
</script>
<style>
.background {
  background-color: rgb(231, 231, 231);
}
</style>
