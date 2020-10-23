$(document).ready(function() {
    getNameHeader();
    sendMessages();
    getMessages();
});

var firebaseConfig = {
    apiKey: "AIzaSyCJlaVL48MMMIl74yO9qQPqyCTOFBHy1tM",
    authDomain: "chat-xati.firebaseapp.com",
    databaseURL: "https://chat-xati.firebaseio.com",
    projectId: "chat-xati",
    storageBucket: "chat-xati.appspot.com",
    messagingSenderId: "809020855746",
    appId: "1:809020855746:web:85ad9ba159712a28deb25b"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);

var database = firebase.database();

var getNameHeader = function(){
    var nameHeader = "";
    nameHeader += "<h2 style='color: #fff;'>" +sessionStorage.getItem('inputValue')+ "</h2>";

    $('.header-chat').append(nameHeader);
};

var sendMessages = function(){
    $('#formMessage').submit(function(e){
        e.preventDefault();

        var message = $('#sendMessage').val();
        var name = sessionStorage.getItem('inputValue');

        const isHtml = (str) => !(str || '')
            .replace(/<([^>]+?)([^>]*?)>(.*?)<\/\1>/ig, '')
            .replace(/(<([^>]+)>)/ig, '')
            .trim();

        if (isHtml(message.val())) {
            return false;
        }

        $('#sendMessage').val('');

        firebase.database().ref('mensagens').push().set({
            nome: name,
            mensagem: message,
            tempo: getTime()
        });
    });
};

var getMessages = function(){
    var messagesRef = firebase.database().ref('mensagens');
    messagesRef.on('child_added', function(data) {  
    
        var nameUserCurrent = sessionStorage.getItem('inputValue');
    
        if(data.val().tempo == getTime()) {
            if(data.val().nome == nameUserCurrent){
                var mensagemRight = "";
                mensagemRight += "<div class='mensagem-right' style='word-wrap: break-word;'>";
                mensagemRight += "<ul>";
                mensagemRight += "<li>";
                mensagemRight += "<span class='mensagem'>" +data.val().mensagem+ "</span>";
                mensagemRight += " < "
                mensagemRight += "<span style='color: #2860b3; background: rgba(0,0,0,0.2); padding: .2rem .4rem; border-radius: 10px;'>" +data.val().nome+ "</span>";
                mensagemRight += "</li>";
                mensagemRight += "</ul>";
                mensagemRight += "</div>";
    
                $('.content-chat').append(mensagemRight);
            } else {
                var mensagemLeft = "";
                mensagemLeft += "<div class='mensagem-left' style='word-wrap: break-word;'>";
                mensagemLeft += "<ul>";
                mensagemLeft += "<li>";
                mensagemLeft += "<span style='color: #dc3545; background: rgba(0,0,0,0.2); padding: .4rem; border-radius: 10px;'>" +data.val().nome+ "</span>";
                mensagemLeft += " > "
                mensagemLeft += "<span class='mensagem'>" +data.val().mensagem+ "</span>";
                mensagemLeft += "</li>";
                mensagemLeft += "</ul>";
                mensagemLeft += "</div>";
    
                $('.content-chat').append(mensagemLeft);
            }
    
        }
       
        let chatScroll = document.getElementById('contentChat');
        chatScroll.scrollTo(0,chatScroll.scrollHeight);
    });
};

var getTime = function(){
    var data = new Date();
    var hora = data.getHours(); 
    var min  = data.getMinutes();

    var time = hora +':'+ min;

    return time;
};

// var validateTime = function() {
//     var data = new Date();

//     var hora = data.getHours(); 
//     var min  = data.getMinutes();

//     if ((hora == 0) && (min == 0)) {
//         firebase.database().ref('mensagens').remove();
//     }
// };