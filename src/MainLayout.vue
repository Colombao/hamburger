<template>
    <Navbar :logo="logo_src" :alt="app_name" />
    <router-view />
    <Footer />
</template>
<script>
import Footer from "./components/footer.vue";
import Navbar from "./components/navbar.vue";

export default {
    name: "MainLayout",
    components: {
        Navbar,
        Footer,
    },
    data() {
        return {
            logo_src: "/img/logo.png",
            app_name: "Make Your Burguer",
        };
    },
};
</script>
<style>
* {
    font-family: Arial, Helvetica, sans-serif;
    padding: 0;
    margin: 0;
    box-sizing: border-box;
}
.main-container {
    margin: 50px;
    min-height: 300px;
}
h1 {
    text-align: center;
    font-size: 42px;
    margin-bottom: 30px;
    color: #222;
}
</style>
