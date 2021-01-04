const socket = io.connect("https://enigmatic-retreat-94774.herokuapp.com/");

// Query DOM
const name = document.querySelector("#name");
const message = document.querySelector("#message");
const btn = document.querySelector("#send");
const messagesDiv = document.querySelector("#messages");
const typingDiv = document.querySelector("#typing");

// Emit Events
btn.addEventListener("click", () => {
  socket.emit("chat", {
    name: name.value,
    message: message.value,
  });
});

message.addEventListener("keypress", () => {
  socket.emit("typing", name.value);
});

// Listen for Events
socket.on("chat", (data) => {
  messagesDiv.innerHTML += `<p><strong>${data.name}: </strong><span>${data.message}</span></p>`;
  typingDiv.innerHTML = "";
});

socket.on("typing", (data) => {
  typingDiv.innerHTML = `<em>${data}</em> is typing...`;
});
