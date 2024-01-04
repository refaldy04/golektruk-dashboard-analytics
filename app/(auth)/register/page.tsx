"use client";

import React, { useEffect, useState } from "react";
import { registerInput } from "../../data";
import { RegisterType } from "../../type";
import { useRouter } from "next/navigation";

const Register = () => {
  const [form, setForm] = useState<RegisterType>({});
  const [img, setImg] = useState<File | null>(null);
  const [errMsg, setErrMsg] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const router = useRouter();

  const handleChange = (e: React.FormEvent<HTMLInputElement>) => {
    const target = e.target as HTMLButtonElement;

    setForm({ ...form, [target.name]: target.value });
  };

  const removeImg = () => {
    setImg(null);
    setForm({ ...form, photos: [] });
  };

  const handleSubmit = async (e: React.SyntheticEvent) => {
    e.preventDefault();
    setErrMsg("");

    if (
      !form.email ||
      !form.name ||
      !form.phone ||
      !form.password ||
      !form.age ||
      !form.photos
    ) {
      setErrMsg("Please fill out all fields");
      return;
    } else if (form.name.length < 3) {
      setErrMsg("Name must be at least 3 characters");
      return;
    } else if (form.password.length < 3) {
      setErrMsg("Password must be at least 3 characters");
      return;
    } else if (/^628[0-9]+$/.test(form.phone) === false) {
      setErrMsg("Phone number is not valid");
      return;
    } else if (form.phone.length > 12) {
      setErrMsg("Phone number is to long");
      return;
    } else if (form.phone.length < 9) {
      setErrMsg("Phone number is to short");
      return;
    }

    const endpoint = "/api/register";

    const options = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(form),
    };

    try {
      const data = await fetch(endpoint, options);
      const finalData = await data.json();
      if (finalData.message?.detail?.code.includes("EMAIL")) {
        setErrMsg("Email already exist");
        return;
      } else if (finalData.message?.detail?.code.includes("PHONE")) {
        setErrMsg("Phone number already exist");
        return;
      } else {
        router.push("/login");
      }
    } catch (error) {
      console.log("client error", error);
    }
  };

  const uploadImg = async (e: React.FormEvent<HTMLInputElement>) => {
    e.preventDefault();

    setIsLoading(true);

    e.currentTarget.files && setImg(e.currentTarget.files[0]);

    const endpoint = "/api/upload";
    const fileInput = e.currentTarget;

    if (fileInput.files && fileInput.files[0]) {
      const formData = new FormData();
      formData.append("file", fileInput.files[0]);

      const options: any = {
        method: "POST",
        body: formData,
      };

      const uuid = await fetch(endpoint, options);
      const { data } = await uuid.json();
      console.log(data);

      setForm({ ...form, photos: [data] });
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex justify-center items-center px-5 py-7">
      <div className="sm:border w-screen xl:w-1/3 p-5 rounded-md ">
        <h2 className="text-white text-center text-2xl font-semibold mb-2">
          Register
        </h2>
        <p className="text-red-500">{errMsg && errMsg}</p>
        <form className="flex flex-col gap-3" onSubmit={(e) => handleSubmit(e)}>
          {registerInput.map((input) => (
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

          {img ? (
            <div className="relative w-fit">
              <img
                src={URL.createObjectURL(img)}
                className="w-28 h-28 rounded-md"
              />
              <button
                className="absolute top-[-5px] right-[-5px] pb-[2px] w-4 h-4 flex items-center justify-center bg-red-500 text-white rounded-full"
                onClick={removeImg}
              >
                x
              </button>
              {isLoading && (
                <div className="absolute text-white top-0 left-0 w-full h-full bg-black/50 flex items-center justify-center">
                  loading..
                </div>
              )}
            </div>
          ) : (
            <>
              <label
                htmlFor="photos"
                className="bg-white px-2 py-1 w-1/2 rounded-md cursor-pointer font-semibold text-slate-400"
              >
                insert photo here
              </label>
              <input
                id="photos"
                type="file"
                name="photos"
                className="hidden"
                onChange={uploadImg}
              />
            </>
          )}

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

export default Register;
