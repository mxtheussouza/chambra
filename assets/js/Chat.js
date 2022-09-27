import { SendMessages } from "./app/Chat/SendMessages/index.js";
import { GetMessages } from "./app/Chat/GetMessages/index.js";
import { GetEmojis } from "./app/Chat/GetEmojis/index.js";

$(document).ready(() => {
	Notification.requestPermission().then(() => {});

	SendMessages();
	GetMessages();
	GetEmojis();

	$(".header-chat").append(`<h2>${sessionStorage.getItem("userName")}</h2>`);
});
