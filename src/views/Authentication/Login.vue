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
            <v-col cols="12" class="d-flex justify-center">
              <b> TIPO DE USUÁRIO </b>
            </v-col>
            <!-- <v-col cols="12"> 
              <div class="mt-6">
                <v-btn width="295" color="primary" class="pa-6 white--text">
                  Area de Cliente
                </v-btn>
              </div>
            </v-col>
            <v-col cols="12">
              <div class="mt-6">
                <v-btn
                  width="295"
                  color="primary"
                  class="pa-6 white--text"
                  @click="
                    $router.push({
                      name: 'MasterLogin',
                    })
                  "
                >
                  Area Master
                </v-btn>
              </div>
            </v-col> -->
            <div class="" v-for="(item, index) in items" :key="index">
              <!-- v-if="hasPermission(...item.permissions)" -->
              <v-col cols="12">
                <div class="mt-6">
                  <v-btn
                    width="295"
                    :color="item.color"
                    class="pa-6 white--text"
                    :to="
                      item.path
                        ? {
                            path: item.path,
                          }
                        : ''
                    "
                  >
                    {{ item.name }}
                  </v-btn>
                </div>
              </v-col>
            </div>
          </div>
          <div class="column d-flex justify-center mt-5">
            <v-btn height="50" disabled width="50" icon>
              <v-icon size="40">mdi-facebook</v-icon>
            </v-btn>
            <v-btn height="50" disabled width="50" icon>
              <v-icon size="40">mdi-linkedin</v-icon>
            </v-btn>
            <v-btn height="50" disabled width="50" icon>
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
import { mapActions, mapGetters } from "vuex";

export default {
  data: () => ({
    items: [
      {
        name: "Cliente",
        path: "/client/login",
        color: "primary",
      },
      {
        name: "Administração",
        path: "/master/login",
        color: "primary",
      },
    ],
  }),
  mounted() {
    // this.getProccess();
  },
  methods: {
    ...mapActions("authentication", ["validateSession", "logout"]),
  },
  computed: {
    ...mapGetters({
      hasPermission: "authentication/hasPermission",
    }),
  },
};
</script>

<style>
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
