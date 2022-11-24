import clsx from 'clsx';
import Link from 'next/link';

export default function Layout({ children, variant }) {
  return (
    <div className="">
      <header className="flex justify-between px-16 py-6">
        <Link href="/">
          <h2>/home</h2>
        </Link>
        <h1 className="text-3xl font-bold">Next.js Blog</h1>
        <Link href="/">
          <h2> {`< back`}</h2>
        </Link>
      </header>

      <main className="max-w-2xl py-8 mx-auto mt-24">{children}</main>
    </div>
  );
}
