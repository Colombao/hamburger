# Sistema de Controle de Acesso - Hamburguer App

## Funcionalidades Implementadas

### 1. **Store de Autenticação** (`src/store/auth.js`)

- Gerencia o estado de autenticação do usuário
- Persiste dados no localStorage para manter login entre sessões
- Métodos disponíveis:
  - `login(userData)` - Faz login do usuário
  - `logout()` - Faz logout e limpa dados
  - `checkAuth()` - Verifica se já está autenticado
  - `isLoggedIn()` - Retorna se está logado
  - `getUser()` - Retorna dados do usuário

### 2. **Guards de Rota** (`src/router/index.js`)

- **Guard Global**: Verifica autenticação antes de cada navegação
- **Meta Flags**: Rotas marcadas com `requiresAuth: true` são protegidas
- **Redirecionamentos Automáticos**:
  - Usuário não logado tentando acessar área protegida → Redirecionado para login
  - Usuário logado tentando acessar página de login → Redirecionado para home

### 3. **Rotas Protegidas**

Todas as seguintes rotas requerem autenticação:

- `/home` - Página inicial
- `/Pedidos` - Gerenciamento de pedidos
- `/Sobre` - Página sobre
- `/Funcionario` - Área do funcionário
- `/ingredientes/edit/:id` - Edição de ingredientes

### 4. **Sistema de Logout**

- **Rota Automática**: `/logout` - Faz logout automático
- **Botão no Navbar**: Confirmação via SweetAlert2
- **Limpeza Completa**: Remove dados do localStorage e redireciona para login

### 5. **Melhorias no Login** (`src/components/login.vue`)

- Integração com o store de autenticação
- Salvamento automático dos dados do usuário
- Verificação de autenticação ao montar o componente
- Melhor tratamento de erros

### 6. **Navbar Atualizado** (`src/components/navbar.vue`)

- Exibe nome do usuário logado
- Botão de logout com confirmação
- Estilos responsivos

## Como Usar

### Para Desenvolvedores

1. **Verificar se usuário está logado**:

```javascript
import { authStore } from "@/store/auth.js";

if (authStore.isLoggedIn()) {
  // Usuário está logado
  const userData = authStore.getUser();
  console.log(`Usuário: ${userData.nome}`);
}
```

2. **Fazer logout programaticamente**:

```javascript
import { authStore } from "@/store/auth.js";

authStore.logout();
this.$router.push("/");
```

3. **Proteger uma nova rota**:

```javascript
{
  path: "/nova-rota",
  name: "NovaRota",
  component: NovoComponente,
  meta: { requiresAuth: true } // Adicione esta linha
}
```

### Para Usuários Finais

1. **Login**: Acesse a página inicial e faça login com suas credenciais
2. **Navegação**: Todas as páginas internas são protegidas
3. **Logout**: Clique no botão "Sair" no navbar ou acesse `/logout`
4. **Sessão Persistente**: Seu login será mantido mesmo fechando o navegador

## Segurança

- ✅ Rotas protegidas por guards
- ✅ Verificação de autenticação em tempo real
- ✅ Limpeza de dados ao fazer logout
- ✅ Redirecionamentos automáticos
- ✅ Persistência segura no localStorage
- ✅ Validação de credentials no backend

## Estrutura de Arquivos

```
src/
├── store/
│   └── auth.js                 # Store de autenticação
├── router/
│   └── index.js               # Rotas com guards
├── components/
│   ├── login.vue              # Login com integração ao store
│   └── navbar.vue             # Navbar com logout
└── views/                     # Páginas protegidas
    ├── HomeView.vue
    ├── Pedidos.vue
    ├── SobreView.vue
    └── IngredientesView.vue
```

## Próximos Passos Sugeridos

1. **Roles/Permissões**: Implementar diferentes níveis de acesso
2. **Token JWT**: Migrar para autenticação baseada em tokens
3. **Refresh Token**: Sistema de renovação automática de sessão
4. **2FA**: Autenticação de dois fatores
5. **Audit Log**: Log de atividades do usuário
