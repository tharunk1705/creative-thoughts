import { auth, db } from "../../utils/firebase";
import { useAuthState } from "react-firebase-hooks/auth";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import {
  addDoc,
  collection,
  doc,
  serverTimestamp,
  updateDoc,
} from "firebase/firestore";
import { toast } from "react-toastify";

const Post = () => {
  const [user, loading] = useAuthState(auth);
  const route = useRouter();

  const routeData = route.query;

  const [post, setPost] = useState({
    description: "",
  });

  const descriptionChangeHandler = (event) => {
    // if (post.description.length >= 300) return;
    let postVal = {
      ...post,
      description: event.target.value,
    };
    return setPost(postVal);
  };

  const submitPost = async (event) => {
    event.preventDefault();

    // running validation for description
    if (post.description.length <= 0) {
      toast.error("Description can not be empty!", {
        position: toast.POSITION.TOP_CENTER,
        autoClose: 1000,
      });
    }

    if (post?.hasOwnProperty("id")) {
      const docRef = doc(db, "posts", post.id);
      const updatedPost = { ...post, timestamp: serverTimestamp() };
      await updateDoc(docRef, updatedPost);
      return route.push("/");
    } else {
      // do post to firestore
      const collectionRef = collection(db, "posts");
      await addDoc(collectionRef, {
        ...post,
        timestamp: serverTimestamp(),
        comments: [],
        user: user.uid,
        avatar: user.photoURL,
        username: user.displayName,
      });

      let postVal = {
        ...post,
        description: "",
      };
      setPost(postVal);
      toast.success("Post has been made 🥳", {
        position: toast.POSITION.TOP_CENTER,
        autoClose: 1500,
      });
      return route.push("/");
    }
  };

  // check our user
  const checkUser = async () => {
    if (loading) return;
    if (!user) route.push("/auth/login");
    if (routeData.id) {
      setPost({ description: routeData.description, id: routeData.id });
    }
  };

  useEffect(() => {
    checkUser();
  }, [user, loading]);

  return (
    <div className="my-20 p-12 shadow-md rounded-lg border-2 max-w-md mx-auto">
      <form onSubmit={(e) => submitPost(e)}>
        <h1 className="text-2xl font-bold">
          {post.hasOwnProperty("id") ? "Edit your post" : "Create a new post"}
        </h1>
        <div className="py-2">
          <h3 className="text-lg font-medium py-2">Description</h3>
          <textarea
            value={post.description}
            maxLength={300}
            onChange={(e) => descriptionChangeHandler(e)}
            className="bg-gray-800 text-white h-48 w-full rounded-lg text-sm p-2 mb-2"
          ></textarea>
          <p className={`py-2 text-cyan-600 font-medium text-sm`}>
            {post.description.length}/300
          </p>
        </div>
        <button
          type="submit"
          className="w-full bg-cyan-600 text-white font-medium p-2 my-2 rounded-full"
        >
          Submit
        </button>
      </form>
    </div>
  );
};

export default Post;
