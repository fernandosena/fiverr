"use client";
import AuthWrapper from "@/components/AuthWrapper";
import Companies from "@/components/Landing/Companies";
import Everything from "@/components/Landing/Everything";
import FiverrBusiness from "@/components/Landing/FiverrBusiness";
import HeroBanner from "@/components/Landing/HeroBanner";
import JoinFiverr from "@/components/Landing/JoinFiverr";
import PopularServices from "@/components/Landing/PopularServices";
import Services from "@/components/Landing/Services";
import {
  StateContext,
  StateProvider,
  useStateProvider,
} from "@/context/StateContext";
import reducer, { initialState } from "@/context/StateReduces";
import { useContext, useReducer } from "react";

export default function Home() {
  const [state, dispatch] = useReducer(reducer, initialState);
  const { showLoginModal, showSignupModal } = state;

  return (
    <StateContext value={{ state, dispatch }}>
      <HeroBanner />
      <Companies />
      <PopularServices />
      <Everything />
      <Services />
      <FiverrBusiness />
      <JoinFiverr />
      {(showLoginModal || showSignupModal) && (
        <AuthWrapper type={showLoginModal ? "login" : "signup"} />
      )}
    </StateContext>
  );
}
