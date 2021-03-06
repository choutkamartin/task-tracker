import Header from "./components/Header";
import Tasks from "./components/Tasks";
import Footer from "./components/Footer";
import About from "./components/About";
import AddTask from "./components/AddTask";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import { useEffect, useState } from "react";

function App() {
  const [showAddTask, setShowAddTask] = useState(false);
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
    const data = await res.json();
    setTasks([...tasks, data]);
  };

  const deleteTask = async (id) => {
    const res = await fetch(`http://localhost:5000/api/tasks/${id}`, {
      method: "DELETE",
    });
    res.status === 200
      ? setTasks(tasks.filter((task) => task._id !== id))
      : alert("Error when deleting the task");
  };

  return (
    <Router>
      <div className="container">
        <Header
          showAdd={showAddTask}
          onAdd={() => setShowAddTask(!showAddTask)}
        />
        <Route path="/" exact>
          {showAddTask && <AddTask onAdd={addTask} />}
          {tasks.length > 0 ? (
            <Tasks tasks={tasks} onDelete={deleteTask} />
          ) : (
            "No Tasks To Show"
          )}
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
