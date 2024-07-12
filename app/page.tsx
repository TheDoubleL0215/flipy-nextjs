"use client"
import DashboardDecks from "@/components/DashboardDecks";
import NavBar from "@/components/NavBar";
import { auth } from "@/firebase/config";
import { useAuthState } from "react-firebase-hooks/auth";

export default function Home() {
  const [user] = useAuthState(auth);

  return (
    <>
      <NavBar />
      <div className="flex flex-col gap-5 m-8">
        <h1 className="text-3xl font-bold text-text">Létrehozott pakli(k):</h1>
        <DashboardDecks />
      </div>
    </>
  );
}
