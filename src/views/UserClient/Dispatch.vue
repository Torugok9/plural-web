<template>
  <v-row>
    <v-col cols="12">
      <v-card outlined height="91vh" elevation="0" color="white" class="pa-2">
        <v-card-title> Envio </v-card-title>
        <v-card-subtitle>
          Envios de documentos necessários como RG, CPF, Comprovante de
          endereço, CNPJ, contrato Social.
        </v-card-subtitle>
        <v-divider class="mx-4"></v-divider>
        <v-row class="fill-height" justify="center">
          <v-col cols="12" md="3" sm="12" lg="3">
            <v-card class="mt-10" height="400" width="400" outlined>
              <v-row justify="center" class="fill-height">
                <v-icon icon size="200"> mdi-plus </v-icon>
              </v-row>
            </v-card>
            <!-- dialog com botão -->
            <v-dialog v-model="dialog" persistent min-width="600px">
              <template v-slot:activator="{ on, attrs }">
                <v-btn
                  class="mx-6 mt-4"
                  color="#7ED957"
                  width="350px"
                  height="50px"
                  depressed
                  v-bind="attrs"
                  v-on="on"
                >
                  <b class="access">Enviar</b>
                </v-btn>
              </template>
              <v-card class="mx-auto" min-width="500">
                <v-card-title
                  class="text-h6 font-weight-regular justify-space-between"
                >
                  <span>{{ currentTitle }}</span>
                  <!-- <v-avatar
                    color="primary lighten-2"
                    class="subheading white--text"
                    size="24"
                    v-text="step"
                  ></v-avatar> -->
                </v-card-title>

                <v-window v-model="step">
                  <v-window-item :value="1">
                    <v-col cols="12" sm="12" md="12">
                      <v-file-input
                        v-model="document.arquive"
                        color="deep-purple accent-4"
                        counter
                        label="RG"
                        multiple
                        placeholder="Selecione seu arquivo"
                        prepend-icon="mdi-paperclip"
                        outlined
                        :show-size="1000"
                      >
                        <template v-slot:append>
                          <v-layout class="alignThis">
                            <v-btn icon color="primary" @click="postDocument()">
                              <v-icon>mdi-send</v-icon>
                            </v-btn>
                          </v-layout>
                        </template>
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
                            +{{ files.length - 2 }} arquivo(s).
                          </span>
                        </template>
                      </v-file-input>
                    </v-col>
                  </v-window-item>

                  <v-window-item :value="2">
                    <v-col cols="12" sm="12" md="12">
                      <v-file-input
                        v-model="document.arquive"
                        color="deep-purple accent-4"
                        counter
                        label="CPF"
                        multiple
                        placeholder="Selecione seu arquivo"
                        prepend-icon="mdi-paperclip"
                        outlined
                        :show-size="1000"
                      >
                        <template v-slot:append>
                          <v-layout class="alignThis">
                            <v-btn icon color="primary" @click="postDocument()">
                              <v-icon>mdi-send</v-icon>
                            </v-btn>
                          </v-layout>
                        </template>
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
                            +{{ files.length - 2 }} arquivo(s).
                          </span>
                        </template>
                      </v-file-input>
                    </v-col>
                  </v-window-item>

                  <v-window-item :value="3">
                    <v-col cols="12" sm="12" md="12">
                      <v-file-input
                        v-model="document.arquive"
                        color="deep-purple accent-4"
                        counter
                        label="Comprovante de endereço"
                        multiple
                        placeholder="Selecione seu arquivo"
                        prepend-icon="mdi-paperclip"
                        outlined
                        :show-size="1000"
                      >
                        <template v-slot:append>
                          <v-layout class="alignThis">
                            <v-btn icon color="primary" @click="postDocument()">
                              <v-icon>mdi-send</v-icon>
                            </v-btn>
                          </v-layout>
                        </template>
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
                            +{{ files.length - 2 }} arquivo(s).
                          </span>
                        </template>
                      </v-file-input>
                    </v-col>
                  </v-window-item>
                </v-window>

                <v-divider></v-divider>

                <v-card-actions>
                  <v-btn v-if="step != 1" text @click="step--"> Voltar </v-btn>
                  <v-btn v-if="step === 1" text @click="dialog = false">
                    cancelar
                  </v-btn>
                  <v-spacer></v-spacer>
                  <v-btn
                    v-if="step < 3"
                    color="primary"
                    depressed
                    @click="step++"
                  >
                    Próximo
                  </v-btn>
                  <v-btn
                    v-if="step === 3"
                    color="primary"
                    depressed
                    @click="dialog = false"
                  >
                    Finalizar !
                  </v-btn>
                </v-card-actions>
                <div class="d-flex justify-center">
                  <small
                    >*não se esqueça de clicar no ícone para enviar seu
                    documento !</small
                  >
                </div>
              </v-card>
            </v-dialog>
          </v-col>
        </v-row>
      </v-card>
    </v-col>
  </v-row>
</template>

<script>
import { mapState } from "vuex";

export default {
  components: {},
  data: () => ({
    step: 1,
    dialog: false,
    document: {
      name: "",
      arquive: "",
      user_id: "",
    },
  }),
  mounted() {},
  methods: {
    postDocument() {
      try {
        // console.log(this.currentUser.id)
        this.document.user_id = this.currentUser.id;
        this.$axios.post("documents/", this.document);
      } catch (error) {
        this.$swal({
          color: "#ffffff",
          background: "#34103B",
          toast: true,
          position: "top",
          showConfirmButton: false,
          timer: 4000,
          icon: "error",
          title: "Plural",
          text: "Não foi possivel enviar seus documentos, por favor entre em contato para que podemos resolver este problema !",
        });
      }
    },
  },
  computed: {
    ...mapState({
      currentUser: (state) => state.authentication.currentUser,
      currentTitle() {
        switch (this.step) {
          case 1:
            this.document.name = "RG";
            this.document.arquive = "";
            this.document.type = 0;
            return "Enviar RG";
          case 2:
            this.document.name = "CPF";
            this.document.arquive = "";
            this.document.type = 1;
            return "CPF";
          case 3:
            this.document.name = "Comprovante de Endereço";
            this.document.arquive = "";
            this.document.type = 3;
            return "Comprovante de endereço";
        }
      },
    }),
  },
};
</script>

<style>
.access {
  color: white;
}
.alignThis {
  margin-top: -6px !important;
}
</style>
