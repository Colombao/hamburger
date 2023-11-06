<template>
    <div>
      <form @submit.prevent="updateIngredient">
        <label for="tipo">Tipo:</label>
        <input v-model="ingredient.tipo" type="text" id="tipo" name="tipo" required>
  
        <label for="valor">Valor:</label>
        <input v-model="ingredient.valor" type="number" id="valor" name="valor" required>
  
        <button type="submit">Salvar Alterações</button>
      </form>
    </div>
  </template>
  
  <script>
  export default {
    data() {
      return {
        ingredient: {
          tipo: "", // Inicialize os campos com valores vazios
          valor: 0,
        },
      };
    },
    methods: {
      async fetchIngredientDetails() {
        const ingredientId = this.$route.params.id; // Obtém o ID do parâmetro da rota
        try {
          const response = await axios.get(`/api/ingredientes/${ingredientId}`);
          this.ingredient = response.data; // Armazena os detalhes do ingrediente
        } catch (error) {
          console.error("Erro ao buscar detalhes do ingrediente:", error);
        }
      },
      async updateIngredient() {
        try {
          const ingredientId = this.$route.params.id; // Obtém o ID do ingrediente a ser atualizado
          await axios.put(`/api/ingredientes/${ingredientId}`, this.ingredient);
          // Redireciona de volta para a lista de ingredientes após a atualização
          this.$router.push("/ingredientes");
        } catch (error) {
          console.error("Erro ao atualizar o ingrediente:", error);
        }
      },
    },
    created() {
      this.fetchIngredientDetails();
    },
  };
  </script>
  