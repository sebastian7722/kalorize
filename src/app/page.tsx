import { getCurrentUser } from "@/auth/currentUser";
import SignOut from "@/components/auth/sign-out";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export default async function Home() {
  const session = await getCurrentUser({ withFullUser: true });

  return (
    <div className="h-screen w-screen flex flex-col justify-center items-center gap-4">
      <Button size="lg" asChild>
        <Link href="/food">Food</Link>
      </Button>
      <h1 className="text-zinc-50">Hello world</h1>
      <p className="text-zinc-200">{JSON.stringify(session, null, 2)}</p>
      <SignOut />
    </div>
  );
}
