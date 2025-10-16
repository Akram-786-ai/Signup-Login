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

    // 🔹 handle input change
    const onChange = (e) => {
        setValue({ ...value, [e.target.name]: e.target.value });
    };

    const Login = () => {
        navigate('/login')
    }

    // 🔹 handle form submit
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

        // ✅ If no error, save user data to LocalStorage
        if (Object.keys(validationError).length === 0) {
            const existingUsers = JSON.parse(localStorage.getItem("users")) || [];

            // check if email already exists
            const userExists = existingUsers.find(
                (user) => user.email === value.email
            );

            if (userExists) {
                alert("This email is already registered. Please login!");
                navigate("/login");
                return;
            }

            // add new user
            existingUsers.push(value);

            // save updated array to LocalStorage
            localStorage.setItem("users", JSON.stringify(existingUsers));

            alert("Account created successfully! Please login now.");
            navigate("/login");
        }
    };

    return (
        <>
            <div className="flex justify-center items-center h-screen from-pink-500 to-purple-600 bg-gradient-to-r">
                <div className="bg-white p-6 rounded shadow-md w-full max-w-sm">
                    <h2 className="text-2xl font-bold mb-4 text-center">Sign Up</h2>

                    <form onSubmit={onSubmit}>
                        <div className="mb-4">
                            <input
                                className="w-full p-2 border border-gray-300 rounded"
                                name="username"
                                value={value.username}
                                type="text"
                                placeholder="Username"
                                onChange={onChange}
                            />
                            {error.username && (
                                <p className="text-red-500 text-sm mt-1">{error.username}</p>
                            )}
                        </div>

                        <div className="mb-4">
                            <input
                                className="w-full p-2 border border-gray-300 rounded"
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

                        <div className="mb-4">
                            <input
                                className="w-full p-2 border border-gray-300 rounded"
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
                            className="w-full bg-blue-500 text-white p-2 rounded hover:bg-blue-600"
                            type="submit"
                        >
                            Sign Up
                        </button>
                        <p className="mt-4 text-center">
                            Already have an account?{" "}
                            <span
                                className="text-blue-500 cursor-pointer"
                                onClick={Login}
                            >
                                Login
                            </span>
                        </p>
                    </form>
                </div>
            </div>
        </>
    );
}

export default Signup;
