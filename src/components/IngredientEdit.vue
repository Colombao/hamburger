<template>
  <div class="ingredient-form">
    <form @submit.prevent="handleCadastrar" class="form-container">
      <StandardInput
        label="Sexo:"
        type="select"
        name="sexo"
        v-model="sexo"
        :options="[
          { value: 'Homem', label: 'Homem' },
          { value: 'Mulher', label: 'Mulher' },
        ]"
        default-option="Selecione o sexo"
        :required="true"
        :error="formErrors.sexo"
      />

      <StandardInput
        label="Nome Funcionario:"
        type="text"
        name="nome"
        v-model="nome"
        placeholder="Digite o nome do funcionário"
        :required="true"
        :error="formErrors.nome"
      />

      <StandardInput
        label="Area de Atuação:"
        type="text"
        name="atuacao"
        v-model="atuacao"
        placeholder="Digite a área de atuação"
        :required="true"
        :error="formErrors.atuacao"
      />

      <StandardInput
        label="CPF:"
        type="text"
        name="cpf"
        v-model="cpf"
        placeholder="000.000.000-00"
        :required="true"
        :maxlength="14"
        :error="formErrors.cpf"
        @update:modelValue="formatarCPF"
      />

      <StandardButton
        type="submit"
        variant="success"
        size="medium"
        full-width
        text="Cadastrar Funcionario"
      />
    </form>
  </div>
</template>

<script>
import Swal from "sweetalert2";
import Message from "./message.vue";
import StandardButton from "./StandardButton.vue";
import StandardInput from "./StandardInput.vue";

export default {
  name: "Ingredientes",
  data() {
    return {
      sexo: "",
      nome: "",
      atuacao: "",
      cpf: "",
      formErrors: {},
      id: "",
    };
  },
  methods: {
    formatarCPF(value) {
      // Remove todos os caracteres não numéricos
      let cpfNumerico = value.replace(/\D/g, "");

      // Aplica a máscara
      if (cpfNumerico.length <= 11) {
        cpfNumerico = cpfNumerico.replace(
          /(\d{3})(\d{3})(\d{3})(\d{2})/,
          "$1.$2.$3-$4"
        );
      }

      this.cpf = cpfNumerico;
    },
    async handleCadastrar(e) {
      e.preventDefault();
      try {
        const response = await fetch("http://localhost:3000/funcionarios", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            sexo: this.sexo,
            nome: this.nome,
            atuacao: this.atuacao,
            cpf: this.cpf,
            id: this.id,
          }),
        });

        if (response.ok) {
          const data = await response.json();
          console.log("Funcionario cadastrado com sucesso:", data);
          Swal.fire({
            icon: "success",
            title: "Cadastro realizado com sucesso!",
            showConfirmButton: false,
            timerProgressBar: true,
            timer: 1500,
          });
        } else {
          console.error("Erro ao cadastrar Funcionario:", response.statusText);
          Swal.fire({
            icon: "error",
            title: "Erro ao cadastrar Funcionario!",
            showConfirmButton: false,
            timerProgressBar: true,
            timer: 1500,
          });
        }
      } catch (error) {
        console.error("Erro ao cadastrar Funcionario:", error);
        Swal.fire({
          icon: "error",
          title: "Erro ao cadastrar Funcionario!",
          showConfirmButton: false,
          timerProgressBar: true,
          timer: 1500,
        });
      }
    },
  },
  components: {
    Message,
    StandardInput,
    StandardButton,
  },
};
</script>

<style scoped>
.ingredient-form {
  max-width: 400px;
  margin: 0 auto;
  padding: 20px;
}

.form-container {
  display: flex;
  flex-direction: column;
  gap: 15px;
  margin-top: 20px;
}
</style>
