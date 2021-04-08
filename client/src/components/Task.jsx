import { FaTimes } from "react-icons/fa";
import moment from "moment";

const Task = ({ task }) => {
  return (
    <div className="task">
      <h3>
        {task.text}
        <FaTimes style={{ color: "red", cursor: "pointer" }} />
      </h3>
      <p>{moment(task.day).format("MMMM Do YYYY, h:mm:ss a")}</p>
    </div>
  );
};

export default Task;
