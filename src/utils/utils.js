import dayjs from 'dayjs';

const DATE_FORMAT = 'DD/MM/YY HH:mm';

function getRandomNumber(number){
  return Math.floor(Math.random() * number);
}

function getDateTime(date){
  return date ? dayjs(date).format(DATE_FORMAT) : '';
}

function getEventDuration(startDate, endDate){
  const start = dayjs(startDate);
  const end = dayjs(endDate);
  const difference = end.diff(start, 'minute');
  if (difference > (60 * 24)) {
    const days = Math.floor(difference / (60 * 24));
    const remainder = difference % (60 * 24);
    const hours = Math.floor(remainder / 60);
    const minutes = remainder % 60;
    return `${String(days).padStart(2,'0')}D ${String(hours).padStart(2, '0')}H ${String(minutes).padStart(2, '0')}M`;
  } else if (difference > 60){
    const hours = Math.floor(difference / 60);
    const minutes = difference % 60;
    return `${String(hours).padStart(2,'0')}H ${String(minutes).padStart(2,'0')}M`;
  } else{
    return `${String(difference).padStart(2,'0')}M`;
  }
}


export {getDateTime, getRandomNumber, getEventDuration};

