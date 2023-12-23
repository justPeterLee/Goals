import { useNavigate, useParams } from "react-router-dom";
import { useContext, useEffect } from "react";
import { useDispatch } from "react-redux";
import { useAppSelector } from "../../hook/redux.hook";
import styles from "./Agenda.module.css";
import { CalendarContext } from "../../hook/calendar.context";
import { TimeBlock } from "./agendaComponents/TimeBlock";

export default function AgendaPage() {
  const dispatch = useDispatch();
  const reduxTask = useAppSelector((state) => state.agenda);

  const navigate = useNavigate();
  const params = useParams();

  const calendarContext = useContext(CalendarContext);
  const agenda = calendarContext!.currentAgenda;
  const proxyParams = {
    date: params.day || "",
    month: params.month || "",
    year: params.year || "",
  };

  const backToCalendar = () => {
    navigate(`/calendar/${agenda.full.year}/${agenda.fullNum.month}`);
  };

  const changeDay = (direction: number) => {
    // console.log(agenda);
    // go to next day
    // check day => new month
    // check month => new year

    //check current month to see limiters
    //  - check if over steping limiters

    // change month if ness
    //  - check for year limiter
    const month = agenda.month;
    const currentDate = agenda.fullNum;

    const newURL = {
      date: agenda.fullNum.date + direction,
      month: agenda.fullNum.month,
      year: agenda.fullNum.year,
    };

    if (currentDate.date + direction > month.month.days) {
      console.log("new Month");
      newURL.date = 1;

      //new month
      if (newURL.month + 1 > 12) {
        //new year
        newURL.month = 1;
        newURL.year += 1;
      } else {
        newURL.month += 1;
      }
    } else if (currentDate.date + direction < 1) {
      console.log("old Month");
      newURL.date = month.previous.days;

      if (newURL.month - 1 < 1) {
        newURL.month = 12;
        newURL.year -= 1;
      } else {
        newURL.month -= 1;
      }
    }

    navigate(`/agenda/${newURL.year}/${newURL.month}/${newURL.date}`);
  };

  useEffect(() => {
    const newDate: any = calendarContext?.manualAgenda(proxyParams);
    // console.log(newDate);

    dispatch({
      type: "GET_TASK",
      payload: {
        ...newDate.fullNum,
        fullDate: newDate.date,
      },
    });

    // console.log(calendarContext);
  }, [navigate]);

  if (reduxTask.agenda === null) {
    return <p>loading...</p>;
  }
  return (
    <>
      {/* {JSON.stringify(reduxTask.agenda)} */}
      <p className={styles.AgendaTitle}>
        {agenda.full.day} - {agenda.full.month} {agenda.fullNum.date},{" "}
        {agenda.fullNum.year}
      </p>
      <button
        onClick={() => {
          backToCalendar();
        }}
      >
        back
      </button>

      <div>
        <button
          onClick={() => {
            changeDay(-1);
          }}
        >
          prev
        </button>
        <button
          onClick={() => {
            changeDay(1);
          }}
        >
          next
        </button>
      </div>
      <TimeBlock />
    </>
  );
}
