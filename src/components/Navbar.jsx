import React, { useState } from "react";
import Logo from "./Logo";
import Locked from '../assets/lock.svg';
import unLocked from '../assets/unlock.svg';
const Navbar = () => {
  const [hovered, sethovered] = useState(false);
  return (
    <nav className="flex  justify-between text-amber-50 bg-slate-800 p-4 fixed w-full">
      <Logo color="text-green-400" />
      <div className="flex flex-row-reverse items-center gap-4 mr-2">
        <img
          className="peer w-7 scale-120 "
          src={hovered ? unLocked : Locked}
          alt="lock"
          onMouseEnter={() => sethovered(true)}
          onMouseLeave={() => sethovered(false)}
        />
        <span className=" inline-block peer-hover:scale-110 text-red-500 peer-hover:text-green-400 transition-transform duration-300 ease-in">
          {hovered?"Unlocked":"Locked"}
        </span>
      </div>
    </nav>
  );
};

export default Navbar;
