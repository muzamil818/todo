import { useState } from "react"
import { collection, addDoc, serverTimestamp  } from "firebase/firestore";
 import { db } from "./firebase"; 

const Todo = () => {
  const [task, setTask] = useState("");

  const handleSubmit = async (e: React.FormEvent) =>{
    e.preventDefault()

    if(!task.trim()) return
 
      try {
        await addDoc(collection(db,"tasks"), {
          task: task,
          createdAt: serverTimestamp(),
        })
        setTask("")
      } catch (error) {
 console.log("something went wrong", error);
 
      }


  }


  return (
    <div className="">
        <form onSubmit={handleSubmit } className="flex gap-3">
          <input type="text" placeholder="Enter your Task" 
            className="bg-white py-3 w-70 px-3 rounded"
            value={task}
            onChange={(e)=> setTask(e.target.value)}
          />

          <button type='submit' className=" py-3 px-6 bg-green-400 rounded cursor-pointer">Add</button>
        </form>

    </div>
  )
}

export default Todo