<template>
  <v-card flat class="mt-10">
    <v-data-table
      :headers="documentHeaders"
      :items="documents"
      :loading="loading"
    >
      <template v-slot:[`item.download`]="{ item }">
        <div>
          <v-btn v-if="document.arquive" v-bind="attrs" v-on="on" icon >
            <v-icon dark>{{ item.download }}</v-icon>
          </v-btn>
          <v-btn v-else v-bind="attrs" v-on="on" icon disabled >
            <v-icon dark>{{ item.download }}</v-icon>
          </v-btn>
        </div>
      </template>
      <template v-slot:[`item.menu`]="{ item }">
        <div>
          <v-menu offset-y>
            <template v-slot:activator="{ attrs, on }">
              <v-btn v-bind="attrs" v-on="on" text>
                <v-icon dark>{{ item.menu }}</v-icon>
              </v-btn>
            </template>

            <v-list>
              <v-list-item @click="changeStatus(item.id, 'aproved')" link>
                <v-list-item-title style="color: green">
                  Aprovar
                </v-list-item-title>
              </v-list-item>
              <v-list-item @click="changeStatus(item.id, 'refused')" link>
                <v-list-item-title style="color: red">
                  Recusar
                </v-list-item-title>
              </v-list-item>
            </v-list>
          </v-menu>
        </div>
      </template>
    </v-data-table>
  </v-card>
</template>

<script>
import "sweetalert2/dist/sweetalert2.min.css";

export default {
  components: {},
  data() {
    return {
      documents: [],
      document: {},
      loading: false,
    };
  },
  mounted() {
    this.getDocuments();
  },
  methods: {
    async getDocuments() {
      try {
        const response = await this.$axios("documents/", {
          params: {
            user_id: this.$route.params.id,
          },
        });

        if (response.data) {
          this.documents = response.data.map((document) => {
            return {
              id: document.id,
              name: document.name,
              status: this.formatStatus(document.status),
              doc_type: document.doc_type,
              created_at: document.created_at
                ? this.formatDateTime(document.created_at)
                : "",
              updated_at: document.updated_at
                ? this.formatDateTime(document.updated_at)
                : "",
              menu: "mdi-dots-vertical",
              download: "mdi-download",
            };
          });
        }
        this.loading = false;
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
          text: "Erro ao carregar seus documentos, por favor tente mais tarde !",
        });
      }
    },
    changeStatus(id, status) {
      this.$axios.put("documents/" + id, { status: status });
      this.$swal({
        color: "#ffffff",
        background: "#34103B",
        toast: true,
        position: "top",
        showConfirmButton: false,
        timer: 4000,
        icon: "success",
        title: "Plural",
        text: "O status foi atualizado com sucesso! por favor, atualize a página para que possa vizualizar !",
      });
      this.getDocuments();
    },
    formatStatus(status) {
      switch (status) {
        case "analysis":
          return "Em análise";
        case "aproved":
          return "Aprovado";
        case "refused":
          return "Reprovado";
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
  computed: {
    documentHeaders() {
      return [
        { text: "Nome", value: "name", align: "center" },
        { text: "Status", value: "status", align: "center", sortable: false },
        {
          text: "Data e Hora",
          value: "created_at",
          align: "center",
          sortable: false,
        },
        {
          text: "Download",
          value: "download",
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
  },
};
</script>

<style></style>
