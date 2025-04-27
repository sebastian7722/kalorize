import { getCurrentUser } from "@/auth/currentUser";
import SignOut from "@/components/auth/sign-out";
import Searchbar from "@/components/searchbar";

export default async function Home() {
  const session = await getCurrentUser({ withFullUser: true });

  return (
    <div>
      <div className="max-w-lg mx-auto mt-8">
        <Searchbar />
      </div>
      <h1 className="text-zinc-50">Hello world</h1>
      <p className="text-zinc-200">{JSON.stringify(session, null, 2)}</p>
      <SignOut />
    </div>
  );
}
