import Head from "next/head";
import Link from "next/link";

function Layout({ children, title = "World Ranks" }) {
  return (
    <div className="flex flex-col max-w-3xl min-h-screen mx-auto bg-gray-100 dark:bg-gray-800 dark:text-white">
      <Head>
        <title>{title}</title>
      </Head>
      <header className="self-center m-5">
        <Link href="/">
          <img src="rank.svg" alt="logo" width="60" />
        </Link>
      </header>
      <main className="flex-grow p-2">{children}</main>
      <footer className="p-3 mt-6 text-sm font-bold text-center text-white bg-gray-500">Mekan Allanov</footer>
    </div>
  );
}

export default Layout;
