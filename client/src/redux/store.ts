import { configureStore } from "@reduxjs/toolkit";

import { rootReducer } from "./reducers/_root.reducer";
// import combine
export const store = configureStore({ reducer: rootReducer });
