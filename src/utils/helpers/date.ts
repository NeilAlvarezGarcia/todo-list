import moment from 'moment';

function formatDate(timeStamp: number, format = 'dddd D MMMM, h:mm:ss A') {
  return moment(timeStamp).format(format);
}

function getLastSevenDays(format = 'dddd D') {
  const lastSevenDays: string[] = [];

  for (let i = 6; i >= 0; i--) {
    const dayAgo = moment().subtract(i, 'days').format(format);
    lastSevenDays.push(dayAgo);
  }
  return lastSevenDays;
}

export { formatDate, getLastSevenDays };
