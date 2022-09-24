<template>
  <v-card v-if="!$vuetify.breakpoint.mobile">
    <v-navigation-drawer width="180" color="#F8F8F8" permanent floating app>
      <!-- Headers -->
      <!-- <v-list-item>
        <v-list-item-content>
          <v-list-item-title class="text-h4 logo"> Title </v-list-item-title>
        </v-list-item-content>
      </v-list-item> -->

      <!-- Content -->
      <!-- <v-list dense nav>
        <v-list-item link>
          <v-list-item-icon>
            <v-icon>mdi-home-variant</v-icon>
          </v-list-item-icon>

          <v-list-item-content>
            <v-list-item-title class="text-h9"> Dashboard </v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list> -->

    </v-navigation-drawer>
  </v-card>
</template>

<script>
export default {
  components: {
  },
  data: () => ({
  }),
  methods: {
  },
};
</script>

<style>
</style>
