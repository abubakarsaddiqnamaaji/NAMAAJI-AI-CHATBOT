const chatBox = document.getElementById("chatBox");
    const userInput = document.getElementById("userInput");

    function mediaUpload() {
      alert("Media upload feature is not implemented yet.");
    }

    function newChat() {
      if (confirm("Start a new chat? This will clear the current conversation.")) {
        chatBox.innerHTML = `
          <div class="flex gap-3">
            <div class="w-10 h-10 rounded-2xl bg-cyan-500/20 border border-cyan-500/20 flex items-center justify-center">
              <i class="fa-solid fa-robot"></i>
            </div>

            <div class="bg-white/5 border border-white/10 rounded-3xl px-5 py-4 max-w-xl">
              Hello👋<br>
              I am NAMAAJI AI your AI assistant.
            </div>

          </div>
        `;
      }
    }

    async function sendMessage() {

      const message = userInput.value.trim();

      if (!message) return;
 
      chatBox.innerHTML += `
        <div class="flex justify-end gap-3">

          <div class="bg-cyan-400 text-black rounded-3xl px-5 py-4 max-w-xl">
            ${message}
          </div>

          <div class="w-10 h-10 rounded-2xl bg-white/10 flex items-center justify-center">
            <i class="fa-solid fa-user"></i>
          </div>

        </div>
      `;

      userInput.value = "";

       const loadingId = Date.now();

      chatBox.innerHTML += `
        <div id="${loadingId}" class="flex gap-3">

          <div class="w-10 h-10 rounded-2xl bg-cyan-500/20 border border-cyan-500/20 flex items-center justify-center">
            <i class="fa-solid fa-robot"></i>
          </div>

          <div class="bg-white/5 border border-white/10 rounded-3xl px-5 py-4">
            Typing...
          </div>

        </div>
      `;

      chatBox.scrollTop = chatBox.scrollHeight;

      try {

        const response = await fetch(
          "https://openrouter.ai/api/v1/chat/completions",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              "Authorization": "Bearer ***************************************"
            },
            body: JSON.stringify({
            model: "openai/gpt-oss-120b:free",
            messages: [
            {
            role: "system",
            content: `
            You are Namaaji AI, created by Abubakar Sadiq Namaaji.

            Rules:
            - NEVER say you are ChatGPT or OpenAI
            - Be friendly, smart, and helpful
            - You can speak English and Hausa
            - Keep answers simple and clear
            `
            },
            {
            role: "user",
            content: message
            }
            ]
                        })
                    }
        );

        const data = await response.json();

        document.getElementById(loadingId).remove();

        const reply =
          data.choices?.[0]?.message?.content ||
          "Something went wrong.";

        chatBox.innerHTML += `
          <div class="flex gap-3">

            <div class="w-10 h-10 rounded-2xl bg-cyan-500/20 border border-cyan-500/20 flex items-center justify-center">
              <i class="fa-solid fa-robot"></i>
            </div>

            <div class="bg-white/5 border border-white/10 rounded-3xl px-5 py-4 max-w-xl  ">
              ${marked.parse(reply)}
            </div>

          </div>
        `;

      } catch (error) {

        document.getElementById(loadingId).remove();

        chatBox.innerHTML += `
          <div class="flex gap-3">

            <div class="w-10 h-10 rounded-2xl bg-red-500/20 border border-red-500/20 flex items-center justify-center">
              <i class="fa-solid fa-xmark"></i>
            </div>

            <div class="bg-red-500/10 border border-red-500/20 rounded-3xl px-5 py-4 max-w-xl text-red-300">
              Failed to connect to AI API.
            </div>

          </div>
        `;
      }

      chatBox.scrollTop = chatBox.scrollHeight;
    }

    userInput.addEventListener("keydown", function(e) {
      if (e.key === "Enter") {
        sendMessage();
      }
    });