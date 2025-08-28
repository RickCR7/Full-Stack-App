"use client";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { signIn } from "next-auth/react";
function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPasword] = useState("");

  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const result = await signIn("credentials", {
      email,
      password,
      redirect: false,
    });
    if (result?.error) {
      console.log(result.error);
    } else {
      router.push("/");
    }
  };

  return (
    <div className="flex min-h-full flex-col justify-center px-6 py-12 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-sm">
        <h1 className="mt-10 text-center text-2xl/9 font-bold tracking-tight text-white">
          Sign in to your account
        </h1>
        <form className="space-y-6" onSubmit={handleSubmit}>
          <input
            className="block w-full rounded-md bg-white/5 px-3 py-1.5 text-base text-white outline-1 -outline-offset-1 outline-white/10 placeholder:text-gray-500 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-500 sm:text-sm/6"
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <input
            className="block w-full rounded-md bg-white/5 px-3 py-1.5 text-base text-white outline-1 -outline-offset-1 outline-white/10 placeholder:text-gray-500 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-500 sm:text-sm/6"
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPasword(e.target.value)}
          />
          <div className="text-sm">
            <a
              href="#"
              className="font-semibold text-red-500 hover:text-indigo-300"
            >
              Forgot password?
            </a>
          </div>
          <button
            className="flex w-full justify-center rounded-md bg-blue-500 px-3 py-1.5 text-sm/6 font-semibold text-white hover:bg-indigo-400 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-500"
            type="submit"
          >
            Sign In
          </button>
        </form>
        <div className="mt-10 text-center text-sm/6 text-gray-400">
          Don't have an account ?
          <button
            className="font-semibold text-blue-700 hover:text-indigo-300"
            onClick={() => router.push("/register")}
          >
            Register
          </button>
        </div>
        <div>
          <button
            className="flex items-center justify-center w-full mt-4 py-2 px-4 border border-gray-300 rounded-md bg-white text-gray-700 font-medium hover:bg-gray-100 transition"
            onClick={() => signIn("google")}
          >
            <svg className="w-5 h-5 mr-2" viewBox="0 0 48 48">
              <g>
                <path
                  fill="#4285F4"
                  d="M24 9.5c3.54 0 6.73 1.23 9.23 3.25l6.91-6.91C36.36 2.16 30.5 0 24 0 14.61 0 6.36 5.48 2.44 13.44l8.51 6.62C12.98 14.36 18.01 9.5 24 9.5z"
                />
                <path
                  fill="#34A853"
                  d="M46.09 24.56c0-1.64-.15-3.22-.43-4.75H24v9.01h12.43c-.54 2.91-2.17 5.38-4.63 7.04l7.19 5.59C43.98 37.13 46.09 31.35 46.09 24.56z"
                />
                <path
                  fill="#FBBC05"
                  d="M13.95 28.06c-1.09-3.23-1.09-6.7 0-9.93l-8.51-6.62C2.16 15.64 0 19.61 0 24c0 4.39 2.16 8.36 5.44 11.49l8.51-6.62z"
                />
                <path
                  fill="#EA4335"
                  d="M24 48c6.5 0 12.36-2.16 16.91-5.91l-7.19-5.59c-2.01 1.35-4.59 2.15-7.72 2.15-5.99 0-11.02-4.86-12.05-11.13l-8.51 6.62C6.36 42.52 14.61 48 24 48z"
                />
              </g>
            </svg>
            Sign in with Google
          </button>
        </div>
      </div>
    </div>
  );
}

export default LoginPage;
