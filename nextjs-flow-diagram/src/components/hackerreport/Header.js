'use client';
import Link from 'next/link';
import { useState } from 'react';
import { CiViewTable } from 'react-icons/ci';
import { FiMapPin, FiMenu, FiX } from 'react-icons/fi';
import { SlGraph } from 'react-icons/sl';
import SearchField, { SearchFieldWrapper } from '../SearchField';

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header className="flex flex-col items-start xl:flex-row xl:items-center justify-between whitespace-nowrap border-b border-solid border-b-[#2c3035] px-6 md:px-10 py-4 relative">
      <div className="flex items-center justify-between w-full xl:w-auto text-white">
        <div className="flex items-center gap-4">
          <div className="size-4">
            <svg
              viewBox="0 0 48 48"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M39.5563 34.1455V13.8546C39.5563 15.708 36.8773 17.3437 32.7927 18.3189C30.2914 18.916 27.263 19.2655 24 19.2655C20.737 19.2655 17.7086 18.916 15.2073 18.3189C11.1227 17.3437 8.44365 15.708 8.44365 13.8546V34.1455C8.44365 35.9988 11.1227 37.6346 15.2073 38.6098C17.7086 39.2069 20.737 39.5564 24 39.5564C27.263 39.5564 30.2914 39.2069 32.7927 38.6098C36.8773 37.6346 39.5563 35.9988 39.5563 34.1455Z"
                fill="currentColor"
              ></path>
            </svg>
          </div>
          <h2 className="text-white text-lg font-bold leading-tight tracking-[-0.015em]">
            HackerReport
          </h2>
        </div>

        <div className="md:block hidden xl:hidden   ">
          <SearchFieldWrapper />
        </div>
        <button
          className="xl:hidden text-white text-2xl"
          onClick={() => setMenuOpen(!menuOpen)}
        >
          {menuOpen ? <FiX /> : <FiMenu />}
        </button>
      </div>
      {/* Hide SearchField on smaller screens */}

      <div className="hidden xl:inline mt-[-40px]">
        <SearchField />
      </div>
      <div
        className={`flex-col  items-start w-full xl:flex-row xl:w-auto xl:items-center gap-6 md:gap-8 justify-end ${
          menuOpen ? 'flex' : 'hidden'
        } xl:flex`}
      >
        {/* Nav items in a column on small screens */}
        <div className="mt-8 xl:mt-0 flex flex-col xl:flex-row items-start xl:items-center gap-6 md:gap-9 ">
          <div className="md:hidden">
            <SearchFieldWrapper />
          </div>
          <Link
            className="text-white text-sm font-medium leading-normal flex items-center gap-1"
            href="/graph"
          >
            <SlGraph className="text-lg" />
            <span>Graph</span>
          </Link>
          <Link
            className="text-white text-sm font-medium leading-normal flex items-center gap-1"
            href="#"
          >
            <CiViewTable className="text-lg" />
            <span>Table</span>
          </Link>
          <Link
            className="text-white text-sm font-medium leading-normal flex items-center gap-1"
            href="#"
          >
            <FiMapPin className="text-lg" />
            <span>Map</span>
          </Link>
          <Link
            className="text-white text-sm font-medium leading-normal hidden md:inline"
            href="#"
          >
            Brand Guard
          </Link>
        </div>
        {/* Adjust button and profile picture size on smaller screens */}
        <button className="flex min-w-[70px] md:min-w-[84px] max-w-[480px] cursor-pointer items-center justify-center overflow-hidden rounded-xl h-10 px-3 md:px-4 bg-[#2c3035] text-white text-sm font-bold leading-normal tracking-[0.015em]">
          <span className="truncate">Upgrade</span>
        </button>
        <div
          className="bg-center bg-no-repeat aspect-square bg-cover rounded-full size-9 md:size-10"
          style={{
            backgroundImage:
              'url("https://cdn.usegalileo.ai/sdxl10/c8634102-6ea0-4e63-a801-92d6f0e9e59b.png")',
          }}
        ></div>
      </div>
    </header>
  );
}
