'use client';
import Link from 'next/link';
import { SearchFieldWrapper } from '../SearchField';

import React, { useState } from 'react';
import { HiMenu, HiX } from 'react-icons/hi';
import { BiSearch } from 'react-icons/bi';
import { IoHelpCircleOutline } from 'react-icons/io5';
import { SlGraph, SlPlus } from 'react-icons/sl';
import { CiViewTable } from 'react-icons/ci';
import { FiMapPin } from 'react-icons/fi';
import Image from 'next/image';

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <header className="border-b border-solid border-b-[#283139] px-10 py-3">
      <div className="px-4 sm:px-6 lg:px-10 py-3">
        {/* Desktop Header */}
        <div className="flex items-center justify-between">
          {/* Logo and Brand - Always Visible */}
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-4 text-white">
              {/* <div className="size-4">
                <svg
                  viewBox="0 0 48 48"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    fillRule="evenodd"
                    clipRule="evenodd"
                    d="M24 4H6V17.3333V30.6667H24V44H42V30.6667V17.3333H24V4Z"
                    fill="currentColor"
                  ></path>
                </svg>
              </div> */}
              {/* <h2 className="text-white text-lg font-bold leading-tight tracking-[-0.015em]">
                BrandSense
              </h2> */}
              <Image
                src="/assets/logo-2.jpg"
                alt="Logo"
                width={100}
                height={100}
              />
            </div>

            {/* Desktop Navigation */}
            {/* <nav className="hidden xl:flex items-center gap-6 ml-8">
              {[
                'Acme Inc.',
                'Hacker Report',
                'Dashboard',
                'Alerts',
                'Reports',
                'API',
                'Docs',
              ].map((item) => (
                <a
                  key={item}
                  href="#"
                  className="text-white text-sm font-medium hover:text-gray-300 transition-colors"
                >
                  {item}
                </a>
              ))}
            </nav> */}
          </div>
          <div className="w-full max-w-[900px] hidden md:block mx-4">
            <SearchFieldWrapper />
          </div>

          {/* Right Section - Search, Help, Profile */}
          <div className="flex items-center gap-4">
            {/* Search - Hidden on Mobile */}
            <div className="hidden lg:flex items-center min-w-[200px] lg:min-w-[300px] h-10">
              {/* <BiSearch className="text-[#9dabb9] ml-4" size={20} /> */}
              {/* <SearchFieldWrapper /> */}
              {/* <input
                type="text"
                placeholder="Search"
                className="w-full bg-transparent border-none text-white placeholder-[#9dabb9] focus:ring-0 text-sm"
              /> */}

              <div className="items-center gap-8 ml-4 flex">
                <Link
                  className="text-white text-sm font-medium leading-normal flex items-center gap-1"
                  href="/graph"
                >
                  <SlGraph className="text-lg" />
                  <span>Graph</span>
                </Link>
                <Link
                  className="text-white text-sm font-medium leading-normal flex items-center gap-1"
                  href="/blogr"
                >
                  <CiViewTable className="text-lg" />
                  <span>Blog</span>
                </Link>
                <Link
                  className="text-white text-sm font-medium leading-normal flex items-center gap-1"
                  href="#"
                >
                  <FiMapPin className="text-lg" />
                  <span>Map</span>
                </Link>

                {/* <Link
                  className="text-white text-sm font-medium leading-normal flex items-center gap-1"
                  href="#"
                >
                  <SlPlus className="text-lg" />
                  <span>New Search</span>
                </Link> */}
              </div>
            </div>

            {/* Help Button */}
            {/* <button className="hidden sm:flex items-center justify-center h-10 px-3 bg-[#283139] text-white rounded-xl hover:bg-[#343d47] transition-colors">
              <IoHelpCircleOutline size={20} />
            </button> */}

            {/* Profile Picture */}
            <div
              className="size-10 rounded-full bg-cover bg-center bg-no-repeat"
              style={{
                backgroundImage:
                  'url("https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80")',
              }}
            />

            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="lg:hidden text-white hover:text-gray-300 transition-colors"
            >
              {isMenuOpen ? <HiX size={24} /> : <HiMenu size={24} />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <nav className="lg:hidden py-4 space-y-4">
            {/* Mobile Search */}
            {/* <div className="flex items-center h-10  mb-4"> */}
            {/* <BiSearch className="text-[#9dabb9] ml-4" size={20} />
              <input
                type="text"
                placeholder="Search"
                className="w-full bg-transparent border-none text-white placeholder-[#9dabb9] focus:ring-0 text-sm"
              /> */}
            {/* </div> */}
            <div className="md:hidden">
              <SearchFieldWrapper />
            </div>

            {/* Mobile Navigation Links */}
            {/* {['Acme Inc.', 'Hacker Report', 'Dashboard', 'Alerts', 'Reports', 'API', 'Docs'].map((item) => (
              <a
                key={item}
                href="#"
                className="block px-4 py-2 text-white hover:bg-[#283139] rounded-lg transition-colors text-sm font-medium"
              >
                {item}
              </a>
            ))} */}

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
              <span>Blog</span>
            </Link>
            <Link
              className="text-white text-sm font-medium leading-normal flex items-center gap-1"
              href="#"
            >
              <FiMapPin className="text-lg" />
              <span>Map</span>
            </Link>
            {/* <Link
              className="text-white text-sm font-medium leading-normal hidden md:inline"
              href="#"
            >
              New Search
            </Link> */}
          </nav>
        )}
      </div>
    </header>
  );
}

// export default function Header() {
//   return (
//     <header className="flex items-center justify-between whitespace-nowrap border-b border-solid border-b-[#283139] px-10 py-3">
//       {/* Logo and Brand */}
//       <div className="flex items-center gap-8">
//         <div className="flex items-center gap-4 text-white">
//           <div className="size-4">
//             <svg
//               viewBox="0 0 48 48"
//               fill="none"
//               xmlns="http://www.w3.org/2000/svg"
//             >
//               <path
//                 fillRule="evenodd"
//                 clipRule="evenodd"
//                 d="M24 4H6V17.3333V30.6667H24V44H42V30.6667V17.3333H24V4Z"
//                 fill="currentColor"
//               ></path>
//             </svg>
//           </div>
//           <h2 className="text-white text-lg font-bold leading-tight tracking-[-0.015em]">
//             BrandSense
//           </h2>
//         </div>
//         {/* Navigation Links */}
//         <div className="flex items-center gap-9">
//           <Link
//             className="text-white text-sm font-medium leading-normal"
//             href="/acme"
//           >
//             Acm Inc.
//           </Link>
//           <Link
//             className="text-white text-sm font-medium leading-normal"
//             href="/hackerreport"
//           >
//             Hacker Report
//           </Link>
//           <Link
//             className="text-white text-sm font-medium leading-normal"
//             href="#"
//           >
//             Dashboard
//           </Link>
//           <Link
//             className="text-white text-sm font-medium leading-normal"
//             href="#"
//           >
//             Alerts
//           </Link>
//           <Link
//             className="text-white text-sm font-medium leading-normal"
//             href="#"
//           >
//             Reports
//           </Link>
//           <Link
//             className="text-white text-sm font-medium leading-normal"
//             href="#"
//           >
//             API
//           </Link>
//           <Link
//             className="text-white text-sm font-medium leading-normal"
//             href="#"
//           >
//             Docs
//           </Link>
//         </div>
//       </div>

//       {/* Search and User Actions */}
//       <div className="flex flex-1 justify-end gap-8">
//         <SearchFieldWrapper />
//         {/* Search Bar */}
//         {/* <label className="flex flex-col min-w-40 h-10 max-w-64">
//           <div className="flex w-full flex-1 items-stretch rounded-xl h-full">
//             <div className="text-[#9dabb9] flex border-none bg-[#283139] items-center justify-center pl-4 rounded-l-xl border-r-0">
//               <svg
//                 xmlns="http://www.w3.org/2000/svg"
//                 width="24px"
//                 height="24px"
//                 fill="currentColor"
//                 viewBox="0 0 256 256"
//               >
//                 <path d="M229.66,218.34l-50.07-50.06a88.11,88.11,0,1,0-11.31,11.31l50.06,50.07a8,8,0,0,0,11.32-11.32ZM40,112a72,72,0,1,1,72,72A72.08,72.08,0,0,1,40,112Z"></path>
//               </svg>
//             </div>
//             <input
//               placeholder="Search"
//               className="form-input flex w-full min-w-0 flex-1 resize-none overflow-hidden rounded-xl text-white focus:outline-0 focus:ring-0 border-none bg-[#283139] h-full placeholder:text-[#9dabb9] px-4 rounded-l-none pl-2 text-base font-normal leading-normal"
//             />
//           </div>
//         </label> */}
//         {/* Help Button */}
//         <button className="flex max-w-[480px] cursor-pointer items-center justify-center overflow-hidden rounded-xl h-10 bg-[#283139] text-white gap-2 text-sm font-bold leading-normal tracking-[0.015em] min-w-0 px-2.5">
//           <div className="text-white">
//             <svg
//               xmlns="http://www.w3.org/2000/svg"
//               width="20px"
//               height="20px"
//               fill="currentColor"
//               viewBox="0 0 256 256"
//             >
//               <path d="M140,180a12,12,0,1,1-12-12A12,12,0,0,1,140,180ZM128,72c-22.06,0-40,16.15-40,36v4a8,8,0,0,0,16,0v-4c0-11,10.77-20,24-20s24,9,24,20-10.77,20-24,20a8,8,0,0,0-8,8v8a8,8,0,0,0,16,0v-.72c18.24-3.35,32-17.9,32-35.28C168,88.15,150.06,72,128,72Zm104,56A104,104,0,1,1,128,24,104.11,104.11,0,0,1,232,128Zm-16,0a88,88,0,1,0-88,88A88.1,88.1,0,0,0,216,128Z"></path>
//             </svg>
//           </div>
//         </button>
//         {/* Profile Picture */}
//         <div
//           className="bg-center bg-no-repeat aspect-square bg-cover rounded-full size-10"
//           style={{
//             backgroundImage:
//               'url("https://cdn.usegalileo.ai/sdxl10/1fd67c2e-5154-4a3d-90b6-fe0fc9937b84.png")',
//           }}
//         ></div>
//       </div>
//     </header>
//   );
// }
