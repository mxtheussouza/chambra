import { InitFirebase } from "./app/Firebase.js";
import { SendUsers } from "./app/SendUsers.js";

$(document).ready(() => {
	InitFirebase();
	SendUsers();
});
