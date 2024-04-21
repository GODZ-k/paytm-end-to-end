import { useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { Button } from "../components/Button";
import { BottomWarning } from "../components/ButtonWarning";
import { Heading } from "../components/Heading";
import { InputBox } from "../components/InputBox";
import { SubHeading } from "../components/SubHeading";
import { useNavigate } from "react-router-dom";

export const Signup = () => {
  const navigate = useNavigate();

  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  // signup user


    const signupUser = async () => {
     try {
      const response = await axios.post(
        "http://localhost:3000/api/v1/user/register",
        {
          username,
          email,
          password,
        }
      );
      toast.success(response.data.msg);
      navigate("/signin");
      
     } catch (error) {
      console.error(error)
     }
    };

  return (
    <div className="bg-slate-300 h-screen flex justify-center">
      <div className="flex flex-col justify-center">
        <div className="rounded-lg bg-white w-80 text-center p-2 h-max px-4">
          <Heading label={"Sign up"} />
          <SubHeading label={"Enter your infromation to create an account"} />
          <InputBox
            onChange={(e) => setUsername(e.target.value)}
            placeholder="John"
            label={"Username"}
          />
          <InputBox
            onChange={(e) => setEmail(e.target.value)}
            placeholder="xyz@gmail.com"
            label={"Email"}
          />
          <InputBox
            onChange={(e) => setPassword(e.target.value)}
            placeholder="*****"
            label={"Password"}
          />
          <div className="pt-4">
            <Button onClick={signupUser} label={"Sign up"} />
          </div>
          <BottomWarning
            label={"Already have an account?"}
            buttonText={"Sign in"}
            to={"/signin"}
          />
        </div>
      </div>
    </div>
  );
};
