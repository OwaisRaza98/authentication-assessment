import React from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { signinbg, redstar } from "../utils/constants/images";
import InputField from "../components/form/Inputfield";
import Passwordfield from "../components/form/Passwordfield";
import Button from "../components/ui/Button";
import { useNavigate } from "react-router-dom";

const loginSchema = Yup.object().shape({
  email: Yup.string()
    .email("Invalid email address")
    .required("Email is required"),
  password: Yup.string().required("Password is required"),
});

export default function Login() {
  const navigate = useNavigate();

  // Try to auto-fill form from localStorage
  const getUserData = () => {
    const userData = localStorage.getItem("user");
    return userData ? JSON.parse(userData) : null;
  };

  const userData = getUserData();

  const formik = useFormik({
    initialValues: {
      email: userData?.email || "",
      password: userData?.password || "",
    },
    validationSchema: loginSchema,
    onSubmit: (values) => {
      const user = getUserData();

      // Check credentials against stored user
      if (
        user &&
        user.email === values.email &&
        user.password === values.password
      ) {
        alert("Signed-in successfully");
      } else {
        alert("Invalid credentials");
      }
    },
  });

  return (
    <div className="flex h-screen">
      <div
        className="w-1/2 bg-cover bg-center flex flex-col items-start relative"
        style={{ backgroundImage: `url(${signinbg})` }}
      >
        <div className="absolute inset-0 flex flex-col items-center justify-center text-center">
          <p className="text-[#262626] text-[22px] leading-[30px] font-semibold">
            Welcome to Our Platform
            <br />
            We’re glad you’re here!
          </p>
          <div className="flex justify-center mt-[10px]">
            {[...Array(5)].map((_, index) => (
              <img key={index} src={redstar} className="mx-1" alt="Star" />
            ))}
          </div>
        </div>
      </div>

      {/* Right Section - Login Form */}
      <div className="w-1/2 flex flex-col h-full justify-between items-center py-3">
        <div className="flex-grow flex items-center justify-center">
          <div className="rounded-lg max-w-[400px] w-[300px]">
            <h2 className="text-[#262626] !text-[22px] font-semibold mb-[15px]">
              Welcome Back
            </h2>
            <p className="mb-[24px] text-[#262626] text-[14px] manrope-400">
              Sign in to your account
            </p>

            <form onSubmit={formik.handleSubmit}>
              <div className="mb-5">
                <InputField
                  className="w-[300px]"
                  type="email"
                  name="email"
                  placeholder="Email"
                  value={formik.values.email}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                />
                {formik.touched.email && formik.errors.email && (
                  <p className="text-red-500 text-xs mt-1">
                    {formik.errors.email}
                  </p>
                )}
              </div>
              <div className="mb-5">
                <Passwordfield
                  className="w-[300px]"
                  name="password"
                  placeholder="Password"
                  value={formik.values.password}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                />
                {formik.touched.password && formik.errors.password && (
                  <p className="text-red-500 text-xs mt-1">
                    {formik.errors.password}
                  </p>
                )}
              </div>

              <Button
                buttonText="Sign In"
                type="submit"
                width="100%"
                className="mt-8"
              />

              <div className="flex justify-center items-center text-[14px] mt-2">
                <p className="text-[#262626]">Don’t have an account?</p>
                <p
                  onClick={() => navigate("/signup")}
                  className="text-[#CC0202] font-semibold text-[15px] ml-1 cursor-pointer"
                >
                  Create one
                </p>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
