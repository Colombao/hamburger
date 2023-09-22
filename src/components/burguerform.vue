<template>
  <div>
    <!-- <Message :msg="msg" v-show="msg"/> -->
    <div>
      <form id="burguer-form" @submit="createBurger">
        <div class="input-container">
          <label for="nome">Nome do cliente</label>
          <input
            type="text"
            id="nome"
            name="nome"
            v-model="nome"
            placeholder="Digite seu nome"
          />
          <span v-if="formErrors.nome" class="error">{{
            formErrors.nome
          }}</span>
        </div>
        <div class="input-container">
          <label for="pao">Escolha o pão</label>
          <select name="pao" id="pao" v-model="pao">
            <option value="default" hidden>Selecione o pão</option>
            <option v-for="pao in paes" :key="pao.id" :value="pao.tipo">
              {{ pao.tipo }} - R$ {{ pao.valor.toFixed(2) }} 
            </option>
          </select>
          <span v-if="formErrors.pao" class="error">{{ formErrors.pao }}</span>
        </div>
        <div class="input-container">
          <label for="carne">Escolha a Carne</label>
          <select name="carne" id="carne" v-model="carne">
            <option value="default" hidden>Selecione a sua carne</option>
            <option v-for="carne in carnes" :key="carne.id" :value="carne.tipo">
              {{ carne.tipo }} - R$ {{ carne.valor.toFixed(2) }} 
            </option>
          </select>
          <span v-if="formErrors.carne" class="error">{{
            formErrors.carne
          }}</span>
        </div>
        <div id="opcionais-container" class="input-container">
          <label id="opcionais-title" for="opcionais"
            >Selecione os opcionais</label
          >
          <div
            class="checkbox-container"
            v-for="opcional in opcionaisdata"
            :key="opcional.id"
          >
            <input
              type="checkbox"
              name="opcionais"
              v-model="opicionais"
              :value="opcional.tipo"
            />
            <span>{{ opcional.tipo }} - R$ {{ opcional.valor.toFixed(2) }} </span>
          </div>
          <span v-if="formErrors.opicionais" class="error">{{
            formErrors.opicionais
          }}</span>
        </div>
        <div id="descricao" class="input-container">
          <label for="descricao">Descreva alguma observação!</label>
          <input type="text">
        </div>
        <br>
        <div class="input-container">
          <input type="submit" class="submit-btn" value="Criar meu Burguer!" />
        </div>
      </form>
    </div>
  </div>
</template>

<script>
import Swal from "sweetalert2";
import Message from "./message.vue";

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
    async getValIngredientes(ingredientes){
      console.log(ingredientes);
      let total = 0
      // for(const element in ingredientes){
        total+= this.paes.find((element)=>{
         return element.tipo == ingredientes['pao']
        }).valor 
        total+= this.carnes.find((element)=>{
         return element.tipo == ingredientes['carne']
        }).valor
        let opcionaisArray = ingredientes.opicionais.slice(); // Converte a Proxy Array em um array padrão
        let teste = opcionaisArray.map(opcional => {
        const opcionalEncontrado = this.opcionaisdata.find(element => element.tipo == opcional);
        total += opcionalEncontrado ? opcionalEncontrado.valor : 0;
        });
        return total
},

    async createBurger(e) {
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

      // Validar a seleção dos opcionais
      if (this.opicionais.length === 0) {
        this.formErrors.opicionais =
          "Por favor, selecione pelo menos um opcional.";
      }

      // Verificar se há erros
      if (Object.keys(this.formErrors).length === 0) {
        let total = await this.getValIngredientes({pao:this.pao, carne:this.carne, opicionais:this.opicionais})
        const data = {
          nome: this.nome,
          pao: this.pao,
          carne: this.carne,
          opicionais: Array.from(this.opicionais),
          valor: total,
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
        this.total ="";
      }
    },
  },
  mounted() {
    this.getIngredientes();
  },
  components: {
    Message,
  },
};
</script>

<style scoped>
.error {
  color: red;
}
#burguer-form {
  max-width: 400px;
  margin: 0 auto;
  flex-direction: column;
  align-items: center;
  display: flex;
}

.input-container {
  display: flex;
  flex-direction: column;
  margin-bottom: 20px;
  width: 300px;
}

label {
  font-weight: bold;
  margin-bottom: 15px;
  color: #222;
  padding: 5px 10px;
  border-left: 4px solid #fcba03;
}

input,
select {
  padding: 5px 10px;
  width: 300px;
}

#opicionais-container {
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
}

#opicionais-title {
  width: 100%;
}

.checkbox-container {
  display: flex;
  align-items: flex-start;
  width: 50%;
  margin-bottom: 20px;
}

.checkbox-container span,
.checkbox-container input {
  width: auto;
}

.checkbox-container span {
  margin-left: 6px;
  font-size: 13px;
}

.submit-btn {
  background-color: #222;
  color: #fcba03;
  font-weight: bold;
  border: 2px solid #222;
  padding: 10px;
  margin: 0 auto;
  cursor: pointer;
  transition: 0.5s;
}

.submit-btn:hover {
  background-color: #fff;
  color: #222;
}
</style>
