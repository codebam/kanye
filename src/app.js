const Telegraf = require('telegraf');
const fetch = require('node-fetch');
const { token } = require('./token.js');

const constructRequest = (requestTitle, content) => [{
  description: content,
  id: '0',
  input_message_content: {
    message_text: content,
  },
  title: requestTitle,
  type: 'article',
}];

const constructKanyeRequest = constructRequest.bind(null, 'Kanye says...');

const sendToTelegram = (b, id, quote) => b.telegram.answerInlineQuery(id,
  constructKanyeRequest(quote), { cache_time: 0 });

const bot = new Telegraf(token);

try {
  bot.on('inline_query', ctx => fetch('https://api.kanye.rest')
    .then(resp => resp.json())
    .then(json => json.quote)
    .then(quote => sendToTelegram(bot, ctx.update.inline_query.id, quote)));
} catch (e) {
  console.log(e)
}

bot.launch();
