$(document).ready(() => {
    sendMessages();
    getMessages();
    getTime();

    Notification.requestPermission().then(function(result) {

    });
});


const sendMessages = () => {
    $('#formMessage').submit(e => {
        e.preventDefault();

        let name = sessionStorage.getItem('inputValue');
        let color = sessionStorage.getItem('nameColor');
        let message = $('#sendMessage').val();

        if (!message) {
            return false;
        }   

        let messageFormated = message.replace(/&/g, "&amp;") .replace(/</g, "&lt;") .replace(/>/g, "&gt;") .replace(/"/g, "&quot;") .replace(/'/g, "&#039;");

        $('#sendMessage').val('');

        firebase.database().ref('messages').push().set({
            name: name,
            color: color,
            message: messageFormated,
            time: getTime()
        });
    });
};

const getMessages = () => {
    const messagesRef = firebase.database().ref('messages');

    messagesRef.on('child_added', data => {  
        let nameUserCurrent = sessionStorage.getItem('inputValue');
    
        if (data.val().name == nameUserCurrent) {
            let messageRight = `<div style='display: flex; justify-content: flex-end; margin-bottom: 1rem;'>
                                    <div style='max-width: 95%; position: relative;'>
                                        <div style='background: #fff; position: relative; border-radius: .8rem; box-shadow: 0px 2px 3px 0px rgba(13, 21, 75, 0.3);'>
                                            <div style='padding: 6px 7px 4px 9px;'>
                                                <div>
                                                    <div style='position: relative; word-wrap: break-word;'>
                                                        <span>
                                                            <span> ${data.val().message} </span>
                                                        </span>
                                                    </div>
                                                </div>

                                                <div style='display: block; text-align: right;'>
                                                    <span>
                                                        <span style='font-size: .7rem; color: rgba(0,0,0,0.5);'> ${data.val().time} </span>
                                                    </span>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>`;

            $('.content-chat').append(messageRight);

        } else {
            let messageLeft = `<div style='display: flex; justify-content: flex-start; margin-bottom: 1rem;'>
                                    <div style='max-width: 95%; position: relative;'>
                                        <div style='background: #fff; position: relative; border-radius: .8rem; box-shadow: 0px 2px 3px 0px rgba(13, 21, 75, 0.3);'>
                                            <div style='padding: 6px 7px 4px 9px;'>
                                                <div style='display: inline-flex; max-width: 100%; line-height: 22px; margin-bottom: .4rem;'>
                                                    <span style='margin-left: -2px; padding-left: 2px; word-wrap: break-word; color: ${data.val().color}'> ${data.val().name} </span>
                                                </div>

                                                <div>
                                                    <div style='position: relative; word-wrap: break-word;'>
                                                        <span>
                                                            <span> ${data.val().message} </span>
                                                        </span>
                                                    </div>
                                                </div>

                                                <div style='display: block; text-align: right;'>
                                                    <span>
                                                        <span style='font-size: .7rem; color: rgba(0,0,0,0.5);'> ${data.val().time} </span>
                                                    </span>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>`

            $('.content-chat').append(messageLeft);

            if (data.val().time == getTime()) {
                if (window.Notification && Notification.permission == "granted") {
                    let img = ''
                    let text = data.val().message
                    var notification = new Notification(data.val().name + ' diz:', { body: text, icon: img });
                }
            }
        }

        let chatScroll = document.getElementsByClassName('content-chat')[0];
        chatScroll.scrollTo(0, chatScroll.scrollHeight);
    });
};

const getTime = () => {
    let data = new Date();
    let hora = data.getHours(); 
    let min  = data.getMinutes();

    if (hora < 10) {
        hora = '0' + hora;
    }

    if (min < 10) {
        min = '0' + min;
    }

    let time = `${hora}:${min}`;

    return time;
};