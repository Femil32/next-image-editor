"use client";

import React, { use, useEffect, useRef, useState } from "react";
import { useFormik } from "formik";
import Link from "next/link";
import Image from "next/image";
import * as Yup from "yup";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";

const LoginForm = ({ login }) => {
  const router = useRouter();
  const [showPassword, setShowPassword] = useState(false);

  const signupForm = useFormik({
    // enableReinitialize: true,
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: Yup.object().shape({
      email: Yup.string()
        .email("Email must be a valid email")
        .required("Email is required."),
      password: Yup.string()
        .required("Password is required.")
        .min(6, "Your password is too short."),
    }),
    onSubmit: (values, { resetForm }) => {
      const user = sessionStorage.getItem("user");
      if (!user) {
        router.push("/signup");
        toast.error("Please signup first!");
      }
      try {
        const parseUser = JSON.parse(user);
        const { user_name, email, password } = values;
        if (parseUser.email === email && parseUser.password === password) {
          toast.success("Login Sucessfully!");
          router.push("/");
          sessionStorage.setItem(
            "user",
            JSON.stringify({
              user_name,
              email,
              password,
              isLogin: true,
            })
          );
        } else {
          toast.error("Wrong credentials!");
        }
      } catch (error) {
        console.log(error);
      }
    },
  });

  const { values, errors, handleSubmit, handleChange, touched, setTouched } =
    signupForm;

  useEffect(() => {
    setTouched({}, false);
  }, [setTouched, values.role]);

  return (
    <div className="h-screen flex justify-center items-center bg-white">
      <div className="relative flex flex-col text-gray-700 bg-transparent border rounded-xl bg-clip-border shadow-md py-4 px-6">
        <div className="max-w-screen-lg">
          <form onSubmit={handleSubmit} className="flex">
            <div className="">
              <div className="mb-3 ">
                <h4 className="block font-sans text-2xl antialiased font-semibold leading-snug tracking-normal text-blue-gray-900 ">
                  Log In
                </h4>
                <p className="block mt-1 font-sans text-base antialiased font-normal leading-relaxed text-gray-700">
                  Nice to meet you! Enter your details to login.
                </p>
              </div>
              <hr />
              <div className="flex flex-col gap-4 mt-4">
                <div
                  className={`${
                    errors.email && touched.email ? "border-red-500" : ""
                  } border max-w-96 rounded-md px-6 py-3`}
                >
                  <div className="flex justify-center items-center gap-2">
                    <Image
                      src="/assets/icons/email.svg"
                      alt="search"
                      width={28}
                      height={28}
                    />
                    <div className="border-l-2 h-11"></div>
                    <div className="flex justify-start flex-col gap-1 flex-1">
                      <label className="cursor-pointer">E-mail*</label>
                      <input
                        id="email"
                        name="email"
                        type="email"
                        className="outline-none"
                        placeholder="Enter your e-mail"
                        value={values.email}
                        onChange={handleChange}
                      />
                    </div>
                  </div>
                </div>
                <div
                  className={`${
                    errors.password && touched.password ? "border-red-500" : ""
                  } border max-w-96 rounded-md px-6 py-3`}
                >
                  <div className="flex justify-center items-center gap-2">
                    <Image
                      src="/assets/icons/password.svg"
                      alt="search"
                      width={28}
                      height={28}
                    />
                    <div className="border-l-2 h-11"></div>
                    <div className="flex justify-start flex-col gap-1 flex-1">
                      <label className="cursor-pointer">Password</label>
                      <div className="flex">
                        <input
                          id="password"
                          name="password"
                          type={showPassword ? "text" : "password"}
                          className="outline-none flex-1"
                          placeholder="Enter your password"
                          value={values.password}
                          onChange={handleChange}
                        />
                        {
                          <Image
                            src={
                              showPassword
                                ? "/assets/icons/open-eye.svg"
                                : "/assets/icons/close-eye.svg"
                            }
                            alt="search"
                            width={28}
                            height={28}
                            onClick={() => setShowPassword(!showPassword)}
                            className="cursor-pointer"
                          />
                        }
                      </div>
                    </div>
                  </div>
                </div>
                <button className="btn btn-primary">Submit</button>
                <div className="flex justify-center">
                  Dont&apos;t have account?&nbsp;
                  <Link href={"/signup"} className="underline">
                    Sign Up
                  </Link>
                </div>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default LoginForm;
