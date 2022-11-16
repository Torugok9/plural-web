<template>
  <v-row>
    <v-col cols="5" class="bg justify-center">
      <v-row class="justify-center">
        <div class="column align-self-center mt-5">
          <v-row align-center="center" no gutters>
            <div class="subtitle-2 font-weight-regular gray--text">
            <v-btn
              text
              color="gray"
              class="pa-0"
              @click="
                $router.push({
                  path: '/',
                })
              "
            >
              <v-icon>mdi-arrow-left</v-icon>
            </v-btn>
          </div>
            <v-img aspect-ratio="2" src="../../assets/plural.png" />
            <!-- <div class="text-h3 mt-1 font-weight-black logo-text">PLURAL</div>
            <div class="test subtitle-2 font-weight-thin text-start logo-text">
              REGISTRO <br />ESPECIALIZADO<br />DE PATENTES
            </div> -->
          </v-row>
          
          <div class="mt-16">
            <v-col cols="12" class="d-flex justify-center">
              <b> ACESSO A ADMINISTRAÇÃO </b>
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
                color="primary"
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
    proccesses: [],
  }),
  methods: {
    ...mapActions("authentication", ["validateSession", "login"]),
    async authenticate() {
      try {
        await this.login({ email: this.email, password: this.password });
        this.$router.push({ name: "Panel" });
      } catch (error) {
        console.log(error);
      }
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
