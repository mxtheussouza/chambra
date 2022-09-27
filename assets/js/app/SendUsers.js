import { GetColors } from "./Chat/shared/GetColors.js";

export const SendUsers = () => {
	$("#formIndex").submit(e => {
		e.preventDefault();

		const nickname = $("#nickname").val();

		if (!nickname) {
			toastr.error("Preencha um nome de usuário!");
			return false;
		}

		sessionStorage.setItem("userName", nickname);
		sessionStorage.setItem("nameColor", GetColors);

		window.location.href = "./pages/chat.html";
	});
};
