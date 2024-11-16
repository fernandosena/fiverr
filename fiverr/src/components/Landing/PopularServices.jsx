"use client";
import Image from "next/image";
import { useRouter } from "next/navigation";
import React from "react";

export default function PopularServices() {
  const router = useRouter();
  const popularServicesData = [
    {
      name: "AI Artists",
      label: "Add talent to AI",
      image: "/service1.png",
    },
    {
      name: "Logo Design",
      label: "Build yout brand",
      image: "/service2.jpeg",
    },
    {
      name: "Wordpress",
      label: "Customize your size",
      image: "/service3.jpeg",
    },
    {
      name: "Voice Over",
      label: "Share yout message",
      image: "/service4.jpeg",
    },
    {
      name: "Social Media",
      label: "Reach more customers",
      image: "/service5.jpeg",
    },
    {
      name: "SEO",
      label: "Unlock grouth online",
      image: "/service6.jpeg",
    },
    {
      name: "Illustration",
      label: "Color your dreams",
      image: "/service7.jpeg",
    },
    {
      name: "Translation",
      label: "Go global",
      image: "/service8.jpeg",
    },
  ];
  return (
    <div className="mx-20 my-16">
      <h2 className="text-4xl mb-10 text-[#404145] font-bold ml-20">
        Popular Services
      </h2>
      <ul className="flex flex-wrap gap-16 justify-center">
        {popularServicesData.map(({ name, label, image }) => (
          <li
            key={name}
            className="relative cursor-pointer"
            onClick={() => router.push(`/search?q=${name.toLowerCase()}`)}
          >
            <div className="absolute z-10 text-white left-5 top-4">
              <span>{label}</span>
              <h6 className="font-extrabold text-2xl">{name}</h6>
            </div>
            <div className="h-80 w-72">
              <Image src={image} fill alt="service" />
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
