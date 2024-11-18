"use client";
import Link from "next/link";
import FiverrLogo from "./FiverrLogo";
import { use, useEffect, useState } from "react";
import { useStateProvider } from "@/context/StateContext";
import { IoSearchOutline } from "react-icons/io5";
import { useCookies } from "react-cookie";
import axios from "axios";
import { GET_USER_INFO, HOST } from "@/utils/constants";
import { reducerCases } from "@/context/constants";
import { useRouter } from "next/navigation";
import { usePathname } from "next/navigation";
import Image from "next/image";

export const Navbar = () => {
  const router = useRouter();
  const pathname = usePathname();

  const [cookies] = useCookies();

  const [isLoaded, setIsLoaded] = useState(false);
  const [isFixed, setIsFixed] = useState(false);
  const [searchData, setSearchData] = useState("");
  const {
    state: { showLoginModal, showSignupModal, userInfo, isSeller },
    dispatch,
  } = useStateProvider();

  const handlerLogin = () => {
    if (showSignupModal) {
      dispatch({
        type: reducerCases.TOGGLE_SIGNUP_MODAL,
        showSignupModal: false,
      });
    }
    dispatch({
      type: reducerCases.TOGGLE_LOGIN_MODAL,
      showLoginModal: true,
    });
  };

  const handlerSignup = () => {
    if (showLoginModal) {
      dispatch({
        type: reducerCases.TOGGLE_LOGIN_MODAL,
        showLoginModal: false,
      });
    }
    dispatch({
      type: reducerCases.TOGGLE_SIGNUP_MODAL,
      showSignupModal: true,
    });
  };

  useEffect(() => {
    if (pathname === "/") {
      const positionNavBar = () => {
        window.pageYOffset > 0 ? setIsFixed(true) : setIsFixed(false);
      };
      window.addEventListener("scroll", positionNavBar);
      return () => window.removeEventListener("scroll", positionNavBar);
    } else {
      setIsFixed(true);
    }
  }, [pathname]);

  const links = [
    { linkName: "Fiver Business", handler: "#", type: "link" },
    { linkName: "Explore", handler: "#", type: "link" },
    { linkName: "English", handler: "#", type: "link" },
    { linkName: "Become a Seller", handler: "#", type: "link" },
    { linkName: "Sign In", handler: handlerLogin, type: "button" },
    { linkName: "Join", handler: handlerSignup, type: "button2" },
  ];

  useEffect(() => {
    if (cookies.jwt && !userInfo) {
      const getUserInfo = async () => {
        try {
          const {
            data: { user },
          } = await axios.post(GET_USER_INFO, {}, { withCredentials: true });

          let projectUserInfo = { ...user };
          if (user.profileImage) {
            projectUserInfo = {
              ...projectUserInfo,
              imageName: HOST + "/" + user.profileImage,
            };
          }
          delete projectUserInfo.profileImage;
          dispatch({
            type: reducerCases.SET_USER,
            userInfo: projectUserInfo,
          });
          setIsLoaded(true);
          if (user.isProfileInfoSet === false && pathname !== "/profile") {
            router.push("/profile");
          }
        } catch (err) {
          console.log(err);
        }
      };
      getUserInfo();
    } else {
      setIsLoaded(true);
    }
  }, [cookies, userInfo]);

  const handleOrderNavigate = () => {
    if (isSeller) router.push("/seller/order");
    router.push("/buyer/orders");
  };

  const handleModeSwitch = () => {
    if (isSeller) {
      dispatch({
        type: reducerCases.SWITCH_MODE,
      });
      router.push("/buyer/orders");
    } else {
      dispatch({
        type: reducerCases.SWITCH_MODE,
      });
      router.push("/sellers");
    }
  };

  return (
    <>
      {isLoaded && (
        <nav
          className={`w-full px-24 flex justify-between items-center py-6 top-0 z-30 transition-all duration-300 ${
            isFixed || userInfo
              ? "fixed bg-white border-b border-gray-200"
              : "absolute bg-transparent border-transparent"
          }`}
        >
          <div>
            <Link href="/">
              <FiverrLogo
                fillColor={!isFixed && !userInfo ? "#FFFFFF" : "#404145"}
              />
            </Link>
          </div>
          <div
            className={`flex ${
              isFixed || userInfo ? "opacity-100" : "opacity-0"
            }`}
          >
            <input
              type="text"
              className="w-[30rem] py-2.5 px-4 border"
              value={searchData}
              onChange={(e) => setSearchData(e.target.value)}
              placeholder="What service are you looking for today?"
            />
            <button
              className="bg-gray-900 py-1.5 text-white w-16 flex justify-center items-center"
              onClick={() => {
                setSearchData("");
                router.push(`/search?q=${searchData}`);
              }}
            >
              <IoSearchOutline className="fill-white text-white h-6 w-6 " />
            </button>
          </div>
          {!userInfo ? (
            <ul className="flex gap-10 items-center">
              {links.map(({ linkName, handler, type }) => {
                return (
                  <li
                    key={linkName}
                    className={`${
                      isFixed ? "text-base" : "text-white"
                    } font-medium`}
                  >
                    {type === "link" && <Link href={handler}>{linkName}</Link>}
                    {type === "button" && (
                      <button onClick={handler}>{linkName}</button>
                    )}
                    {type === "button2" && (
                      <button
                        onClick={handler}
                        className={`border text-md font-semibold py-1 px-3 rounded-sm ${
                          isFixed
                            ? "border-[#1DBF73] text-[#1DBF73]"
                            : "border-white text-white "
                        } hover:bg-[#1DBF73] hover:text-white hover:border-[#1DBF73] transition-all  duration-500`}
                      >
                        {linkName}
                      </button>
                    )}
                  </li>
                );
              })}
            </ul>
          ) : (
            <ul className="flex gap-10 items-center">
              {isSeller && (
                <li
                  className="cursor-pointer text-[#1DBF73] font-medium"
                  onClick={() => router.push("/seller/gigs/create")}
                >
                  Create Gig
                </li>
              )}
              <li
                className="cursor-pointer text-[#1DBF73] font-medium"
                onClick={handleOrderNavigate}
              >
                Orders
              </li>
              <li
                className="cursor-pointer font-medium"
                onClick={handleModeSwitch}
              >
                Switch to {isSeller ? "Buyer" : "Seller"}
              </li>
              <li
                className="cursor-pointer"
                onClick={(e) => {
                  e.stopPropagation();
                  setInContextMenuVisible(true);
                }}
                title="Profile"
              >
                {userInfo?.imageName ? (
                  <Image
                    src={userInfo.imageName}
                    alt="Profile"
                    width={40}
                    height={40}
                    className="rounded-full"
                  />
                ) : (
                  <div className="bg-purple-500 h-10 w-10 flex items-center justify-center rounded-full">
                    <span className="text-xl text-white">
                      {userInfo.email[0].toUpperCase()}
                    </span>
                  </div>
                )}
              </li>
            </ul>
          )}
        </nav>
      )}
    </>
  );
};
