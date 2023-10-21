import { useNavigate, useParams } from "react-router-dom";
import { useContext, useEffect } from "react";

import { CalendarContext } from "../../hook/calendar.context";
import { TimeBlock } from "./agendaComponents/TimeBlock";

export default function AgendaPage() {
  const navigate = useNavigate();
  const params = useParams();
  const calendarContext = useContext(CalendarContext);

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
      <p>{calendarContext?.currentAgenda.full.month}</p>
      <TimeBlock />
    </>
  );
}
