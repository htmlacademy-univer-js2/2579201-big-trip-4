function getRandomNumber(number){
  return Math.floor(Math.random * number);
}

function getDateTime(date){
  return date.split(' ')[1];
}

function getEventDuration(startDate, endDate){
}

export {getDateTime, getRandomNumber, getEventDuration};

