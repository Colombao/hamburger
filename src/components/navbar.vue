<template>
  <div id="nav">
    <router-link to="/" id="logo-url">
      <img :src="logo" :alt="alt" id="logo" />
    </router-link>
    <router-link to="/Home">Home</router-link> |
    <router-link to="/Pedidos">Pedidos</router-link> |
    <router-link to="/Sobre">Sobre Nós</router-link> |
    <router-link to="/Funcionario">Funcionario</router-link>

    <!-- Seção do usuário logado -->
    <div class="user-section">
      <span class="user-welcome"
        >Olá, {{ authStore.getUser()?.nome || "Usuário" }}!</span
      >
      <button @click="handleLogout" class="logout-btn">Sair</button>
    </div>
  </div>
</template>
<script>
import { authStore } from "@/store/auth.js";
import Swal from "sweetalert2";

export default {
  name: "Navbar",
  props: ["logo", "alt"],
  data() {
    return {
      authStore, // Torna o authStore disponível no template
    };
  },
  methods: {
    handleLogout() {
      Swal.fire({
        title: "Tem certeza?",
        text: "Você será desconectado do sistema!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Sim, sair!",
        cancelButtonText: "Cancelar",
      }).then((result) => {
        if (result.isConfirmed) {
          authStore.logout();
          this.$router.push("/");
          Swal.fire(
            "Desconectado!",
            "Você foi desconectado com sucesso.",
            "success"
          );
        }
      });
    },
  },
};
</script>
<style scoped>
#nav {
  background-color: #222;
  border-bottom: 4px solid #111;
  padding: 15px 50px;
  display: flex;
  justify-content: flex-end;
  align-items: center;
}
#nav #logo-url {
  margin: auto;
  margin-left: 0;
}
#logo {
  width: 40px;
}
#nav a {
  color: #fcba03;
  text-decoration: none;
  margin: 12px;
  transition: 0.5s;
}
#nav a:hover {
  color: #fff;
}

/* Estilos para a seção do usuário */
.user-section {
  margin-left: 20px;
  display: flex;
  align-items: center;
  gap: 15px;
}

.user-welcome {
  color: #fcba03;
  font-weight: bold;
}

.logout-btn {
  background-color: #d33;
  color: white;
  border: none;
  padding: 8px 15px;
  border-radius: 5px;
  cursor: pointer;
  font-weight: bold;
  transition: 0.3s;
}

.logout-btn:hover {
  background-color: #b52d2d;
  transform: scale(1.05);
}
</style>
