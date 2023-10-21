import { useNavigate, useParams } from "react-router-dom";
import { useContext, useEffect } from "react";

import styles from "./Agenda.module.css";
import { CalendarContext } from "../../hook/calendar.context";
import { TimeBlock } from "./agendaComponents/TimeBlock";

export default function AgendaPage() {
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
  }, [navigate]);

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
