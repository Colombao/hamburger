<template>
    <div>
      <form @submit.prevent="addNewIngredient">
        <label for="tipo">Tipo:</label>
        <input v-model="novoIngrediente.tipo" type="text" id="tipo" name="tipo" required>
  
        <label for="valor">Valor:</label>
        <input v-model="novoIngrediente.valor" type="number" id="valor" name="valor" required>
  
        <label for="categoria">Categoria:</label>
        <select v-model="novoIngrediente.categoria" id="categoria" name="categoria">
          <option value="paes">Pães</option>
          <option value="carnes">Carnes</option>
          <option value="opcionais">Opcionais</option>
        </select>
  
        <button type="submit">Adicionar Ingrediente</button>
      </form>
    </div>
  </template>
  
  <script>
  import axios from "axios"; // Certifique-se de que o Axios está importado
  
  export default {
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
      async addNewIngredient() {
        try {
          const response = await axios.post(`/api/ingredientes/${this.novoIngrediente.categoria}`, this.novoIngrediente);
          this.novoIngrediente = {}; // Limpa o formulário
          // Atualize a lista de ingredientes após a inserção
          this.getIngredientes(); // O método getIngredientes deve ser atualizado para buscar novamente a lista de ingredientes após a inserção.
        } catch (error) {
          console.error("Erro ao adicionar novo ingrediente:", error);
        }
      },
    },
  };
  </script>
  