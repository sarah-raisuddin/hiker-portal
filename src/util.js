import { useNavigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";

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
  if (dateString === "") {
    return dateString;
  }

  const date = new Date(dateString);

  // referenced from:
  // https://www.servicenow.com/community/developer-forum/how-can-i-convert-date-format-at-client-side/m-p/2596709
  const formattedDate = date.toISOString().split("T")[0];

  return formattedDate;
};

export const validateEmailFormat = (email) => {
  // RegEx expression from: https://mailtrap.io/blog/validate-emails-in-react/
  const emailRegEx = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i;

  const isEmailValid = emailRegEx.test(email);
  return isEmailValid;
};

export const validateDateRange = (startDateString, endDateString) => {
  if (startDateString === "" || endDateString === "") {
    return false;
  }

  const startDate = new Date(startDateString);
  const endDate = new Date(endDateString);

  const isDateRangeValid = startDate <= endDate;

  return isDateRangeValid;
};

export const validateDates = (endDateString) => {
  const endDate = new Date(endDateString);
  const today = new Date();

  const isDateInPast = endDate < today;
  return !isDateInPast;
};

export const validatePhoneNumberFormat = (number) => {
  // RegEx expression from: https://stackoverflow.com/questions/8634139/phone-validation-regex
  const phoneRegEx = /\(?([0-9]{3})\)?([ .-]?)([0-9]{3})\2([0-9]{4})/;

  const isNumberValid = phoneRegEx.test(number);
  return isNumberValid;
};

export const isUserLoggedIn = () => {
  const token = localStorage.getItem("token");
  if (!token) {
    return false;
  }

  try {
    const decodedToken = jwtDecode(token);

    // convert into seconds from ms
    const currentTime = Date.now() / 1000;
    const expiration = decodedToken.exp > currentTime;

    return expiration;
  } catch (error) {
    console.error("Invalid token:", error);
    return false;
  }
};

export const checkOverlappingTrips = (tripPlans, currTripPlan) => {
  // collect all dates
  if (tripPlans === null) {
    return false;
  }

  return tripPlans.some((element) => {
    if (
      Number(element.trail_id) === Number(currTripPlan.trailId) &&
      element.archived === false
    ) {
      const startDate = new Date(element.start_date);

      const currStart = new Date(currTripPlan.startDate);
      const currEnd = new Date(currTripPlan.endDate);

      console.log("going to check now");

      if (currStart >= startDate && startDate <= currEnd) {
        console.log("invalid date range!!!");
        return true;
      }
    }
  });
};
