import React, { useState } from "react";
import db from "./firebase";
import './Todo.css';
import CreateIcon from '@material-ui/icons/Create';
import DeleteIcon from "@material-ui/icons/Delete";
import {
  List,
  ListItem,
  ListItemText,
  Modal,
  makeStyles,
} from "@material-ui/core";
import "./Todo.css";

const useStyles = makeStyles((theme) => ({
  paper: {
    position: "absolute",
    width: 400,
    backgroundColor: theme.palette.background.paper,
    border: "2px solid #000",
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
  },
}));

function Todo(props) {
  const classes = useStyles();
  const [open, setOpen] = useState(false);
  const [input, setInput] = useState("");

  const handleOpen = () => {
    setOpen(true);
  };

  const updateTodo = () => {
    // Update the Todo with new input text
    db.collection("todos").doc(props.todo.id).set(
      {
        todo: input,
      },
      { merge: true }
    );
    setOpen(false);
  };

  return (
    <>
      <Modal open={open} onClose={(e) => setOpen(false)}>
        <div className={classes.paper}>
          <h1>I am a Modal</h1>
          <input
            value={input}
            onChange={(event) => setInput(event.target.value)}
            placeholder={props.todo.todo}
          />
          <button onClick={updateTodo}>Update Todo</button>
        </div>
      </Modal>
      <List className="todo__list">
        {/* <ListItem> */}
          <ListItemText className="input__todo" primary={props.todo.todo} />
        {/* </ListItem> */}

        <CreateIcon className="edit__todo" onClick={(e) => setOpen(true)}>
          </CreateIcon>       
        
        <DeleteIcon
        className="delete__todo"
          onClick={(event) =>
            db.collection("todos").doc(props.todo.id).delete()
          }
        />
      </List>
    </>
  );
}

export default Todo;
