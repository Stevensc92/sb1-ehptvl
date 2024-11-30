"use client";

import { Button } from "@/components/ui/button";
import { signIn, signOut, useSession } from "next-auth/react";
import { LogIn, LogOut } from "lucide-react";

export function AuthButton() {
  const { data: session } = useSession();

  if (session) {
    return (
      <Button variant="ghost" onClick={() => signOut()}>
        <LogOut className="w-4 h-4 mr-2" />
        Déconnexion
      </Button>
    );
  }

  return (
    <Button onClick={() => signIn("google")}>
      <LogIn className="w-4 h-4 mr-2" />
      Connexion
    </Button>
  );
}