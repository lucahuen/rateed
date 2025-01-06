import React from "react";
import { Card, CardHeader, IconButton, Typography } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";

// * Todo component
const Todo = (props) => {
  const { todos, handleDeleteTodo } = props;

  return (
    <>
      {todos?.length ? (
        <Typography gutterBottom>#{todos.length} to-dos found!</Typography>
      ) : (
        <Typography gutterBottom>No to-dos found!</Typography>
      )}

      {todos?.map((todo, index) => {
        return (
          <Card
            key={index}
            sx={{
              borderRadius: 2,
              "&:hover": { backgroundColor: "#f5f5f5" },
              border: "1px solid #b7b7b7",
            }}
            elevation="0"
          >
            <CardHeader
              title={<Typography key={todo.id}>{todo.title}</Typography>}
              action={
                <IconButton
                  color="error"
                  onClick={() => handleDeleteTodo(todo._id)}
                >
                  <DeleteIcon />
                </IconButton>
              }
            />
          </Card>
        );
      })}
    </>
  );
};

export default Todo;
