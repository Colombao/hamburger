<template>
    <Login />
    <router-view />
</template>

<script>
import Login from "@/components/login.vue";

export default {
    name: "LoginView",
    components: { Login },
};
</script>
