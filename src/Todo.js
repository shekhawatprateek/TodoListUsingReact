import React, { useState } from "react";
import db from "./firebase";
import CreateIcon from "@material-ui/icons/Create";
import DeleteIcon from "@material-ui/icons/Delete";
import SaveIcon from "@material-ui/icons/Save";
import Swal from "sweetalert2";
import {
  List,
  ListItemText,
  Modal,
  makeStyles,
  Button,
  Tooltip,
} from "@material-ui/core";
import "./Todo.css";

const useStyles = makeStyles((theme) => ({
  paper: {
    width: "90%",
    margin: "auto",
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
          <h1 style={{ fontFamily: '"Yusei Magic", sans-serif' }}>
            What's your new plan?
          </h1>
          <input
            className="modal__input"
            value={input}
            onChange={(event) => setInput(event.target.value)}
            placeholder={props.todo.todo}
          />

          <Button
            className="modal__btn"
            onClick={updateTodo}
            variant="contained"
            color="primary"
            size="small"
            className={classes.button}
            startIcon={<SaveIcon />}
          >
            Save
          </Button>
        </div>
      </Modal>
      <List className="todo__list">
        {/* <ListItem> */}

        <ListItemText className="input__todo" primary={props.todo.todo} />
        {/* </ListItem> */}

        <Tooltip title="Edit" interactive>
          <CreateIcon
            className="edit__todo"
            onClick={(e) => setOpen(true)}
          ></CreateIcon>
        </Tooltip>

        <Tooltip title="Delete" interactive>
          <DeleteIcon
            className="delete__todo"
            onClick={(event) =>
              db
                .collection("todos")
                .doc(props.todo.id)
                .delete(
                  Swal.fire({
                    position: "center",
                    icon: "success",
                    title: "Deleted",
                    showConfirmButton: false,
                    timer: 1000,
                  })
                )
            }
          />
        </Tooltip>
      </List>
    </>
  );
}

export default Todo;
