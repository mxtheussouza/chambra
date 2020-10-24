$(document).ready(function() {
    getNameHeader();
    sendMessages();
    getMessages();
    getEmojis();
});


(() => {
  const firebaseConfig = {
    apiKey: "AIzaSyAfZHEU9eyyy4drSZouzRHuqy54OOBGNuk",
    authDomain: "xati-chat.firebaseapp.com",
    databaseURL: "https://xati-chat.firebaseio.com",
    projectId: "xati-chat",
    storageBucket: "xati-chat.appspot.com",
    messagingSenderId: "341986798031",
    appId: "1:341986798031:web:d7ad86ce2c3816b4188aba"
};
  // Initialize Firebase
    firebase.initializeApp(firebaseConfig);

    const database = firebase.database();
})();



const getNameHeader = function(){
    let nameHeader = "";
    nameHeader += "<h2 style='color: #fff;'>" +sessionStorage.getItem('inputValue')+ "</h2>";

    $('.header-chat').append(nameHeader);
};

const sendMessages = function(){
    $('#formMessage').submit(function(e){
        e.preventDefault();

        let message = $('#sendMessage').val();
        let name = sessionStorage.getItem('inputValue');

        const isHtml = (str) => !(str || '')
            .replace(/<([^>]+?)([^>]*?)>(.*?)<\/\1>/ig, '')
            .replace(/(<([^>]+)>)/ig, '')
            .trim();

        if (isHtml(message)) {
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

const getEmojis = function(){
    $('#btnEmoji').click(function(){
        $('.emojis').toggle();
        
        $('.btn-sm').click(function(){
            var emoji = $(this).text();
            $('#sendMessage').val($('#sendMessage').val() + emoji);
        });
    });
};

const getMessages = function(){
    const messagesRef = firebase.database().ref('mensagens');
    messagesRef.on('child_added', function(data) {  
    
        let nameUserCurrent = sessionStorage.getItem('inputValue');
    
        if(data.val().tempo == getTime()) {
            if(data.val().nome == nameUserCurrent){
                let mensagemRight = "";
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
                let mensagemLeft = "";
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

const getTime = function(){
    let data = new Date();
    let hora = data.getHours(); 
    let min  = data.getMinutes();

    let time = hora +':'+ min;

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