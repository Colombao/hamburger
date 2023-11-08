import { shallowMount } from '@vue/test-utils';
import Dashboard from '@/components/dashboard.vue'
import Swal from 'sweetalert2'; // Importe o módulo do SweetAlert

describe('deleteBurger', () => {
    it('deve deletar o pedido', async () => {
      const id = 1;
  
      const mockSwalFire = jest.spyOn(Swal, 'fire').mockResolvedValue({
        isConfirmed: true,
      });
  
      // Mock da chamada fetch
      global.fetch = jest.fn().mockResolvedValue({
        json: jest.fn().mockResolvedValue({}),
      });
  
      const wrapper = shallowMount(Dashboard); // Crie uma instância do seu componente Vue
  
      await wrapper.vm.deleteBurger(id); // Chame o método deleteBurger no componente
  
      // Verifique se o SweetAlert foi chamado
      expect(mockSwalFire).toHaveBeenCalled();
  
      // Verifique se a fetch foi chamada com a URL correta para deletar o pedido
      expect(global.fetch).toHaveBeenCalledWith(`http://localhost:3000/burgers/${id}`, {
        method: 'DELETE',
      });
    });
  });