import axios from "axios";
import React, { useState } from "react";
import { useForm } from "react-hook-form";

function Register({ setRegister, setToken }) {
  const [loading, setLoading] = useState(false);
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();
  const submitData = async (data) => {
    setLoading(true);
    const res = await axios.post(`https://reqres.in/api/register`, data);
    console.log(res);
    if (res.status === 200) {
      setRegister(true);
      setToken(res.data.token);
      reset();
      setLoading(false);
    }
  };
  return (
    <>
      <h1>Register</h1>
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
          <span className="err-msg">Please enter a Name</span>
        )}
        <br />
        <button type="submit" disabled={loading}>
          Register
        </button>
      </form>
    </>
  );
}

export default Register;
