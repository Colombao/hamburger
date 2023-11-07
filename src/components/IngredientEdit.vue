<template>
  <div>
    <form @submit.prevent="addNewIngredient">
      <label for="categoria">Categoria:</label>
      <select v-model="categoria" id="categoria" name="categoria">
        <option value="paes">Pães</option>
        <option value="carnes">Carnes</option>
        <option value="opcionais">Opcionais</option>
      </select>
      <label for="tipo">Ingrediente:</label>
      <input v-model="tipo" type="text" id="tipo" name="Tipo" required>

      <label for="valor">Valor:</label>
      <input v-model="valor" type="number" id="valor" name="valor" required>

      <button type="submit">Adicionar Ingrediente</button>
    </form>
  </div>
</template>

<script>
import Swal from "sweetalert2";
import Message from "./message.vue";

export default {
  name: "Ingredientes",
  data() {
    return {
      novoIngrediente: {
        tipo: "",
        valor: 0,
        categoria: "paes", // Categoria padrão (pode ser definida de acordo com sua necessidade)
      },
    };
  },
  methods: {
    async addNewIngredient(e) {
          e.preventDefault();
          this.formErrors = {}; // Limpar os erros antes de fazer a validação

          // Validar o nome do cliente
          if (!this.tipo) {
            this.formErrors.tipo = "Por favor, digite o tipo.";
          }

          // Validar a seleção do pão
          if (this.valor === "default") {
            this.formErrors.valor = "Por favor, selecione o valor.";
          }

          // Validar a seleção da carne
          if (this.categoria === "default") {
            this.formErrors.categoria = "Por favor, selecione a categoria.";
          }

          // Verificar se há erros
          if (Object.keys(this.formErrors).length === 0) {
            const response = {
              tipo: this.tipo,
              valor: this.valor,
              categoria: this.categoria,
            };
              console.log(response);

              const dataJson = JSON.stringify(response);

              const req = await fetch("http://localhost:3000/ingredientes", {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: dataJson,
            });
            const res = await req.json();
            Swal.fire({
            icon: "success",
            title: `Ingrediente cadastrado! `,
            showConfirmButton: false,
            timerProgressBar: true,
            timer: 1500,
          });

          this.tipo = "";
          this.valor = "";
          this.categoria = "";
        }
      },
    },
    components: {
      Message,
    },
  };
  </script>
