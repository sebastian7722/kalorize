import SignIn from "@/components/sign-in";
import { auth } from "@/lib/auth";

export default async function Home() {
  const session = await auth();

  if (!session?.user) return <SignIn />;

  return (
    <div>
      <h1>Hello world</h1>
      <p>{JSON.stringify(session.user, null, 2)}</p>
    </div>
  );
}
