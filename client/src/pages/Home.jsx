import React, { useEffect, useState } from "react";
import "../App.css";
import { Button } from "../components/ui/button";
import { Input } from "../components/ui/input";
import { Textarea } from "../components/ui/textarea";
import axios from "axios";
import { useToast } from "../hooks/use-toast";
import Navbar from "./Navbar";
import {
  Card,
  CardTitle,
  CardHeader,
  CardContent,
  CardDescription,
} from "@/components/ui/card";

const Home = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const { toast } = useToast();
  const [todos, setTodos] = useState([]); // ✅ Fix: Initialize as an empty array

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
        toast({
          title: "Success",
          description: res.data.message,
        });
        // setTodos([...todos, res.data.todo]);
        setTitle("");
        setDescription("");

        // ✅ Update todos dynamically after adding a new todo
        setTodos((prevTodos) => [...prevTodos, res.data.todo]);
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

  useEffect(() => {
    const fetchTodo = async () => {
      try {
        const res = await axios.get("http://localhost:8000/api/v1/todo");
        console.log(res.data); // ✅ Debug API response

        if (res.data.success && Array.isArray(res.data.Todos)) {
          setTodos(res.data.Todos);
        } else {
          setTodos([]); // ✅ Ensures todos is always an array
        }
      } catch (error) {
        console.error("Error fetching todos:", error);
        setTodos([]); // ✅ Prevents undefined state
      }
    };
    fetchTodo();
  }, []);

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
        <Button onClick={addTodoHandler}>Add Todo</Button>
      </div>
      <Textarea
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        placeholder="Write a description..."
        className="w-1/4 mt-3"
      />

      <div className="grid grid-cols-6 gap-2 mt-5">
        {todos.map((todo) => (
          <Card key={todo._id} className="bg-gray-600 p-4 text-black">
            <CardHeader>
              <CardTitle>{todo.title}</CardTitle>
              <CardDescription className="text-white">
                {todo.description}
              </CardDescription>
            </CardHeader>
            {/* <CardContent>
              <h1>{todo.title}</h1>
              <p>{todo.description}</p>
            </CardContent> */}
          </Card>
        ))}
      </div>
    </div>
  );
};

export default Home;
