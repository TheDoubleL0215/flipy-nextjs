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

  return (
    <>
      <NavBar />
    </>
  );
}
