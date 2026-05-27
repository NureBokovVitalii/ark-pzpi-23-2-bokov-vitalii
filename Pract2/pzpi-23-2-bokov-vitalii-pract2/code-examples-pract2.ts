const TOKEN = "YOUR_BOT_TOKEN";
const CHAT_ID = "123456789";

// Надсилання повідомлення через Telegram Bot API
const url = `https://api.telegram.org/bot${TOKEN}/sendMessage`;

const response = await fetch(url, {
  method: "POST",
  headers: { "Content-Type": "application/json" },
  body: JSON.stringify({
    chat_id: CHAT_ID,
    text: "Привіт із Telegram Bot API!",
    parse_mode: "HTML",
  }),
});

const data = await response.json();

if (data.ok) {
  console.log(`Надіслано, message_id: ${data.result.message_id}`);
}
const TOKEN = "YOUR_BOT_TOKEN";
let offset = 0;

// Отримання оновлень (long polling) через getUpdates
while (true) {
  const url = `https://api.telegram.org/bot${TOKEN}/getUpdates`;

  const res = await fetch(url, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      offset,
      timeout: 30,
    }),
  });

  const data = await res.json();

  for (const update of data.result ?? []) {
    offset = update.update_id + 1;

    const msg = update.message;

    if (msg?.text) {
      console.log(`Від ${msg.from.id}: ${msg.text}`);
    }
  }
}
