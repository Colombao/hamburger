import { shallowMount } from "@vue/test-utils";
import HomeView from "@/views/HomeView.vue";
import Banner from "@/components/banner.vue";
import BurgerForm from "@/components/burguerform.vue";

describe("Home.vue", () => {
  it("deve renderizar o componente Banner", () => {
    const wrapper = shallowMount(HomeView);
    const bannerComponent = wrapper.findComponent(Banner);

    expect(bannerComponent.exists()).toBe(true);
  });

  it("deve renderizar o componente BurgerForm", () => {
    const wrapper = shallowMount(HomeView);
    const burgerFormComponent = wrapper.findComponent(BurgerForm);

    expect(burgerFormComponent.exists()).toBe(true);
  });

  // Outros testes específicos do componente Home podem ser adicionados aqui, se necessário.
});
