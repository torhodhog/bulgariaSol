"use client";
import React, { useState, useRef, useEffect } from "react";
import { LayoutGrid } from "@/components/ui/layout-grid";

export function LayoutGridDemo() {
  return (
    <div className="h-screen py-20 w-full">
      <LayoutGrid cards={cards} />
    </div>
  );
}

const SkeletonOne = () => {
  return (
    <div>
      <p className="font-bold md:text-4xl text-xl text-white">
        Magic Dreams
      </p>
      <p className="font-normal text-base text-white"></p>
      <p className="font-normal text-base my-4 max-w-lg text-neutral-200">
        Magic Dreams er et ferieanlegg som ligger i den sjarmerende byen Sveti Vlas, Bulgaria.
        Med en beliggenhet rett ved stranden og en kort spasertur til sentrum, er dette det perfekte stedet for en avslappende ferie.
      </p>
    </div>
  );
};

const SkeletonTwo = () => {
  return (
    <div>
      <p className="font-bold md:text-4xl text-xl text-white">
        Nessebar
      </p>
      <p className="font-normal text-base text-white"></p>
      <p className="font-normal text-base my-4 max-w-lg text-neutral-200">
        Opplev Nessebar, den fredelige gamlebyen som er på UNESCOs verdensarvliste.
        Her kan du vandre i brosteinsgatene og nyte den vakre utsikten over Svartehavet.
      </p>
    </div>
  );
};
const SkeletonThree = () => {
  return (
    <div>
      <p className="font-bold md:text-4xl text-xl text-white">
        Magic Nights 
      </p>
      <p className="font-normal text-base text-white"></p>
      <p className="font-normal text-base my-4 max-w-lg text-neutral-200">
        På kveldene kan du nyte en deilig middag på en av de mange restaurantene i området.
         Her finner du alt fra tradisjonell bulgarsk mat til internasjonale retter.
      </p>
    </div>
  );
};
const SkeletonFour = () => {
  return (
    <div>
      <p className="font-bold md:text-4xl text-xl text-white">
        Panorama Dreams
      </p>
      <p className="font-normal text-base text-white"></p>
      <p className="font-normal text-base my-4 max-w-lg text-neutral-200">
        Panorama Dreams gir deg muligheten til å løpe fra stuen og stupe ut i ett av de tre bassengene på området. 
      </p>
    </div>
  );
};

const cards = [
  {
    id: 1,
    content: <SkeletonOne />,
    className: "md:col-span-2 cursor-pointer hover:opacity-75",
    thumbnail: "/assets/Bilde4.jpg", // Bruker relativ sti til bildet i public-mappen
  },
  {
    id: 2,
    content: <SkeletonTwo />,
    className: "col-span-1 cursor-pointer hover:opacity-75",
    thumbnail: "/assets/Bilde14.jpg",
  },
  {
    id: 3,
    content: <SkeletonThree />,
    className: "col-span-1 cursor-pointer hover:opacity-75",
    thumbnail: "/assets/Bilde17.jpg",
  },
  {
    id: 4,
    content: <SkeletonFour />,
    className: "md:col-span-2 cursor-pointer hover:opacity-75",
    thumbnail: "/assets/Bilde16.jpg",
  },
];