const _padStart = require('lodash/padStart');

const getFormattedToday = () => {
  const now = new Date();
  return `${now.getFullYear()}-${_padStart((now.getMonth() + 1), 2, '0')}-${_padStart(now.getDay(), 2, '0')}`;
}

const getCurrentHour = () => {
  const now = new Date();
  return now.getHours();
}

module.exports = {
  getFormattedToday,
  getCurrentHour
}