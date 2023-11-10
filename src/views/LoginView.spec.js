import { shallowMount } from "@vue/test-utils";
import LoginView from "@/views/LoginView.vue";
import Login from "@/components/login.vue";

describe("LoginView.vue", () => {
  it("deve renderizar o componente Login", () => {
    const wrapper = shallowMount(LoginView);
    const loginComponent = wrapper.findComponent(Login);

    expect(loginComponent.exists()).toBe(true);
  });

  // Outros testes específicos do componente LoginView podem ser adicionados aqui, se necessário.
});
