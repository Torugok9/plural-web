<template>
  <v-row>
    <v-col cols="4">
      <v-card height="80vh" elevation="0" color="white" class="pa-4">
        <v-list flat>
          <v-col class="d-flex justify-center">
            <v-dialog v-model="dialog" persistent max-width="600px">
              <template v-slot:activator="{ on, attrs }">
                <v-btn color="primary" dark v-bind="attrs" v-on="on">
                  Registrar novo processo
                </v-btn>
              </template>
              <v-card width="600px">
                <v-card-title>
                  <span class="text-h5">Novo Processo</span>
                </v-card-title>
                <v-card-text>
                  <v-row>
                    <v-col cols="12" sm="12" md="12">
                      <v-textarea
                        v-model="newProccess.description"
                        label="Descrição"
                        hint="Descrição do Processo"
                      ></v-textarea>
                    </v-col>
                  </v-row>
                </v-card-text>
                <v-card-actions>
                  <v-spacer></v-spacer>
                  <v-btn color="black" text @click="dialog = false">
                    cancelar
                  </v-btn>
                  <v-btn color="primary" @click="createProccess"> criar </v-btn>
                </v-card-actions>
              </v-card>
            </v-dialog>
          </v-col>
          <v-card-title>Processos disponíveis para acompanhamento</v-card-title>
          <v-list-item-group v-model="selectedItem" color="primary">
            <v-list-item v-for="(proccess, i) in proccesses.data" :key="i">
              <v-list-item-content @click="windowSelector(proccess.id)">
                <v-list-item-title
                  >Processo de n°{{ proccess.id }}</v-list-item-title
                >
              </v-list-item-content>
              <v-list-item-action>
                <v-menu offset-y>
                  <template v-slot:activator="{ attrs, on }">
                    <v-btn v-bind="attrs" v-on="on" text>
                      <v-icon>mdi-dots-vertical</v-icon>
                    </v-btn>
                  </template>

                  <v-list>
                    <v-list-item @click="goToPerfil(item.id)" link>
                      <v-list-item-title style="color: #64676c">
                        <v-dialog v-model="dialog" persistent max-width="600px">
                          <template v-slot:activator="{ on, attrs }">
                            <v-btn
                              dark
                              v-bind="attrs"
                              v-on="on"
                            >
                              Adicionar nova Fase 
                            </v-btn>
                          </template>
                          <v-card width="600px">
                            <v-card-title>
                              <span class="text-h5">Novo Processo</span>
                            </v-card-title>
                            <v-card-text>
                              <v-row>
                                <v-col cols="12" sm="12" md="12">
                                  <v-textarea
                                    v-model="newPhase.description"
                                    label="Descrição"
                                    hint="Descrição da Fase"
                                  ></v-textarea>
                                </v-col>
                              </v-row>
                            </v-card-text>
                            <v-card-actions>
                              <v-spacer></v-spacer>
                              <v-btn color="black" text @click="dialog = false">
                                cancelar
                              </v-btn>
                              <v-btn color="primary" @click="createPhase(proccess.id)">
                                criar
                              </v-btn>
                            </v-card-actions>
                          </v-card>
                        </v-dialog>
                      </v-list-item-title>
                    </v-list-item>
                  </v-list>
                </v-menu>
              </v-list-item-action>
            </v-list-item>
          </v-list-item-group>
        </v-list>
      </v-card>
    </v-col>
    <v-col cols="8">
      <v-card height="80vh" elevation="0" color="white" class="pa-2">
        <v-card-title> Processo </v-card-title>
        <v-card-subtitle>
          Acompanhamento do processo n° {{ proccesses.id }}
        </v-card-subtitle>
        <v-divider color="white" class="mx-4"></v-divider>
        <v-card-text>
          <v-row align="center" justify="center">
            <v-col cols="8">
              <v-timeline align-top reverse>
                <v-timeline-item
                  v-for="(phase, i) in proccess.phase"
                  :key="i"
                  dot
                >
                  <v-card outlined elevation="2" width="500" height="100">
                    <v-card-text class="pa-2 font-weight-normal">
                      <strong>Equipe Plural</strong> {{ phase.created_at }}
                    </v-card-text>
                    <div class="pa-2">{{ phase.description }}</div>
                  </v-card>
                </v-timeline-item>
              </v-timeline>
            </v-col>
          </v-row>
        </v-card-text>
      </v-card>
    </v-col>
  </v-row>
</template>

<script>
import "sweetalert2/dist/sweetalert2.min.css";
export default {
  data() {
    return {
      proccess: {},
      proccesses: [],
      newProccess: {
        description: "",
        user_id: "",
      },
      newPhase: {
        description: "",
        proccess_id: "",
      },
      window: null,
      selectedItem: 1,
      dialog: false,
      options: [{ title: "Adicionar Fase" }],
    };
  },
  mounted() {
    this.getProccess();
  },
  methods: {
    createProccess() {
      try {
        this.newProccess.user_id = this.$route.params.id;
        this.$axios.post("proccesses/", this.newProccess);
        console.log(this.newProccess);
        this.dialog = false;
        this.getProccess();
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
          text: "Não foi possível registrar o processo a esse usuário, tente novamente mais tarde !",
        });
      }
    },
    createPhase(id) {
      try {
        this.newPhase.proccess_id = id
        this.$axios.post("phases/", this.newPhase);
        this.dialog = false;
        this.getProccess();
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
          text: "Não foi possível registrar o processo a esse usuário, tente novamente mais tarde !",
        });
      }
    },
    async getProccess() {
      try {
        const response = await this.$axios.get("proccesses/", {
          params: { user_id: this.$route.params.id },
        });
        this.proccesses = response.data;
      } catch (error) {
        console.log(error);
      }
    },
    async showProccess() {
      try {
        const response = await this.$axios.get("proccesses/" + this.window);
        this.proccess = response.data;
        console.log("SHOW ::::::", this.proccess);
      } catch (error) {
        console.log(error);
      }
    },
    windowSelector(id) {
      this.window = id;
      console.log(this.window);
      this.showProccess();
    },
    formatDateTime(dataTime) {
      const day = dataTime.slice(8, 10);
      const month = dataTime.slice(5, 7);
      const year = dataTime.slice(0, 4);
      const time = dataTime.slice(11, 19);

      return `${day}/${month}/${year} às ${time}`;
    },
  },
  computed: {},
};
</script>

<style></style>
