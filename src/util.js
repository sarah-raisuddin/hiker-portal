export const formatDate = (dateString) => {
  const date = new Date(dateString);
  const dateOptions = { year: "numeric", month: "long", day: "numeric" };
  const timeOptions = {
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
    hour12: false,
  };

  const formattedDate = date.toLocaleDateString("en-US", dateOptions);
  const formattedTime = date.toLocaleTimeString("en-US", timeOptions);

  return {
    date: formattedDate,
    time: formattedTime,
  };
};

// TODO: this function is needed because we are currently storing the date in the database as
// a timestamp value, so sometimes the date picker is one day off due to timezone issues
// (see: https://medium.com/@sungbinkim98/is-your-javascript-date-one-day-off-c56afb37e4bc)
// the data type of the values in the database should ideally change if we are not storing time
// info anymore.
export const formatDateFromDatabase = (dateString) => {
  if(dateString === "") {
    return dateString;
  }

  const date = new Date(dateString);

  // referenced from: 
  // https://www.servicenow.com/community/developer-forum/how-can-i-convert-date-format-at-client-side/m-p/2596709
  const formattedDate = date.toISOString().split('T')[0];

  return formattedDate
};
