<template>
  <v-row height="100">
    <v-col cols="12">
      <v-card outlined height="91vh" elevation="0" color="white" class="pa-2">
        <v-row align="center">
          <v-col>
            <v-file-input
              v-model="user.photo"
              :rules="rules[1]"
              color="primary"
              accept="image/png, image/jpeg, image/bmp"
              placeholder="Pick an avatar"
              prepend-icon="mdi-camera"
              label="Avatar"
              outlined
            >
              <template v-slot:selection="{ index, text }">
                <v-chip
                  v-if="index < 2"
                  color="deep-purple accent-4"
                  dark
                  label
                  small
                >
                  {{ text }}
                </v-chip>

                <span
                  v-else-if="index === 2"
                  class="text-overline grey--text text--darken-3 mx-2"
                >
                  +{{ user.photo.length - 2 }} File(s)
                </span>
              </template>
            </v-file-input>
          </v-col>
        </v-row>
      </v-card>
    </v-col>
  </v-row>
</template>

<script>
export default {
  components: {},
  data: () => ({
    rules: [
      {
        file: [
          (value) =>
            !value ||
            value.size < 2000000 ||
            "Avatar size should be less than 2 MB!",
        ],
      },
    ],
    user: {},
  }),
  mounted() {
    // this.pagination();
  },
  methods: {
    async fetchUsers() {
      try {
        const response = await this.$axios.post("users/", this.user);

        console.log(response.data.data);
      } catch (error) {
        console.log(error);
      }
    },
  },
  computed: {
    headers() {
      return [
        { text: "Nome", value: "name", align: "center", sortable: false },
        { text: "CPF", value: "cpf", align: "center", sortable: false },
        { text: "Email", value: "email", align: "center", sortable: false },
        {
          text: "Data de Criação",
          value: "created_at",
          align: "center",
          sortable: false,
        },
        {
          text: "Tipo de Usuário",
          value: "role",
          align: "center",
          sortable: false,
        },
      ];
    },
  },
};
</script>

<style></style>
