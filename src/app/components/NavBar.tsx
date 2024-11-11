import { auth } from "@/auth";
import { DarkModeToggle } from "@/components/ui/darkModeToggle";
import SignOutButton from "../_auth/SignOutButton";
import SignInButton from "../_auth/SignInButton";

const NavBar = async () => {
  const session = await auth()


  return (
    <header className="sticky top-0 flex h-16 items-center gap-4 border-b bg-background px-4 md:px-6">
      <nav className="hidden flex-col gap-6 text-lg font-medium md:flex md:flex-row md:items-center md:gap-5 md:text-sm lg:gap-6">
        <DarkModeToggle />
        {session ? <SignOutButton /> : <SignInButton />}
      </nav>
    </header>
  );
};

export default NavBar;
