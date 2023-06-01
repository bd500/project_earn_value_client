import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import axios from "axios";
import {RowData} from "../components/DynamicTable/DynamicTable";
import {calCost, calPortfolio} from "../helper/calculator";

interface Project {
    id?: string;
    name?: string;
    duration?: number;
    note?: string;
    tasks?: RowData[];
    report?: any;
    status?: string;
}

interface InitState {
    projects: Project[];
    project: Project;
}

// const currentUser = JSON.parse(localStorage.getItem("userInfo") || "");
const userInfo = localStorage.getItem("userInfo");
const currentUser = userInfo ? JSON.parse(userInfo) : null;

const config = {
    headers: {
        "Content-Types": "application/json",
        Authorization: `Bearer ${currentUser.token}`,
    },
};

export const createProject = createAsyncThunk(
    "createProject",
    async (project: Project) => {
        const {data} = await axios.post(
            `http://localhost:3001/project`,
            project,
            config
        );

        return data;
    }
);

export const getProjects = createAsyncThunk("getProjects", async () => {
    const {data} = await axios.get("http://localhost:3001/project", config);

    return data;
});

export const getOneProject = createAsyncThunk(
    "getOneProject",
    async (id: string) => {
        const {data} = await axios.get(
            `http://localhost:3001/project/${id}`,
            config
        );

        return data;
    }
);

export const updateProject = createAsyncThunk(
    "updateProject",
    async ({
        name,
        id,
        duration,
        status,
        note,
        tasks,
    }: {
        name?: string;
        id: string;
        duration?: number;
        status?: string;
        note?: string;
        tasks?: RowData[];
    }) => {
        const project = {name, duration, status, note, tasks};
        const {data} = await axios.patch(
            `http://localhost:3001/project/info/${id}`,
            project,
            config
        );
        return data;
    }
);

export const updateReport = createAsyncThunk(
    "updateReport",
    async ({tasks, id}: {tasks: RowData[]; id: string}) => {
        const {ac, ev, pv} = calCost(tasks);
        // const report = calPortfolio(
        //     tasks,
        //     cumCost.ev[cumCost.currentMonth - 1]
        // );
        const {data} = await axios.patch(
            `http://localhost:3001/project/${id}`,
            {tasks, report: {ac, ev, pv}},
            config
        );
        return data;
    }
);

export const deleteProject = createAsyncThunk(
    "deleteProject",
    async (id: string) => {
        const {data} = await axios.delete(
            `http://localhost:3001/project/${id}`,
            config
        );
        return data;
    }
);

const initialState: InitState = {
    projects: [],
    project: {name: "Unnamed", duration: 12},
};

const projectSlice = createSlice({
    name: "project",
    initialState: initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(createProject.fulfilled, (state, action) => {
            state.project = action.payload;
        });

        builder.addCase(getProjects.fulfilled, (state, action) => {
            state.projects = action.payload;
        });

        builder.addCase(getOneProject.fulfilled, (state, action) => {
            state.project = action.payload;
        });

        builder.addCase(updateProject.fulfilled, (state, action) => {
            //state.project = action.payload;
            console.log(action.payload);
        });

        builder.addCase(deleteProject.fulfilled, (state, action) => {
            console.log(action.payload);
        });
    },
});

const {reducer} = projectSlice;
export default reducer;
