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
