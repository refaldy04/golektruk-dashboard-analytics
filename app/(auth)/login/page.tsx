"use client";

import React, { useState } from "react";
import { loginInput } from "../../data";
import { LoginType } from "../../type";
import { useRouter } from "next/navigation";
import Link from "next/link";

const LoginPage = () => {
  const [form, setForm] = useState<LoginType>({});
  const [errMsg, setErrMsg] = useState<string>("");

  const router = useRouter();

  const handleChange = (e: React.FormEvent<HTMLInputElement>) => {
    const target = e.target as HTMLButtonElement;

    setForm({ ...form, [target.name]: target.value });
  };

  const handleSubmit = async (e: React.SyntheticEvent) => {
    e.preventDefault();
    setErrMsg("");

    const formBody = new URLSearchParams(
      form as Record<string, string>
    ).toString();

    const endpoint = "/api/login";
    const options = {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
      body: JSON.stringify(formBody),
    };

    try {
      const data = await fetch(endpoint, options);
      const finalData = await data.json();
      console.log(finalData);
      if (finalData.error?.detail?.code === "USER_NOT_FOUND") {
        setErrMsg("User not found");
        return;
      } else if (finalData.error?.detail?.code === "WRONG_PASSWORD") {
        setErrMsg("Wrong password");
        return;
      } else if (finalData.error) {
        setErrMsg("Something went wrong");
        return;
      } else {
        router.push("/home");
      }
    } catch (error) {
      console.log("client error", error);
    }
  };

  return (
    <div className="min-h-screen flex justify-center items-center px-5 py-7">
      <div className="sm:border w-screen xl:w-1/3 p-5 rounded-md ">
        <h2 className="text-white text-center text-2xl font-semibold mb-2">
          Login
        </h2>
        <p className="text-red-500">{errMsg && errMsg}</p>
        <form className="flex flex-col gap-3" onSubmit={(e) => handleSubmit(e)}>
          {loginInput.map((input) => (
            <div key={input.name} className="flex flex-col">
              <label htmlFor={input.name} className="text-white">
                {input.label}
              </label>
              <input
                id={input.name}
                name={input.name}
                type={input.type}
                className="border border-white px-2 py-1 bg-transparent rounded-md mt-1 text-white"
                placeholder={input.placeholder}
                onChange={handleChange}
              />
            </div>
          ))}

          <Link href={"/register"} className="text-white">
            Register?
          </Link>

          <button
            type="submit"
            className="bg-white rounded-md py-2 mt-2 font-semibold"
          >
            Submit
          </button>
        </form>
      </div>
    </div>
  );
};

export default LoginPage;
