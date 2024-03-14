"use client";

import Editor from "@/components/editor";
import Loader from "@/components/loader";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

const Main = () => {
  const router = useRouter();
  const [authenticated, setAuthenticated] = useState(false);
  useEffect(() => {
    try {
      const user = sessionStorage.getItem("user");
      if (!user) {
        router.push("/signup");
      }
      const { isLogin } = JSON.parse(user);
      if (!isLogin) {
        router.push("/signup");
      }
      setAuthenticated(true);
    } catch (error) {
      console.log(error);
    }
  }, [router]);

  return (
    <main className="min-h-screen">
      {authenticated ? <Editor /> : <Loader />}
    </main>
  );
};

export default Main;
