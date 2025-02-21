import Link from "next/link";

export default function Home() {
  return (
    <div>
      <h1 className="text-3xl font-bold underline">Hello World!</h1>
      <Link href="/signin">Signin</Link>
      <Link href="/signup">Signup</Link>
    </div>
  );
}
