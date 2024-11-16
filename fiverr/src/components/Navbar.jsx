"use client";
import Link from "next/link";
import FiverrLogo from "./FiverrLogo";
import { useState } from "react";

export const Navbar = () => {
  const handlerLogin = () => {};

  const handlerSignup = () => {};

  const [isLoaded, setisLoaded] = useState(true);
  const [isFixed, setisFixed] = useState(false);
  const [searchData, setsearchData] = useState("");

  const link = [
    { linkName: "Fiver Business", handler: "#", type: "link" },
    { linkName: "Explore", handler: "#", type: "link" },
    { linkName: "English", handler: "#", type: "link" },
    { linkName: "Become a Seller", handler: "#", type: "link" },
    { linkName: "Sign In", handler: handlerLogin, type: "button" },
    { linkName: "Join", handler: handlerSignup, type: "button2" },
  ];

  return (
    <>
      {isLoaded && (
        <nav
          className={`w-full px-24 flex justify-between items-center py-6 top-0 z-30 transition-all duration-300 ${
            isFixed
              ? "fixed bg-white border-b border-gray-200"
              : "absolute bg-transparent border-transparent"
          }`}
        >
          <div>
            <Link href="/">
              <FiverrLogo fillColor={!isFixed ? "#FFFFFF" : "#404145"} />
            </Link>
          </div>
        </nav>
      )}
    </>
  );
};
