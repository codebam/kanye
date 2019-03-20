'use strict'

const https = require('https')
const TelegramBot = require('node-telegram-bot-api')

const token = require('./token.js').token
const bot = new TelegramBot(token, { polling: true })

bot.on('inline_query', (msg) =>
  https.get('https://api.kanye.rest', (resp) => {
    console.log(msg)
    let data = ''
    resp.on('data', (chunk) => {
      data += chunk
    })
    resp.on('end', () => {
      let quote = JSON.parse(data).quote
      console.log(quote)
      console.log(msg)
      bot.answerInlineQuery(msg.id, JSON.stringify([{
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
    })
  }).on('error', (err) => {
    console.log('Error: ' + err.message)
  })
)
