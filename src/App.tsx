import { useEffect, useState } from "react";
import TaskForm from "./components/TaskForm";
import TaskList from "./components/TaskList";

interface Task {
  id: number;
  text: string;
  complete: boolean;
}

const storagekey = "Tasks"

const App = () => {
 ///State for mananagin tasks, input, and edit mode
 const [task, setTask] = useState<Task[]>(() => {
  const storedTask = localStorage.getItem(storagekey);
  return storedTask ? JSON.parse(storedTask): [];
});

const [input, setInput] = useState<string>("");
const [editingId, setEditingId] = useState<number | null>(null);

//Load Tasks from localstorage on mount
//useEffect will run what is inside as soon as App compoenent loads
useEffect(() => {
  const storedTasks = localStorage.getItem(storagekey);

  if (storedTasks) {
    setTask(JSON.parse(storedTasks));
  }
}, []);

//Save tasks to localStorage whenever tasks change

useEffect(() => {

localStorage.setItem(storagekey,JSON.stringify(task));

}, [task])

///functions will go below..............

///function to add or updatea task

const addTask = () => {

  //editing

  if(input === "") return;

  if(editingId !== null) {

    const updateTasks = task.map((task)=> (
      task.id === editingId ? {...task, text: input} : task
    ));
    setTask(updateTasks);
    setEditingId(null);
    setInput("");

  } else {
    ///adding

    const newTask: Task = {
      id:Date.now(),
      text:input,
      complete: false
    }
    setTask([newTask, ...task]);
    setInput('');
  }

};

///function to start editing a task
const startEditing = (id: number,text: string) => {
  setEditingId(id);
  setInput(text);
}

//function to cancel editing
const cancelEdit = () => {
  setEditingId(null);
  setInput("");
}

///function to delete a task

const deleteTask = (id: number) => {
  const deletedItem = task.filter((task) => task.id !== id);
  setTask(deletedItem);
}


//function to toggle a task complete status
const toggleComplete = (id: number) => {
  const updateTasks = task.map((task) => task.id === id ? {...task, complete: !task.complete}: task)
  setTask(updateTasks);
}

  return (
   <>
      <h1 className="text-center">Task App</h1>
      <div className="container">
        <div className="row">
          <h1 className="text-center">My Task</h1>
          <div className="col">
            <TaskForm
              input={input}
              setInput={setInput}
              editingId={editingId}
              addTask={addTask}
              cancelEdit={cancelEdit}
            />
          </div>
          <div className="col-12">
            <TaskList
              tasks={task}
              deleteTask={deleteTask}
              startEditTask={startEditing}
              toggleComplete={toggleComplete}
            />
          </div>
        </div>

      </div>
   </>
  )
}

export default App