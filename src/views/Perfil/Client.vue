<template>
  <v-row class="fill-height">
    <Overlay v-if="loading == true" />
    <v-col cols="12">
      <v-card outlined height="98vh" elevation="0" color="white" class="pa-2">
        <v-toolbar flat>
          <v-toolbar-title>{{ user.name }}</v-toolbar-title>
        </v-toolbar>
        <v-tabs>
          <v-tab>
            <v-icon left> mdi-account </v-icon>
            Perfil
          </v-tab>
          <v-tab>
            <v-icon left> mdi-file-cabinet </v-icon>
            Pasta
          </v-tab>
          <v-tab>
            <v-icon left> mdi-history </v-icon>
            Histórico
          </v-tab>
          <v-tab>
            <v-icon left> mdi-bag-checked </v-icon>
            Processo
          </v-tab>
          <v-tab>
            <v-icon left> mdi-currency-usd </v-icon>
            Faturamento
          </v-tab>

          <!-- Perfil -->
          <v-tab-item>
            <v-card flat class="mt-10">
              <v-col cols="12">
                <v-row>
                  <v-col cols="12" md="4">
                    <v-text-field
                      v-model="user.name"
                      :counter="10"
                      :rules="nameRules"
                      label="Nome Completo"
                      required
                      outlined
                      disabled
                    ></v-text-field>
                  </v-col>

                  <v-col cols="12" md="4">
                    <v-text-field
                      v-model="user.email"
                      :rules="emailRules"
                      label="E-mail"
                      required
                      outlined
                      disabled
                    ></v-text-field>
                  </v-col>
                  <v-col cols="12" md="4">
                    <v-text-field
                      v-model="user.password"
                      type="password"
                      label="Senha"
                      required
                      outlined
                      disabled
                    ></v-text-field>
                  </v-col>
                  <v-col cols="12" md="4">
                    <v-text-field
                      v-model="user.rg"
                      label="RG n°"
                      required
                      outlined
                      disabled
                    ></v-text-field>
                  </v-col>
                  <v-col cols="12" md="4">
                    <v-text-field
                      v-model="user.rg_organ"
                      label="Orgão Expedidor"
                      required
                      outlined
                      disabled
                    ></v-text-field>
                  </v-col>
                  <v-col cols="12" md="4">
                    <v-text-field
                      v-model="user.cpf"
                      v-mask="'###.###.###-##'"
                      label="CPF/CNPJ n°"
                      required
                      outlined
                      disabled
                    ></v-text-field>
                  </v-col>
                  <v-col cols="12" md="4">
                    <v-text-field
                      v-model="user.phone"
                      v-mask="'(##) # ####-####'"
                      label="Telefone/Celular"
                      required
                      outlined
                      disabled
                    ></v-text-field>
                  </v-col>
                  <v-col cols="12" md="4">
                    <v-text-field
                      v-mask="'##/##/####'"
                      v-model="user.birth_date"
                      :rules="dateRules"
                      label="Data de Nascimento"
                      required
                      outlined
                      disabled
                    ></v-text-field>
                  </v-col>
                  <v-col cols="12" md="4">
                    <v-text-field
                      v-model="user.naturality"
                      label="Naturalidade"
                      required
                      outlined
                      disabled
                    ></v-text-field>
                  </v-col>
                  <v-col cols="12" md="4">
                    <v-text-field
                      v-model="user.nacionality"
                      label="Nacionalidade"
                      required
                      outlined
                      disabled
                    ></v-text-field>
                  </v-col>
                  <v-col cols="12" md="4">
                    <v-text-field
                      v-model="user.occupation"
                      label="Profissão"
                      required
                      outlined
                      disabled
                    ></v-text-field>
                  </v-col>
                  <v-col cols="12" md="4">
                    <v-text-field
                      v-model="user.filiation"
                      label="Filiação"
                      required
                      outlined
                      disabled
                    ></v-text-field>
                  </v-col>

                  <v-col cols="12" md="12">
                    <v-select
                      v-model="user.civil_state"
                      :items="civil_state"
                      :rules="[(v) => !!v || 'Por favor, marque uma opção !']"
                      label="Estado civil"
                      required
                      outlined
                      disabled
                    ></v-select>
                  </v-col>
                </v-row>
              </v-col>
            </v-card>
          </v-tab-item>

          <!-- Pasta -->
          <v-tab-item>
            <Paste/>
          </v-tab-item>

          <!-- Histórico -->
          <v-tab-item>
            <v-card flat class="mt-10">
              <v-data-table :headers="historyHeaders" :items="histories">
                <template v-slot:[`item.menu`]="{ item }">
                  <div>
                    <v-menu offset-y>
                      <template v-slot:activator="{ attrs, on }">
                        <v-btn v-bind="attrs" v-on="on" text>
                          <v-icon dark>{{ item.menu }}</v-icon>
                        </v-btn>
                      </template>

                      <v-list>
                        <v-list-item @click="goToPerfil(item.id)" link>
                          <v-list-item-title style="color: #64676c">
                            Ver perfil
                          </v-list-item-title>
                        </v-list-item>
                      </v-list>
                    </v-menu>
                  </div>
                </template>
              </v-data-table>
            </v-card>
          </v-tab-item>

          <!-- Processo -->
          <v-tab-item>
            <v-card flat class="mt-10">
              <Proccess />
            </v-card>
          </v-tab-item>

          <!-- Financeiro -->
          <v-tab-item>
            <v-card flat class="mt-10">
              <v-col cols="12">
                <v-row>
                  <v-col cols="12" md="6">
                    <v-select
                      v-model="user.civil_state"
                      :items="servicesItems"
                      :rules="[(v) => !!v || 'Por favor, marque uma opção !']"
                      label="Serviço Contratado"
                      required
                      outlined
                    />
                  </v-col>

                  <v-col cols="12" md="6">
                    <v-text-field
                      v-model="user.password"
                      label="Preço"
                      required
                      outlined
                    />
                  </v-col>
                  <v-col cols="12" md="4">
                    <v-text-field
                      v-model="user.password"
                      type="number"
                      label="Quantidade de parcelas"
                      required
                      outlined
                    />
                  </v-col>
                  <v-col cols="12" md="8">
                    <v-select
                      v-model="user.civil_state"
                      :items="paymentForm"
                      :rules="[(v) => !!v || 'Por favor, marque uma opção !']"
                      label="Forma de pagamento"
                      required
                      outlined
                    />
                  </v-col>
                  <v-col cols="12" md="12">
                    <v-textarea v-model="user.civil_state" required outlined />
                  </v-col>
                  <v-col class="d-flex justify-end">
                    <v-card
                      @click="routeTo('register')"
                      width="15em"
                      height="40px"
                      elevation="1"
                      outlined
                      color="primary"
                      class="
                        text-center
                        d-flex
                        flex-column
                        align-center
                        justify-center
                        mt-1
                      "
                    >
                      <a class="white--text">ENVIAR FATURAMENTO</a>
                    </v-card>
                  </v-col>
                </v-row>
              </v-col>
            </v-card>
          </v-tab-item>
        </v-tabs>
      </v-card>
    </v-col>
  </v-row>
</template>

<script>
import Overlay from "../../components/Overlay/Overlay.vue";
import Proccess from "../Perfil/ClientComponents/CreateProccess.vue";
import Paste from "../Perfil/ClientComponents/PasteComponent.vue";

export default {
  components: {
    Overlay,
    Proccess,
    Paste,
  },
  data() {
    return {
      loading: false,
      user: {},
      histories:[],
      proccesses: [],
      registerProccess: false,
      viewProccess: false,
      servicesItems: [
        "Registro de Marca",
        "Registro de Patente",
        "Registro de Direito autoral",
        "Criação de nomes para Empresas",
        "Processo Administrativo do INSS",
        "Registro de Desenho Industrial",
        "Outros Processos Administrativos",
      ],
      paymentForm: [
        "Boleto",
        "Pix",
        "Transferência Bancária",
        "Cartão de crédito",
      ],
      nameRules: [
        (v) => !!v || "Por favor, digite o nome !",
        (v) => (v && v.length >= 10) || "Nome inválido",
      ],
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
    };
  },
  mounted() {
    this.seePerfil();
    this.fetchHistory();
  },
  methods: {
    async seePerfil(id) {
      console.log("asdjklajklsda " + this.$route.params.id);
      this.loading = true;
      try {
        id = this.$route.params.id;
        const response = await this.$axios("users/" + id);

        this.user = response.data;
        this.loading = false;
      } catch (error) {
        console.log(error.message);
      }
    },
    verifyBirthDate(d) {
      if (d) {
        var strData = d;
        var partesData = strData.split("/");
        var data = new Date(partesData[2], partesData[1] - 1, partesData[0]);
        // if (data > new Date()) return false;
        data < new Date() ? false : true;
      }
    },
    async fetchHistory(id) {
      this.loading = true;
      try {
        id = this.$route.params.id; 
        const response = await this.$axios("histories/", {
          params: { user_id: id },
        });

        this.histories = response.data;
        this.loading = false;
      } catch (error) {
        console.log(error.message);
      }
    },
    async fetchProccess() {
      this.loading = true;
      try {
        const response = await this.$axios.get("proccesses/", {
          params: { user_id: this.$route.params.id },
        });
        this.proccesses = response.data;
        console.log(response.data);
      } catch (error) {
        console.log(error);
      }
    },
    async fetchFiles() {},
    formatDateTime(dataTime) {
      const day = dataTime.slice(8, 10);
      const month = dataTime.slice(5, 7);
      const year = dataTime.slice(0, 4);
      const time = dataTime.slice(11, 19);

      return `${day}/${month}/${year} às ${time}`;
    },
  },
  computed: {
    historyHeaders() {
      return [
        { text: "Nome", value: "name", align: "center" },
        { text: "Título", value: "title", align: "center", sortable: false },
        { text: "Descrição", value: "description", align: "center" },
        {
          text: "Data e Hora",
          value: "created_at",
          align: "center",
          sortable: false,
        },
        {
          text: "Opções",
          value: "menu",
          align: "center",
          width: 30,
          sortable: false,
        },
      ];
    },
    proccessHeaders() {
      return [
        { text: "Nome", value: "name", align: "center" },
        { text: "CPF", value: "cpf", align: "center", sortable: false },
        { text: "Email", value: "email", align: "center" },
        {
          text: "Data de Criação",
          value: "created_at",
          align: "center",
          sortable: false,
        },
        {
          text: "Tipo de Usuário",
          value: "role.title",
          align: "center",
        },
        {
          text: "Opções",
          value: "menu",
          align: "center",
          width: 30,
          sortable: false,
        },
      ];
    },
  },
};
</script>

<style></style>
