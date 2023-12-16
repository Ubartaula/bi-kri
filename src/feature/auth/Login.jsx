import React, { useEffect, useState } from "react";
import { useSendLoginMutation } from "./authApiSlice";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setToken } from "./authSlice";
import { useAddUserMutation } from "../user/userApiSlice";
import LoadingComponent from "../../lib/LoadingComponent";

const Login = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const location = useLocation();

  const [accountOption, setAccountOption] = useState("login");
  const [showPassword, setShowPassword] = useState(false);
  const [errMsg, setErrMsg] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  // handling login
  const [loginMutation, { isSuccess, isLoading: isLoginLoading }] =
    useSendLoginMutation();

  const handleLogin = async () => {
    try {
      const { accessToken } = await loginMutation({
        email,
        password,
      }).unwrap();

      dispatch(setToken({ accessToken }));
    } catch (error) {
      if (error) {
        if (error?.data?.message === "We could not find an account.") {
          setErrMsg(
            "We could not find an account associated with this email, you can create now."
          );
        } else {
          setErrMsg(error?.data?.message);
        }
      }
    }
  };

  useEffect(() => {
    setErrMsg("");
  }, [email, phoneNumber, password]);

  useEffect(() => {
    if (
      errMsg ===
      "We could not find an account associated with this email, you can create now."
    ) {
      setAccountOption("create");
    }
  }, [errMsg]);

  useEffect(() => {
    if (isSuccess) {
      navigate("/dash");
    }
  }, [isSuccess, navigate]);

  const [
    addNewUserMutation,
    { isSuccess: isSuccessAddNewUser, isLoading: isAddUserLoading },
  ] = useAddUserMutation();

  const handleCreateAccount = async () => {
    try {
      await addNewUserMutation({
        firstName: firstName?.toLowerCase(),
        lastName: lastName?.toLowerCase(),
        email: email?.toLowerCase(),
        phoneNumber: phoneNumber,
        password: password,
        confirmationCode: Math.ceil(Math.random() * 1000000),
      }).unwrap();
    } catch (error) {
      setErrMsg(error?.data?.message);
    }
  };

  useEffect(() => {
    if (isSuccessAddNewUser) {
      navigate("/email-confirm", {
        state: {
          message:
            "Successfully a confirmation code has been sent to your email",
          email: email,
        },
      });
    }
  }, [isSuccessAddNewUser, navigate]);

  useEffect(() => {
    if (location?.state?.email?.length) {
      setEmail(location.state.email);
    }
  }, [location]);

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  const emailCheck = emailRegex.test(email);

  if (isLoginLoading) {
    return <LoadingComponent />;
  }

  return (
    <>
      {location?.state?.message?.length && (
        <div className="text-green-600 p-4 px-10 pb-0 text-center">
          {location.state.message}
        </div>
      )}

      <div
        aria-live="assertive"
        className="text-red-600 text-center px-10 p-2 pb-0"
      >
        {errMsg}
      </div>

      <>
        {(accountOption === "create" || accountOption === "login") && (
          <>
            {!isSuccessAddNewUser && (
              <div
                className={`  bg-gray-100 w-full h-full mx-auto max-w-xl  text-black  rounded-lg  flex  justify-center`}
              >
                <form onSubmit={(e) => e.preventDefault()} className="mt-10">
                  {accountOption === "create" && (
                    <>
                      <div className="flex flex-col p-2">
                        <input
                          maxLength={20}
                          required
                          placeholder="First Name...."
                          type="text"
                          value={firstName}
                          onChange={(e) => setFirstName(e.target.value)}
                          className="border border-blue-500 p-1 px-2 rounded-lg"
                        />
                      </div>
                      <div className="flex flex-col p-2">
                        <input
                          maxLength={20}
                          required
                          placeholder="Last Name/ Family Name...."
                          type="text"
                          value={lastName}
                          onChange={(e) => setLastName(e.target.value)}
                          className="border border-blue-500 p-1 px-2 rounded-lg"
                        />
                      </div>
                    </>
                  )}

                  <div className="flex flex-col p-2">
                    {accountOption === "login" && (
                      <label htmlFor="" className="">
                        Email
                      </label>
                    )}
                    <input
                      maxLength={30}
                      placeholder="Email address..."
                      type="text"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="border border-blue-500 p-1 px-2 rounded-lg"
                    />
                  </div>

                  {accountOption === "create" && (
                    <div className="flex flex-col  p-2 pt-0">
                      <span className="text-xs italic">optional </span>

                      <input
                        placeholder="Mobile / Phone number..."
                        type="text"
                        maxLength={40}
                        value={phoneNumber}
                        onChange={(e) =>
                          setPhoneNumber(e.target.value.replace(/[^0-9]/g, ""))
                        }
                        className="border border-blue-500 p-1 px-2 rounded-lg"
                      />
                    </div>
                  )}
                  <div className="flex flex-col mb-2 p-2">
                    {accountOption === "login" && (
                      <label htmlFor="">Password </label>
                    )}
                    {accountOption === "create" && (
                      <span className="text-xs italic whitespace-nowrap text-ellipsis overflow-hidden">
                        minimum 4 character required
                      </span>
                    )}
                    <input
                      required
                      minLength={4}
                      maxLength={15}
                      placeholder="Password..."
                      type={`${showPassword ? "text" : "password"}`}
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      className="border border-blue-500 p-1 px-2 rounded-lg"
                    />
                  </div>
                  {accountOption === "create" && (
                    <div className="flex flex-col p-2">
                      <input
                        maxLength={15}
                        placeholder="Repeat Password..."
                        type={`${showPassword ? "text" : "password"}`}
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                        className="border border-blue-500 p-1 px-2 rounded-lg"
                      />
                    </div>
                  )}

                  <div className="flex flex-row items-center justify-between mb-4">
                    <div className="flex flex-row items-center px-4 cursor-pointer">
                      <input
                        type="checkbox"
                        value={showPassword}
                        onChange={() => setShowPassword((prev) => !prev)}
                      />
                      <p className="ml-1 text-xs  overflow-hidden text-ellipsis whitespace-nowrap ">
                        Show password
                      </p>
                    </div>
                    <Link
                      to={"/reset"}
                      className="text-end text-xs pr-6  hover:text-green-600 whitespace-nowrap overflow-hidden text-ellipsis"
                    >
                      Forgot Password?
                    </Link>
                  </div>

                  <div className="flex flex-col p-2">
                    {accountOption === "login" && (
                      <>
                        <button
                          onClick={() => {
                            if (!(email && emailCheck)) {
                              setErrMsg("Provided email is not in valid.");
                            } else if (email && !password) {
                              setErrMsg("Password field is empty.");
                            } else if (emailCheck && password) {
                              handleLogin();
                            }
                          }}
                          className="bg-blue-600  text-white hover:bg-green-600 p-2 rounded-lg"
                        >
                          Sign in
                        </button>
                        <p
                          onClick={() => setAccountOption("create")}
                          className="text-blue-700 text-sm italic text-center p-2 m-2 hover:underline-offset-4 hover:underline cursor-pointer"
                        >
                          Don't have an account ?
                        </p>
                      </>
                    )}

                    {accountOption === "create" && (
                      <>
                        <button
                          onClick={() => {
                            if (!firstName) {
                              setErrMsg("First name required");
                            } else if (!lastName) {
                              setErrMsg("Last name required");
                            } else if (!(email && emailCheck)) {
                              setErrMsg("Email required");
                            } else if (!password) {
                              setErrMsg("Password field is empty");
                            } else if (password && password?.length < 4) {
                              setErrMsg("Password needs 4 or longer character");
                            } else if (!(password === confirmPassword)) {
                              setErrMsg("Repeat password did not match");
                            } else if (
                              emailCheck &&
                              firstName &&
                              lastName &&
                              password &&
                              password === confirmPassword
                            )
                              handleCreateAccount();
                          }}
                          className="bg-blue-600 text-white hover:bg-green-600 p-2 rounded-lg"
                        >
                          Create Account
                        </button>

                        <p
                          onClick={() => setAccountOption("login")}
                          className="text-blue-700 text-sm italic text-center p-2 m-2 hover:underline-offset-4 hover:underline cursor-pointer"
                        >
                          Already have an account ?
                        </p>
                      </>
                    )}
                  </div>
                </form>
              </div>
            )}
          </>
        )}
      </>
    </>
  );
};

export default Login;
