import React from "react";
import logo from "./logo.svg";
import {BrowserRouter, Route, Routes} from "react-router-dom";
import PortfolioScreen from "./screens/Portfolio/PortfolioScreen";
import ProjectScreen from "./screens/Project/ProjectScreen";
import ReportScreen from "./screens/Report/ReportScreen";
import TrackScreen from "./screens/Track/TrackScreen";
import RootLayout from "./layouts/RootLayout";
import DashboardScreen from "./screens/Dashboard/DashboardScreen";
import HomeScreen from "./screens/Home/HomeScreen";
import LoginScreen from "./screens/Login/LoginScreen";
import RegisterScreen from "./screens/Register/RegisterScreen";
import HomeLayout from "./layouts/HomeLayout";

function App() {
    return (
        <BrowserRouter>
            <Routes>
                <Route element={<HomeLayout />}>
                    <Route element={<HomeScreen />} path="/" />
                    <Route element={<LoginScreen />} path="/login" />
                    <Route element={<RegisterScreen />} path="/register" />
                </Route>
                <Route element={<RootLayout />}>
                    <Route element={<DashboardScreen />} path="/dashboard" />
                    <Route element={<PortfolioScreen />} path="/portfolio" />
                    <Route element={<ProjectScreen />} path="/project" />
                    <Route element={<ReportScreen />} path="/report" />
                    <Route element={<TrackScreen />} path="/track" />
                    <Route path="*" element={<h1>404: Page Not Found</h1>} />
                </Route>
            </Routes>
        </BrowserRouter>
    );
}

export default App;
