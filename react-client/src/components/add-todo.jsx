import React, {useState} from "react";
import {Button, TextField} from "@mui/material";
import Grid from "@mui/material/Grid2";
import PropTypes from "prop-types";

// * AddTodo component
/**
 * handleAddTodo und placeholder sind props -> werden bei Benutzung der Komponente definiert (z.B. eine Methode die aufgerufen werden soll,
 * oder einfacher Text der erstellt werden soll)
 *
 */
const AddTodo = ({handleAddTodo, placeholder}) => {
    const [addTask, setAddTask] = useState("");

    const handleChange = (event) => {
        setAddTask(event.target.value);
    };

    const handleAddTodoAndClearTextfield = () => {
        handleAddTodo(addTask);
        setAddTask("");
    };

    return (
        <>
            <Grid container spacing={1} sx={{py: 2}}>
                <Grid size="grow">
                    <TextField
                        fullWidth
                        // hier wird der PROP von oben benutzt
                        placeholder={placeholder}
                        size="small"
                        onChange={handleChange}
                        value={addTask}
                        onKeyDown={(e) => {
                            if (e.key === "Enter") {
                                handleAddTodoAndClearTextfield();
                            }
                        }}
                    />
                </Grid>

                <Button variant="contained" onClick={() => handleAddTodo(addTask)}>
                    Add
                </Button>
            </Grid>
        </>
    );
};

/**
 * PropType definition
 */
AddTodo.propTypes = {
    handleAddTodo: PropTypes.func,
    placeholder: PropTypes.string, // Define the placeholder prop
};

export default AddTodo;
