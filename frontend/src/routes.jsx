import React from "react";
import { Routes, Route } from 'react-router-dom'
import OrganizerDashboard from "./pages/OrganizerDashboard";
import UserDashboard from "./pages/UserDashboard";

export const AppRoutes = () => {
    return (
        <Routes>
            <Route path="/" element={<UserDashboard />} />
            <Route path="organizer" element={<OrganizerDashboard />} />
        </Routes>
    )
}