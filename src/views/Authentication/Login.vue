<template>
  <v-row class="flex-wrap justify-center fixed">
    <div>
      <v-col cols="12" class="d-flex justify-center">
        <b>
          ACESSO AO CLIENTE
        </b>
      </v-col>
      <v-col cols="12">
        <v-text-field color="primary" outlined label="Login" v-model="email"></v-text-field>
      </v-col>

      <v-col cols="12">
        <v-text-field outlined label="Senha" v-model="password"></v-text-field>
      </v-col>
      <v-col cols="12"
        ><v-btn color="#7ED957" width="400px" height="50px" rounded depressed @click="authenticate"> <b class="access">Acessar</b> </v-btn></v-col
      >
    </div>
    <!-- Example of authentication -->
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

<style>
  .access{
    /* color:white;  */
  }
</style>
