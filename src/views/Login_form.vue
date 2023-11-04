<template>
  <div class="login-form">
    <h2>Login</h2>
    <form @submit.prevent="login">
      <label for="username">Nome de Usuário:</label>
      <input type="text" id="username" v-model="username" required>
      <label for="password">Senha:</label>
      <input type="password" id="password" v-model="password" required>
      <button type="submit">Entrar</button>
      <router-link id = "cd" to="/Cadastro">Cadastre-se</router-link>
    </form>
  </div>
</template>
  
  <script>
  export default {
    data() {
      return {
        username: '',
        password: '',
      };
    },
    methods: {
      login() {
        if (this.username === 'usuario' && this.password === 'senha') {
          alert('Login bem-sucedido! Redirecionando para a página inicial...');
          this.$router.push({ name: 'Home' });
        } else {
          alert('Login falhou. Verifique seu nome de usuário e senha.');
        }
      },
    },
  };
  </script>
  
  <style scoped>
  .login-form {
    max-width: 300px;
    margin: 0 auto;
    padding: 20px;
    border: 1px solid #ccc;
    border-radius: 5px;
    background-color: #f5f5f5;
  }

  #cd{
    float: right;
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
  