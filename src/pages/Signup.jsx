import InputField from "../components/form/Inputfield";
import Passwordfield from "../components/form/Passwordfield";
import Button from "../components/ui/Button";
import { useNavigate } from "react-router-dom";
import { useFormik } from "formik";
import * as Yup from "yup";

const signUpSchema = Yup.object({
  name: Yup.string().required("Name is required"),
  email: Yup.string()
    .email("Invalid email address")
    .required("Email is required"),
  password: Yup.string()
    .min(6, "Password must be at least 6 characters")
    .required("Password is required"),
  confirmPassword: Yup.string()
    .oneOf([Yup.ref("password"), null], "Passwords must match")
    .required("Confirm Password is required"),
});

export default function Signup() {
  const navigate = useNavigate();

  const formik = useFormik({
    initialValues: {
      name: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
    validationSchema: signUpSchema,
    onSubmit: async (values) => {
      console.log(values);

      // Store user data in localStorage
      const userData = {
        name: values.name,
        email: values.email,
        password: values.password,
      };

      // Save to localStorage
      localStorage.setItem("user", JSON.stringify(userData));
      navigate("/");
    },
  });

  return (
    <div className="bg-gray-50 px-[30px] pt-[27px] pb-[7px] flex flex-col h-[100vh] justify-center">
      <div className="flex items-center justify-center">
        <div className="max-w-[720px] w-full pb-[95px]">
          <div className="bg-white px-[50px] py-[43px] rounded-[15px] border border-gray-200">
            <h2 className="!text-[22px] font-semibold mb-[10px]">
              Create an Account
            </h2>
            <p className="text-[#262626] mb-6">
              Please fill in the information below to create your account.
            </p>

            <form
              onSubmit={formik.handleSubmit}
              className="grid grid-cols-1 gap-4"
            >
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <InputField
                    type="text"
                    name="name"
                    placeholder="Full Name"
                    value={formik.values.name}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                  />
                  {formik.touched.name && formik.errors.name && (
                    <p className="text-red-500 text-xs mt-[7px]">
                      {formik.errors.name}
                    </p>
                  )}
                </div>
                <div>
                  <InputField
                    type="email"
                    name="email"
                    placeholder="Email Address"
                    value={formik.values.email}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                  />
                  {formik.touched.email && formik.errors.email && (
                    <p className="text-red-500 text-xs mt-[7px]">
                      {formik.errors.email}
                    </p>
                  )}
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Passwordfield
                    name="password"
                    placeholder="Password"
                    value={formik.values.password}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                  />
                  {formik.touched.password && formik.errors.password && (
                    <p className="text-red-500 text-xs mt-[7px]">
                      {formik.errors.password}
                    </p>
                  )}
                </div>
                <div>
                  <Passwordfield
                    name="confirmPassword"
                    placeholder="Confirm Password"
                    value={formik.values.confirmPassword}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                  />
                  {formik.touched.confirmPassword &&
                    formik.errors.confirmPassword && (
                      <p className="text-red-500 text-xs mt-[7px]">
                        {formik.errors.confirmPassword}
                      </p>
                    )}
                </div>
              </div>

              <div className="flex justify-between items-center mt-2">
                <div className="flex items-center">
                  <p className="text-[#262626] text-[14px]">
                    Already have an account?
                  </p>
                  <Button
                    className="ml-2"
                    width="80px"
                    color="white"
                    type="button"
                    buttonText="Sign In"
                    onClick={() => navigate("/")}
                  />
                </div>
                <Button
                  type="submit"
                  width="80px"
                  buttonText="Create"
                  className="w-auto"
                />
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
