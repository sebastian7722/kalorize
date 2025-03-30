import SignOut from "@/components/auth/sign-out";
import { Session } from "next-auth";

export default async function DashboardPage({ user }: Session) {
  return (
    <div>
      <h1 className="text-zinc-50">Hello world</h1>
      <p className="text-zinc-200">{JSON.stringify(user, null, 2)}</p>
      <SignOut />
    </div>
  );
}
