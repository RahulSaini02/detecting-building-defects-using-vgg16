import Link from "next/link";
import { useRouter } from "next/router";

function Nav() {
  const route = useRouter();
  let home;
  if (route.pathname == "/") home = true;

  return (
    <div className="sticky top-0 z-50 h-[9vh] bg-white flex items-center justify-between p-2 lg:px-5 shadow-md sm:h-[10vh]">
      <Link href="/">
        <div className="cursor-pointer text-xl tracking-wide sm:text-2xl lg:text-3xl font-semibold text-[#011638] pl-5 xl:pl-10 2xl:pl-52">
          BDD
        </div>
      </Link>
      {home ? (
        <Link href="/preprocess">
          <button className="cta-solid mr-5 xl:mr-10 2xl:mr-52">
            GET STARTED
          </button>
        </Link>
      ) : (
        <Link href="/">
          <button className="cta-outlined mr-5 xl:mr-10 2xl:mr-52">Home</button>
        </Link>
      )}
    </div>
  );
}

export default Nav;
