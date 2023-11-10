<template>
    <div class="ingredient-form">
        <form @submit.prevent="handleCadastrar" class="form-container">
            <label for="sexo" class="label">Sexo:</label>
            <select
                v-model="sexo"
                id="sexo"
                name="sexo"
                class="select"
            >
                <option value="Homen">Homem</option>
                <option value="Mulher">Mulher</option>
                </select>

            <label for="nome" class="label">Nome Funcionario:</label>
            <input
                v-model="nome"
                type="text"
                id="nome"
                name="nome"
                required
                class="input"
            />

            <label for="atuacao" class="label">Area de Atuação:</label>
            <input
                v-model="atuacao"
                id="atuacao"
                name="atuacao"
                required
                class="input"
            />

            <label for="cpf" class="label">CPF:</label>
            <input
                v-model="cpf"
                type="text"
                id="cpf"
                name="cpf"
                required
                class="input"
                maxlength="11"
                @input="formatarCPF"
            />

            <button type="submit" class="button">Cadastrar Funcionario</button>
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
            sexo: "",
            nome: "",
            atuacao: "",
            cpf: "",
            formErrors: {},
            id: "",
        };
    },
    methods: {
        formatarCPF() {
            this.cpf = this.cpf.replace(/\D/g, '');

            this.cpf = this.cpf.replace(/(\d{3})(\d{3})(\d{3})(\d{2})/, '$1.$2.$3-$4');
        },
        async handleCadastrar(e) {
            e.preventDefault();
            try {
                const response = await fetch("http://localhost:3000/funcionarios", {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({
                        sexo: this.sexo,
                        nome: this.nome,
                        atuacao: this.atuacao,
                        cpf: this.cpf,
                        id: this.id,
                    }),
                });

                if (response.ok) {
                    const data = await response.json();
                    console.log("Funcionario cadastrado com sucesso:", data);
                    Swal.fire({
                        icon: "success",
                        title: "Cadastro realizado com sucesso!",
                        showConfirmButton: false,
                        timerProgressBar: true,
                        timer: 1500,
                    });
                } else {
                    console.error(
                        "Erro ao cadastrar Funcionario:",
                        response.statusText
                    );
                    Swal.fire({
                        icon: "error",
                        title: "Erro ao cadastrar Funcionario!",
                        showConfirmButton: false,
                        timerProgressBar: true,
                        timer: 1500,
                    });
                }
            } catch (error) {
                console.error("Erro ao cadastrar Funcionario:", error);
                Swal.fire({
                    icon: "error",
                    title: "Erro ao cadastrar Funcionario!",
                    showConfirmButton: false,
                    timerProgressBar: true,
                    timer: 1500,
                });
            }
        },
    },
    components: {
        Message,
    },
};
</script>

<style scoped>
.ingredient-form {
    max-width: 400px;
    height: 810px;
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
