import React from 'react'

export default function SectionLoader({ sectionTitle }) {
  return (
    <div className="gap-1 px-6 flex flex-1 justify-center items-start py-5">
      <div className="flex flex-col gap-10 w-[80%]">
        <div className="flex flex-col gap-4 mb-4 justify-end flex-1 items-center">
          <h1 className="text-white mr-auto text-3xl  ml-3">{sectionTitle}</h1>
          <div className="flex items-center justify-center h-96">
            <div className="flex flex-col items-center gap-2">
              <div className="w-8 h-8 border-4 border-gray-300 border-t-white rounded-full animate-spin"></div>
              <span className="text-white">Loading...</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
