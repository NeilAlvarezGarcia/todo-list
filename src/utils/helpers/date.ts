import dayjs from 'dayjs';

export const formatDate = (dateString: string | number) => {
  const date = dayjs(dateString);
  const dayOfWeek = date.format('dddd');
  const dayOfMonth = date.format('D');
  const month = date.format('MMMM');
  const year = date.format('YYYY');
  const time = date.format('h:mma');

  return `${dayOfWeek} ${dayOfMonth} ${time}, ${month} ${year}`;
};
