import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  useConfirmOTPMutation,
  useResetPasswordMutation,
  useSendOTPMutation,
} from "../user/userApiSlice";

const ResetPassword = () => {
  const navigate = useNavigate();

  const [showForm, setShowForm] = useState("step1");
  const [email, setEmail] = useState("");
  const [resetCode, setResetCode] = useState("");
  const [password, setPassword] = useState("");
  const [repeatPassword, setRepeatPassword] = useState("");
  const [errMsg, setErrMsg] = useState("");
  const [successMsg, setSuccessMsg] = useState("");
  const [showPassWord, setShowPassword] = useState(false);

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  const emailCheck = emailRegex.test(email);

  const [sendOTPMutation, { isSuccess }] = useSendOTPMutation();
  const handleEmailSubmit = async () => {
    try {
      await sendOTPMutation({ email }).unwrap();
    } catch (error) {
      setErrMsg(error?.data?.message);
    }
  };

  const [confirmOTPMutation, { isSuccess: isSuccessConfirmOTP }] =
    useConfirmOTPMutation();
  const handleConfirmOTP = async () => {
    try {
      await confirmOTPMutation({ email, resetCode }).unwrap();
    } catch (error) {
      setErrMsg(error?.data?.message);
    }
  };

  const [resetPasswordMutation, { isSuccess: isSuccessResetPassword }] =
    useResetPasswordMutation();
  const handleResetPassword = async () => {
    try {
      await resetPasswordMutation({ resetCode, password }).unwrap();
    } catch (error) {
      setErrMsg(error?.data?.message);
    }
  };

  useEffect(() => {
    if (isSuccess) {
      setShowForm("step2");
      setSuccessMsg("Successfully sent reset code to your email !");
    }
  }, [isSuccess]);

  useEffect(() => {
    if (isSuccessConfirmOTP) {
      setShowForm("step3");
      setSuccessMsg("Successfully verified !");
    }
  }, [isSuccessConfirmOTP]);

  useEffect(() => {
    if (isSuccessResetPassword) {
      navigate("/login", {
        state: {
          email: email,
          message: "Successfully password reset has been done !",
        },
      });
    }
  }, [isSuccessResetPassword]);

  useEffect(() => {
    setErrMsg("");
    setSuccessMsg("");
  }, [resetCode, password, repeatPassword, email]);

  return (
    <div className="h-screen">
      {showForm === "step1" && (
        <form
          onSubmit={(e) => e.preventDefault()}
          className="mx-auto max-w-lg px-8 p-2"
        >
          <div
            aria-live="assertive"
            className="text-lg italic text-red-600 py-3"
          >
            {errMsg}
          </div>
          <div className="flex flex-col">
            <label htmlFor="" className=" text-lg pt-4 ">
              Your email address
            </label>
            <input
              type="text"
              maxLength={50}
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="p-2 rounded-md border border-blue-400"
            />
            <button
              onClick={() => {
                if (!email) {
                  setErrMsg("Email field is empty");
                } else if (!emailCheck) {
                  setErrMsg("Invalid email format");
                } else if (email && emailCheck) {
                  handleEmailSubmit();
                }
              }}
              className="p-2 bg-blue-500 text-white my-4 rounded-lg"
            >
              Submit
            </button>
          </div>
        </form>
      )}

      {showForm === "step2" && (
        <form
          onSubmit={(e) => e.preventDefault()}
          className="mx-auto max-w-lg px-8 p-2"
        >
          <div
            aria-live="assertive"
            className="text-lg italic text-red-600 py-3"
          >
            {errMsg}
          </div>
          <div aria-live="assertive" className="text-lg text-green-600 py-1">
            {successMsg}
          </div>

          <div className="flex flex-col">
            <label htmlFor="" className=" text-lg pt-3 ">
              Enter your code
            </label>
            <input
              type="text"
              maxLength={50}
              value={resetCode}
              onChange={(e) =>
                setResetCode(e.target.value.replace(/[^0-9]/g, ""))
              }
              className="p-2 rounded-md border border-blue-400"
            />
            <button
              onClick={handleConfirmOTP}
              className="p-2 bg-blue-500 text-white my-4 rounded-lg"
            >
              Submit
            </button>
          </div>
        </form>
      )}

      {showForm === "step3" && (
        <form
          onSubmit={(e) => e.preventDefault()}
          className="mx-auto max-w-lg px-8 p-2"
        >
          <div
            aria-live="assertive"
            className="text-lg italic text-red-600 py-3"
          >
            {errMsg}
          </div>

          <div aria-live="assertive" className="text-lg text-green-600 py-1">
            {successMsg}
          </div>

          <div className="flex flex-col">
            <label htmlFor="" className=" text-lg pt-3 ">
              Password
            </label>
            <input
              type="text"
              maxLength={50}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="p-2 rounded-md border border-blue-400"
            />
            <label htmlFor="" className=" text-lg ">
              Repeat Password
            </label>
            <input
              type="text"
              maxLength={50}
              value={repeatPassword}
              onChange={(e) => setRepeatPassword(e.target.value)}
              className="p-2 rounded-md border border-blue-400"
            />
            <button
              onClick={() => {
                if (!password || !repeatPassword) {
                  setErrMsg("Password and Repeat password required");
                } else if (
                  password &&
                  repeatPassword &&
                  password !== repeatPassword
                ) {
                  setErrMsg("Repeat password did not match");
                } else if (
                  password &&
                  repeatPassword &&
                  password === repeatPassword
                ) {
                  handleResetPassword();
                }
              }}
              className="p-2 bg-blue-500 text-white my-4 rounded-lg"
            >
              Submit
            </button>
          </div>
        </form>
      )}
    </div>
  );
};

export default ResetPassword;
