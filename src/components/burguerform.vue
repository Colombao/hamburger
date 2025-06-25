<template>
  <div>
    <!-- <Message :msg="msg" v-show="msg"/> -->
    <div>
      <form id="burguer-form" @submit="createBurger">
        <StandardInput
          label="Nome do cliente"
          type="text"
          name="nome"
          v-model="nome"
          placeholder="Digite seu nome"
          :required="true"
          :error="formErrors.nome"
        />

        <StandardInput
          label="Escolha o pão"
          type="select"
          name="pao"
          v-model="pao"
          :options="paes"
          default-option="Selecione o pão"
          :required="true"
          :error="formErrors.pao"
        />

        <StandardInput
          label="Escolha a Carne"
          type="select"
          name="carne"
          v-model="carne"
          :options="carnes"
          default-option="Selecione a sua carne"
          :required="true"
          :error="formErrors.carne"
        />

        <StandardInput
          label="Selecione os opcionais"
          type="checkbox-group"
          name="opcionais"
          v-model="opicionais"
          :options="opcionaisdata"
          :error="formErrors.opicionais"
        />

        <StandardInput
          label="Descreva alguma observação!"
          type="textarea"
          name="descricao"
          v-model="descricao"
          placeholder="Digite suas observações..."
          :rows="3"
        />

        <br />

        <StandardButton
          type="submit"
          variant="primary"
          size="medium"
          full-width
          text="Criar meu Burguer!"
        />
      </form>
    </div>
  </div>
</template>

<script>
import Swal from "sweetalert2";
import Message from "./message.vue";
import StandardButton from "./StandardButton.vue";
import StandardInput from "./StandardInput.vue";

export default {
  name: "BurguerForm",
  data() {
    return {
      paes: null,
      carnes: null,
      opcionaisdata: null,
      nome: null,
      pao: "default",
      carne: "default",
      opicionais: [],
      descricao: null,
      msg: null,
      formErrors: {},
    };
  },
  methods: {
    async getIngredientes() {
      const req = await fetch("http://localhost:3000/ingredientes");
      const data = await req.json();
      this.paes = data.paes;
      this.carnes = data.carnes;
      this.opcionaisdata = data.opcionais;
    },
    async getValIngredientes(ingredientes) {
      console.log(ingredientes);
      let total = 0;
      // for(const element in ingredientes){
      total += this.paes.find((element) => {
        return element.tipo == ingredientes["pao"];
      }).valor;
      total += this.carnes.find((element) => {
        return element.tipo == ingredientes["carne"];
      }).valor;
      let opcionaisArray = ingredientes.opicionais.slice(); // Converte a Proxy Array em um array padrão
      let teste = opcionaisArray.map((opcional) => {
        const opcionalEncontrado = this.opcionaisdata.find(
          (element) => element.tipo == opcional
        );
        total += opcionalEncontrado ? opcionalEncontrado.valor : 0;
      });
      return total;
    },

    async createBurger(e) {
      console.log(e);
      e.preventDefault();
      this.formErrors = {}; // Limpar os erros antes de fazer a validação

      // Validar o nome do cliente
      if (!this.nome) {
        this.formErrors.nome = "Por favor, digite seu nome.";
      }

      // Validar a seleção do pão
      if (this.pao === "default") {
        this.formErrors.pao = "Por favor, selecione o pão.";
      }

      // Validar a seleção da carne
      if (this.carne === "default") {
        this.formErrors.carne = "Por favor, selecione a carne.";
      }

      // Verificar se há erros
      if (Object.keys(this.formErrors).length === 0) {
        let total = await this.getValIngredientes({
          pao: this.pao,
          carne: this.carne,
          opicionais: this.opicionais,
        });
        const data = {
          nome: this.nome,
          pao: this.pao,
          carne: this.carne,
          opicionais: Array.from(this.opicionais),
          valor: total,
          descricao: this.descricao,
          status: "Solicitado",
        };

        console.log(data);

        const dataJson = JSON.stringify(data);

        const req = await fetch("http://localhost:3000/burgers", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: dataJson,
        });
        const res = await req.json();

        Swal.fire({
          icon: "success",
          title: `O pedido de N° ${res.id} da ${res.nome} foi criado com sucesso `,
          showConfirmButton: false,
          timerProgressBar: true,
          timer: 1500,
        });

        this.nome = "";
        this.carne = "";
        this.pao = "";
        this.opicionais = [];
        this.descricao = "";
        this.total = "";
      }
    },
  },
  mounted() {
    this.getIngredientes();
  },
  components: {
    Message,
    StandardInput,
    StandardButton,
  },
};
</script>

<style scoped>
#burguer-form {
  max-width: 400px;
  margin: 0 auto;
  flex-direction: column;
  align-items: center;
  display: flex;
  gap: 10px;
}
</style>
