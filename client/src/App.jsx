import "./App.css";
import Header from "./components/Header";
import Tasks from "./components/Tasks";
import Footer from "./components/Footer";
import About from "./components/About";
import AddTask from "./components/AddTask";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import { useEffect, useState } from "react";

function App() {
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    fetch("http://localhost:5000/api/tasks/", {
      method: "GET",
    })
      .then((result) => result.json())
      .then((result) => {
        setTasks(result);
      });
  }, []);

  const addTask = async (task) => {
    const res = await fetch("http://localhost:5000/api/tasks/", {
      method: "POST",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify(task),
    });
  };

  return (
    <Router>
      <div className="container">
        <Header />
        <Route path="/" exact>
          <AddTask onAdd={addTask} />
          <Tasks tasks={tasks} />
        </Route>
        <Route path="/about" exact>
          <About />
        </Route>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
