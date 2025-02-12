import { Button } from "@/components/ui/button";
import React from "react";
import { useToast } from "@/hooks/use-toast";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const Navbar = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const logoutHandler = async () => {
    try {
      const res = await axios.get("http://localhost:8000/api/v1/user/logout");
      if (res.data.success) {
        // alert(res.data.message);
        toast({
          title: "Success",
          description: res.data.message,
        });
        navigate("/login");
      }
    } catch (error) {
      toast({
        title: "Error",
        description:
          error.response?.data?.message || "An unexpected error occurred.",
        variant: "destructive",
      });
    }
  };
  return (
    <div className="bg-gray-600">
      <div className="max-w-6xl flex items-center justify-between p-2">
        <h1 className="font-bold text-lg">{"Vansh MERN Stack"}</h1>
        <Button onClick={logoutHandler}>Logout</Button>
      </div>
    </div>
  );
};

export default Navbar;
