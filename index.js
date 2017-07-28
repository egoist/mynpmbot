const TelegramBot = require('node-telegram-bot-api')
const isTaken = require('is-taken')

// replace the value below with the Telegram token you receive from @BotFather
const token = process.env.BOT_TOKEN

// Create a bot that uses 'polling' to fetch new updates
const bot = new TelegramBot(token, { polling: true })

bot.onText(/\/check$/, msg => {
  const chatId = msg.chat.id
  bot.sendMessage(chatId, `please provide npm package name, like "/check react"`)
})

// Matches "/echo [whatever]"
bot.onText(/\/check (.+)/, async (msg, match) => {
  // 'msg' is the received Message from Telegram
  // 'match' is the result of executing the regexp above on the text content
  // of the message

  const chatId = msg.chat.id
  const resp = match[1] // the captured "whatever"

  bot.sendMessage(chatId, `wait.. checking ${resp} for you!`)

  const taken = await isTaken(resp)

  if (taken) {
    const pkg = taken.versions[taken['dist-tags'].latest]
    let res = `${pkg.name} is taken by ${pkg._npmUser.name} 😭`
    if (pkg.description) {
      res += `\n\n> ${pkg.description}`
    }
    bot.sendMessage(chatId, res)
  } else {
    bot.sendMessage(chatId, `Cheers! it belongs to you! 🎉`)
  }
})

// Listen for any kind of message. There are different kinds of
// messages.
// bot.on('message', msg => {
//   const chatId = msg.chat.id

//   // send a message to the chat acknowledging receipt of their message
//   bot.sendMessage(chatId, 'Received your message')
// })
