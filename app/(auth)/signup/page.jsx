"use client";

import React, { useEffect, useRef, useState } from "react";
import { useFormik } from "formik";
import Image from "next/image";
import * as Yup from "yup";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";

const SignUpForm = () => {
  const router = useRouter();
  const [showPassword, setShowPassword] = useState(false);

  const signupForm = useFormik({
    // enableReinitialize: true,
    initialValues: {
      user_name: "",
      email: "",
      password: "",
      confirmpassword: "",
    },
    validationSchema: Yup.object().shape({
      user_name: Yup.string()
        .min(2, "Last name must be 2 characters or more")
        .required("Last Name is required."),
      email: Yup.string()
        .email("Email must be a valid email")
        .required("Email is required."),
      password: Yup.string()
        .required("Password is required.")
        .min(6, "Your password is too short."),
      confirmpassword: Yup.string()
        .oneOf([Yup.ref("password")], "Passwords must match")
        .required("Confirm Password is required."),
    }),
    onSubmit: (values, { resetForm }) => {
      const { user_name, email, password } = values;
      console.log(values);
      try {
        sessionStorage.setItem(
          "user",
          JSON.stringify({
            user_name,
            email,
            password,
            isLogin: false,
          })
        );
        toast.success("Signup successfully!");
        router.push("/login");
      } catch (error) {
        console.error(error);
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
                  Sign Up
                </h4>
                <p className="block mt-1 font-sans text-base antialiased font-normal leading-relaxed text-gray-700">
                  Nice to meet you! Enter your details to register.
                </p>
              </div>
              <hr />
              <div className="flex flex-col gap-4 mt-4">
                <div
                  className={`${
                    errors.user_name && touched.user_name
                      ? "border-red-500"
                      : ""
                  } border max-w-96 rounded-md px-6 py-3`}
                >
                  <div className="flex justify-center items-center gap-2">
                    <Image
                      src="/assets/icons/user.svg"
                      alt="search"
                      width={28}
                      height={28}
                    />
                    <div className="border-l-2 h-11"></div>
                    <div className="flex justify-start flex-col gap-1 flex-1">
                      <label className="cursor-pointer">User name</label>
                      <input
                        id="user_name"
                        name="user_name"
                        type="text"
                        className="outline-none"
                        placeholder="Enter your e-mail"
                        value={values.user_name}
                        onChange={handleChange}
                      />
                    </div>
                  </div>
                </div>
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
                <div
                  className={`${
                    errors.confirmpassword && touched.confirmpassword
                      ? "border-red-500"
                      : ""
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
                      <label className="cursor-pointer">Confirm Password</label>
                      <input
                        id="confirmpassword"
                        name="confirmpassword"
                        type="password"
                        className="outline-none"
                        placeholder="Enter your Confirm Password"
                        value={values.confirmpassword}
                        onChange={handleChange}
                      />
                    </div>
                  </div>
                </div>
                <button className="btn btn-primary">Submit</button>
                <div className="flex justify-center">
                  Already have account?&nbsp;
                  <Link href={"/login"} className="underline">
                    LogIn
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

export default SignUpForm;
