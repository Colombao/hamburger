<template>
  <div id="nav">
    <router-link to="/" id="logo-url">
      <img :src="logo" :alt="alt" id="logo" />
    </router-link>
    <router-link to="/Home">Home</router-link> |
    <router-link to="/Pedidos">Pedidos</router-link> |
    <router-link to="/Sobre">Sobre Nós</router-link> |
    <router-link to="/Funcionario">Funcionario</router-link>
  </div>
</template>
<script>
export default {
  name: "Navbar",
  props: ["logo", "alt"],
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
</style>
