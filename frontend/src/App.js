import React from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom"; 
import Register from "./components/Register"; // Import Register component
import Login from "./components/Login"; // Import Login component

function App() {
    return (
        <Router>
            <div>
                <h1>Recipe App</h1>
                <Routes>
                  {/* Default Route */}
                    <Route path="/" element={< Navigate to="/register"/>} />  
                    {/* Route to the Register page */}
                    <Route path="/register" element={<Register />} />
                    {/* Route to the Login page */}
                    <Route path="/login" element={<Login />} />
                </Routes>
            </div>
        </Router>
    );
}

export default App; 
