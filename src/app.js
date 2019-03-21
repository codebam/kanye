const Telegraf = require('telegraf');
const fetch = require('node-fetch');
const { token } = require('./token.js');

const constructWhatKanyeSays = quote => [{
  description: quote,
  id: '0',
  input_message_content: {
    message_text: quote,
  },
  title: 'Kanye says...',
  type: 'article',
}];

const sendToTelegram = (b, id, quote) => b.telegram.answerInlineQuery(id,
  constructWhatKanyeSays(quote), { cache_time: 0 });

const bot = new Telegraf(token);

bot.on('inline_query', ctx => fetch('https://api.kanye.rest')
  .then(resp => resp.json())
  .then(json => json.quote)
  .then(quote => sendToTelegram(bot, ctx.update.inline_query.id, quote)));

bot.launch();
