import React, { useContext, useEffect } from "react";
import DeleteOutlineIcon from "@material-ui/icons/DeleteOutline";
import { makeStyles } from "@material-ui/core";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Checkbox from "@material-ui/core/Checkbox";
import Paper from "@material-ui/core/Paper";
import Divider from "@material-ui/core/Divider";
import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";
import Box from "@material-ui/core/Box";
import { days } from "../utils/todo";

import { TodoContext } from "../context";
import * as actions from "../store/actions";

const useStyles = makeStyles({
  root: {
    flexGrow: 1,
  },
  deleteBtn: {
    "&:hover": {
      cursor: "pointer",
    },
    alignContent: "center",
  },
  listItem: {
    padding: "0 16px",
  },
  isComplete: {
    textDecorationLine: "line-through",
  },
});

// https://stackoverflow.com/questions/14446511/most-efficient-method-to-groupby-on-an-array-of-objects
const groupBy = (list, keyGetter) => {
  const map = new Map();
  list.forEach((item) => {
    const key = keyGetter(item);
    const collection = map.get(key);
    if (!collection) {
      map.set(key, [item]);
    } else {
      collection.push(item);
    }
  });
  return map;
};

export default function TodoList() {
  const classes = useStyles();

  const { todos, dispatchTodos } = useContext(TodoContext);

  const handleCompleteTask = (id) => {
    dispatchTodos(actions.completeTodo(id));
  };

  const handleDeleteTask = (task) => {
    dispatchTodos(actions.deleteTodo(task));
  };

  useEffect(() => {}, [dispatchTodos]);

  const taskByDayComponent = (day) => {
    const tasksByDay = groupBy(todos, (todo) => todo.day);
    const getTasksByDay = tasksByDay.get(day);

    if (getTasksByDay) {
      return getTasksByDay.map((task) => (
        <ListItem className={classes.listItem} key={task.id}>
          <ListItemText>
            <FormControlLabel
              control={
                <Checkbox
                  checked={task.isCompleted}
                  onChange={() => handleCompleteTask(task.id)}
                  color="primary"
                  data-testid="checkbox"
                />
              }
              label={task.name}
              className={`${task.isCompleted ? classes.isComplete : ""}`}
            />
          </ListItemText>
          <ListItemIcon>
            <DeleteOutlineIcon
              onClick={() => handleDeleteTask(task)}
              className={classes.deleteBtn}
              data-testid="delete-button"
            />
          </ListItemIcon>
        </ListItem>
      ));

      // undefined object on empty tasks
    } else {
      return;
    }
  };

  return (
    <div className={classes.root}>
      <Grid
        container
        spacing={2}
        className={classes.gridContainer}
        justify="center"
      >
        {days.map((day) => (
          <Grid item md={6} sm={12} key={day}>
            <Paper elevation={3}>
              <Typography variant="h6" component="span">
                <Box fontWeight="fontWeightMedium">{day}</Box>
              </Typography>
              <Divider variant="middle" />
              {taskByDayComponent(day)}
            </Paper>
          </Grid>
        ))}
      </Grid>
    </div>
  );
}
