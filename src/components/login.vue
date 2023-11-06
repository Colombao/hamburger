<template>
    <body>
        <div class="main">
            <input type="checkbox" id="chk" aria-hidden="true" />

            <div class="signup">
                <form>
                    <label for="chk" aria-hidden="true">Cadastre-se</label>
                    <input
                        type="text"
                        name="txt"
                        placeholder="Nome de Usuario"
                        required=""
                    />
                    <input
                        type="email"
                        name="email"
                        placeholder="Email"
                        required=""
                        on-error="Preenche ai paizao"
                    />
                    <input
                        type="password"
                        name="pswd"
                        placeholder="Senha"
                        required=""
                    />
                    <button>Sign up</button>
                </form>
            </div>

            <div class="login">
                <form>
                    <label for="chk" aria-hidden="true">Login</label>
                    <input
                        type="email"
                        v-model="loginEmail"
                        name="email"
                        placeholder="Email"
                        required=""
                    />
                    <input
                        type="password"
                        v-model="loginPassword"
                        name="pswd"
                        placeholder="Senha"
                        required=""
                    />
                    <button @click="handleLogin">Login</button>
                </form>
            </div>
        </div>
    </body>
</template>
<script>
import Swal from "sweetalert2";

export default {
    name: "Login",
    data() {
        return {
            loginEmail: "",
            loginPassword: "",
        };
    },
    methods: {
        async handleLogin(e) {
            e.preventDefault();
            console.log(this.loginEmail);
            console.log(this.loginPassword);
            try {
                const response = await fetch(
                    "http://localhost:3000/users?email=" +
                        this.loginEmail +
                        "&senha=" +
                        this.loginPassword
                );
                const data = await response.json();

                if (data.length > 0) {
                    Swal.fire({
                        icon: "success",
                        title: "Bem vindo ao Sistema",
                        timerProgressBar: true,
                        timer: 1500,
                        confirmButtonText: "Ok",
                    }).then((result) => {
                        if (result.isConfirmed) {
                            
                        }
                    });
                } else {
                    Swal.fire({
                        icon: "error",
                        title: "Credencias Incorretos!",
                        showConfirmButton: false,
                        timerProgressBar: true,
                        timer: 1500,
                    });
                }
            } catch (error) {
                console.error("Erro ao fazer login: ", error);
            }
        },
    },
};
</script>

<style scoped>
body {
    margin: 0;
    padding: 0;
    display: flex;
    justify-content: center;
    align-items: center;
    min-height: 100vh;
    font-family: "Jost", sans-serif;
    background-color: #222;
}
.main {
    width: 350px;
    height: 500px;
    background: red;
    overflow: hidden;
    background: url("https://doc-08-2c-docs.googleusercontent.com/docs/securesc/68c90smiglihng9534mvqmq1946dmis5/fo0picsp1nhiucmc0l25s29respgpr4j/1631524275000/03522360960922298374/03522360960922298374/1Sx0jhdpEpnNIydS4rnN4kHSJtU1EyWka?e=view&authuser=0&nonce=gcrocepgbb17m&user=03522360960922298374&hash=tfhgbs86ka6divo3llbvp93mg4csvb38")
        no-repeat center/ cover;
    border-radius: 10px;
    box-shadow: 5px 20px 50px #000;
}
#chk {
    display: none;
}
.signup {
    position: relative;
    width: 100%;
    height: 100%;
}
label {
    color: #fff;
    font-size: 2.3em;
    justify-content: center;
    display: flex;
    margin: 60px;
    font-weight: bold;
    cursor: pointer;
    transition: 0.5s ease-in-out;
}
input {
    width: 60%;
    height: 20px;
    background: #e0dede;
    justify-content: center;
    display: flex;
    margin: 20px auto;
    padding: 10px;
    border: none;
    outline: none;
    border-radius: 5px;
}
button {
    width: 60%;
    height: 40px;
    margin: 10px auto;
    justify-content: center;
    display: block;
    color: #fff;
    background: #573b8a;
    font-size: 1em;
    font-weight: bold;
    margin-top: 20px;
    outline: none;
    border: none;
    border-radius: 5px;
    transition: 0.2s ease-in;
    cursor: pointer;
}
button:hover {
    background: #6d44b8;
}
.login {
    height: 460px;
    background: #eee;
    border-radius: 60% / 10%;
    transform: translateY(-180px);
    transition: 0.8s ease-in-out;
}
.login label {
    color: #573b8a;
    transform: scale(0.6);
}

#chk:checked ~ .login {
    transform: translateY(-500px);
}
#chk:checked ~ .login label {
    transform: scale(1);
}
#chk:checked ~ .signup label {
    transform: scale(0.6);
}
</style>
