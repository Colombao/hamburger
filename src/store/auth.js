import { reactive } from "vue";

// Store simples para gerenciar autenticação
export const authStore = reactive({
  user: null,
  isAuthenticated: false,

  // Método para fazer login
  login(userData) {
    this.user = userData;
    this.isAuthenticated = true;
    // Salva no localStorage para persistir entre sessões
    localStorage.setItem("user", JSON.stringify(userData));
    localStorage.setItem("isAuthenticated", "true");
  },

  // Método para fazer logout
  logout() {
    this.user = null;
    this.isAuthenticated = false;
    // Remove do localStorage
    localStorage.removeItem("user");
    localStorage.removeItem("isAuthenticated");
  },

  // Método para verificar se já está logado (ao recarregar a página)
  checkAuth() {
    const savedUser = localStorage.getItem("user");
    const savedAuthState = localStorage.getItem("isAuthenticated");

    if (savedUser && savedAuthState === "true") {
      this.user = JSON.parse(savedUser);
      this.isAuthenticated = true;
      return true;
    }
    return false;
  },

  // Método para obter dados do usuário
  getUser() {
    return this.user;
  },

  // Método para verificar se está autenticado
  isLoggedIn() {
    return this.isAuthenticated;
  },
});
