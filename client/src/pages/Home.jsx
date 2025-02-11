import React from "react";
import { useState } from "react";
import "../App.css";
import { Button } from "../components/ui/button";
import { Input } from "../components/ui/input";
import { Textarea } from "../components/ui/textarea";
import axios from "axios";
import { useToast } from "../hooks/use-toast";
import Navbar from "./Navbar";

const Home = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const { toast } = useToast;
  const addTodoHandler = async () => {
    try {
      const res = await axios.post(
        "http://localhost:8000/api/v1/todo",
        { title, description },
        {
          headers: {
            "Content-Type": "application/json",
          },
          withCredentials: true,
        }
      );
      console.log(res);
      if (res.data.success) {
        alert(res.data.message);
      }
    } catch (error) {
      alert(error.response.data.message);
    }
  };
  return (
    <div>
      <Navbar />
      <div className="flex items-center gap-5 mt-5">
        <Input
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          type="text"
          placeholder="Add a new todo..."
          className="w-1/4"
        />
        <Button onClick={addTodoHandler}>Add Todo </Button>
      </div>
      <Textarea
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        placeholder="Write a descrition..."
        className="w-1/4 mt-3"
      />
    </div>
  );
};

export default Home;
