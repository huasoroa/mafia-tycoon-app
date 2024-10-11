import Link from "next/link";

export default async function Home() {
  return (
    <div>
      Hey, this is my game wanna try it out ?
      <Link href={"/game"}>Go to the game</Link>
    </div>
  );
}
