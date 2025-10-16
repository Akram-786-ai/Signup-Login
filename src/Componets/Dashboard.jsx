import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

function Dashboard() {
    const navigate = useNavigate();
    const [user, setUser] = useState(null);

    useEffect(() => {
        // LocalStorage se user data read karo
        const loggedUser = JSON.parse(localStorage.getItem("loggedInUser"));
        const isLoggedIn = localStorage.getItem("isLoggedIn");

        // Agar login nahi hai to redirect to login page
        if (!isLoggedIn || !loggedUser) {
            navigate("/login");
        } else {
            setUser(loggedUser);
        }
    }, [navigate]);

    const handleLogout = () => {
        localStorage.removeItem("loggedInUser");
        localStorage.removeItem("isLoggedIn");
        navigate("/login");
    };

    return (
        <div className="flex justify-center items-center h-screen from-pink-500 to-purple-600 bg-gradient-to-r">
            <div className="bg-white p-6 rounded shadow-md w-full max-w-sm text-center">
                <h1 className="text-black text-3xl font-bold p-5">
                    Welcome, {user ? user.username : "Guest"} 👋
                </h1>

                <button
                    onClick={handleLogout}
                    className="w-full bg-blue-500 text-white p-2 rounded hover:bg-blue-600"
                    type="button"
                >
                    Logout
                </button>
            </div>
        </div>
    );
}

export default Dashboard;
