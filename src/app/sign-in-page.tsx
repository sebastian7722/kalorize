import SignIn from "@/components/auth/sign-in";

export default function SignInPage() {
  return (
    <div className="w-full min-h-dvh grid place-items-center">
      <div className="lg:px-12 lg:py-16 l py-10 px-8 bg-zinc-800 rounded-lg">
        <div className="mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[350px]">
          <div className="flex flex-col space-y-2 text-center">
            <h1 className="text-2xl font-semibold tracking-tight text-slate-200">
              Sign in
            </h1>
            <p className="text-sm text-zinc-300">
              Sign in with google to use this application.
            </p>
          </div>
          <SignIn />
        </div>
      </div>
    </div>
  );
}
