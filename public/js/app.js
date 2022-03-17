{
    const input = document.querySelector(".mes");
    const sock = io("http://127.0.0.1:3000/");

    function send() {
        if (input.value == "") {
            input.placeholder = "Message Can't be Empty";
            input.style = "background-color: red;";
            setTimeout(() => {
                input.style = "";
            }, 1000);
        } else {
            sock.emit("new_message", { message: input.value, session: Date.now() });
            input.value = "";
        }
        return false;
    }

    let section = document.querySelector(".messages");

    sock.on("new_message", function(data) {
        section.innerHTML += `
    <div class="message">
      <h3 class="name">${data[1]}</h3>
      <h3 class="text">${data[0].message}</h3>
    </div>
  `;
    });
    sock.on("new_user", function(data) {
        console.log("Hello " + data);
    });
}