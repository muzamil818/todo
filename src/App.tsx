import { useEffect, useState } from "react";
import { TiDeleteOutline } from "react-icons/ti";
import Todo from "./Todo";
import { db } from "./firebase";
import {
  collection,
  onSnapshot,
  doc,
  deleteDoc,
  orderBy,
  query,
  Timestamp,
  where,
  updateDoc,
} from "firebase/firestore";
import { useUser } from "@clerk/clerk-react";

type types = {
  id: string;
  task: string;
  createdAt: Timestamp | null;
};

const App = () => {
  const [task, setTask] = useState<types[]>([]);
  const { user } = useUser();
  
  const [editId, setEditId] = useState<string | null>(null);
  const [editText, setEditText] = useState<string>("");

  useEffect(() => {
    if (!user) return;

    console.log("userId", user.id);

    const q = query(
      collection(db, "tasks"),
      where("userId", "==", user.id),
      orderBy("createdAt", "desc")
    );

    const unsubscribe = onSnapshot(q, (snapshot) => {
      console.log("the size of snap: ", snapshot.size);

      const taskList = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...(doc.data() as {
          task: string;
          createdAt: Timestamp | null;
          userId: string;
        }),
      }));
      setTask(taskList);
    });
    return () => unsubscribe();
  }, [user]);

  const handleDelete = async (id: string) => {
    await deleteDoc(doc(db, "tasks", id));
  };

  const handleEdit = async (id: string, newTask: string) => {
    if (!newTask.trim()) return;
    const taskRef = doc(db, "tasks", id);
    await updateDoc(taskRef, {
      task: newTask,
    });
    setEditId(null);
    setEditText("");
  };

  return (
    <div className="flex justify-center items-center flex-col gap-4 h-[100vh] w-full bg-[#111827]">
      <div className="flex items-center justify-center">
        <Todo />
      </div>

      <div className="flex flex-col space-y-4 rounded p-4">
        {task.map((itm) => (
          <div
            key={itm.id}
            className="flex justify-between items-center py-2 px-2 sm:w-[250px] lg:w-[365px] rounded bg-gray-100 shadow"
          >
            {editId === itm.id ? (
              <>
                <input
                  type="text"
                  value={editText}
                  onChange={(e) => setEditText(e.target.value)}
                  className="flex-1 px-2 py-1 border rounded"
                />
                <button
                  onClick={() => handleEdit(itm.id, editText)}
                  className="ml-2 text-green-600"
                >
                  Save
                </button>
                <button
                  onClick={() => {
                    setEditId(null);
                    setEditText("");
                  }}
                  className="ml-2 text-red-600"
                >
                  Cancel
                </button>
              </>
            ) : (
              <>
                <span>{itm.task}</span>
                <div className="flex gap-2">
                  <button
                    onClick={() => {
                      setEditId(itm.id);
                      setEditText(itm.task);
                    }}
                    className="text-blue-600"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDelete(itm.id)}
                    className="cursor-pointer text-red-600"
                  >
                    <TiDeleteOutline />
                  </button>
                </div>
              </>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default App;
