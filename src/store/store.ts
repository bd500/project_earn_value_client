import {configureStore} from "@reduxjs/toolkit";
import authSlice from "./authSlice";
import projectSlice from "./projectSlice";

const store = configureStore({
    reducer: {
        auth: authSlice,
        projects: projectSlice,
    },
});

export default store;
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
