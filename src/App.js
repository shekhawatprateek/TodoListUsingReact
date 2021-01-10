import "./App.css";
import { Button, FormControl, InputLabel, Input } from "@material-ui/core";
import { useState, useEffect } from "react";
import Todo from './Todo'
import firebase from 'firebase';
import db from './firebase';

function App() {
  const [todos, setTodos] = useState([]);
  const [input, setInput] = useState("");

// When the app loads, we need to listen to database and fetch new todos as they get added/removed....

useEffect(() => {
    // This code fires when the app.js loads 
    db.collection('todos').orderBy('timestamp', 'desc').onSnapshot(snapshot => {
      setTodos(snapshot.docs.map(doc => ({id: doc.id, todo: doc.data().todo})))
    })
  }, []
  ); 

  const addTodo = (event) => {
    // This will fire off when we click the button
    event.preventDefault(); // this will prevent page on loading after press submit button

    db.collection('todos').add({
      todo: input,
      timestamp: firebase.firestore.FieldValue.serverTimestamp()
    })


    setInput(""); // this will clear the input field after hitting submit button
  };

  return (
    <div className="App">
      <h1 style={{ fontFamily: '"Hachi Maru Pop", cursive'}}> Todo App </h1>

      <form className="form">
        <div className="form__control">

        <FormControl >
          <InputLabel className="inputlabel">Write Todo...</InputLabel>
          <Input
            value={input}
            onChange={(event) => setInput(event.target.value)}
          />
        </FormControl>
        </div>

    <div className="btn">
        <Button
        color="primary"
          variant="contained"
          type="submit"
          onClick={addTodo}
          disabled={!input}
        >
          Add Todo
        </Button>

    </div>
      </form>
      <ul className="list__ul">
        {todos.map((todo) => {
          return <Todo todo={todo}/>
        })}
      </ul>
    </div>
  );
}

export default App;
