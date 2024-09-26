//Defines the structure (shape of our data) of a task. This interface will need an id ( unique indentifier), 'text', 'complete' 

interface Task {
    id: number;
    text: string;
    complete: boolean;
}

//Here we define our expected properties (props) that the 'Tasks.tsx' Component is going to receive.

interface TaskProps {
    task: Task;
    deleteTask: (id:number) => void;
    startEditTask: (id: number,text:string) => void;
    toggleComplete:(id: number) => void
}

//This is our Tasks component where we pass in our props as an parameter in the parentheses.
//This component expects the 'TasksProps' structured defined above.

const Tasks = ({task,deleteTask,startEditTask,toggleComplete}:TaskProps) => {
  return (
    ///JSX
    //The outmost element is a list item (<li>), represents a single task in a task list.
    //We are render the 'completed' class so if the ('task.complete') true a 'completed' class is applied to styling completed task.
    //We are going to go to our index.css and make sure that we have a completed class that does what we need. strike text when the check box cliked.
    <>
      

        <li className={`list-group-item d-flex justify-content-between ${task.complete ? "completed": ""}`}>
            <div>
                {/* A checkbox that indicats wether the task is complete or not.  */}
                <input 
                type="checkbox" 
                className="form-check-input me-2" 
                checked={task.complete}
                onChange={() => toggleComplete(task.id)}
                
                />
                <span>
                    {task.text}
                </span>

            </div>
            <div>
                {/* The "Edit" button triggers the 'startEditTask' function with the task's id and text.
                 This allows the parent component to iniate a editing mode for the selected task. */}
                <button onClick={() => startEditTask(task.id,task.text)} className="btn btn-outline-info m-2">Edit</button>
                <button onClick={() => deleteTask(task.id)} className="btn btn-outline-danger">Delete</button>

            </div>
        </li>
    </>
  )
}

export default Tasks