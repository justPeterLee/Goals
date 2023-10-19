export function useCalendar(
  manual: { month: string; year: string } | undefined
) {
  let date = manual ? new Date(`${manual.month} 1 ${manual.year}`) : new Date();
  let month = date.getUTCMonth();
  let day = date.getUTCDate();
  let year = date.getUTCFullYear();

  let monthText = monthConverter(month, year);

  return {
    ...monthText,
    current: {
      day,
      month,
      year,
    },
  };
}

function monthConverter(month: number, year: number) {
  const isLeapYear = (year: number) => {
    return (year % 4 === 0 && year % 100 !== 0) || year % 400 === 0;
  };
  const months = [
    {
      name: "January",
      days: 31,
    },
    {
      name: "February",
      days: isLeapYear(year) ? 29 : 28,
    },
    {
      name: "March",
      days: 31,
    },
    {
      name: "April",
      days: 30,
    },
    { name: "May", days: 31 },
    { name: "June", days: 30 },
    { name: "July", days: 31 },
    {
      name: "August",
      days: 31,
    },
    {
      name: "September",
      days: 30,
    },
    {
      name: "October",
      days: 31,
    },
    {
      name: "November",
      days: 30,
    },
    {
      name: "December",
      days: 31,
    },
  ];

  const startMonth = new Date(`${month + 1} 1 ${year}`).getDay();
  const endMoth = new Date(
    `${month + 1} ${months[month].days} ${year}`
  ).getDay();

  const start = {
    number: startMonth,
    day: dayConverter(startMonth),
  };

  const end = {
    dayIndex: endMoth,
    day: dayConverter(endMoth),
    number: months[month].days + startMonth - 1,
  };

  const previousMonth = month - 1 >= 0 ? month - 1 : 11;
  const followingMonth = month + 1 <= 11 ? month + 1 : 0;

  const previous = months[previousMonth];
  const following = months[followingMonth];

  return { month: months[month], start, end, previous, following };
}

function dayConverter(day: number) {
  const daysOfWeek = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];

  return daysOfWeek[day];
}

export function useDateConvert(date: Date) {
  let month = date.getUTCMonth();
  let day = date.getUTCDate();
  let year = date.getUTCFullYear();
  const dateObj = {
    month,
    day,
    year,
  };

  return dateObj;
}

export function useGenerateDate(
  dayOffset: number,
  dayPos: string,
  month: number,
  year: number
) {
  const trueMonth = month + 1 <= 12 ? month + 1 : 1;
  switch (true) {
    case dayPos === "after":
      const followingMonth = trueMonth + 1 <= 12 ? trueMonth + 1 : 0;

      // console.log(followingMonth);
      // console.log(month);
      return new Date(`${followingMonth} ${dayOffset} ${year}`);
    case dayPos === "before":
      const previousMonth = trueMonth - 1 >= 0 ? trueMonth - 1 : 11;
      return new Date(`${previousMonth} ${dayOffset} ${year}`);
    default:
      return new Date(`${trueMonth} ${dayOffset} ${year}`);
  }
}
