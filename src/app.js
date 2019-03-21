'use strict'

const TelegramBot = require('node-telegram-bot-api')
const fetch = require('node-fetch')

const token = require('./token.js').token
const bot = new TelegramBot(token, { polling: true })

const sendToTelegram = (msg, quote) => bot.answerInlineQuery(msg.id, JSON.stringify([{
  type: 'article',
  id: 0,
  title: 'Kanye says...',
  input_message_content: {
    message_text: quote
  },
  description: quote
}]), {
  cache_time: 0
})

bot.on('inline_query', (msg) => fetch('https://api.kanye.rest')
  .then(resp => resp.json())
  .then(json => json.quote)
  .then(quote => sendToTelegram(msg, quote))
)
