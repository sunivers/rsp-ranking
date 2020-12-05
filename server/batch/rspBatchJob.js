const schedule = require('node-schedule');
const { Bot } = require('../models/Bot');
const { History } = require('../models/History');
const { getFormattedToday, getCurrentHour } = require('../utils/index');

const WIN = 'WIN';
const LOSE = 'LOSE';

function rspBatchJob() {
  schedule.scheduleJob('0 * * * * *', function () {
    console.log('bot rock scissors paper!');
    const rsp = Math.floor(Math.random() * 3);
    const date = getFormattedToday();
    const hour = getCurrentHour();
    const bot = new Bot({ date, hour, rsp });
    bot.save((err, botInfo) => {
      if (err) return console.error('Bot save failed');
      return console.log('bot save success');
    });

    const mapRsp = [
      {
        [WIN]: 1,
        [LOSE]: 2
      },
      {
        [WIN]: 2,
        [LOSE]: 0
      },
      {
        [WIN]: 0,
        [LOSE]: 1
      }
    ]

    History.updateMany({ hour: 0, rsp: mapRsp[rsp].WIN }, { $set: { state: 'WIN', point: 7 } }, (err, output) => {
      if (err) {
        console.log('Update error', err);
      }
      console.log('Update success', output);
    });
    History.updateMany({ hour: 0, rsp: mapRsp[rsp].LOSE }, { $set: { state: 'LOSE', point: -3 } }, (err, output) => {
      if (err) {
        console.log('Update error', err);
      }
      console.log('Update success', output);
    });
  });
}

module.exports = { rspBatchJob };
