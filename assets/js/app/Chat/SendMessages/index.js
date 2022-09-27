import { GetTime } from "../shared/GetTime.js";

export const SendMessages = () => {
	$("#formMessage").submit(e => {
		e.preventDefault();

		if (!$("#sendMessage").val()) return false;

		const message = $("#sendMessage")
			.val()
			.replace(/&/g, "&amp;")
			.replace(/</g, "&lt;")
			.replace(/>/g, "&gt;")
			.replace(/"/g, "&quot;")
			.replace(/'/g, "&#039;");

		firebase
			.database()
			.ref("messages")
			.push()
			.set({
				name: sessionStorage.getItem("userName"),
				color: sessionStorage.getItem("nameColor"),
				message: message,
				time: GetTime(),
			});

		$("#sendMessage").val("");
	});
};
