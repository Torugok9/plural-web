<template>
  <v-row>
    <v-col cols="5" class="bg justify-center">
      <v-row class="justify-center">
        <div class="column align-self-center mt-5">
          <v-row align-center="center" no gutters>
            <v-img aspect-ratio="2" src="../../assets/plural.png" />
            <!-- <div class="text-h3 mt-1 font-weight-black logo-text">PLURAL</div>
            <div class="test subtitle-2 font-weight-thin text-start logo-text">
              REGISTRO <br />ESPECIALIZADO<br />DE PATENTES
            </div> -->
          </v-row>
          <div class="mt-16">
            <v-col cols="12" class="access d-flex justify-center">
              <b> ACESSO AO CLIENTE </b>
            </v-col>
            <v-col cols="12">
              <v-text-field
                v-model="email"
                label="Login"
                outlined
              ></v-text-field>
              <v-text-field
                v-model="password"
                type="password"
                label="Senha"
                outlined
              ></v-text-field>
            </v-col>

            <v-col cols="12"
              ><v-btn
                color="#7ED957"
                width="400px"
                height="50px"
                rounded
                depressed
                @click="authenticate"
              >
                <b class="access">Acessar</b>
              </v-btn></v-col
            >
          </div>
          <div class="column d-flex justify-center mt-5">
            <v-btn height="50" width="50" icon>
              <v-icon size="40">mdi-facebook</v-icon>
            </v-btn>
            <v-btn height="50" width="50" icon>
              <v-icon size="40">mdi-linkedin</v-icon>
            </v-btn>
            <v-btn height="50" width="50" icon>
              <v-icon size="40">mdi-instagram</v-icon>
            </v-btn>
          </div>
        </div>
      </v-row>
    </v-col>
    <v-col cols="7" class="pa-0" v-if="!$vuetify.breakpoint.mobile">
      <v-img
        class="wallpaper"
        :lazy-src="require('../../assets/loginbackground.png')"
        :src="require('../../assets/loginbackground.png')"
      />
    </v-col>
  </v-row>
</template>

<script>
import { mapActions } from "vuex";

export default {
  data: () => ({
    email: "",
    password: "",
    proccesses:[]
  }),
  mounted() {
    this.getProccess();
  },
  methods: {
    ...mapActions("authentication", ["validateSession", "login"]),
    async authenticate() {
      // Example of authentication
      try {
        await this.login({ email: this.email, password: this.password });
        this.$router.push({ name: "Proccess" });
      } catch (error) {
        console.log(error);
      }
    },
    async getProccess() {
      try {
        const response = await this.$axios.get(
          "proccesses/",
          this.currentUser.id
        );
        this.proccesses = response.data;
        if (response.data.phase) {
          this.phases = response.data.phase.map((el) => {
            return {
              id: el.id,
              description: el.description,
              proccess_id: el.proccess_id,
              created_at: this.formatDateTime(el.created_at),
              updated_at: this.formatDateTime(el.updated_at),
            };
          });
        }
      } catch (error) {
        console.log(error);
      }
    },
    formatDateTime(dataTime) {
      const day = dataTime.slice(8, 10);
      const month = dataTime.slice(5, 7);
      const year = dataTime.slice(0, 4);
      const time = dataTime.slice(11, 19);

      return `${day}/${month}/${year} às ${time}`;
    },
  },
};
</script>

<style>
.access {
  color: white;
}
.bg {
  background-color: white;
}
.logo-text {
  color: #3e2044;
}
.wallpaper {
  background-image: url("../../assets/loginbackground.png");
  width: 100vw;
  height: 100vh;
  background-size: cover;
  background-position: center;
  flex: 1;
}
</style>
