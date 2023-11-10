import { shallowMount } from '@vue/test-utils';
import SobreView from '../src/views/SobreView.vue';

describe('SobreView.vue', () => {
  it('deve renderizar o componente SobreView', () => {
    const wrapper = shallowMount(SobreView);
    
    expect(wrapper.exists()).toBe(true);
  });

  it('deve conter um título "Sobre Nós"', () => {
    const wrapper = shallowMount(SobreView);

    
    expect(wrapper.find('h1').text()).toBe('Sobre Nós');
  });
});

it('renderiza o iframe do mapa corretamente', () => {
  const wrapper = shallowMount(SobreView);

  const iframe = wrapper.find('.map-itself');

  expect(iframe.attributes('src')).toBe('https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d28573.217889001222!2d-49.15333402568361!3d-26.466936600000004!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x94de940dbec22f4d%3A0xf2864ccc867a7dc1!2sCentro%20Universit%C3%A1rio%20-%20Cat%C3%B3lica%20de%20Santa%20Catarina%20em%20Jaragu%C3%A1%20do%20Sul!5e0!3m2!1spt-BR!2sbr!4v1699398906068!5m2!1spt-BR!2sbr');
  expect(iframe.attributes('width')).toBe('600');
  expect(iframe.attributes('height')).toBe('450');
});
ApiTest.vue.test.js