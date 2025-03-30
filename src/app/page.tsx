import { auth } from "@/lib/auth";
import DashboardPage from "./dashboard-page";
import SignInPage from "./sign-in-page";

export default async function Home() {
  const session = await auth();

  if (!session?.user) {
    return <SignInPage />;
  }

  return <DashboardPage {...session} />;
}
