import axios from "axios";
import React, { useState } from "react";
import { useForm } from "react-hook-form";

function Login({ setLoginToken }) {
  const [loading, setLoading] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();
  const submitData = async (data) => {
    console.log(data);
    setLoading(true);
    const res = await axios.post(`https://reqres.in/api/login`, data);
    console.log(res);
    if (res.status === 200) {
      setLoginToken(res.data.token);
      setUserSession(res.data.token);
      handleSuccessfulLogin(res.data.token, data.checkbox);
      reset();
      setLoading(false);
    }
  };

  const getToken = () => {
    return sessionStorage.getItem("token") || null;
  };

  const setUserSession = (token) => {
    sessionStorage.setItem("token", token);
  };
  const handleSuccessfulLogin = async (token, rememberMe) => {
    localStorage.setItem("token", token);
    localStorage.setItem("rememberme", rememberMe);
  };
  return (
    <>
      <h1>Login</h1>
      <form onSubmit={handleSubmit(submitData)}>
        <input
          type="email"
          className="text-box"
          placeholder="Email*"
          {...register("email", {
            required: true,
            pattern: {
              value: /^[a-zA-Z0-9+_.-]+@[a-zA-Z0-9.-]+$/,
              message: "invalid email address",
            },
          })}
        />
        <br />
        {errors.email && <span className="err-msg">Please enter a Email</span>}
        <br />
        <input
          type="password"
          className="text-box"
          placeholder="Password*"
          {...register("password", { required: true })}
        />
        <br />
        {errors.password && (
          <span className="err-msg">Please enter a Password</span>
        )}
        <br />
        <div>
          <input
            type="checkbox"
            {...register("checkbox", { required: true })}
          />

          <label>rememberMe</label>
        </div>
        <br />
        {errors.checkbox && (
          <span className="err-msg">Please select the checkbox</span>
        )}
        <br />
        <button type="submit" disabled={loading}>
          Login
        </button>
      </form>
    </>
  );
}

export default Login;
