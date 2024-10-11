import { signIn } from "@/auth";

const SignIn = () => {
  return (
    <form
      action={async () => {
        "use server";
        await signIn("discord");
      }}
    >
      <button type="submit">Signin with Discord</button>
    </form>
  );
};

export default SignIn;
