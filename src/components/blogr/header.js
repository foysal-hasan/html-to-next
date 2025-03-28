'use client';
import Link from 'next/link';
import BrandsenseNavLink from './brandsenseNavLink';
import { SearchFieldWrapper } from '../SearchField';

import React, { useState } from 'react';
import { FiMenu, FiX, FiSearch, FiList } from 'react-icons/fi';

export function Header() {
  return (
    <header className="flex items-center justify-between whitespace-nowrap px-10 py-3">
      {/* Logo and Brand */}
      <div className="flex items-center gap-8">
        <div className="flex items-center gap-4 text-white">
          <div className="size-4">
            <svg
              viewBox="0 0 48 48"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M13.8261 17.4264C16.7203 18.1174 20.2244 18.5217 24 18.5217C27.7756 18.5217 31.2797 18.1174 34.1739 17.4264C36.9144 16.7722 39.9967 15.2331 41.3563 14.1648L24.8486 40.6391C24.4571 41.267 23.5429 41.267 23.1514 40.6391L6.64374 14.1648C8.00331 15.2331 11.0856 16.7722 13.8261 17.4264Z"
                fill="currentColor"
              ></path>
              <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M39.998 12.236C39.9944 12.2537 39.9875 12.2845 39.9748 12.3294C39.9436 12.4399 39.8949 12.5741 39.8346 12.7175C39.8168 12.7597 39.7989 12.8007 39.7813 12.8398C38.5103 13.7113 35.9788 14.9393 33.7095 15.4811C30.9875 16.131 27.6413 16.5217 24 16.5217C20.3587 16.5217 17.0125 16.131 14.2905 15.4811C12.0012 14.9346 9.44505 13.6897 8.18538 12.8168C8.17384 12.7925 8.16216 12.767 8.15052 12.7408C8.09919 12.6249 8.05721 12.5114 8.02977 12.411C8.00356 12.3152 8.00039 12.2667 8.00004 12.2612C8.00004 12.261 8 12.2607 8.00004 12.2612C8.00004 12.2359 8.0104 11.9233 8.68485 11.3686C9.34546 10.8254 10.4222 10.2469 11.9291 9.72276C14.9242 8.68098 19.1919 8 24 8C28.8081 8 33.0758 8.68098 36.0709 9.72276C37.5778 10.2469 38.6545 10.8254 39.3151 11.3686C39.9006 11.8501 39.9857 12.1489 39.998 12.236ZM4.95178 15.2312L21.4543 41.6973C22.6288 43.5809 25.3712 43.5809 26.5457 41.6973L43.0534 15.223C43.0709 15.1948 43.0878 15.1662 43.104 15.1371L41.3563 14.1648C43.104 15.1371 43.1038 15.1374 43.104 15.1371L43.1051 15.135L43.1065 15.1325L43.1101 15.1261L43.1199 15.1082C43.1276 15.094 43.1377 15.0754 43.1497 15.0527C43.1738 15.0075 43.2062 14.9455 43.244 14.8701C43.319 14.7208 43.4196 14.511 43.5217 14.2683C43.6901 13.8679 44 13.0689 44 12.2609C44 10.5573 43.003 9.22254 41.8558 8.2791C40.6947 7.32427 39.1354 6.55361 37.385 5.94477C33.8654 4.72057 29.133 4 24 4C18.867 4 14.1346 4.72057 10.615 5.94478C8.86463 6.55361 7.30529 7.32428 6.14419 8.27911C4.99695 9.22255 3.99999 10.5573 3.99999 12.2609C3.99999 13.1275 4.29264 13.9078 4.49321 14.3607C4.60375 14.6102 4.71348 14.8196 4.79687 14.9689C4.83898 15.0444 4.87547 15.1065 4.9035 15.1529C4.91754 15.1762 4.92954 15.1957 4.93916 15.2111L4.94662 15.223L4.95178 15.2312ZM35.9868 18.996L24 38.22L12.0131 18.996C12.4661 19.1391 12.9179 19.2658 13.3617 19.3718C16.4281 20.1039 20.0901 20.5217 24 20.5217C27.9099 20.5217 31.5719 20.1039 34.6383 19.3718C35.082 19.2658 35.5339 19.1391 35.9868 18.996Z"
                fill="currentColor"
              ></path>
            </svg>
          </div>
          <h2 className="text-white text-lg font-bold leading-tight tracking-[-0.015em]">
            Blogr
          </h2>
        </div>

        {/* Navigation Links */}
        <div className="flex items-center gap-9">
          <BrandsenseNavLink />
          <Link
            className="text-white text-sm font-medium leading-normal"
            href="#"
          >
            Technology
          </Link>
          <Link
            className="text-white text-sm font-medium leading-normal"
            href="#"
          >
            Business
          </Link>
          <Link
            className="text-white text-sm font-medium leading-normal"
            href="#"
          >
            Design
          </Link>
          <Link
            className="text-white text-sm font-medium leading-normal"
            href="#"
          >
            Culture
          </Link>
          <Link
            className="text-white text-sm font-medium leading-normal"
            href="#"
          >
            Science
          </Link>
          <Link
            className="text-white text-sm font-medium leading-normal"
            href="#"
          >
            Politics
          </Link>
        </div>
      </div>

      {/* Search and User Actions */}
      <div className="flex flex-1 justify-end gap-8">
        {/* Search Bar */}
        {/* <label className="flex flex-col min-w-40 h-10 max-w-64">
          <div className="flex w-full flex-1 items-stretch rounded-xl h-full">
            <div className="text-[#9dabb9] flex border-none bg-[#283139] items-center justify-center pl-4 rounded-l-xl border-r-0">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24px"
                height="24px"
                fill="currentColor"
                viewBox="0 0 256 256"
              >
                <path d="M229.66,218.34l-50.07-50.06a88.11,88.11,0,1,0-11.31,11.31l50.06,50.07a8,8,0,0,0,11.32-11.32ZM40,112a72,72,0,1,1,72,72A72.08,72.08,0,0,1,40,112Z"></path>
              </svg>
            </div>
            <input
              placeholder="Search"
              className="form-input flex w-full min-w-0 flex-1 resize-none overflow-hidden rounded-xl text-white focus:outline-0 focus:ring-0 border-none bg-[#283139] h-full placeholder:text-[#9dabb9] px-4 rounded-l-none pl-2 text-base font-normal leading-normal"
            />


          </div>
        </label> */}

        <SearchFieldWrapper />
        <div className="flex gap-2">
          {/* <button className="flex max-w-[480px] cursor-pointer items-center justify-center overflow-hidden rounded-xl h-10 bg-[#283139] text-white gap-2 text-sm font-bold leading-normal tracking-[0.015em] min-w-0 px-2.5">
            <div
              className="text-white"
              data-icon="MagnifyingGlass"
              data-size="20px"
              data-weight="regular"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="20px"
                height="20px"
                fill="currentColor"
                viewBox="0 0 256 256"
              >
                <path d="M229.66,218.34l-50.07-50.06a88.11,88.11,0,1,0-11.31,11.31l50.06,50.07a8,8,0,0,0,11.32-11.32ZM40,112a72,72,0,1,1,72,72A72.08,72.08,0,0,1,40,112Z"></path>
              </svg>
            </div>
          </button> */}
          <button className="flex max-w-[480px] cursor-pointer items-center justify-center overflow-hidden rounded-xl h-10 bg-[#283139] text-white gap-2 text-sm font-bold leading-normal tracking-[0.015em] min-w-0 px-2.5">
            <div
              className="text-white"
              data-icon="List"
              data-size="20px"
              data-weight="regular"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="20px"
                height="20px"
                fill="currentColor"
                viewBox="0 0 256 256"
              >
                <path d="M224,128a8,8,0,0,1-8,8H40a8,8,0,0,1,0-16H216A8,8,0,0,1,224,128ZM40,72H216a8,8,0,0,0,0-16H40a8,8,0,0,0,0,16ZM216,184H40a8,8,0,0,0,0,16H216a8,8,0,0,0,0-16Z"></path>
              </svg>
            </div>
          </button>
        </div>
        <div
          className="bg-center bg-no-repeat aspect-square bg-cover rounded-full size-10"
          style={{
            backgroundImage:
              "url('https://cdn.usegalileo.ai/sdxl10/818c17b7-3930-4924-954f-9c3b818318da.png')",
          }}
        ></div>
      </div>
    </header>
  );
}

// export function BlogrHeader() {
//   return (
//     <header className="flex items-center justify-between whitespace-nowrap border-b border-solid border-b-[#e7edf3] px-10 py-3">
//       <div className="flex items-center gap-8">
//         <div className="flex items-center gap-4 text-white">
//           <div className="size-4">
//             <svg
//               viewBox="0 0 48 48"
//               fill="none"
//               xmlns="http://www.w3.org/2000/svg"
//             >
//               <path
//                 d="M13.8261 17.4264C16.7203 18.1174 20.2244 18.5217 24 18.5217C27.7756 18.5217 31.2797 18.1174 34.1739 17.4264C36.9144 16.7722 39.9967 15.2331 41.3563 14.1648L24.8486 40.6391C24.4571 41.267 23.5429 41.267 23.1514 40.6391L6.64374 14.1648C8.00331 15.2331 11.0856 16.7722 13.8261 17.4264Z"
//                 fill="currentColor"
//               ></path>
//               <path
//                 fillRule="evenodd"
//                 clipRule="evenodd"
//                 d="M39.998 12.236C39.9944 12.2537 39.9875 12.2845 39.9748 12.3294C39.9436 12.4399 39.8949 12.5741 39.8346 12.7175C39.8168 12.7597 39.7989 12.8007 39.7813 12.8398C38.5103 13.7113 35.9788 14.9393 33.7095 15.4811C30.9875 16.131 27.6413 16.5217 24 16.5217C20.3587 16.5217 17.0125 16.131 14.2905 15.4811C12.0012 14.9346 9.44505 13.6897 8.18538 12.8168C8.17384 12.7925 8.16216 12.767 8.15052 12.7408C8.09919 12.6249 8.05721 12.5114 8.02977 12.411C8.00356 12.3152 8.00039 12.2667 8.00004 12.2612C8.00004 12.261 8 12.2607 8.00004 12.2612C8.00004 12.2359 8.0104 11.9233 8.68485 11.3686C9.34546 10.8254 10.4222 10.2469 11.9291 9.72276C14.9242 8.68098 19.1919 8 24 8C28.8081 8 33.0758 8.68098 36.0709 9.72276C37.5778 10.2469 38.6545 10.8254 39.3151 11.3686C39.9006 11.8501 39.9857 12.1489 39.998 12.236ZM4.95178 15.2312L21.4543 41.6973C22.6288 43.5809 25.3712 43.5809 26.5457 41.6973L43.0534 15.223C43.0709 15.1948 43.0878 15.1662 43.104 15.1371L41.3563 14.1648C43.104 15.1371 43.1038 15.1374 43.104 15.1371L43.1051 15.135L43.1065 15.1325L43.1101 15.1261L43.1199 15.1082C43.1276 15.094 43.1377 15.0754 43.1497 15.0527C43.1738 15.0075 43.2062 14.9455 43.244 14.8701C43.319 14.7208 43.4196 14.511 43.5217 14.2683C43.6901 13.8679 44 13.0689 44 12.2609C44 10.5573 43.003 9.22254 41.8558 8.2791C40.6947 7.32427 39.1354 6.55361 37.385 5.94477C33.8654 4.72057 29.133 4 24 4C18.867 4 14.1346 4.72057 10.615 5.94478C8.86463 6.55361 7.30529 7.32428 6.14419 8.27911C4.99695 9.22255 3.99999 10.5573 3.99999 12.2609C3.99999 13.1275 4.29264 13.9078 4.49321 14.3607C4.60375 14.6102 4.71348 14.8196 4.79687 14.9689C4.83898 15.0444 4.87547 15.1065 4.9035 15.1529C4.91754 15.1762 4.92954 15.1957 4.93916 15.2111L4.94662 15.223L4.95178 15.2312ZM35.9868 18.996L24 38.22L12.0131 18.996C12.4661 19.1391 12.9179 19.2658 13.3617 19.3718C16.4281 20.1039 20.0901 20.5217 24 20.5217C27.9099 20.5217 31.5719 20.1039 34.6383 19.3718C35.082 19.2658 35.5339 19.1391 35.9868 18.996Z"
//                 fill="currentColor"
//               ></path>
//             </svg>
//           </div>
//           <h2 className="text-[#0e141b] text-lg font-bold leading-tight tracking-[-0.015em]">
//             Blogr
//           </h2>
//         </div>
//         <div className="flex items-center gap-9">
//           <Link
//             className="text-[#0e141b] text-sm font-medium leading-normal"
//             href="#"
//           >
//             Technology
//           </Link>
//           <Link
//             className="text-[#0e141b] text-sm font-medium leading-normal"
//             href="#"
//           >
//             Business
//           </Link>
//           <Link
//             className="text-[#0e141b] text-sm font-medium leading-normal"
//             href="#"
//           >
//             Design
//           </Link>
//           <Link
//             className="text-[#0e141b] text-sm font-medium leading-normal"
//             href="#"
//           >
//             Culture
//           </Link>
//           <Link
//             className="text-[#0e141b] text-sm font-medium leading-normal"
//             href="#"
//           >
//             Science
//           </Link>
//           <Link
//             className="text-[#0e141b] text-sm font-medium leading-normal"
//             href="#"
//           >
//             Politics
//           </Link>
//         </div>
//       </div>
//       <div className="flex flex-1 justify-end gap-8">
//         <label className="flex flex-col min-w-40 !h-10 max-w-64">
//           <div className="flex w-full flex-1 items-stretch rounded-xl h-full">
//             <div
//               className="text-[#4e7397] flex border-none bg-[#e7edf3] items-center justify-center pl-4 rounded-l-xl border-r-0"
//               data-icon="MagnifyingGlass"
//               data-size="24px"
//               data-weight="regular"
//             >
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
//               className="form-input flex w-full min-w-0 flex-1 resize-none overflow-hidden rounded-xl text-[#0e141b] focus:outline-0 focus:ring-0 border-none bg-[#e7edf3] focus:border-none h-full placeholder:text-[#4e7397] px-4 rounded-l-none border-l-0 pl-2 text-base font-normal leading-normal"
//               defaultValue={''}
//             />
//           </div>
//         </label>
//         <div className="flex gap-2">
//           <button className="flex max-w-[480px] cursor-pointer items-center justify-center overflow-hidden rounded-xl h-10 bg-[#e7edf3] text-[#0e141b] gap-2 text-sm font-bold leading-normal tracking-[0.015em] min-w-0 px-2.5">
//             <div
//               className="text-[#0e141b]"
//               data-icon="MagnifyingGlass"
//               data-size="20px"
//               data-weight="regular"
//             >
//               <svg
//                 xmlns="http://www.w3.org/2000/svg"
//                 width="20px"
//                 height="20px"
//                 fill="currentColor"
//                 viewBox="0 0 256 256"
//               >
//                 <path d="M229.66,218.34l-50.07-50.06a88.11,88.11,0,1,0-11.31,11.31l50.06,50.07a8,8,0,0,0,11.32-11.32ZM40,112a72,72,0,1,1,72,72A72.08,72.08,0,0,1,40,112Z"></path>
//               </svg>
//             </div>
//           </button>
//           <button className="flex max-w-[480px] cursor-pointer items-center justify-center overflow-hidden rounded-xl h-10 bg-[#e7edf3] text-[#0e141b] gap-2 text-sm font-bold leading-normal tracking-[0.015em] min-w-0 px-2.5">
//             <div
//               className="text-[#0e141b]"
//               data-icon="List"
//               data-size="20px"
//               data-weight="regular"
//             >
//               <svg
//                 xmlns="http://www.w3.org/2000/svg"
//                 width="20px"
//                 height="20px"
//                 fill="currentColor"
//                 viewBox="0 0 256 256"
//               >
//                 <path d="M224,128a8,8,0,0,1-8,8H40a8,8,0,0,1,0-16H216A8,8,0,0,1,224,128ZM40,72H216a8,8,0,0,0,0-16H40a8,8,0,0,0,0,16ZM216,184H40a8,8,0,0,0,0,16H216a8,8,0,0,0,0-16Z"></path>
//               </svg>
//             </div>
//           </button>
//         </div>
//         <div
//           className="bg-center bg-no-repeat aspect-square bg-cover rounded-full size-10"
//           style={{
//             backgroundImage:
//               "url('https://cdn.usegalileo.ai/sdxl10/818c17b7-3930-4924-954f-9c3b818318da.png')",
//           }}
//         ></div>
//       </div>
//     </header>
//   );
// }

function App() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <header className="relative  px-4 py-3 md:px-6 lg:px-10">
      <div className="flex items-center justify-between">
        {/* Logo and Brand */}
        <div className="flex items-center gap-4 md:gap-8">
          <div className="flex items-center gap-4 text-white">
            <div className="size-4">
              <svg
                viewBox="0 0 48 48"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M13.8261 17.4264C16.7203 18.1174 20.2244 18.5217 24 18.5217C27.7756 18.5217 31.2797 18.1174 34.1739 17.4264C36.9144 16.7722 39.9967 15.2331 41.3563 14.1648L24.8486 40.6391C24.4571 41.267 23.5429 41.267 23.1514 40.6391L6.64374 14.1648C8.00331 15.2331 11.0856 16.7722 13.8261 17.4264Z"
                  fill="currentColor"
                ></path>
                <path
                  fillRule="evenodd"
                  clipRule="evenodd"
                  d="M39.998 12.236C39.9944 12.2537 39.9875 12.2845 39.9748 12.3294C39.9436 12.4399 39.8949 12.5741 39.8346 12.7175C39.8168 12.7597 39.7989 12.8007 39.7813 12.8398C38.5103 13.7113 35.9788 14.9393 33.7095 15.4811C30.9875 16.131 27.6413 16.5217 24 16.5217C20.3587 16.5217 17.0125 16.131 14.2905 15.4811C12.0012 14.9346 9.44505 13.6897 8.18538 12.8168C8.17384 12.7925 8.16216 12.767 8.15052 12.7408C8.09919 12.6249 8.05721 12.5114 8.02977 12.411C8.00356 12.3152 8.00039 12.2667 8.00004 12.2612C8.00004 12.261 8 12.2607 8.00004 12.2612C8.00004 12.2359 8.0104 11.9233 8.68485 11.3686C9.34546 10.8254 10.4222 10.2469 11.9291 9.72276C14.9242 8.68098 19.1919 8 24 8C28.8081 8 33.0758 8.68098 36.0709 9.72276C37.5778 10.2469 38.6545 10.8254 39.3151 11.3686C39.9006 11.8501 39.9857 12.1489 39.998 12.236ZM4.95178 15.2312L21.4543 41.6973C22.6288 43.5809 25.3712 43.5809 26.5457 41.6973L43.0534 15.223C43.0709 15.1948 43.0878 15.1662 43.104 15.1371L41.3563 14.1648C43.104 15.1371 43.1038 15.1374 43.104 15.1371L43.1051 15.135L43.1065 15.1325L43.1101 15.1261L43.1199 15.1082C43.1276 15.094 43.1377 15.0754 43.1497 15.0527C43.1738 15.0075 43.2062 14.9455 43.244 14.8701C43.319 14.7208 43.4196 14.511 43.5217 14.2683C43.6901 13.8679 44 13.0689 44 12.2609C44 10.5573 43.003 9.22254 41.8558 8.2791C40.6947 7.32427 39.1354 6.55361 37.385 5.94477C33.8654 4.72057 29.133 4 24 4C18.867 4 14.1346 4.72057 10.615 5.94478C8.86463 6.55361 7.30529 7.32428 6.14419 8.27911C4.99695 9.22255 3.99999 10.5573 3.99999 12.2609C3.99999 13.1275 4.29264 13.9078 4.49321 14.3607C4.60375 14.6102 4.71348 14.8196 4.79687 14.9689C4.83898 15.0444 4.87547 15.1065 4.9035 15.1529C4.91754 15.1762 4.92954 15.1957 4.93916 15.2111L4.94662 15.223L4.95178 15.2312ZM35.9868 18.996L24 38.22L12.0131 18.996C12.4661 19.1391 12.9179 19.2658 13.3617 19.3718C16.4281 20.1039 20.0901 20.5217 24 20.5217C27.9099 20.5217 31.5719 20.1039 34.6383 19.3718C35.082 19.2658 35.5339 19.1391 35.9868 18.996Z"
                  fill="currentColor"
                ></path>
              </svg>
            </div>
            <h2 className="text-white text-lg font-bold leading-tight tracking-[-0.015em]">
              Blogr
            </h2>
          </div>

          {/* Navigation Links - Desktop */}
          {/* <nav className="hidden lg:flex items-center gap-4 lg:gap-9">
            <BrandsenseNavLink />
            <Link
              className="text-white text-sm font-medium leading-normal hover:text-gray-300 transition-colors"
              href="#"
            >
              Technology
            </Link>
            <Link
              className="text-white text-sm font-medium leading-normal hover:text-gray-300 transition-colors"
              href="#"
            >
              Business
            </Link>
            <Link
              className="text-white text-sm font-medium leading-normal hover:text-gray-300 transition-colors"
              href="#"
            >
              Design
            </Link>
            <Link
              className="text-white text-sm font-medium leading-normal hover:text-gray-300 transition-colors"
              href="#"
            >
              Culture
            </Link>
            <Link
              className="text-white text-sm font-medium leading-normal hover:text-gray-300 transition-colors"
              href="#"
            >
              Science
            </Link>
            <Link
              className="text-white text-sm font-medium leading-normal hover:text-gray-300 transition-colors"
              href="#"
            >
              Politics
            </Link>
          </nav> */}
        </div>

        <div className="w-full max-w-[700px] hidden md:block mx-4">
          <SearchFieldWrapper />
        </div>

        {/* Search and User Actions */}
        <div className="flex items-center gap-4">
          {/* Search Bar - Desktop
          <div className="hidden md:block">
            <SearchFieldWrapper />
          </div> */}

          {/* Action Buttons - Desktop */}
          <div className="hidden md:flex gap-2">
            <button className="flex items-center justify-center rounded-xl h-10 bg-[#283139] text-white px-2.5 hover:bg-[#343f49] transition-colors">
              <FiList size={20} />
            </button>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={toggleMenu}
            className="md:hidden text-white p-2 hover:bg-[#283139] rounded-lg transition-colors"
          >
            {isMenuOpen ? <FiX size={24} /> : <FiMenu size={24} />}
          </button>

          {/* User Profile */}
          <div
            className="bg-center bg-no-repeat aspect-square bg-cover rounded-full size-8 md:size-10"
            style={{
              backgroundImage:
                "url('https://cdn.usegalileo.ai/sdxl10/818c17b7-3930-4924-954f-9c3b818318da.png')",
            }}
          />
        </div>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="absolute top-full left-0 right-0 bg-[#0e141b] border-t border-[#283139] p-4 md:hidden">
          <div className="space-y-4">
            {/* Mobile Search */}
            <div className="pb-4 border-b border-[#283139]">
              <SearchFieldWrapper />
            </div>

            {/* Mobile Navigation */}
            <nav className="flex flex-col gap-4">
              <BrandsenseNavLink />
              <Link
                className="text-white text-sm font-medium leading-normal hover:text-gray-300 transition-colors"
                href="#"
              >
                Technology
              </Link>
              <Link
                className="text-white text-sm font-medium leading-normal hover:text-gray-300 transition-colors"
                href="#"
              >
                Business
              </Link>
              <Link
                className="text-white text-sm font-medium leading-normal hover:text-gray-300 transition-colors"
                href="#"
              >
                Design
              </Link>
              <Link
                className="text-white text-sm font-medium leading-normal hover:text-gray-300 transition-colors"
                href="#"
              >
                Culture
              </Link>
              <Link
                className="text-white text-sm font-medium leading-normal hover:text-gray-300 transition-colors"
                href="#"
              >
                Science
              </Link>
              <Link
                className="text-white text-sm font-medium leading-normal hover:text-gray-300 transition-colors"
                href="#"
              >
                Politics
              </Link>
            </nav>

            {/* Mobile Action Buttons */}
            <div className="flex gap-2 pt-4 border-t border-[#283139]">
              <button className="flex-1 flex items-center justify-center rounded-xl h-10 bg-[#283139] text-white hover:bg-[#343f49] transition-colors">
                <FiList size={20} className="mr-2" />
                Menu
              </button>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}

export default App;
