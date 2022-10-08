<template>
  <v-app class="ma-0 pa-0">
    <Menu v-if="!hideMenu" />
    <AppBar v-if="!hideMenu" />

    <v-main>
      <v-container class="background full-height" fluid >
        <router-view></router-view>
      </v-container>
    </v-main>
  </v-app>
</template>

<script>
import Menu from "./components/Menu/Menu.vue";
import AppBar from "./components/AppBar/AppBar.vue";

export default {
  name: "Plural",

  components: {
    Menu,
    AppBar,
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
