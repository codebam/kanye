'use strict'

const Telegraf = require('telegraf')
const fetch = require('node-fetch')

const token = require('./token.js').token
const bot = new Telegraf(token)

const sendToTelegram = (bot, id, quote) => bot.telegram.answerInlineQuery(id, [{
  type: 'article',
  id: 0,
  title: 'Kanye says...',
  input_message_content: {
    message_text: quote
  },
  description: quote
}], {
  cache_time: 0
})

bot.on('inline_query', (ctx) => fetch('https://api.kanye.rest')
  .then(resp => resp.json())
  .then(json => json.quote)
  .then(quote => sendToTelegram(bot, ctx.update.inline_query.id, quote))
)

bot.launch()
