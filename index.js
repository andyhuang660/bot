import linebot from 'linebot'
import 'dotenv/config'
import data from './data.js'
import schedule from 'node-schedule'

data.fetchData()

schedule.scheduleJob('0 0 * * *', () => {
  data.fetchData()
})

const bot = linebot({
  channelId: process.env.channelId,
  channelSecret: process.env.channelSecret,
  channelAccessToken: process.env.channelAccessToken
})

bot.on('message', (event) => {
  if (data.courses.length === 0) {
    event.reply('資料讀取中，請稍後再試')
  } else if (event.message.type === 'text') {
    if (event.message.text === '共通課程') {
      data.replyCourses(event)
    }
  }
})

bot.listen('/', process.env.PORT || 3000, () => {
  console.log('機器人啟動')
})
