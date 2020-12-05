import _padStart from 'lodash/padStart';

export const getFormattedToday = () => {
  const now = new Date();
  return `${now.getFullYear()}-${_padStart((now.getMonth() + 1), 2, '0')}-${_padStart(now.getDate(), 2, '0')}`;
}

export const getCurrentHour = (addHour) => {
  const hour = new Date().getHours();
  if (addHour && typeof addHour === 'number') {
    return hour + addHour;
  }
  return hour;
}
