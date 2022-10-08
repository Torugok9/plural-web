<template>
  <v-row>
    <v-col cols="12">
      <v-card outlined height="91vh" elevation="0" color="white" class="pa-2">
        <v-card-title> Suporte </v-card-title>
        <v-card-subtitle>
          Contato de suporte para ajuda via telefone.
        </v-card-subtitle>
        <v-divider class="mx-4"></v-divider>
      </v-card>
    </v-col>
  </v-row>
</template>

<script>
import { mapState } from "vuex";

export default {
  components: {},
  data: () => ({}),
  mounted() {},
  methods: {},
  computed: {
    ...mapState({
      currentUser: (state) => state.authentication.currentUser,
    }),
  },
};
</script>

<style>
.access {
  color: white;
}
</style>
