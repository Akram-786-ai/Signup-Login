import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

function Login() {
    const navigate = useNavigate();

    const [data, setData] = useState({
        email: "",
        password: "",
    });

    const [error, setError] = useState({});

    const handleOnchange = (e) => {
        setData({
            ...data,
            [e.target.name]: e.target.value,
        });
    };

    const register = () => {
        navigate('/')
    }

    const OnSubmit = (e) => {
        e.preventDefault();

        const validationError = {};
        if (!data.email.trim()) {
            validationError.email = "Please enter your email";
        }
        if (!data.password.trim()) {
            validationError.password = "Please enter your password";
        }

        setError(validationError);

        if (Object.keys(validationError).length === 0) {
            const users = JSON.parse(localStorage.getItem("users")) || [];
            const user = users.find(
                (user) =>
                    user.email === data.email && user.password === data.password
            );

            if (user) {
                localStorage.setItem("loggedInUser", JSON.stringify(user));
                localStorage.setItem("isLoggedIn", "true");
                alert(`Welcome back, ${user.username}!`);
                navigate("/dashboard");
            } else {
                setError({ general: "Invalid email or password" });
            }
        }
    };

    return (
        <div className="flex justify-center items-center h-screen from-pink-500 to-purple-600 bg-gradient-to-r">
            <div className="bg-white p-6 rounded shadow-md w-full max-w-sm">
                <h2 className="text-2xl font-bold mb-4 text-center">Login</h2>

                <form onSubmit={OnSubmit}>
                    <div className="mb-4">
                        <label className="block mb-2" htmlFor="email">
                            Email
                        </label>
                        <input
                            className="w-full p-2 border border-gray-300 rounded"
                            name="email"
                            type="email"
                            id="email"
                            value={data.email}
                            placeholder="Enter email"
                            onChange={handleOnchange}
                        />
                        {error.email && (
                            <span className="text-red-500">{error.email}</span>
                        )}
                    </div>

                    <div className="mb-4">
                        <label className="block mb-2" htmlFor="password">
                            Password
                        </label>
                        <input
                            className="w-full p-2 border border-gray-300 rounded"
                            name="password"
                            type="password"
                            id="password"
                            value={data.password}
                            placeholder="Enter password"
                            onChange={handleOnchange}
                        />
                        {error.password && (
                            <span className="text-red-500">{error.password}</span>
                        )}
                    </div>

                    {error.general && (
                        <p className="text-red-500 mb-2">{error.general}</p>
                    )}

                    <button
                        className="w-full bg-blue-500 text-white p-2 rounded hover:bg-blue-600"
                        type="submit"
                    >
                        Login
                    </button>
                    <p className="mt-4 text-center">
                        Don't have an account?{" "}
                        <button className="text-blue-500" onClick={register}>
                            Register
                        </button>
                    </p>
                </form>

            </div>
        </div>
    );
}

export default Login;
