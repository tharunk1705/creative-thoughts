import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { auth, db } from "../utils/firebase";
import Message from "../components/Message/Message";
import { async } from "@firebase/util";
import {
  arrayUnion,
  doc,
  getDoc,
  onSnapshot,
  serverTimestamp,
  Timestamp,
  updateDoc,
} from "firebase/firestore";

const Details = () => {
  const router = useRouter();
  const routeData = router.query;
  const [message, setMessage] = useState("");
  const [allMessage, setAllMessages] = useState([]);

  const submitMessage = async () => {
    // Check is the user is  logged
    if (!auth.currentUser) return router.push("/auth/login");

    if (!message) {
      toast.error("Comment cannot be empty 😅", {
        position: toast.POSITION.TOP_CENTER,
        autoClose: 1500,
      });
      return;
    }

    const docRef = doc(db, "posts", routeData.id);
    await updateDoc(docRef, {
      comments: arrayUnion({
        message,
        avatar: auth.currentUser.photoURL,
        username: auth.currentUser.displayName,
        time: Timestamp.now(),
      }),
    });
    setMessage("");
  };

  const getComments = async () => {
    const docRef = doc(db, "posts", routeData.id);
    const unsubscribe = onSnapshot(docRef, (snapshot) => {
      setAllMessages(snapshot.data().comments);
    });
    return unsubscribe;
  };

  useEffect(() => {
    if (!router.isReady) return;
    getComments();
  }, [router.isReady]);
  return (
    <div>
      <Message {...routeData}></Message>
      <div className="my-4 ">
        <div className="flex gap-1">
          <input
            onChange={(e) => setMessage(e.target.value)}
            type="text"
            value={message}
            placeholder="Send a message 😊"
            className="bg-gray-800 rounded-md w-full p-2 text-white text-sm"
          />
          <button
            onClick={submitMessage}
            className="bg-cyan-600 rounded-md text-white py-2 px-4"
          >
            Submit
          </button>
        </div>
        <div className="py-6">
          <h2 className="font-bold">Comments</h2>
          {allMessage?.map((msg) => (
            <div
              key={msg.time}
              className="p-4 my-4 border-2 rounded-md shadow-md"
            >
              <div className="flex items-center gap-2">
                <img
                  className="w-10 rounded-full cursor-pointer "
                  src={msg.avatar}
                  alt={msg.username + "_dp"}
                />
                <div>
                  <h2 className="text-xs font-bold">{msg.username}</h2>
                  <h2 className="text-sm text-gray-700 ">{msg.message}</h2>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Details;
