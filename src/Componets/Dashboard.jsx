import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

function Dashboard() {
    const navigate = useNavigate();
    const [username, setUsername] = useState("");

    useEffect(() => {
        // Get logged-in user data from LocalStorage
        const loggedInUser = JSON.parse(localStorage.getItem("loggedInUser"));
        const isLoggedIn = localStorage.getItem("isLoggedIn");

        // If not logged in, redirect to Login page
        if (!isLoggedIn) {
            navigate("/login");
        } else if (loggedInUser) {
            setUsername(loggedInUser.username);
        }
    }, [navigate]);

    // Logout function
    const handleLogout = () => {
        localStorage.removeItem("loggedInUser");
        localStorage.removeItem("isLoggedIn");
        alert("You have logged out successfully!");
        navigate("/login");
    };

    return (
        <div className="flex justify-center items-center min-h-screen bg-gradient-to-r from-pink-500 to-purple-600 px-4">
            <div className="bg-white w-full max-w-md sm:max-w-sm md:max-w-md lg:max-w-lg p-6 sm:p-8 rounded-xl shadow-lg text-center">
                <h1 className="text-3xl sm:text-4xl font-bold text-gray-800 mb-4">
                    Welcome 👋
                </h1>
                <p className="text-lg sm:text-xl text-gray-600 mb-6">
                    {username ? `Hello, ${username}!` : "Loading..."}
                </p>
                <button
                    onClick={handleLogout}
                    className="w-full bg-purple-600 text-white p-3 rounded-lg hover:bg-purple-700 transition duration-300 font-medium"
                >
                    Logout
                </button>
            </div>
        </div>
    );
}

export default Dashboard;
