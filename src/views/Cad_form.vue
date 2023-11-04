<template>
    <div class="signup-form">
      <h2>Cadastro</h2>
      <form @submit.prevent="signup">
        <label for="username">Nome de Usuário:</label>
        <input type="text" id="username" v-model="username" required>
  
        <label for="email">E-mail:</label>
        <input type="email" id="email" v-model="email" required>
  
        <label for="password">Senha:</label>
        <input type="password" id="password" v-model="password" required>
  
        <button type="submit">Cadastrar</button>
      </form>
    </div>
  </template>
  
  <script>
  export default {
    name: 'SignupForm',
    data() {
      return {
        username: '',
        email: '',
        password: '',
      };
    },
    methods: {
      signup() {
        // Aqui você pode implementar a lógica de cadastro
        // Por exemplo, enviar os dados para um servidor ou salvar localmente
        alert('Cadastro bem-sucedido! Redirecionando para a página de login...');
        this.$router.push({ name: 'Login_form' });
      },
    },
  };
  </script>
  
  <style scoped>
  .signup-form {
    max-width: 300px;
    margin: 0 auto;
    padding: 20px;
    border: 1px solid #ccc;
    border-radius: 5px;
    background-color: #f5f5f5;
  }
  
  label {
    display: block;
    margin-bottom: 5px;
  }
  
  input {
    width: 100%;
    padding: 5px;
    margin-bottom: 10px;
  }
  
  button {
    background-color: #007bff;
    color: #fff;
    border: none;
    padding: 10px;
    border-radius: 5px;
    cursor: pointer;
  }
  
  button:hover {
    background-color: #0056b3;
  }
  </style>
  