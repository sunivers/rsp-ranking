const schedule = require('node-schedule');
const { Bot } = require('../models/Bot');
const { History } = require('../models/History');
const { User } = require('../models/User');
const { getFormattedToday, getCurrentHour } = require('../utils/index');

const WIN = 'WIN';
const LOSE = 'LOSE';

async function rspBatchJob() {
  // 월-토, 매 시, 24시간 진행
  // TODO: 일요일 저녁 6시에 최종집계 발표
  const rule = new schedule.RecurrenceRule();
  rule.dayOfWeek = [new schedule.Range(1, 6)];
  rule.minute = 0;
  schedule.scheduleJob(rule, async function () {
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

    /**
     * @description history 데이터 업데이트 / user point 업데이트
     * 1. 두가지를 순차적으로 실행하는게 효율적일까, 
     * 2. history 하나씩 찾아서 업데이트 할 때 마다 해당 유저도 하나씩 업데이트 해주는게 효율적일까
     * 2번째 방법이 한 번이라도 순회를 덜 할거 같다. 낙찰!
     */
  
    try {
      // 이긴 경우
      const winHistoryRow = await History.find({ date, hour, rsp: mapRsp[rsp].WIN });
      console.log('winHistoryRow find success');
      /**
       * @todo 연속 승리 콤보 점수 계산
       */
      winHistoryRow.forEach(async row => {
        await row.update({ $set: { state: 'WIN', point: 7 } });
        console.log('history update success');

        const user = await User.findOne({ _id: row.userId });
        await user.update({
          point: user.point + 7,
          totalPoint: user.totalPoint + 7,
          winCount: user.winCount + 1,
          totalWinCount: user.totalWinCount + 1
        });
        console.log('user update success');
      });

      // 진 경우
      const loseHistoryRow = await History.find({ date, hour, rsp: mapRsp[rsp].LOSE });
      console.log('loseHistoryRow find success');
      loseHistoryRow.forEach(async row => {
        await row.update({ $set: { state: 'LOSE', point: -3 } });
        console.log('history update success');

        const user = await User.findOne({ _id: row.userId });
        await user.update({
          point: user.point - 3,
          totalPoint: user.totalPoint - 7,
          loseCount: user.loseCount + 1,
          totalLoseCount: user.totalLoseCount + 1
        });
        console.log('user update success');
      });
    } catch (error) {
      console.log('history error', error);
    }
  });
}

module.exports = { rspBatchJob };
