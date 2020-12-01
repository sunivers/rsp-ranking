const schedule = require('node-schedule');
const { Bot } = require('../models/Bot');

function rspBatchJob() {
  schedule.scheduleJob('0 * * * * *', function () {
    console.log('bot rock scissors paper!');
    const rsp = Math.floor(Math.random() * 3);
    const now = new Date();
    const date = `${now.getFullYear()}-${now.getMonth() + 1}-${now.getDay()}`;
    const hour = now.getHours();
    const bot = new Bot({ date, hour, rsp });
    bot.save((err, botInfo) => {
      if (err) return console.error('Bot save failed');
      return console.log('bot save success');
    });
  });
}

module.exports = { rspBatchJob };
