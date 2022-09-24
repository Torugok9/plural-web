import Vue from "vue";
import Vuetify from "vuetify/lib/framework";
import colors from "vuetify/lib/util/colors";
import pt from "vuetify/src/locale/pt.ts";
import en from "vuetify/src/locale/en.ts";

Vue.use(Vuetify);

export default new Vuetify({
  lang: {
    locales: { pt, en },
    current: "pt",
  },

  theme: {
    themes: {
      light: {
        secondary: "#b0bec5",
        accent: "#8c9eff",
        error: "#b71c1c",
      },
      dark: {
        primary: colors.blue.lighten3,
      },
    },
  },
});