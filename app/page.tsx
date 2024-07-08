"use client"

import { useEffect, useState } from "react";
import { Button } from "@/components/ui/Button";
import { useRouter } from "next/navigation";
import { deleteCookie, getCookie } from "cookies-next";
import NavBar from "@/components/NavBar";
import Spinner from "@/components/ui/Spinner";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "@/firebase/config";

export default function Home() {
  const [loading, setLoading] = useState(true);
  const [user] = useAuthState(auth);
  const router = useRouter();

  useEffect(() => {
    const userCookie = getCookie("user");
    if (!userCookie) {
      router.push("/login");
    } else {
      setLoading(false);
    }
  }, [router]);


  if (loading) {
    return <div className="flex justify-center items-center h-screen"><Spinner /></div>;
  }

  return (
    <>
      <NavBar />
    </>
  );
}
