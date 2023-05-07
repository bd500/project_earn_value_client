import React from "react";
import logo from "./logo.svg";
import {BrowserRouter, Route, Routes} from "react-router-dom";
import PortfolioScreen from "./screens/PortfolioScreen";
import ProjectScreen from "./screens/ProjectScreen";
import ReportScreen from "./screens/ReportScreen";
import TrackScreen from "./screens/TrackScreen";
import RootLayout from "./layouts/RootLayout";
import PageNotFoundScreen from "./screens/PageNotFoundScreen";

function App() {
    return (
        <BrowserRouter>
            <Routes>
                <Route element={<RootLayout />}>
                    <Route element={<PortfolioScreen />} path="/portfolio" />
                    <Route element={<ProjectScreen />} path="/project" />
                    <Route element={<ReportScreen />} path="/report" />
                    <Route element={<TrackScreen />} path="/track" />
                    <Route path="*" element={<PageNotFoundScreen />} />
                </Route>
            </Routes>
        </BrowserRouter>
    );
}

export default App;
