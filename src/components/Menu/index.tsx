import Link from "next/link";

export const Menu = () => {
  return (
    <nav>
      <Link href="/">Home</Link>
      <Link href="/profile">Profile</Link>
      <Link href="/category">Category</Link>
    </nav>
  );
};
