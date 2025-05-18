"use client";

import { signin, signup } from "@/redux/actions/auth";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";

export default function AuthForm() {
  const [isSignUp, setIsSignUp] = useState(false);
  const router = useRouter();
  const [signUpForm, setSignUpForm] = useState({
    username: "",
    email: "",
    password: "",
  });

  const [signInForm, setSignInForm] = useState({
    email: "",
    password: "",
  });
  const dispatch = useDispatch();
  const handleChange = (e) => {
    const { name, value } = e.target;
    if (isSignUp) {
      setSignUpForm((prev) => ({
        ...prev,
        [name]: value,
      }));
    } else {
      setSignInForm((prev) => ({
        ...prev,
        [name]: value,
      }));
    }
  };
  useEffect(() => {
    const localData = localStorage.getItem("profile");
    if (localData) {
      router.push("/");
    }
  }, []);
  const handleSubmit = (e) => {
    e.preventDefault();
    if (isSignUp) {
      dispatch(signup(signUpForm));
      console.log("Sign Up:", signUpForm);
      setTimeout(() => {
        window.location.reload();
      }, 4000);
      // Sign up logic here
    } else {
      dispatch(signin(signInForm));
      console.log("Sign In:", signInForm);
      setTimeout(() => {
        window.location.reload();
      }, 4000);

      // Sign in logic here
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
      <div className="w-full max-w-md bg-white rounded-xl shadow-lg p-6">
        <h2 className="text-2xl font-bold text-center mb-6">
          {isSignUp ? "Create Account" : "Sign In"}
        </h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          {isSignUp && (
            <div>
              <label className="block text-sm font-medium mb-1">Username</label>
              <input
                type="text"
                name="username"
                value={signUpForm.username}
                onChange={handleChange}
                required
                className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#dd1b24]"
              />
            </div>
          )}
          <div>
            <label className="block text-sm font-medium mb-1">Email</label>
            <input
              type="email"
              name="email"
              value={isSignUp ? signUpForm.email : signInForm.email}
              onChange={handleChange}
              required
              className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#dd1b24]"
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Password</label>
            <input
              type="password"
              name="password"
              value={isSignUp ? signUpForm.password : signInForm.password}
              onChange={handleChange}
              required
              className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#dd1b24]"
            />
          </div>
          <button
            type="submit"
            className="w-full bg-[#dd1b24] text-white py-2 rounded-md hover:opacity-90 transition cursor-pointer"
          >
            {isSignUp ? "Sign Up" : "Sign In"}
          </button>
        </form>
        <p className="mt-4 text-center text-sm text-gray-600">
          {isSignUp ? "Already have an account?" : "Don't have an account?"}{" "}
          <button
            type="button"
            onClick={() => setIsSignUp(!isSignUp)}
            className="text-[#dd1b24] hover:underline ml-1 cursor-pointer"
          >
            {isSignUp ? "Sign In" : "Sign Up"}
          </button>
        </p>
      </div>
    </div>
  );
}
