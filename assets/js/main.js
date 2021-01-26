$(document).ready(() => {
	buttons();
	getColors();
});

function buttons(){
	$('#btnEnter').click(e => {
		e.preventDefault();
	
		if (!$('#nickname').val()) { 
			return false; 
		} else {
			sessionStorage.setItem('inputValue', $('#nickname').val());
			sessionStorage.setItem('nameColor', getColors());
	
			window.location.href = './pages/chat.html';
		}
	});
}

function getColors(){
    const color = (Math.random() * 0xfffff * 1000000).toString(16).slice(0, 6);
    const nameColor = '#' + color;

    return nameColor;
};

