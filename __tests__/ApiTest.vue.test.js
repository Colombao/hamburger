const axios = require('axios');
const fs = require('fs'); // Importe o módulo 'fs' no início do arquivo


test('Test API endpoint', async () => {
    const response = await axios.get('http://localhost:3000/users');
    expect(response.status).toBe(200);
  
    // Ajuste o resultado esperado para corresponder aos dados reais
    const expectedData = [
      {
        email: "teste@gmail.com",
        id: 0,
        nome: "usuarioteste",
        senha: "teste",
      },
      {
        email: "231@gmail.com",
        id: 1,
        nome: "Pedro",
        senha: "3132",
      },
      {
        email: "lucsa.gamer@gmail.com",
        id: 2,
        nome: "LucasGamer",
        senha: "lucas",
      },
    ];
  
    expect(response.data).toEqual(expectedData);
  
    // Para entregar os resultados no formato JSON
    const testResult = {
      status: response.status,
      data: expectedData, // Usamos os dados esperados
    };
  
    // Salve os resultados em um arquivo JSON
    const fs = require('fs');
    fs.writeFileSync('apiTestResultuser.json', JSON.stringify(testResult, null, 2));
  });

test('Test API endpoint Ingredientes', async () => {
    const response = await axios.get('http://localhost:3000/ingredientes');
    expect(response.status).toBe(200);
  
    // Ajuste o resultado esperado para corresponder ao que a API retorna
    const expectedData = {
        paes: [
            { id: 1, tipo: 'Italiano Branco', valor: 6.5 },
            { id: 2, tipo: '3 Queijos', valor: 7 },
            { id: 3, tipo: 'Parmesão e Orégano', valor: 7.5 },
            { id: 4, tipo: 'Integral', valor: 6 },
            { id: 5, tipo: 'Brioche', valor: 8 },
            { id: 6, tipo: 'Low carb', valor: 9 },
            { id: 7, tipo: 'Italiano', valor: 6.5 },
          ],
      carnes: [
        { id: 1, tipo: 'Maminha', valor: 15 },
        { id: 2, tipo: 'Alcatra', valor: 14 },
        { id: 3, tipo: 'Picanha', valor: 18 },
        { id: 4, tipo: 'Veggie burger', valor: 12 },
      ],
      opcionais: [
        { id: 1, tipo: 'Bacon', valor: 2 },
        { id: 2, tipo: 'Cheddar', valor: 2.5 },
        { id: 3, tipo: 'Salame', valor: 2 },
        { id: 4, tipo: 'Tomate', valor: 1 },
        { id: 5, tipo: 'Cebola roxa', valor: 1 },
        { id: 6, tipo: 'Pepino', valor: 1.5 },
      ],
    };
  
    expect(response.data).toEqual(expectedData);
  
    // Para entregar os resultados no formato JSON
    const testResult = {
      status: response.status,
      data: response.data,
    };
  
    // Salve os resultados em um arquivo JSON
    const fs = require('fs');
    fs.writeFileSync('apiTestResult.json', JSON.stringify(testResult, null, 2));
  });

  test('Test API endpoint with specific data', async () => {
    const expectedData = {
      nome: "joaoo",
      pao: "Integral",
      carne: "Alcatra",
      opicionais: ["Salame"],
      valor: 22,
      status: "Solicitado",
      id: 1
    };
  
    const response = await axios.get('http://localhost:3000/burgers');
  
    expect(response.status).toBe(200);
  
    const responseData = response.data[0];
  
    expect(responseData).toEqual(expectedData);
  });

test('Test API endpoint Status', async () => {
  // Faça uma solicitação para a sua API
  const response = await axios.get('http://localhost:3000/status');

  // Verifique se a resposta da API é bem-sucedida (status 200)
  expect(response.status).toBe(200);

  // Defina os dados esperados com base no exemplo que você forneceu
  const expectedData = [
    {
      id: 1,
      tipo: "Solicitado"
    },
    {
      id: 2,
      tipo: "Em produção"
    },
    {
      id: 3,
      tipo: "Finalizado"
    }
  ];

  // Verifique se os dados da resposta da API correspondem aos dados esperados
  expect(response.data).toEqual(expectedData);

});