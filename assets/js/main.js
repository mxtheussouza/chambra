$('#btnEnter').click(function(e){
	e.preventDefault();

	if (!$('#nickname').val()) {
		return false;
	} else {
		sessionStorage.setItem('inputValue', $('#nickname').val());
		sessionStorage.setItem('nameColor', getColors());

		window.location.href = './pages/chat.html';
	}
});

var getColors = function(){
    var n = (Math.random() * 0xfffff * 1000000).toString(16);
    var cor = n.slice(0, 6);
    var nameColor = '#' + cor;

    return nameColor;
};

