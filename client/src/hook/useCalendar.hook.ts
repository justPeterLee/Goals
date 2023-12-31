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
  if (dayPos === "after") {
  }
  const trueMonth = month + 1 <= 12 ? month + 1 : 1;
  switch (true) {
    case dayPos === "after":
      const followingMonth = trueMonth + 1 <= 12 ? trueMonth + 1 : 0;
      return new Date(`${followingMonth} ${dayOffset} ${year}`);
    case dayPos === "before":
      const previousMonth = trueMonth - 1 >= 0 ? trueMonth - 1 : 11;
      return new Date(`${previousMonth} ${dayOffset} ${year}`);
    default:
      return new Date(`${trueMonth} ${dayOffset} ${year}`);
  }
}

// agenda

export function useAgenda(
  manual: { date: string; month: string; year: string } | undefined
) {
  // {year, month, day}
  /**
   * {
   *    full: {day, date, month, year}
   *    fullNum: {day, date, month, year}
   *    month: {useCalendar()}
   * }
   *  */
  // console.log(manual);

  // if date is larger or smaller
  // if month is larger or smaller
  const validDate = manual ? useValidDate(manual) : manual;

  const newDate = validDate
    ? new Date(`${validDate.month} ${validDate.date} ${validDate.year}`)
    : new Date();

  // newDate.setHours(0, 0, 0, 0);

  const proxDate = newDate.getDate();
  const proxDay = newDate.getDay();
  const proxMonth = newDate.getMonth() + 1;
  const proxYear = newDate.getFullYear();

  const monthData = useCalendar({
    month: proxMonth.toString(),
    year: proxYear.toString(),
  });

  const dayData = dayConverter(proxDay);

  const fullNumData = {
    day: proxDay,
    date: proxDate,
    month: proxMonth,
    year: proxYear,
  };

  const fullData = {
    day: dayData,
    date: proxDate,
    month: monthData.month.name,
    year: proxYear,
  };

  return {
    month: { ...monthData },
    date: newDate,
    full: fullData,
    fullNum: fullNumData,
  };
}

export function useValidDate(manual: {
  date: string;
  month: string;
  year: string;
}) {
  const validDate = manual ? manual : { date: "0", month: "0", year: "0" };

  if (manual) {
    if (parseInt(manual.month) > 12) {
      validDate.month = "12";
    } else if (parseInt(manual.month) < 1) {
      validDate.month = "1";
    }

    if (parseInt(manual.year) < 2020) {
      validDate.year = "2020";
    }

    const validDays = monthConverter(
      parseInt(validDate.month) - 1,
      parseInt(validDate.year)
    ).month.days;

    if (parseInt(manual.date) > validDays) {
      validDate.date = validDays.toString();
    } else if (parseInt(manual.date) < 1) {
      validDate.date = "1";
    }
  }

  return validDate;
}

export function useErrorDate(manual: {
  date: string;
  month: string;
  year: string;
}) {
  const validDate = manual ? manual : { date: "0", month: "0", year: "0" };
  const errorDate = { date: false, month: false, year: false };

  if (manual) {
    if (parseInt(manual.month) > 12) {
      validDate.month = "12";
      errorDate.month = true;
    } else if (parseInt(manual.month) < 1) {
      validDate.month = "1";
      errorDate.month = true;
    }

    if (parseInt(manual.year) < 2020) {
      validDate.year = "2020";
      errorDate.year = true;
    }

    const validDays = monthConverter(
      parseInt(validDate.month) - 1,
      parseInt(validDate.year)
    ).month.days;

    if (parseInt(manual.date) > validDays) {
      validDate.date = validDays.toString();
      errorDate.date = true;
    } else if (parseInt(manual.date) < 1) {
      validDate.date = "1";
      errorDate.date = true;
    }
  }

  return errorDate;
}
