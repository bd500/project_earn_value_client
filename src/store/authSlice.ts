import axios from "axios";
import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";

interface LoginAttributes {
    email: string;
    password: string;
}

interface RegisterAttributes {
    email: string;
    password: string;
    name: string;
}

const config = {
    headers: {
        "Content-Types": "application/json",
    },
};

const initialState = {
    userInfo: JSON.parse(localStorage.getItem("userInfo") || ""),
};

export const login = createAsyncThunk(
    "login",
    async (loginAttr: LoginAttributes) => {
        const {data} = await axios.post(
            "http://localhost:3001/auth/login",
            loginAttr,
            config
        );
        return data;
    }
);

export const register = createAsyncThunk(
    "register",
    async (registerAttr: RegisterAttributes) => {
        const {data} = await axios.post(
            "http://localhost:3001/auth/register",
            registerAttr,
            config
        );
        return data;
    }
);

const loginSlice = createSlice({
    name: "login",
    initialState: initialState,
    reducers: {
        logout: (state) => {
            state.userInfo = null;
            localStorage.clear();
        },
    },
    extraReducers: (builder) => {
        builder.addCase(login.fulfilled, (state, action) => {
            state.userInfo = action.payload;

            localStorage.setItem("userInfo", JSON.stringify(state.userInfo));
        });

        builder.addCase(register.fulfilled, (state, action) => {
            state.userInfo = action.payload;

            localStorage.setItem("userInfo", JSON.stringify(state.userInfo));
        });
    },
});

const {reducer, actions} = loginSlice;
export default reducer;
export const {logout} = actions;
