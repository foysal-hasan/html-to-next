import React from 'react';

export default function CustomButton({ text, onClick }) {
  return (
    <button
      onClick={onClick}
      className="flex min-w-[84px] max-w-[480px] cursor-pointer items-center justify-center overflow-hidden rounded-md h-8 px-8 py-5 bg-[#283139]  text-white text-sm font-medium leading-normal w-fit"
    >
      {text}
    </button>
  );
}
