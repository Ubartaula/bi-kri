import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useConfirmEmailMutation } from "../user/userApiSlice";

const EmailConfirm = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [errMsg, setErrMsg] = useState("");
  const [email, setEmail] = useState("");
  const [confirmationCode, setConfirmationCode] = useState("");

  useEffect(() => {
    if (location?.state?.email?.length) {
      setEmail(location.state.email);
    }
  }, [location]);

  const [confirmEmailMutation, { isSuccess }] = useConfirmEmailMutation();

  const handleSubmit = async (req, res) => {
    try {
      await confirmEmailMutation({ email, confirmationCode }).unwrap();
    } catch (error) {
      setErrMsg(error?.data?.message || error?.status);
    }
  };

  useEffect(() => {
    if (isSuccess) {
      navigate("/login", {
        state: {
          email: email,
          message: "Successfully your account has been confirmed !",
        },
      });
    }
  }, [navigate, isSuccess]);

  return (
    <>
      {location?.state?.message?.length && (
        <div className="p-4 pb-0 px-8 text-lg text-green-800">
          {location.state.message}
        </div>
      )}
      <form
        onSubmit={(e) => e.preventDefault()}
        className="mx-auto max-w-lg px-8 p-2"
      >
        <div aria-live="assertive" className="text-lg italic text-red-600 py-3">
          {errMsg}
        </div>

        <div className="flex flex-col">
          <label htmlFor="" className=" text-lg pt-3 ">
            Enter your code
          </label>
          <input
            type="text"
            maxLength={50}
            value={confirmationCode}
            onChange={(e) =>
              setConfirmationCode(e.target.value.replace(/[^0-9]/g, ""))
            }
            className="p-2 rounded-md border border-blue-400"
          />
          <button
            onClick={handleSubmit}
            className="p-2 bg-blue-500 text-white my-4 rounded-lg"
          >
            Submit
          </button>
        </div>
      </form>
    </>
  );
};

export default EmailConfirm;
