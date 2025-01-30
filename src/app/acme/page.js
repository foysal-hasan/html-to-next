import BlogPostsTable from "@/components/acme/BlogPostsTable";
import Link from "next/link";

export default function Acme() {
  return (
    <div className="px-40 flex flex-1 justify-center py-5">
      <div className="layout-content-container flex flex-col max-w-[960px] flex-1">
        <div className="flex flex-wrap justify-between gap-3 p-4">
          <p className="text-white tracking-light text-[32px] font-bold leading-tight min-w-72">
            Blog posts
          </p>
          <button className="flex min-w-[84px] max-w-[480px] cursor-pointer items-center justify-center overflow-hidden rounded-xl h-8 px-4 bg-[#243647] text-white text-sm font-medium leading-normal">
            <span className="truncate">New post</span>
          </button>
        </div>
        <div className="px-4 py-3">
          <label className="flex flex-col min-w-40 h-12 w-full">
            <div className="flex w-full flex-1 items-stretch rounded-xl h-full">
              <div
                className="text-[#93adc8] flex border-none bg-[#243647] items-center justify-center pl-4 rounded-l-xl border-r-0"
                data-icon="MagnifyingGlass"
                data-size="24px"
                data-weight="regular"
              >
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
                placeholder="Search posts by title or author"
                className="form-input flex w-full min-w-0 flex-1 resize-none overflow-hidden rounded-xl text-white focus:outline-0 focus:ring-0 border-none bg-[#243647] focus:border-none h-full placeholder:text-[#93adc8] px-4 rounded-l-none border-l-0 pl-2 text-base font-normal leading-normal"
                defaultValue=""
              />
            </div>
          </label>
        </div>
        <div className="flex gap-3 p-3 flex-wrap pr-4">
          <div className="flex h-8 shrink-0 items-center justify-center gap-x-2 rounded-xl bg-[#243647] pl-4 pr-4">
            <p className="text-white text-sm font-medium leading-normal">
              All authors
            </p>
          </div>
          <div className="flex h-8 shrink-0 items-center justify-center gap-x-2 rounded-xl bg-[#243647] pl-4 pr-4">
            <p className="text-white text-sm font-medium leading-normal">
              All post types
            </p>
          </div>
          <div className="flex h-8 shrink-0 items-center justify-center gap-x-2 rounded-xl bg-[#243647] pl-4 pr-4">
            <p className="text-white text-sm font-medium leading-normal">
              All tags
            </p>
          </div>
          <div className="flex h-8 shrink-0 items-center justify-center gap-x-2 rounded-xl bg-[#243647] pl-4 pr-4">
            <p className="text-white text-sm font-medium leading-normal">
              Sort by date
            </p>
          </div>
        </div>
        <div className="px-4 py-3 @container">
          <div className="flex overflow-hidden rounded-xl border border-[#344d65] bg-[#111a22]">
            <BlogPostsTable />
          </div>
        </div>
        <div className="flex items-center justify-center p-4">
          <Link href="#" className="flex size-10 items-center justify-center">
            <div
              className="text-white"
              data-icon="CaretLeft"
              data-size="18px"
              data-weight="regular"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="18px"
                height="18px"
                fill="currentColor"
                viewBox="0 0 256 256"
              >
                <path d="M165.66,202.34a8,8,0,0,1-11.32,11.32l-80-80a8,8,0,0,1,0-11.32l80-80a8,8,0,0,1,11.32,11.32L91.31,128Z"></path>
              </svg>
            </div>
          </Link>
          <Link
            className="text-sm font-bold leading-normal tracking-[0.015em] flex size-10 items-center justify-center text-white rounded-full bg-[#243647]"
            href="#"
          >
            1
          </Link>
          <Link
            className="text-sm font-normal leading-normal flex size-10 items-center justify-center text-white rounded-full"
            href="#"
          >
            2
          </Link>
          <Link
            className="text-sm font-normal leading-normal flex size-10 items-center justify-center text-white rounded-full"
            href="#"
          >
            3
          </Link>
          <Link
            className="text-sm font-normal leading-normal flex size-10 items-center justify-center text-white rounded-full"
            href="#"
          >
            4
          </Link>
          <Link href="#" className="flex size-10 items-center justify-center">
            <div
              className="text-white"
              data-icon="CaretRight"
              data-size="18px"
              data-weight="regular"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="18px"
                height="18px"
                fill="currentColor"
                viewBox="0 0 256 256"
              >
                <path d="M181.66,133.66l-80,80a8,8,0,0,1-11.32-11.32L164.69,128,90.34,53.66a8,8,0,0,1,11.32-11.32l80,80A8,8,0,0,1,181.66,133.66Z"></path>
              </svg>
            </div>
          </Link>
        </div>
        <div className="flex px-4 py-3 justify-end">
          <button className="flex min-w-[84px] max-w-[480px] cursor-pointer items-center justify-center overflow-hidden rounded-xl h-10 px-4 bg-[#243647] text-white text-sm font-bold leading-normal tracking-[0.015em]">
            <span className="truncate">Export to CSV</span>
          </button>
        </div>
      </div>
    </div>
  );
}
