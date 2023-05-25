import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import axios from "axios";
import {RowData} from "../components/DynamicTable/DynamicTable";

interface Project {
    id?: string;
    name?: string;
    duration?: number;
    note?: string;
    tasks?: RowData[];
    report?: string;
    status?: string;
}

interface InitState {
    projects: Project[];
    project: Project;
}

const currentUser = JSON.parse(localStorage.getItem("userInfo") || "");

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
            `http://localhost:3001/project/${id}`,
            project,
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
            state.project = action.payload;
        });
    },
});

const {reducer} = projectSlice;
export default reducer;
