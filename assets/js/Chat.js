$(document).ready(() => {
  sendMessages();
  getMessages();
  getTime();
  getEmojis();

  $(".header-chat").append(`<h2>${sessionStorage.getItem("userName")}</h2>`);

  Notification.requestPermission().then((result) => {});
});

const sendMessages = () => {
  $("#formMessage").submit((e) => {
    e.preventDefault();
    commands();

    if (!$("#sendMessage").val()) {
      return false;
    }

    const message = $("#sendMessage")
      .val()
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;")
      .replace(/'/g, "&#039;");

    firebase
      .database()
      .ref("messages")
      .push()
      .set({
        name: sessionStorage.getItem("userName"),
        color: sessionStorage.getItem("nameColor"),
        message: message,
        time: getTime(),
      });

    $("#sendMessage").val("");
  });
};

const getMessages = () => {
  const ref = firebase.database().ref("messages");

  ref.on("child_added", (data) => {
    const content = document.getElementsByClassName("content-chat")[0];

    if (data.val().name == sessionStorage.getItem("userName")) {
      const messageRight = `<div style='display: flex; justify-content: flex-end; margin-bottom: 1rem;'>
                                    <div style='max-width: 95%; position: relative;'>
                                        <div style='background: #fff; position: relative; border-radius: .8rem; box-shadow: 0px 2px 3px 0px rgba(13, 21, 75, 0.3);'>
                                            <div style='padding: 6px 7px 4px 9px;'>
                                                <div>
                                                    <div style='position: relative; word-wrap: break-word;'>
                                                        <span>
                                                            <span> ${
                                                              data.val().message
                                                            } </span>
                                                        </span>
                                                    </div>
                                                </div>

                                                <div style='display: block; text-align: right;'>
                                                    <span>
                                                        <span style='font-size: .7rem; color: rgba(0,0,0,0.5);'> ${
                                                          data.val().time
                                                        } </span>
                                                    </span>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>`;

      $(".content-chat").append(messageRight);
    } else {
      const messageLeft = `<div style='display: flex; justify-content: flex-start; margin-bottom: 1rem;'>
                                    <div style='max-width: 95%; position: relative;'>
                                        <div style='background: #fff; position: relative; border-radius: .8rem; box-shadow: 0px 2px 3px 0px rgba(13, 21, 75, 0.3);'>
                                            <div style='padding: 6px 7px 4px 9px;'>
                                                <div style='display: inline-flex; max-width: 100%; line-height: 22px; margin-bottom: .4rem;'>
                                                    <span style='margin-left: -2px; padding-left: 2px; word-wrap: break-word; color: ${
                                                      data.val().color
                                                    }'> ${
        data.val().name
      } </span>
                                                </div>

                                                <div>
                                                    <div style='position: relative; word-wrap: break-word;'>
                                                        <span>
                                                            <span> ${
                                                              data.val().message
                                                            } </span>
                                                        </span>
                                                    </div>
                                                </div>

                                                <div style='display: block; text-align: right;'>
                                                    <span>
                                                        <span style='font-size: .7rem; color: rgba(0,0,0,0.5);'> ${
                                                          data.val().time
                                                        } </span>
                                                    </span>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>`;

      $(".content-chat").append(messageLeft);

      if (data.val().time == getTime()) {
        if (window.Notification && Notification.permission == "granted") {
          const notification = new Notification(data.val().name, {
            icon: "../assets/images/icons/chambraicon.png",
            body: `${data.val().message} - ${getTime()}`,
          });
        }
      }
    }

    content.scrollTo(0, content.scrollHeight);
  });
};

const getTime = () => {
  const date = new Date();
  let hour = date.getHours();
  let min = date.getMinutes();

  if (hour < 10) {
    hour = `0${hour}`;
  }

  if (min < 10) {
    min = `0${min}`;
  }

  return `${hour}:${min}`;
};

const commands = () => {
  switch ($("#sendMessage").val()) {
    case "/name":
      Swal.fire({
        title: sessionStorage.getItem("userName"),
      });
      break;

    default:
      break;
  }
};

const getEmojis = () => {
  $("#emoji").click(() => {
    toastr.error("Função em desenvolvimento!");
  });
};
