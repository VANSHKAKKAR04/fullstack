import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";
import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
const Login = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [user, setUser] = useState({
    email: "",
    password: "",
  });

  const changeHandler = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  const loginHandler = async () => {
    try {
      const res = await axios.post(
        "http://localhost:8000/api/v1/user/login",
        user,
        {
          headers: {
            "Content-Type": "application/json",
          },
          withCredentials: true,
        }
      );
      console.log(res);
      if (res.data.success) {
        // alert(res.data.message);
        toast({
          title: "Success",
          description: res.data.message,
        });
        navigate("/");
      }
    } catch (error) {
      // alert(error.response.data.message);
      toast({
        title: "Error",
        description: error.data.message,
        variant: "destructive",
      });
    }
  };
  return (
    <div>
      <Input
        value={user.email}
        onChange={changeHandler}
        type="text"
        name="email"
        placeholder="email"
      />
      <Input
        value={user.password}
        onChange={changeHandler}
        type="text"
        name="password"
        placeholder="password"
      />
      <Button onClick={loginHandler}>Login</Button>
    </div>
  );
};

export default Login;
