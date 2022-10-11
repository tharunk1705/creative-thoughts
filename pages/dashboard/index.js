import { useRouter } from "next/router";
import { useEffect } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "../../utils/firebase";

const Dashboard = () => {
  const route = useRouter();
  const [user, loading] = useAuthState(auth);

  const getData = async () => {
    if (loading) return;
    if (!user) return route.push("/auth/login");
  };

  useEffect(() => {
    getData();
  }, [user, loading]);

  return (
    <div>
      <h1>Your posts</h1>
      <div>posts</div>
      <button onClick={() => auth.signOut()}>Sign out</button>
    </div>
  );
};

export default Dashboard;
