import { Button } from "@/components/ui/button";
import Link from "next/link";

export default async function Home() {
  return (
    <div className="w-full h-full flex flex-col justify-center items-center">
      <h1 className="text-4xl font-ligaSans">
        Welcome to <b>huasoroa's crime game</b>
      </h1>
      <Button variant={"link"}>
        <Link href={"/game"}>Start playing</Link>
      </Button>
      <Button variant={"link"}>
        <Link href={"/about"}>Learn more</Link>
      </Button>
    </div>
  );
}
