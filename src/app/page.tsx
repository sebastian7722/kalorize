import { auth } from "@/lib/auth";

export default async function Home() {
  const session = await auth();

  if (!session?.user) return null;

  return <h1>Hello world</h1>;
}
