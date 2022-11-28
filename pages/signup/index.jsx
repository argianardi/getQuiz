import Link from "next/link";
import React, { use, useRef, useState } from "react";
import { useForm } from "react-hook-form";
import { GiGamepadCross } from "react-icons/gi";
import ErrorMessage from "../../components/ErrorMessage";
import withUnProtected from "../../hoc/withUnProtected";
import {
  GetSignUpErrorMessage,
  SignUp as SignUpToFirebase,
} from "../../services/firebase";

const SignUp = () => {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();
  const [isLoading, setIsLoading] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const Password = useRef({});
  Password.current = watch("password");

  const onSubmit = async (values) => {
    setIsLoading(true);
    const { email, password } = values;
    try {
      await SignUpToFirebase(email, password);
    } catch (error) {
      const message = GetSignUpErrorMessage(error.code);
      alert(message);
      setIsLoading(false);
    }
  };

  return (
    <div className="h-screen min-w-full flex flex-col justify-center bg-[url('https://cdn.discordapp.com/attachments/1017919526748299295/1021418083732164680/unsplash_pUAM5hPaCRI.png')] px-5 bg-cover bg-center">
      <div className="shadow-md shadow-slate-600 rounded-md p-2 sm:p-3 w-full sm:w-[500px] mx-auto bg-white/10 effectBlur ">
        <div className="mb-2 w-full  mx-auto">
          <GiGamepadCross size={50} className="mx-auto" />
          <p className="text-2xl font-bold text-center border-b-2 border-blue-900 mb-3 sm:text-3xl md:text-4xl">
            Welcome to getQuiz
          </p>
        </div>

        <h2 className="text-blue-900 mb-5 text-xl font-bold">Sign Up</h2>

        <div className="flex flex-wrap justify-center ">
          {/* form */}
          <form
            className=" bg-putihAlta w-full sm:w-[500px] flex flex-col gap-4"
            onSubmit={handleSubmit(onSubmit)}
          >
            <div className="px-0 sm:px-3 ">
              <input
                type="email"
                className="font-Roboto font-normal w-full text-base pl-6 border-[#25732D] text-black rounded-xl shadow-lg block  p-3 dark:shadow-md  "
                placeholder="Email"
                required
                onChange={(e) => setEmail(e.target.value)}
                {...register("email", { required: true })}
              />
              <ErrorMessage errors={errors.email} />
            </div>
            <div className=" px-0 sm:px-3">
              <input
                type="password"
                className=" w-full  font-Roboto font-normal text-base pl-6 border-[#25732D] text-black rounded-xl shadow-lg  block  py-3  "
                placeholder="Password"
                required
                onChange={(e) => setPassword(e.target.value)}
                {...register("password", { required: true, minLength: 6 })}
              />
              <ErrorMessage errors={errors.password} />
            </div>
            <div className=" px-0 sm:px-3">
              <input
                name="confirmPassword"
                type="password"
                className=" w-full  font-Roboto font-normal text-base pl-6 border-[#25732D] text-black rounded-xl shadow-lg  block  py-3  "
                placeholder="Confirm Password"
                required
                onChange={(e) => setPassword(e.target.value)}
                {...register("confirmPassword", {
                  required: true,
                  validate: (value) => value === Password.current,
                })}
              />
              <ErrorMessage errors={errors.confirmPassword} />
            </div>
            <div className="ml-2">
              <input
                id="agreement"
                type="checkbox"
                {...register("agreement", { required: true })}
              />
              <label htmlFor="agreement">
                {" "}
                Agree with the terms and conditions
              </label>
              <ErrorMessage errors={errors.agreement} />
            </div>
            <div className="w-full px-3">
              <button
                className="w-full py-2 mt-8 text-xl text-white rounded-sm shadow-lg font-poppins bg-blue-900"
                type="submit"
              >
                {isLoading ? (
                  <div className="">
                    <p className=" text-center">Loading.....</p>
                  </div>
                ) : (
                  <p>Sign Up</p>
                )}
              </button>
            </div>
          </form>

          <p>
            Have an account already?{" "}
            <Link href="/" className="text-blue-600 hover:bg-slate-300">
              Sign In
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default withUnProtected(SignUp);
