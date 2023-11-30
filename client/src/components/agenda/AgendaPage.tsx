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
    calendarContext?.manualAgenda(proxyParams);
    dispatch({ type: "GET_TASK" });
    console.log(reduxTask);
  }, [navigate]);

  if (reduxTask.agenda === null) {
    return <p>loading...</p>;
  }
  return (
    <>
      <p className={styles.AgendaTitle}>
        {agenda.full.day} - {agenda.full.month} {agenda.fullNum.date},{" "}
        {agenda.fullNum.year}
      </p>
      <TimeBlock />
    </>
  );
}
