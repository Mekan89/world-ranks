import { useRouter } from "next/router";

const Navbar = () => {
  const router = useRouter();

  return (
    <>
      <div className="flex justify-between m-4">
        <button onClick={() => router.push("/")}>QuizApp</button>
        <div>
          <div className="p-2">
            <Link
              p={2}
              onClick={() => router.push("/signin")}
              fontWeight={router.pathname === "/signin" ? "extrabold" : "normal"}>
              Sign In
            </Link>
          </div>
        </div>
      </div>
    </>
  );
};

export default Navbar;
