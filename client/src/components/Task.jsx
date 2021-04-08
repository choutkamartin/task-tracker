import { FaTimes } from "react-icons/fa";
import moment from "moment";

const Task = ({ task, onDelete }) => {
  return (
    <div className={`task ${task.reminder ? "reminder" : ""}`}>
      <h3>
        {task.text}
        <FaTimes
          style={{ color: "red", cursor: "pointer" }}
          onClick={() => onDelete(task._id)}
        />
      </h3>
      <p>{moment(task.day).format("MMMM Do YYYY, h:mm:ss a")}</p>
    </div>
  );
};

export default Task;
