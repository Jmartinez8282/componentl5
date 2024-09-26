import Tasks from "./Tasks";

//Define the shape of a single task with this interface
interface Task {
    id: number;
    text: string;
    complete: boolean;
}

///Define the shap of the props that TaskList will receive
interface TaskListProps {
    tasks: Task[];
    deleteTask: (id: number) => void;
    startEditTask: (id: number, text:string) => void;
    toggleComplete: (id:number) => void
}

const TaskList = ({tasks,deleteTask,startEditTask,toggleComplete}:TaskListProps) => {

    ///Return the JSX (UI) to render the TaskList  component
  return (
<>
  
    {/* Ul and map our <Tasks/> pass in our props set these props eventually from parent component */}
    <ul className="list-group mt-4" data-bs-theme="dark">
        {tasks.map((task) => (
            // Render the Tasks component for each task, passing task details and control function as props
            <Tasks
                key={task.id}
                task={task}
                deleteTask={deleteTask}
                startEditTask={startEditTask}
                toggleComplete={toggleComplete}
            />
        ))}

    </ul>
</>
  )
}

export default TaskList