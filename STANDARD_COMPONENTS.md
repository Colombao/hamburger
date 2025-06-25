# Componentes Padronizados

Este documento descreve os componentes padronizados criados para manter consistência visual e de código em toda a aplicação.

## StandardInput

Componente para inputs padronizados que suporta diferentes tipos de campos.

### Props

| Prop            | Tipo                | Padrão | Descrição                                                                          |
| --------------- | ------------------- | ------ | ---------------------------------------------------------------------------------- |
| `label`         | String              | -      | **Obrigatório.** Texto do label                                                    |
| `type`          | String              | 'text' | Tipo do input: 'text', 'email', 'password', 'select', 'textarea', 'checkbox-group' |
| `modelValue`    | String/Array/Number | ''     | Valor do campo (v-model)                                                           |
| `name`          | String              | -      | **Obrigatório.** Nome do campo                                                     |
| `placeholder`   | String              | ''     | Placeholder do campo                                                               |
| `required`      | Boolean             | false  | Se o campo é obrigatório                                                           |
| `options`       | Array               | []     | Opções para select ou checkbox-group                                               |
| `defaultOption` | String              | ''     | Texto da opção padrão para select                                                  |
| `error`         | String              | ''     | Mensagem de erro                                                                   |
| `maxlength`     | String/Number       | null   | Limite de caracteres                                                               |
| `rows`          | String/Number       | 3      | Número de linhas para textarea                                                     |

### Exemplos de Uso

#### Input de texto

```vue
<StandardInput
  label="Nome"
  type="text"
  name="nome"
  v-model="nome"
  placeholder="Digite seu nome"
  :required="true"
  :error="formErrors.nome"
/>
```

#### Select

```vue
<StandardInput
  label="Categoria"
  type="select"
  name="categoria"
  v-model="categoria"
  :options="categorias"
  default-option="Selecione uma categoria"
  :required="true"
/>
```

#### Checkbox Group

```vue
<StandardInput
  label="Opcionais"
  type="checkbox-group"
  name="opcionais"
  v-model="opcionais"
  :options="listaOpcionais"
/>
```

#### Textarea

```vue
<StandardInput
  label="Observações"
  type="textarea"
  name="observacoes"
  v-model="observacoes"
  placeholder="Digite suas observações..."
  :rows="4"
/>
```

### Formato das Opções

Para select e checkbox-group, as opções devem seguir um dos formatos:

```javascript
// Formato simples
[
  { value: "opcao1", label: "Opção 1" },
  { value: "opcao2", label: "Opção 2" },
][
  // Formato do sistema de hambúrguer (com preço)
  ({ id: 1, tipo: "Pão Francês", valor: 2.5 },
  { id: 2, tipo: "Pão Integral", valor: 3.0 })
];
```

## StandardButton

Componente para botões padronizados com diferentes variantes e tamanhos.

### Props

| Prop        | Tipo    | Padrão    | Descrição                                                        |
| ----------- | ------- | --------- | ---------------------------------------------------------------- |
| `text`      | String  | 'Botão'   | Texto do botão (pode usar slot também)                           |
| `type`      | String  | 'button'  | Tipo: 'button', 'submit', 'reset'                                |
| `variant`   | String  | 'primary' | Variante: 'primary', 'secondary', 'success', 'danger', 'warning' |
| `size`      | String  | 'medium'  | Tamanho: 'small', 'medium', 'large'                              |
| `disabled`  | Boolean | false     | Se o botão está desabilitado                                     |
| `fullWidth` | Boolean | false     | Se o botão ocupa toda a largura                                  |

### Exemplos de Uso

#### Botão primário

```vue
<StandardButton
  type="submit"
  variant="primary"
  size="medium"
  full-width
  text="Salvar"
/>
```

#### Botão de sucesso

```vue
<StandardButton
  type="button"
  variant="success"
  size="large"
  text="Confirmar"
  @click="confirmar"
/>
```

#### Botão com slot

```vue
<StandardButton variant="danger" @click="deletar">
  <i class="icon-trash"></i> Excluir
</StandardButton>
```

## Estilos

Os componentes seguem o padrão visual da aplicação:

- **Cores primárias:** #222 (escuro) e #fcba03 (amarelo)
- **Bordas:** 4px solid #fcba03 nos labels
- **Transições:** 0.3s ease para hover
- **Typography:** Font-weight bold para labels

## Migração

Para migrar formulários existentes:

1. Importe os componentes:

```javascript
import StandardInput from "./StandardInput.vue";
import StandardButton from "./StandardButton.vue";
```

2. Registre nos components:

```javascript
components: {
  StandardInput,
  StandardButton,
}
```

3. Substitua os inputs/botões pelos componentes padronizados
4. Remova estilos CSS que agora são tratados pelos componentes
5. Ajuste a lógica se necessário (especialmente para formatação de dados)

## Benefícios

- **Consistência:** Visual uniforme em toda a aplicação
- **Manutenibilidade:** Mudanças centralizadas nos componentes
- **Reutilização:** Menos código duplicado
- **Validação:** Sistema de erro padronizado
- **Acessibilidade:** Labels e IDs corretos automaticamente
