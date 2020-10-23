$('#btnEnter').click(function(e){
	e.preventDefault();

	if (!$('#nickname').val()) {
		return false;
	} else {
		sessionStorage.setItem('inputValue', $('#nickname').val());
		window.location.href = './pages/chat.html';
	}
});
