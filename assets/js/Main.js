$(document).ready(() => {
  sendUsers();
  getColors();
});

const sendUsers = () => {
  $("#formIndex").submit((e) => {
    e.preventDefault();

    const nickname = $("#nickname").val();

    if (!nickname) {
      toastr.error("Preencha um nome de usuário!");
      return false;
    }

    sessionStorage.setItem("userName", nickname);
    sessionStorage.setItem("nameColor", getColors());

    window.location.href = "./pages/chat.html";
  });
};

function getColors() {
  return "#" + (Math.random() * 0xfffff * 1000000).toString(16).slice(0, 6);
}
