<template>
  <div class="input-container">
    <label :for="inputId" class="standard-label">{{ label }}</label>
    
    <!-- Input de texto padrão -->
    <input
      v-if="type === 'text' || type === 'email' || type === 'password'"
      :type="type"
      :id="inputId"
      :name="name"
      :value="modelValue"
      @input="handleInput"
      :placeholder="placeholder"
      :required="required"
      :maxlength="maxlength"
      class="standard-input"
    />
    
    <!-- Select -->
    <select
      v-else-if="type === 'select'"
      :id="inputId"
      :name="name"
      :value="modelValue"
      @input="handleInput"
      :required="required"
      class="standard-select"
    >
      <option v-if="defaultOption" value="default" hidden>{{ defaultOption }}</option>
      <option
        v-for="option in options"
        :key="option.id || option.value"
        :value="option.value || option.tipo"
      >
        {{ option.label || option.tipo }}
        <span v-if="option.valor"> - R$ {{ option.valor.toFixed(2) }}</span>
      </option>
    </select>
    
    <!-- Textarea -->
    <textarea
      v-else-if="type === 'textarea'"
      :id="inputId"
      :name="name"
      :value="modelValue"
      @input="handleInput"
      :placeholder="placeholder"
      :required="required"
      class="standard-textarea"
      :rows="rows || 3"
    ></textarea>
    
    <!-- Checkbox group -->
    <div v-else-if="type === 'checkbox-group'" class="checkbox-group">
      <div
        class="checkbox-container"
        v-for="option in options"
        :key="option.id"
      >
        <input
          type="checkbox"
          :name="name"
          :value="option.value || option.tipo"
          :checked="Array.isArray(modelValue) && modelValue.includes(option.value || option.tipo)"
          @change="handleCheckboxChange"
          class="standard-checkbox"
        />
        <span class="checkbox-label">
          {{ option.label || option.tipo }}
          <span v-if="option.valor"> - R$ {{ option.valor.toFixed(2) }}</span>
        </span>
      </div>
    </div>
    
    <!-- Mensagem de erro -->
    <span v-if="error" class="error-message">{{ error }}</span>
  </div>
</template>

<script>
export default {
  name: 'StandardInput',
  props: {
    label: {
      type: String,
      required: true
    },
    type: {
      type: String,
      default: 'text',
      validator: (value) => {
        return ['text', 'email', 'password', 'select', 'textarea', 'checkbox-group'].includes(value)
      }
    },
    modelValue: {
      type: [String, Array, Number],
      default: ''
    },
    name: {
      type: String,
      required: true
    },
    placeholder: {
      type: String,
      default: ''
    },
    required: {
      type: Boolean,
      default: false
    },
    options: {
      type: Array,
      default: () => []
    },
    defaultOption: {
      type: String,
      default: ''
    },
    error: {
      type: String,
      default: ''
    },
    maxlength: {
      type: [String, Number],
      default: null
    },
    rows: {
      type: [String, Number],
      default: 3
    }
  },
  computed: {
    inputId() {
      return this.name
    }
  },
  emits: ['update:modelValue'],
  methods: {
    handleInput(event) {
      this.$emit('update:modelValue', event.target.value)
    },
    handleCheckboxChange(event) {
      let currentValue = Array.isArray(this.modelValue) ? [...this.modelValue] : []
      
      if (event.target.checked) {
        if (!currentValue.includes(event.target.value)) {
          currentValue.push(event.target.value)
        }
      } else {
        currentValue = currentValue.filter(value => value !== event.target.value)
      }
      
      this.$emit('update:modelValue', currentValue)
    }
  }
}
</script>

<style scoped>
.input-container {
  display: flex;
  flex-direction: column;
  margin-bottom: 20px;
  width: 100%;
  max-width: 300px;
}

.standard-label {
  font-weight: bold;
  margin-bottom: 15px;
  color: #222;
  padding: 5px 10px;
  border-left: 4px solid #fcba03;
}

.standard-input,
.standard-select,
.standard-textarea {
  padding: 5px 10px;
  width: 100%;
  box-sizing: border-box;
  border: 1px solid #ccc;
  border-radius: 4px;
  font-size: 16px;
}

.standard-input:focus,
.standard-select:focus,
.standard-textarea:focus {
  outline: none;
  border-color: #fcba03;
  box-shadow: 0 0 5px rgba(252, 186, 3, 0.3);
}

.checkbox-group {
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  width: 100%;
}

.checkbox-container {
  display: flex;
  align-items: flex-start;
  width: 50%;
  margin-bottom: 20px;
}

.standard-checkbox {
  width: auto !important;
  margin-right: 6px;
}

.checkbox-label {
  font-size: 13px;
  color: #222;
}

.error-message {
  color: #ff0000;
  font-size: 14px;
  margin-top: 5px;
  padding: 2px 5px;
}
</style>
