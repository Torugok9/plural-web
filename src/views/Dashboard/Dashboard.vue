<template>
  <v-row class="">
    Dashboard
  </v-row>
</template>

<script>
import { mapState } from "vuex";

export default {
  components: {
  },
  data: () => ({
  }),
  mounted() {
  },
  methods: {
  },
  computed: {
    ...mapState({
      currentUser: (state) => state.authentication.currentUser,
    }),
  },
};
</script>

<style>
</style>
