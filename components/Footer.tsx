import Link from "next/link";

export default function Footer() {
  return (
    <div className="flex space-x-2 text-sm text-gray-500 dark:text-gray-400">
      <div>{`© ${new Date().getFullYear()}`}</div>
      <div>&#x2022;</div>
      <Link href="/">Remote Cafe</Link>
    </div>
  );
}
