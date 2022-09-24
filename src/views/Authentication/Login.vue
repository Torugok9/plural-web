<template>
  <v-row class="flex-wrap justify-center fixed">
    <!-- Example of authentication -->
    <v-col cols="12">
      <v-text-field label="Email" v-model="email"></v-text-field>
    </v-col>
    <v-col cols="12">
      <v-text-field label="Password" v-model="password"></v-text-field>
    </v-col>
    <v-col cols="12"
      ><v-btn depressed @click="authenticate"> Entrar </v-btn></v-col
    >
  </v-row>
</template>

<script>
import { mapActions } from "vuex";

export default {
  data: () => ({
    email: "",
    password: "",
  }),
  methods: {
    ...mapActions("authentication", ["validateSession", "login"]),
    async authenticate() {
      // Example of authentication
      try {
        await this.login({ email: this.email, password: this.password });
        this.$router.push({ name: "Dashboard" });
      } catch (error) {
        console.log(error);
      }
    },
  },
};
</script>

<style></style>
