import Input from "../components/Input";
import Button from "../components/Button";
function Login() {
  return (
    <div className="min-h-screen bg-slate-100 flex items-center justify-center">
      <div className="bg-white rounded-2xl shadow-xl p-8 w-full max-w-md">
       <h1 className="text-5xl text-violet-600 font-bold text-center mb-6">📚 StudyMate AI</h1>
       <p className="text-sm text-slate-500 font-light text-center ">Your AI-powered study companion</p>
      <div className="mt-8">
      <Input label="Email" type="email" placeholder="Enter your email" />
      <Input label="Password" type="password" placeholder="Enter your password" />
      <div className="text-right mb-4">
      <a
        href="#"
        className="text-sm text-violet-600 hover:underline"
        >
        Forgot Password?
      </a>
      </div>
      <Button text="Login" />
      <div className="flex items-center my-6">
      <hr className="flex-grow border-slate-300" />
      <span className="mx-4 text-sm text-slate-500">
      OR
      </span>
      <hr className="flex-grow border-slate-300" />
      </div> <div className="text-center">
      <p className="text-sm text-slate-500 mb-2">Don't have an account?</p>
      <a href="#" className="text-sm font-bold text-violet-600 hover:underline inline-block">Sign up</a>
      </div>
      </div>
    </div>
    </div>
  );
}

export default Login;