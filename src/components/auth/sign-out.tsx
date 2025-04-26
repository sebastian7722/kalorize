"use client";
import { logOut } from "@/auth/actions";
import { Button } from "@/components/ui/button";
import { LogOut } from "lucide-react";

export default function SignOut() {
  return (
    <Button className="py-5 cursor-pointer" onClick={() => logOut()}>
      <LogOut /> Sign Out
    </Button>
  );
}
