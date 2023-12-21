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

    console.log(calendarContext);
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
      <TimeBlock />
    </>
  );
}
