import Image from "next/image";
import React from "react";
import { BsCheckCircle } from "react-icons/bs";

export default function Everything() {
  const evethingData = [
    {
      title: "Stick to your budget",
      subtitle:
        "Fin the right service for every price point. No hourly rater, just project-based pricing.",
    },
    {
      title: "Get quality work done quickly",
      subtitle:
        "Hand your project over to a talented freelancer in minutes, get long-lating results.",
    },
    {
      title: "Pay when you're happy",
      subtitle:
        "Upfront quotes mean no surprises. payments only get release when you approve",
    },
    {
      title: "Count on 24/7 support",
      subtitle:
        "Our round-the-clock support tean is available to help anytime, anywhere.",
    },
  ];
  return (
    <div className="bg-[#f1fdf7] flex py-20 justify-between px-24">
      <div>
        <h2 className="text-4xl mb-5 text-[#424145] font-bold">
          The best part? everything.
        </h2>
        <ul className="flex flex-col gap-10">
          {evethingData.map(({ title, subtitle }) => {
            return (
              <li key={title}>
                <div className="flex gap-2 items-center text-xl">
                  <BsCheckCircle className="text-[#51546a]" />
                  <h4>{title}</h4>
                </div>
                <p className="text-[#62646a]">{subtitle}</p>
              </li>
            );
          })}
        </ul>
      </div>
      <div className="relative h-96 w-2/4">
        <Image src="/everything.webp" fill alt="everything" />
      </div>
    </div>
  );
}
