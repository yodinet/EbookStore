import Link from "next/link";
import Image from "next/image";

const Header = () => {
  return (
    <header className="bg-gray-800 py-4 sticky top-0 z-10">
      <div className="flex flex-wrap justify-between items-center container mx-auto">
        <div className='flex flex-wrap items-center '>
          <Image
            src="https://i.imgur.com/sBfbckc.png"
            alt="logo"
            width={80}
            height={50}
          />
          <h1 className="text-white text-2xl">Hogwarts Library</h1>
        </div>
        <ul className="flex flex-wrap justify-between items-center p-1">
          <li>
            <Link className="px-2 py-1 text-white" href="/">
              Home
            </Link>
          </li>
          <li>
            <Link className="px-2 py-1 text-white" href="/Dashboard">
              Dashboard
            </Link>
          </li>
        </ul>
      </div>
    </header>
  );
};

export default Header;
