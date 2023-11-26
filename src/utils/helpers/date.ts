import moment from 'moment';

function formatDate(timeStamp: number, format = 'dddd D MMMM, h:mm:ss A') {
  return moment(timeStamp).format(format);
}

export { formatDate };
