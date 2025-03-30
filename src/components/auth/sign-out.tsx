"use client";
import { Button } from "@/components/ui/button";
import { LogOut } from "lucide-react";
import { signOut } from "next-auth/react";

export default function SignOut() {
  return (
    <Button className="py-5 cursor-pointer" onClick={() => signOut()}>
      <LogOut /> Sign Out
    </Button>
  );
}
