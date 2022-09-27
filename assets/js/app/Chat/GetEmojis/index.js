export const GetEmojis = () => {
	const picker = new EmojiButton();

	const trigger = $("#emoji");

	trigger.click(() => picker.togglePicker(trigger));

	picker.on("emoji", emoji =>
		$("#sendMessage").val((i, value) => value + emoji),
	);
};
