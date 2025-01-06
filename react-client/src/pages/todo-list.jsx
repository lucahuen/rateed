import React, { useContext, useEffect, useState } from "react";
import { CssBaseline, Typography, Divider } from "@mui/material";
import Grid from "@mui/material/Grid2";
import Header from "../components/header";
import Todo from "../components/todo";
import AddTodo from "../components/add-todo";
import Footer from "../components/footer";
import { ApiContext } from "../context/api-context";

export default function TodoList() {
  const [todos, setTodos] = useState([]);
  const { todoService } = useContext(ApiContext);

  useEffect(() => {
    todoService
      .requestAllTodos()
      .then((res) => {
        setTodos(res.data);
      })
      .catch((error) => {
        console.error("[Error]: " + error);
      });
  }, []);

  const handleDeleteTodo = (id) => {
    todoService
      .requestDeleteTodo(id)
      .then(() => {
        setTodos((prevState) => {
          return prevState.filter((todo) => todo._id !== id);
        });
      })
      .catch((error) => {
        console.error("[Error]: " + error);
      });
  };

  const handleAddTodo = (title) => {
    todoService
      .requestCreateTodo(title)
      .then((res) => {
        setTodos((prevState) => [...prevState, res.data]);
      })
      .catch((error) => {
        console.error("[Error]: " + error);
      });
  };

  return (
    <div>
      <CssBaseline />
      <Header />
      <Grid
        container
        justifyContent="center"
        sx={{ minHeight: "95vh", py: 10, px: 2 }}
      >
        <Grid size={{ xs: 12, md: 8, lg: 5 }}>
          <Grid
            container
            direction="column"
            sx={{ p: 4, borderRadius: 2, border: "3px solid #d6d4d4" }}
            spacing={1}
          >
            <Typography variant="h5" align="center">
              A Simple To-Do List
            </Typography>
            <Divider />
            <AddTodo handleAddTodo={handleAddTodo} />

            <Todo todos={todos} handleDeleteTodo={handleDeleteTodo} />
          </Grid>
        </Grid>
      </Grid>
      <Divider />
      <Footer />
    </div>
  );
}
