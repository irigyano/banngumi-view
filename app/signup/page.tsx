"use client";
import Link from "next/link";
import { useState } from "react";
import { signIn } from "next-auth/react";

const SignUp = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");

  const submitForm = async (e: React.FormEvent) => {
    e.preventDefault();
    console.log(username, password, confirmPassword);

    if (password !== confirmPassword) {
      // pw not matched
      setError("Password Unmatched");
      return;
    }

    if (error) {
      setError("");
    }

    try {
      const res = await fetch("/api/signup", {
        method: "POST",
        body: JSON.stringify({
          username,
          password,
        }),
        headers: {
          "Content-Type": "application/json",
        },
      });
      if (res.ok) {
        signIn();
      } else {
        setError((await res.json()).error);
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <section className="flex justify-center">
      <div className="m-6 p-4 w-96 bg-[#f1f1f1] dark:bg-slate-900 shadow-md rounded-lg">
        <h1 className="text-2xl font-bold mb-4">アカウント作成</h1>
        <form className="space-y-4" onSubmit={submitForm}>
          <div>
            <label htmlFor="username" className="block mb-2 text-sm font-medium">
              Username
            </label>
            <input
              value={username}
              onChange={(e) => {
                setUsername(e.target.value);
              }}
              id="username"
              className="rounded-lg dark:bg-[#0f0f0f] block w-full p-2.5"
              placeholder="LeBronJames"
              required={true}
            ></input>
          </div>
          <div>
            <label htmlFor="password" className="block mb-2 text-sm font-medium">
              Password
            </label>
            <input
              value={password}
              onChange={(e) => {
                setPassword(e.target.value);
              }}
              type="password"
              id="password"
              placeholder="••••••••"
              className="rounded-lg dark:bg-[#0f0f0f] block w-full p-2.5"
              required={true}
            ></input>
          </div>
          <div>
            <label htmlFor="confirm-password" className="block mb-2 text-sm font-medium">
              Confirm password
            </label>
            <input
              value={confirmPassword}
              onChange={(e) => {
                setConfirmPassword(e.target.value);
              }}
              type="password"
              id="confirm-password"
              placeholder="••••••••"
              className="rounded-lg dark:bg-[#0f0f0f] block w-full p-2.5"
              required={true}
            ></input>
          </div>

          <button
            type="submit"
            className="w-full focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center"
          >
            Create an account
          </button>
          {error && <h1>{error}</h1>}
          <p className="text-sm font-light">
            Already have an account?{" "}
            <Link
              href="/login"
              className="font-medium text-primary-600 hover:underline dark:text-primary-500"
            >
              Log In
            </Link>
          </p>
        </form>
      </div>
    </section>
  );
};
export default SignUp;
