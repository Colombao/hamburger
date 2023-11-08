<template>
    <div class="ingredient-form">
        <form @submit.prevent="addNewIngredient" class="form-container">
            <label for="categoria" class="label">Categoria:</label>
            <select
                v-model="categoria"
                id="categoria"
                name="categoria"
                class="select"
            >
                <option value="paes">Pães</option>
                <option value="carnes">Carnes</option>
                <option value="opcionais">Opcionais</option>
            </select>

            <label for="tipo" class="label">Ingrediente:</label>
            <input
                v-model="tipo"
                type="text"
                id="tipo"
                name="Tipo"
                required
                class="input"
            />

            <label for="valor" class="label">Valor:</label>
            <input
                v-model="valor"
                type="number"
                id="valor"
                name="valor"
                required
                class="input"
            />

            <button type="submit" class="button">Adicionar Ingrediente</button>
        </form>
    </div>
</template>

<script>
import Swal from "sweetalert2";
import Message from "./message.vue";

export default {
    name: "Ingredientes",
    data() {
        return {
            tipo: "",
            valor: "",
            categoria: "",
            paes: [],
            carnes: [],
            opcionais: [],
            formErrors: {},
        };
    },
    methods: {
        async getIngredientes() {
            const req = await fetch("http://localhost:3000/ingredientes");
            const data = await req.json();
            this.paes = data.paes;
            this.carnes = data.carnes;
            this.opcionaisdata = data.opcionais;
        },
        async addNewIngredient(e) {
            e.preventDefault();
            this.formErrors = {};

            if (!this.tipo) {
                this.formErrors.tipo = "Por favor, digite o tipo.";
            }

            if (!this.valor) {
                this.formErrors.valor = "Por favor, digite o valor.";
            }

            if (this.categoria === "default") {
                this.formErrors.categoria = "Por favor, selecione a categoria.";
            }

            if (Object.keys(this.formErrors).length === 0) {
                let novoIngrediente = {
                    id: "",
                    tipo: this.tipo,
                    valor: this.valor,
                };

                if (this.categoria === "paes") {
                    this.paes.push(novoIngrediente);
                } else if (this.categoria === "carnes") {
                    this.carnes.push(novoIngrediente);
                } else if (this.categoria === "opcionais") {
                    this.opcionais.push(novoIngrediente);
                }

                try {
                    console.log(novoIngrediente);
                    const req = await fetch(
                        "http://localhost:3000/ingredientes",
                        {
                            method: "POST",
                            headers: { "Content-Type": "application/json" },
                            body: JSON.stringify(novoIngrediente),
                        }
                    );
                    if (req.ok) {
                        Swal.fire({
                            icon: "success",
                            title: "Ingrediente cadastrado!",
                            showConfirmButton: false,
                            timerProgressBar: true,
                            timer: 1500,
                        });

                        this.tipo = "";
                        this.valor = "";
                        this.categoria = "paes";
                    } else {
                        Swal.fire({
                            icon: "error",
                            title: "Erro ao cadastrar ingrediente.",
                            text: "Por favor, tente novamente mais tarde.",
                        });
                    }
                } catch (error) {
                    console.error(error);
                    Swal.fire({
                        icon: "error",
                        title: "Erro ao cadastrar ingrediente.",
                        text: "Por favor, tente novamente mais tarde.",
                    });
                }
            }
        },
    },
    mounted() {
        this.getIngredientes();
    },
    components: {
        Message,
    },
};
</script>

<style scoped>
.ingredient-form {
    max-width: 400px;
    margin: 0 auto;
}

.form-container {
    display: flex;
    flex-direction: column;
    gap: 10px;
    margin-top: 20px;
}

.label {
    font-weight: bold;
}

.select,
.input {
    width: 100%;
    padding: 8px;
    font-size: 16px;
    border: 1px solid #ccc;
    border-radius: 4px;
    box-sizing: border-box;
}

.button {
    background-color: #4caf50;
    color: white;
    padding: 12px 20px;
    border: none;
    border-radius: 4px;
    cursor: pointer;
    font-size: 16px;
}

.button:hover {
    background-color: #45a049;
}
</style>
