<template>
  <v-app class="ma-0 pa-0">
    <Menu v-if="!hideMenu" />
    <AppBar v-if="!hideMenu" />
    <MenuMaster v-if="menuMaster" />

    <v-main>
      <v-container class="background full-height" fluid >
        <router-view></router-view>
      </v-container>
    </v-main>
  </v-app>
</template>

<script>
import Menu from "./components/Menu/Menu.vue";
import MenuMaster from "./components/Menu/MenuMaster.vue";
import AppBar from "./components/AppBar/AppBar.vue";

export default {
  name: "Plural",

  components: {
    Menu,
    AppBar,
    MenuMaster,
  },

  data: () => ({}),
  computed: {
    hideMenu() {
      return this.$route.meta.hideMenu || false;
    },
  },
};
</script>
<style>
.background {
  background-color: rgb(231, 231, 231);
}
</style>
