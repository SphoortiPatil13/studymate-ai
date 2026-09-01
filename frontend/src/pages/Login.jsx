import Input from "../components/Input";
import Button from "../components/Button";
import {useState} from"react";
import { useNavigate } from "react-router-dom";
function Login() {
  const [email, setEmail]= useState("");
  const [password, setPassword]= useState("");
  const [errorMessage, seterrorMessage]= useState("");
  const navigate = useNavigate();
  console.log({email, password});
  async function handleLogin() {
  if (email.trim() === "") {
    seterrorMessage("Email is required");
    return;
  }

  if (password.trim() === "") {
    seterrorMessage("Password is required");
    return;
  }

  seterrorMessage("");

  try {
    const response = await fetch("http://127.0.0.1:8000/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: email,
        password: password,
      }),
    });

    const data = await response.json();

    if (!response.ok) {
      seterrorMessage(data.detail || "Login failed");
      return;
    }

    // Store authentication token
    localStorage.setItem("token", data.access_token);

    // Store logged-in user information
    localStorage.setItem(
      "user",
      JSON.stringify(data.user)
    );
    window.dispatchEvent(new Event("authChanged"));
    navigate("/dashboard");

  } catch (error) {
    console.error(error);
    seterrorMessage(
      "Something went wrong. Please try again."
    );
  }
}
  return (
    <div className="min-h-screen bg-slate-100 flex items-center justify-center">
      <div className="bg-white rounded-2xl shadow-xl p-8 w-full max-w-md">
       <h1 className="text-5xl text-violet-600 font-bold text-center mb-6">📚 StudyMate AI</h1>
       <p className="text-sm text-slate-500 font-light text-center ">Your AI-powered study companion</p>
      <div className="mt-8">
      <Input label="Email" type="email" placeholder="Enter your email" value={email} onChange={(e) => setEmail(e.target.value)} />
      <Input label="Password" type="password" placeholder="Enter your password" value={password} onChange={(e) => setPassword(e.target.value)}/>
      {errorMessage && (
      <p className="text-red-500 text-sm mb-4">
      {errorMessage}
      </p>
      )}
      <div className="text-right mb-4">
      <a
        href="#"
        className="text-sm text-violet-600 hover:underline"
        >
        Forgot Password?
      </a>
      </div>
      <Button text="Login" onClick={handleLogin} className="w-full"/>
      <div className="flex items-center my-6">
      <hr className="flex-grow border-slate-300" />
      <span className="mx-4 text-sm text-slate-500">
      OR
      </span>
      <hr className="flex-grow border-slate-300" />
      </div> <div className="text-center">
      <p className="text-sm text-slate-500 mb-2">Don't have an account?</p>
      <button
      onClick={() => navigate("/signup")}
      className="text-sm font-bold text-violet-600 hover:underline inline-block">
      Sign up
      </button>
      </div>
      </div>
    </div>
    </div>
  );
}

export default Login;