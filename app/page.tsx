"use client"

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/Button";
import { auth } from "@/firebase/config";
import { useRouter } from "next/navigation";
import { useAuthState } from "react-firebase-hooks/auth";
import { signOut } from 'firebase/auth';
import { deleteCookie } from "cookies-next";
import NavBar from "@/components/NavBar";

export default function Home() {
  const [user] = useAuthState(auth);
  const [loading, setLoading] = useState(true);
  const router = useRouter();


  const handleSignOut = async () => {
    await signOut(auth);
    deleteCookie("user");
    router.push("/login");
  };


  return (
    <>
      <NavBar />
      <Button variant="secondary" onClick={handleSignOut}>Kijelentkezés</Button>

    </>
  );
}
