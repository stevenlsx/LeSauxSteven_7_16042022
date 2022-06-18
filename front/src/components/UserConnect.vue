<template>
	<div class="connect_main">
		<div class="formConnect">
			<input type="checkbox" id="chk" aria-hidden="true">

			<div class="login">
				<form @submit.prevent="login">
					<label for="chk" aria-hidden="true">Connexion</label>

					<input type="email" name="email" placeholder="Email" required v-model="userLogin.email">
					<input type="password" name="pswd" placeholder="Mot de passe" required v-model="userLogin.password">
					<p v-show="errorData">Les données soumises sont incorrectes</p>
					<button type="submit">Se connecter</button>
				</form>
			</div>

			<div class="signup">
				<form @submit.prevent="signup">
					<label for="chk" aria-hidden="true">Inscription</label>
					<input type="text" name="firstname" placeholder="Prenom" required v-model="userSignup.firstname">

					<input type="text" name="lastname" placeholder="Nom" required v-model="userSignup.lastname">

					<input type="email" name="email" placeholder="Email" required v-model="userSignup.email"
						@change="isMailValid">
					<p v-show="errorMail">Le mail n'est pas au format</p>
					<input type="password" name="pswd" placeholder="Mot de passe" required v-model="userSignup.password"
						@change="isPswdValid">

					<!--<input type="checkbox" name="role" placeholder="Admin" required="">-->
					<p v-show="errorPswd">Le mot de passe est incorrect</p>
					<button type="submit">S'inscrire</button>
					<p v-show="errorData">Les données soumises sont incorrectes</p>
				</form>
			</div>
		</div>
	</div>
</template>

<script>
import axios from "axios"

export default {
	name: "UserConnection",
	data() {
		return {
			//Login
			userLogin: {
				email: null,
				password: null
			},
			//Signup
			userSignup: {
				firstname: null,
				lastname: null,
				email: null,
				password: null
			},
			errorData: false,
			errorMail: false,
			errorPswd: false,
			mailIsValid: false,
			pswdIsValid: false,
		}
	},
	methods: {
		login() {

			if (
				this.userLogin.email !== null &&
				this.userLogin.password !== null
			) {
				this.$store.dispatch("login", this.userLogin)
			} else {
				this.errorData = true;
			}
		},
		signup() {
			if (
				(
					this.userSignup.firstname !== null ||
					this.userSignup.lastname !== null ||
					this.userSignup.email !== null &&
					this.userSignup.password !== null
				) &&
				(this.mailIsValid == true && this.pswdIsValid == true)
			) {

				axios.post("http://localhost:3000/api/user/signup", this.userSignup)
					.then(() =>
						location.reload()
					)
					.catch((error) => console.log(error))
			} else {
				this.errorData = true;
			}
		},
		isMailValid() {

			const regexEmail = /^[a-z0-9._-]+@[a-z0-9._-]{2,}\.[a-z]{2,4}$/;
			if ((this.userSignup.email).match(regexEmail)) {

				this.mailIsValid = true;
			} else {
				this.errorMail = true;
				this.mailIsValid = false;
			}
		},
		isPswdValid() {

			const regexPswd = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{4,8}$/;
			if ((this.userSignup.password).match(regexPswd)) {
				this.pswdIsValid = true;
			} else {
				this.errorPswd = true;
				this.pswdIsValid = false;
			}
		}
	}
}
</script>


<style scoped>
.connect_main {
	margin: 0;
	padding: 0;
	display: flex;
	justify-content: center;
	align-items: center;
	min-height: 100vh;

}

.formConnect {
	width: 350px;
	height: 500px;
	background: rgb(0, 71, 144);
	background: linear-gradient(0deg, rgba(16, 116, 205, 1) 56%, rgba(26, 51, 168, 1) 94%) no-repeat;
	overflow: hidden;
	border-radius: 10px;
	box-shadow: 5px 20px 50px #000;

}

#chk {
	display: none;
}

.login {
	position: relative;
	width: 100%;
	height: 91%;
}

label {
	color: #fff;
	font-size: 2.3em;
	justify-content: center;
	display: flex;
	margin: 60px;
	font-weight: bold;
	cursor: pointer;
	transition: .7s ease-in-out;
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

.signup input {
	margin-bottom: -9px;
}

button {
	width: 60%;
	height: 40px;
	margin: 10px auto;
	justify-content: center;
	display: block;
	color: #fff;
	background: #a338ff;
	font-size: 1em;
	font-weight: bold;
	margin-top: 20px;
	outline: none;
	border: none;
	border-radius: 5px;
	transition: .2s ease-in;
	cursor: pointer;
}

button:hover {
	background: rgb(2, 227, 247);
}

.signup {
	height: 460px;
	background: linear-gradient(0deg, rgba(26, 51, 168, 1)16%, rgba(7, 203, 230, 1) 64%) no-repeat;
	border-radius: 60% / 10%;
	transform: translateY(-125px);
	transition: .8s ease-in-out;

}

.signup label {
	color: white;
	transform: scale(.6);
}

#chk:checked~.signup {
	transform: translateY(-500px);
}

#chk:checked~.signup label {
	transform: scale(1);
}

#chk:checked~.login label {
	transform: scale(.75) translateY(-39px);
}
</style>
