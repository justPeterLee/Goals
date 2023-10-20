import { useParams } from "react-router-dom";

import { TimeBlock } from "./agendaComponents/TimeBlock";
export default function AgendaPage() {
  const params = useParams();
  console.log(params);
  return (
    <>
      <p>this is the agenda page</p>
      <TimeBlock />
    </>
  );
}
