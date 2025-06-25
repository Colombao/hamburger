<template>
  <button
    :type="type"
    :class="buttonClasses"
    :disabled="disabled"
    @click="handleClick"
  >
    <slot>{{ text }}</slot>
  </button>
</template>

<script>
export default {
  name: "StandardButton",
  props: {
    text: {
      type: String,
      default: "Botão",
    },
    type: {
      type: String,
      default: "button",
      validator: (value) => {
        return ["button", "submit", "reset"].includes(value);
      },
    },
    variant: {
      type: String,
      default: "primary",
      validator: (value) => {
        return [
          "primary",
          "secondary",
          "success",
          "danger",
          "warning",
        ].includes(value);
      },
    },
    size: {
      type: String,
      default: "medium",
      validator: (value) => {
        return ["small", "medium", "large"].includes(value);
      },
    },
    disabled: {
      type: Boolean,
      default: false,
    },
    fullWidth: {
      type: Boolean,
      default: false,
    },
  },
  computed: {
    buttonClasses() {
      return [
        "standard-button",
        `standard-button--${this.variant}`,
        `standard-button--${this.size}`,
        {
          "standard-button--full-width": this.fullWidth,
          "standard-button--disabled": this.disabled,
        },
      ];
    },
  },
  emits: ["click"],
  methods: {
    handleClick(event) {
      if (!this.disabled) {
        this.$emit("click", event);
      }
    },
  },
};
</script>

<style scoped>
.standard-button {
  font-weight: bold;
  border: 2px solid;
  cursor: pointer;
  transition: all 0.3s ease;
  border-radius: 4px;
  text-align: center;
  text-decoration: none;
  display: inline-block;
  font-family: inherit;
  font-size: 16px;
}

/* Variantes de cor */
.standard-button--primary {
  background-color: #222;
  color: #fcba03;
  border-color: #222;
}

.standard-button--primary:hover:not(.standard-button--disabled) {
  background-color: #fff;
  color: #222;
  border-color: #222;
}

.standard-button--secondary {
  background-color: transparent;
  color: #222;
  border-color: #222;
}

.standard-button--secondary:hover:not(.standard-button--disabled) {
  background-color: #222;
  color: #fcba03;
}

.standard-button--success {
  background-color: #4caf50;
  color: white;
  border-color: #4caf50;
}

.standard-button--success:hover:not(.standard-button--disabled) {
  background-color: #45a049;
  border-color: #45a049;
}

.standard-button--danger {
  background-color: #f44336;
  color: white;
  border-color: #f44336;
}

.standard-button--danger:hover:not(.standard-button--disabled) {
  background-color: #da190b;
  border-color: #da190b;
}

.standard-button--warning {
  background-color: #fcba03;
  color: #222;
  border-color: #fcba03;
}

.standard-button--warning:hover:not(.standard-button--disabled) {
  background-color: #e6a702;
  border-color: #e6a702;
}

/* Tamanhos */
.standard-button--small {
  padding: 6px 12px;
  font-size: 14px;
}

.standard-button--medium {
  padding: 10px 20px;
  font-size: 16px;
}

.standard-button--large {
  padding: 14px 28px;
  font-size: 18px;
}

/* Modificadores */
.standard-button--full-width {
  width: 100%;
}

.standard-button--disabled {
  opacity: 0.6;
  cursor: not-allowed;
}

.standard-button--disabled:hover {
  background-color: inherit;
  color: inherit;
  border-color: inherit;
}
</style>
