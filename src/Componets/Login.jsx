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
        navigate("/");
    };

    const OnSubmit = (e) => {
        e.preventDefault();

        const validationError = {};
        if (!data.email.trim()) validationError.email = "Please enter your email";
        if (!data.password.trim()) validationError.password = "Please enter your password";

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

                alert(`Welcome back, ${user.fullName}!`);
                navigate("/dashboard");
            } else {
                setError({ general: "Invalid email or password" });
            }
        }
    };

    return (
        <div className="flex justify-center items-center min-h-screen bg-gradient-to-r from-pink-500 to-purple-600 px-4">
            <div className="bg-white p-6 sm:p-8 rounded-xl shadow-md w-full max-w-md sm:max-w-sm md:max-w-md lg:max-w-lg">
                <h2 className="text-2xl sm:text-3xl font-bold mb-4 text-center text-gray-800">
                    Login
                </h2>

                <form onSubmit={OnSubmit}>
                    {/* Email Field */}
                    <div className="mb-4">
                        <label className="block mb-2 font-medium text-gray-700" htmlFor="email">
                            Email
                        </label>
                        <input
                            className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                            name="email"
                            type="email"
                            id="email"
                            value={data.email}
                            placeholder="Enter your email"
                            onChange={handleOnchange}
                        />
                        {error.email && (
                            <span className="text-red-500 text-sm">{error.email}</span>
                        )}
                    </div>

                    {/* Password Field */}
                    <div className="mb-4">
                        <label className="block mb-2 font-medium text-gray-700" htmlFor="password">
                            Password
                        </label>
                        <input
                            className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                            name="password"
                            type="password"
                            id="password"
                            value={data.password}
                            placeholder="Enter your password"
                            onChange={handleOnchange}
                        />
                        {error.password && (
                            <span className="text-red-500 text-sm">{error.password}</span>
                        )}
                    </div>

                    {/* Error Message */}
                    {error.general && (
                        <p className="text-red-500 mb-2 text-center">{error.general}</p>
                    )}

                    {/* Login Button */}
                    <button
                        className="w-full bg-purple-600 text-white p-3 rounded-lg hover:bg-purple-700 transition duration-300"
                        type="submit"
                    >
                        Login
                    </button>

                    {/* Register Link */}
                    <p className="mt-4 text-center text-gray-700 text-sm sm:text-base">
                        Don't have an account?{" "}
                        <button
                            type="button"
                            className="text-purple-600 font-semibold hover:underline"
                            onClick={register}
                        >
                            Register
                        </button>
                    </p>
                </form>
            </div>
        </div>
    );
}

export default Login;
