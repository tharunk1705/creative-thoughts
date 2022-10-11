import Link from "next/link";

import { auth } from "./../../utils/firebase";
import { useAuthState } from "react-firebase-hooks/auth";
import Image from "next/image";

const Navbar = () => {
  const [user, loading] = useAuthState(auth);

  return (
    <nav className="flex justify-between items-center py-10">
      <Link href={"/"}>
        <button className="text-lg font-medium">Creative Thoughts</button>
      </Link>
      <ul className="flex items-center gap-10">
        {!user && (
          <Link href={"/auth/login"}>
            <a className="py-2 px-4 text-sm bg-cyan-500 hover:bg-cyan-400 active:scale-95 text-white rounded-full shadow-md font-medium ml-8">
              Join now!
            </a>
          </Link>
        )}
        {user && (
          <div className="flex items-center gap-6">
            <Link href={"/post"}>
              <button className="font-medium bg-cyan-500 text-white py-2 px-4 rounded-lg text-sm">
                Post
              </button>
            </Link>
            <Link href={"/dashboard"}>
              <Image
                className="w-12 rounded-full cursor-pointer "
                src={user.photoURL}
                alt={user.displayName + "_dp"}
                width={50}
                height={50}
              />
            </Link>
          </div>
        )}
      </ul>
    </nav>
  );
};
export default Navbar;
