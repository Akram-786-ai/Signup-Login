import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

function Signup() {
    const [value, setValue] = useState({
        username: "",
        email: "",
        password: "",
    });

    const [error, setError] = useState({});
    const navigate = useNavigate();

    const onChange = (e) => {
        setValue({ ...value, [e.target.name]: e.target.value });
    };

    const goToLogin = () => {
        navigate("/login");
    };

    const onSubmit = (e) => {
        e.preventDefault();

        const validationError = {};

        if (!value.username.trim()) {
            validationError.username = "Username is required";
        }

        if (!value.email.trim()) {
            validationError.email = "Email is required";
        } else if (!/\S+@\S+\.\S+/.test(value.email)) {
            validationError.email = "Email is invalid";
        }

        if (!value.password.trim()) {
            validationError.password = "Password is required";
        } else if (value.password.length < 6) {
            validationError.password = "Password must be at least 6 characters";
        }

        setError(validationError);

        if (Object.keys(validationError).length === 0) {
            const existingUsers = JSON.parse(localStorage.getItem("users")) || [];

            const userExists = existingUsers.find(
                (user) => user.email === value.email
            );

            if (userExists) {
                alert("This email is already registered. Please login!");
                navigate("/login");
                return;
            }

            existingUsers.push(value);
            localStorage.setItem("users", JSON.stringify(existingUsers));

            alert("Account created successfully! Please login now.");
            navigate("/login");
        }
    };

    return (
        <div className="flex justify-center items-center min-h-screen bg-gradient-to-r from-pink-500 to-purple-600 px-4">
            {/* 🔹 Card Container */}
            <div className="bg-white w-full max-w-sm sm:max-w-md md:max-w-lg lg:max-w-md xl:max-w-md p-6 sm:p-8 md:p-10 rounded-2xl shadow-lg transition-transform duration-300 ease-in-out hover:scale-[1.02]">
                <h2 className="text-2xl md:text-3xl font-bold mb-4 text-center text-gray-800">
                    Sign Up
                </h2>

                <form onSubmit={onSubmit} className="space-y-4">
                    <div>
                        <input
                            className="w-full p-2 md:p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
                            name="username"
                            value={value.username}
                            type="text"
                            placeholder="Full Name"
                            onChange={onChange}
                        />
                        {error.username && (
                            <p className="text-red-500 text-sm mt-1">{error.username}</p>
                        )}
                    </div>

                    <div>
                        <input
                            className="w-full p-2 md:p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
                            name="email"
                            value={value.email}
                            type="email"
                            placeholder="Email"
                            onChange={onChange}
                        />
                        {error.email && (
                            <p className="text-red-500 text-sm mt-1">{error.email}</p>
                        )}
                    </div>

                    <div>
                        <input
                            className="w-full p-2 md:p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
                            name="password"
                            value={value.password}
                            type="password"
                            placeholder="Password"
                            onChange={onChange}
                        />
                        {error.password && (
                            <p className="text-red-500 text-sm mt-1">{error.password}</p>
                        )}
                    </div>

                    <button
                        className="w-full bg-blue-500 text-white p-2 md:p-3 rounded-lg hover:bg-blue-600 transition duration-200"
                        type="submit"
                    >
                        Sign Up
                    </button>

                    <p className="mt-4 text-center text-gray-700 text-sm md:text-base">
                        Already have an account?{" "}
                        <span
                            className="text-blue-500 font-medium cursor-pointer hover:underline"
                            onClick={goToLogin}
                        >
                            Login
                        </span>
                    </p>
                </form>
            </div>
        </div>
    );
}

export default Signup;
