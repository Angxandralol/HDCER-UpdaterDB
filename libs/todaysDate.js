function TodaysDate() {
  const fullTodaysDate = new Date(Date().toString());
  const day = fullTodaysDate.getDate() - 1;
  const month = fullTodaysDate.getMonth() + 1;
  const year = fullTodaysDate.getFullYear();
  const todaysDate = `${day}-${month}-${year}`;
  
  return todaysDate;
}

module.exports = TodaysDate;
