"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const https = require("https");
const TelegramBot = require("node-telegram-bot-api");
const token_ = require("./token.js");
const token = token_.token;
const bot = new TelegramBot(token, { polling: true });
bot.on("inline_query", (msg) => https.get("https://api.kanye.rest", (resp) => {
    console.log(msg);
    let data = "";
    resp.on("data", (chunk) => {
        data += chunk;
    });
    resp.on("end", () => {
        const quote = JSON.parse(data).quote;
        console.log(quote);
        console.log(msg);
        const article = {
            description: quote,
            id: "0",
            input_message_content: {
                message_text: quote,
            },
            title: "Kanye says...",
            type: "article",
        };
        bot.answerInlineQuery(msg.id, [article], {
            cache_time: 0,
        });
    });
}).on("error", (err) => {
    console.log("Error: " + err.message);
}));
//# sourceMappingURL=app.js.map