import React, { useContext, useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import TodoList from "./components/TodoList";
// import CssBaseline from "@material-ui/core/CssBaseline";
import Typography from "@material-ui/core/Typography";
import Box from "@material-ui/core/Box";
import Container from "@material-ui/core/Container";
import TextField from "@material-ui/core/TextField";
import Select from "@material-ui/core/Select";
import Button from "@material-ui/core/Button";
import MenuItem from "@material-ui/core/MenuItem";
import InputLabel from "@material-ui/core/InputLabel";
import FormControl from "@material-ui/core/FormControl";

import { days } from "./utils/todo";
import { TodoContext } from "./context/TodoContext";
import * as actions from "./store/actions";

const useStyles = makeStyles((theme) => ({
  root: {
    textAlign: "center",
  },
  container: {
    backgroundColor: "#f5f4f4",
    padding: "2rem 1rem",
    minHeight: "100vh",
  },
  form: {
    padding: "0.5rem 0",
  },
  formControl: {
    margin: theme.spacing(1),
    minWidth: 110,
    verticalAlign: "baseline",
  },
}));

function App() {
  const classes = useStyles();

  const { dispatchTodos } = useContext(TodoContext);

  const [inputName, setInputName] = useState("");
  const [inputDay, setInputDay] = useState("");

  const handleInputTask = (event) => {
    setInputName(event.target.value);
  };

  const handleInputDay = (event) => {
    setInputDay(event.target.value);
  };

  const handleTambahTask = () => {
    if (inputName !== "") {
      dispatchTodos(actions.addTodo(inputDay, inputName));
    }
    setInputName("");
  };

  return (
    <div className={classes.root}>
      {/* <CssBaseline /> */}
      <Container maxWidth="sm" className={classes.container}>
        <Typography variant="h4" component="h1">
          <Box textAlign="center">Pekerjaan Rumah Yang Perlu Dilakukan</Box>
        </Typography>

        <div className={classes.form}>
          <FormControl className={classes.formControl}>
            <InputLabel>Hari</InputLabel>
            <Select
              value={inputDay}
              onChange={handleInputDay}
              data-testid="day-input-form"
            >
              {days.map((day) => (
                <MenuItem value={day} key={day}>
                  {day}
                </MenuItem>
              ))}
            </Select>
          </FormControl>

          <FormControl className={classes.formControl}>
            <TextField
              label="Tulis disini..."
              size="small"
              value={inputName}
              onChange={handleInputTask}
              className={classes.formControl}
              data-testid="task-input-form"
            />
          </FormControl>

          <Button
            variant="contained"
            color="primary"
            onClick={handleTambahTask}
            data-testid="task-button"
          >
            Tambah
          </Button>
        </div>

        <TodoList />
      </Container>
    </div>
  );
}

export default App;
