<template>
  <Overlay v-if="loading == true"></Overlay>
  <v-card
    v-else
    outlined
    height="98vh"
    elevation="0"
    color="white"
    class="pa-2"
  >
    <v-col cols="12">
      <v-form ref="form" v-model="valid" lazy-validation>
        <v-row>
          <v-col cols="12" md="4">
            <v-text-field
              v-model="user.name"
              :counter="10"
              :rules="nameRules"
              label="Nome Completo"
              required
            ></v-text-field>
          </v-col>

          <v-col cols="12" md="4">
            <v-text-field
              v-model="user.email"
              :rules="emailRules"
              label="E-mail"
              required
            ></v-text-field>
          </v-col>
          <v-col cols="12" md="4">
            <v-text-field
              v-model="user.password"
              type="password"
              label="Senha"
              required
            ></v-text-field>
          </v-col>
          <v-col cols="12" md="4">
            <v-text-field
              v-model="user.rg"
              label="RG n°"
              required
            ></v-text-field>
          </v-col>
          <v-col cols="12" md="4">
            <v-text-field
              v-model="user.rg_organ"
              label="Orgão Expedidor"
              required
            ></v-text-field>
          </v-col>
          <v-col cols="12" md="4">
            <v-text-field
              v-model="user.cpf"
              v-mask="'###.###.###-##'"
              label="CPF/CNPJ n°"
              required
            ></v-text-field>
          </v-col>
          <v-col cols="12" md="4">
            <v-text-field
              v-model="user.phone"
              v-mask="'(##) # ####-####'"
              label="Telefone/Celular"
              required
            ></v-text-field>
          </v-col>
          <v-col cols="12" md="4">
            <v-text-field
              v-mask="'##/##/####'"
              v-model="user.birth_date"
              :rules="dateRules"
              label="Data de Nascimento"
              required
            ></v-text-field>
          </v-col>
          <v-col cols="12" md="4">
            <v-text-field
              v-model="user.naturality"
              label="Naturalidade"
              required
            ></v-text-field>
          </v-col>
          <v-col cols="12" md="4">
            <v-text-field
              v-model="user.nacionality"
              label="Nacionalidade"
              required
            ></v-text-field>
          </v-col>
          <v-col cols="12" md="4">
            <v-text-field
              v-model="user.occupation"
              label="Profissão"
              required
            ></v-text-field>
          </v-col>
          <v-col cols="12" md="4">
            <v-text-field
              v-model="user.filiation"
              label="Filiação"
              required
            ></v-text-field>
          </v-col>

          <v-col cols="12" md="12">
            <v-select
              v-model="user.civil_state"
              :items="civil_state"
              :rules="[(v) => !!v || 'Item is required']"
              label="Estado civil"
              required
            ></v-select>
          </v-col>

          <v-col cols="12" md="2">
            <v-btn
              :disabled="!valid"
              color="success"
              class="mr-4"
              @click="validate"
            >
              Cadastrar
            </v-btn>
          </v-col>

          <v-col cols="12" md="8">
            <v-btn color="grey white--text" class="mr-4" @click="reset">
              Limpar
            </v-btn>
          </v-col>
        </v-row>
      </v-form>
    </v-col>
  </v-card>
</template>

<script>
import Overlay from "../../components/Overlay/Overlay.vue";

export default {
  components: {
    Overlay,
  },
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
    user: {
      email: "",
      name: "",
      password: null,
      cpf: "",
      role: "client",
      rg: "",
      rg_organ: "",
      birth_date: "",
      naturality: "",
      nacionality: "",
      civil_state: "",
      occupation: "",
      filiation: "",
      phone: "",
    },
    valid: true,
    name: "",
    nameRules: [
      (v) => !!v || "Por favor, digite o nome !",
      (v) => (v && v.length >= 10) || "Nome inválido",
    ],
    email: "",
    emailRules: [
      (v) => !!v || "Por favor, digite o e-mail !",
      (v) => /.+@.+\..+/.test(v) || "E-mail precisa ser válido.",
    ],
    dateRules: [
      (v) => !!v || "Por favor, digite uma data de nascimento !",
      (v) => this.verifyBirthDate(v) || "Data inválida.",
    ],
    select: null,
    civil_state: ["Solteiro", "Casado", "Separado", "Divorciado", "Viúvo"],
    checkbox: false,
    id: null,
    loading: false,
  }),
  mounted() {
  },
  methods: {
    async registerUser() {
      this.loading = true;
      try {
        this.loading = false;
        await this.$axios.post("users/", { user: this.user });
      } catch (error) {
        this.loading = false;
        this.$swal({
          color: "#ffffff",
          background: "#34103B",
          toast: true,
          position: "top",
          showConfirmButton: false,
          timer: 4000,
          icon: "error",
          title: "Plural",
          text: "Não foi possível criar o usuário, por favor tente novamente mais tarde !",
        });
      }
    },
    verifyBirthDate(d) {
      var strData = d;
      var partesData = strData.split("/");
      var data = new Date(partesData[2], partesData[1] - 1, partesData[0]);
      // if (data > new Date()) return false;
      data < new Date() ?  false : true;
    },
    async validate() {
      this.loading = true;

      this.loading = false;
      await this.$refs.form.validate();

      this.loading = false;

      this.registerUser();
    },
    reset() {
      this.$refs.form.reset();
    },
    resetValidation() {
      this.$refs.form.resetValidation();
    },
  },
};
</script>

<style></style>
