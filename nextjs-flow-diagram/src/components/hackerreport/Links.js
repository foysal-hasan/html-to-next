import Link from "next/link";
import ApiNotWorking from "../ApiNotWorking";
import SectionTitle from "./SectionTitle";

function Links({ links, error }) {
  // console.log(links);

  return (
    <>
      <SectionTitle>Links</SectionTitle>
      {error && <ApiNotWorking />}
      {links?.length < 0 && <h1>Links not found</h1>}
      {links?.map((link, index) => (
        <div
          className="flex items-center gap-4 bg-[#131416] px-4 min-h-[72px] py-2"
          key={index}
        >
          <div
            className="text-white flex items-center justify-center rounded-lg bg-[#2c3035] shrink-0 size-12"
            data-icon="Link"
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
              <path d="M137.54,186.36a8,8,0,0,1,0,11.31l-9.94,10A56,56,0,0,1,48.38,128.4L72.5,104.28A56,56,0,0,1,149.31,102a8,8,0,1,1-10.64,12,40,40,0,0,0-54.85,1.63L59.7,139.72a40,40,0,0,0,56.58,56.58l9.94-9.94A8,8,0,0,1,137.54,186.36Zm70.08-138a56.08,56.08,0,0,0-79.22,0l-9.94,9.95a8,8,0,0,0,11.32,11.31l9.94-9.94a40,40,0,0,1,56.58,56.58L172.18,140.4A40,40,0,0,1,117.33,142,8,8,0,1,0,106.69,154a56,56,0,0,0,76.81-2.26l24.12-24.12A56.08,56.08,0,0,0,207.62,48.38Z"></path>
            </svg>
          </div>
          <div className="flex flex-col justify-center">
            <Link href={link.url}>
              <p className="text-white text-base font-medium leading-normal line-clamp-1">
                {link.title}
              </p>
              <p className="text-[#a3abb2] text-sm font-normal leading-normal line-clamp-2">
                {link.url}
              </p>
            </Link>
          </div>
        </div>
      ))}
    </>
  );
}

export default Links;
