import React from "react";
import logo from "./logo.svg";
import {BrowserRouter, Route, Routes} from "react-router-dom";
import PortfolioScreen from "./screens/Portfolio/PortfolioScreen";
import ProjectScreen from "./screens/Project/ProjectScreen";
import ReportScreen from "./screens/Report/ReportScreen";
import TrackScreen from "./screens/Track/TrackScreen";
import RootLayout from "./layouts/RootLayout";
import DashboardScreen from "./screens/Dashboard/DashboardScreen";

function App() {
    return (
        <BrowserRouter>
            <Routes>
                <Route element={<RootLayout />}>
                    {/* tam */}
                    <Route element={<h1>123</h1>} path="/" />

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
