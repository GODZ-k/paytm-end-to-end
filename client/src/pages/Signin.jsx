import { useState } from "react";
import { Button } from "../components/Button";
import { BottomWarning } from "../components/ButtonWarning";
import { Heading } from "../components/Heading";
import { InputBox } from "../components/InputBox";
import { SubHeading } from "../components/SubHeading";
import { useNavigate } from "react-router-dom";
import {useForm} from "react-hook-form"

import axios from "axios";
import { toast } from "react-toastify";

export const Signin = () => {
  const navigate = useNavigate();
const {register , handleSubmit} =  useForm()

  const signinUser = async (data) => {
    try {
      const response = await axios.post(
        "http://localhost:3000/api/v1/user/login",data );
      
      localStorage.setItem("token", response.data.accessToken);
      toast.success(`Welcome ${response.data.user}`);
      navigate("/");

    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="bg-slate-300 h-screen flex justify-center">
      <div className="flex flex-col justify-center">
       <form onSubmit={handleSubmit(signinUser)}>
       <div className="rounded-lg bg-white w-80 text-center p-2 h-max px-4">
          <Heading label={"Sign in"} />
          <SubHeading label={"Enter your credentials to access your account"} />
          <InputBox
            {...register("email",{required:true})}
            placeholder="harkirat@gmail.com"
            label={"Email"}
          />
          <InputBox
            {...register("password",{required:true})}
            placeholder="123456"
            label={"Password"}
          />
          <div className="pt-4">
            <Button type="submit" label={"Sign in"} />
          </div>
          <BottomWarning
            label={"Don't have an account?"}
            buttonText={"Sign up"}
            to={"/signup"}
          />
        </div>
       </form>
      </div>
    </div>
  );
};
