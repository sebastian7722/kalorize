import Searchbar from "@/components/searchbar";
import Link from "next/link";

export default function FoodLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex flex-col min-h-screen">
      <header className="bg-zinc-800/50 backdrop-blur-md shadow-md">
        <nav className="container mx-auto px-4 py-4 grid grid-cols-3 items-center">
          <Link href="/">
            <h1 className="text-3xl font-bold text-zinc-50">Kalorize</h1>
          </Link>
          <Searchbar />
        </nav>
      </header>
      <main className="flex-grow container mx-auto px-4 py-12">{children}</main>
      <footer className="bg-zinc-900/50 backdrop-blur-md shadow-md py-4">
        <div className="container mx-auto text-center text-zinc-200">
          &copy; {new Date().getFullYear()} Kalorize. All rights reserved.
        </div>
      </footer>
    </div>
  );
}
