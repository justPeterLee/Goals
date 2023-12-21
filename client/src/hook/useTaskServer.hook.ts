import { useAppDispatch } from "./redux.hook";

export function useCompleteTask() {
  const dispatch = useAppDispatch();
  dispatch({ type: "PUT_TASK_COMPLETION", payload: "test" });
}
