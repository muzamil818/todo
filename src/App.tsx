import { useEffect, useState } from "react";
import { TiDeleteOutline } from "react-icons/ti";
import Todo from "./Todo";
import {db} from "./firebase"
import { collection, onSnapshot, doc, deleteDoc, orderBy, query, Timestamp  } from "firebase/firestore";

type types = {
  id: string,
  task: string,
  createdAt: Timestamp | null;
}


const App = () => {


  const [task, setTask] = useState<types[]>([]);

  useEffect(()=>{
      const q = query(collection(db,'tasks'), orderBy('createdAt', 'desc'));

      const unsubscribe = onSnapshot(q, (snapshot) =>{
        const taskList = snapshot.docs.map((doc)=>({
          id: doc.id,
          ...(doc.data() as {task: string, createdAt: Timestamp | null;}),
        }))
        setTask(taskList);
      })
      return () => unsubscribe()

  }, [])


  const handleDelete = async (id: string) => {
      await deleteDoc(doc(db, "tasks", id))
  }
  return (
    
    <div className="flex justify-center items-center flex-col gap-4 h-[100vh] w-full bg-[#111827]">
      <div className="flex items-center justify-center">
        <Todo  />
      </div>

      <div className="flex flex-col space-y-4 rounded p-4">
        {task.map((itm ) => (
          <div
            key={itm.id}
            className="flex justify-between items-center py-2 px-2 w-[365px] h-10 rounded bg-gray-100 shadow"
          >
            {itm.task}
            <button onClick={()=>handleDelete(itm.id)} className="cursor-pointer"><TiDeleteOutline/></button>
          </div>
        ))}
      </div>
    </div>

  );
};

export default App;
