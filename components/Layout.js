import { MoonIcon, SunIcon } from "@heroicons/react/solid";
import { useTheme } from "next-themes";
import Head from "next/head";
import Link from "next/link";
import { useEffect, useState } from "react";

function Layout({ children, title = "World Ranks" }) {
  const { systemTheme, theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const renderThemeChanger = () => {
    if (!mounted) return null;

    const currentTheme = theme === "system" ? systemTheme : theme;

    if (currentTheme === "dark") {
      return <SunIcon className="ml-5 w-7 h-7" role="button" onClick={() => setTheme("light")} />;
    } else {
      return <MoonIcon className="ml-5 w-7 h-7" role="button" onClick={() => setTheme("dark")} />;
    }
  };

  return (
    <div className="flex flex-col max-w-3xl min-h-screen mx-auto bg-gray-100 dark:bg-gray-800 dark:text-white">
      <Head>
        <title>{title}</title>
      </Head>
      <header className="flex items-center justify-center m-5">
        <Link href="/">
          <img src="rank.svg" alt="logo" width="60" />
        </Link>
        {renderThemeChanger()}
      </header>
      <main className="flex-grow p-2">{children}</main>
      <footer className="p-3 mt-6 text-sm font-bold text-center text-white bg-gray-500">World Ranks</footer>
    </div>
  );
}

export default Layout;
