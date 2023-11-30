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
    console.log("effect");
    const newDate: any = calendarContext?.manualAgenda(proxyParams);
    // if (proxyParams.date && proxyParams.month && proxyParams.year) {
    //   if (
    //     proxyParams.date == agenda.fullNum.date.toString() &&
    //     proxyParams.month === agenda.fullNum.month.toString() &&
    //     proxyParams.year === agenda.fullNum.year.toString()
    //   ) {
    //     console.log("matched");
    //   }
    // }
    console.log(newDate);

    console.log("dispatch");
    dispatch({
      type: "GET_TASK",
      payload: {
        ...newDate.fullNum,
        fullDate: newDate.date,
      },
    });
    // console.log(reduxTask);
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
