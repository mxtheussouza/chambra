export const GetTime = () => {
	const date = new Date();

	let hour = date.getHours();
	let min = date.getMinutes();

	if (hour < 10) hour = `0${hour}`;

	if (min < 10) min = `0${min}`;

	return `${hour}:${min}`;
};
