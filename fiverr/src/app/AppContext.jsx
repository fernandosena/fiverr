"use client";
import Footer from "@/components/Footer";
import { Navbar } from "@/components/Navbar";
import { StateContext } from "@/context/StateContext";
import reducer, { initialState } from "@/context/StateReduces";
import { usePathname } from "next/navigation";
import React, { useReducer } from "react";

export default function AppContext({ children }) {
  const [state, dispatch] = useReducer(reducer, initialState);
  const pathname = usePathname();

  return (
    <StateContext value={{ state, dispatch }}>
      <div className="relative flex flex-col h-screen justify-between">
        <Navbar />
        <div
          className={`mb-auto w-full mx-auto ${
            pathname !== "/" ? "mt-36" : ""
          }`}
        >
          {children}
        </div>
        <Footer />
      </div>
    </StateContext>
  );
}
