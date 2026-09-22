import Input from "../components/Input";
import Button from "../components/Button";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

function Signup() {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [errorMessage, setErrorMessage] = useState("");

    const navigate = useNavigate();

    async function handleSignup() {
        if (name.trim() === "") {
            setErrorMessage("Name is required");
            return;
        }

        if (email.trim() === "") {
            setErrorMessage("Email is required");
            return;
        }

        if (password.trim() === "") {
            setErrorMessage("Password is required");
            return;
        }

        setErrorMessage("");

        try {
            const response = await fetch(
                `${import.meta.env.VITE_API_URL}/signup`,
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({
                        name: name,
                        email: email,
                        password: password,
                    }),
                }
            );

            const data = await response.json();

            if (!response.ok) {
                setErrorMessage(data.detail || "Signup failed");
                return;
            }

            console.log(data);

            // After successful signup, go to login
            navigate("/login");

        } catch (error) {
            console.error(error);
            setErrorMessage(
                "Something went wrong. Please try again."
            );
        }
    }

    return (
        <div className="min-h-screen bg-slate-100 flex items-center justify-center">
            <div className="bg-white rounded-2xl shadow-xl p-8 w-full max-w-md">

                <h1 className="text-5xl text-violet-600 font-bold text-center mb-6">
                    📚 StudyMate AI
                </h1>

                <p className="text-sm text-slate-500 font-light text-center">
                    Create your account and start studying smarter
                </p>

                <div className="mt-8">

                    <Input
                        label="Name"
                        type="text"
                        placeholder="Enter your name"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                    />

                    <Input
                        label="Email"
                        type="email"
                        placeholder="Enter your email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />

                    <Input
                        label="Password"
                        type="password"
                        placeholder="Create a password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />

                    {errorMessage && (
                        <p className="text-red-500 text-sm mb-4">
                            {errorMessage}
                        </p>
                    )}

                    <Button
                        text="Sign Up"
                        onClick={handleSignup}
                        className="w-full"
                    />

                    <div className="flex items-center my-6">
                        <hr className="flex-grow border-slate-300" />

                        <span className="mx-4 text-sm text-slate-500">
                            OR
                        </span>

                        <hr className="flex-grow border-slate-300" />
                    </div>

                    <div className="text-center">
                        <p className="text-sm text-slate-500 mb-2">
                            Already have an account?
                        </p>

                        <button
                            onClick={() => navigate("/login")}
                            className="text-sm font-bold text-violet-600 hover:underline"
                        >
                            Login
                        </button>
                    </div>

                </div>
            </div>
        </div>
    );
}

export default Signup;

