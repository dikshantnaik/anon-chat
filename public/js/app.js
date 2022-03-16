{
  const input = document.querySelector(".mes");
  const name = document.querySelector(".name-input");
  const sock = io("http://127.0.0.1:3000/");

  function send() {
    sock.emit("new_message", { message: input.value, username: name.value });
    input.value = "";
    return false;
  }

  let section = document.querySelector(".messages");

  sock.on("new_message", function (data) {
    console.log("Server says : " + data);
    section.innerHTML += `
    <div class="message">
      <h3 class="name">${data.username}</h3>
      <h3 class="text">${data.message}</h3>
    </div>
  `;
  });
  sock.on("new_user", function (data) {
    console.log("Hello " + data);
  });
}
