const icon = document.getElementById("chatbot-icon");
const box = document.getElementById("chatbox");
const form = document.getElementById("chat-form");
const input = document.getElementById("chat-input");
const messages = document.getElementById("chat-messages");
const closeBtn = document.getElementById("close-chatbox");

// Show/hide chatbot
icon.onclick = () => {
  box.classList.remove("hidden");
  icon.style.display = "none";
  messages.innerHTML = "";
  loadChatHistory();
};

closeBtn.onclick = () => {
  box.classList.add("hidden");
  icon.style.display = "block";
};

// Append chat bubble
function appendBubble(sender, text, isBot) {
  const wrapper = document.createElement("div");
  wrapper.className = isBot ? "bubble-row bot" : "bubble-row user";

  const avatar = document.createElement("img");
  avatar.className = "avatar";
  avatar.src = isBot ? "assets/images/ai.jpg" : "assets/images/user.png";
  avatar.alt = sender;

  const bubble = document.createElement("div");
  bubble.className = isBot ? "bubble bot" : "bubble user";
  bubble.innerHTML = `<strong>${sender}:</strong><br>${text}`;

  wrapper.appendChild(avatar);
  wrapper.appendChild(bubble);
  messages.appendChild(wrapper);
  messages.scrollTop = messages.scrollHeight;
}

// Save & load chat history
function saveMessage(sender, text, isBot) {
  const history = JSON.parse(localStorage.getItem("chat_history") || "[]");
  history.push({ sender, text, isBot });
  localStorage.setItem("chat_history", JSON.stringify(history));
}

function loadChatHistory() {
  const history = JSON.parse(localStorage.getItem("chat_history") || "[]");
  history.forEach(({ sender, text, isBot }) => {
    appendBubble(sender, text, isBot);
  });
}

// Get reply (keyword based)
function getKeywordReply(message) {
  const msg = message.toLowerCase();

  if (msg.includes("porsche")) return "Porsche is a world-renowned German sports car manufacturer.";
  if (msg.includes("911")) return "The Porsche 911 is an iconic sports car introduced in 1964.";
  if (msg.includes("taycan")) return "The Taycan is Porsche's high-performance electric vehicle.";
  if (msg.includes("engine")) return "Porsche uses flat-six engines and also offers electric powertrains.";
  if (msg.includes("macan")) return "The Porsche Macan is a compact luxury SUV.";
  if (msg.includes("panamera")) return "The Panamera blends sports performance with luxury comfort.";
  if (msg.includes("price")) return "Porsche vehicle prices vary by model and options.";
  if (msg.includes("speed")) return "Many Porsche models exceed 300 km/h top speed.";
  if (msg.includes("history")) return "Porsche was founded in 1931 by Ferdinand Porsche.";
  if (msg.includes("electric")) return "Porsche is investing heavily in electric mobility.";

  return "Sorry, I don't have information on that yet.";
}

// Submit handler
form.onsubmit = (e) => {
  e.preventDefault();
  const rawMsg = input.value.trim();
  if (!rawMsg) return;

  appendBubble("You", rawMsg, false);
  input.value = "";

  const reply = getKeywordReply(rawMsg);
  appendBubble("Porsche AI", reply, true);

  saveMessage("You", rawMsg, false);
  saveMessage("Porsche AI", reply, true);
};
