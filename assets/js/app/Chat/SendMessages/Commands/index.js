import { GetTime } from "../../shared/GetTime.js";

export const Commands = () => {
	let message = "";
	switch ($("#sendMessage").val()) {
		case "/help":
			message = `
                /help: Mostra os comandos disponíveis.
                <br>
                /name: Exibirá o seu nome de usuário.
      `;
			break;

		case "/name":
			message = `Seu nome é: ${sessionStorage.getItem("userName")}`;
			break;

		default:
			break;
	}

	$("#sendMessage").val("");

	firebase.database().ref("messages").push().set({
		name: "CHAMBRA BOT",
		color: "#8d8d8d",
		message: message,
		time: GetTime(),
	});
};

// DEPRECATED
