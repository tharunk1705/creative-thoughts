import { auth } from "../../utils/firebase";
import { useAuthState } from "react-firebase-hooks/auth";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

const Post = () => {
  return (
    <div className="my-20 p-12 shadow-md rounded-lg border-2 max-w-md mx-auto">
      <form>
        <h1 className="text-2xl font-bold">Create a new post</h1>
        <div className="py-2">
          <h3 className="text-lg font-medium py-2">Description</h3>
          <textarea className="bg-gray-800 text-white h-48 w-full rounded-lg text-sm p-2 mb-2"></textarea>
          <p className="py-2">0/300</p>
        </div>
        <button className="w-full bg-cyan-600 text-white font-medium p-2 my-2 rounded-full">
          Submit
        </button>
      </form>
    </div>
  );
};

export default Post;
