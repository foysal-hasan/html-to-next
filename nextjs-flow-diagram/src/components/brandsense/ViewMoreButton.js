'use client';
import { useAppSelector } from '@/lib/hooks';
import Link from 'next/link';
import CustomButton from './CustomButton';

export default function ViewMoreButton() {
  const searchQuery = useAppSelector((state) => state.search.searchQuery);
  console.log('search: ', searchQuery);

  return (
    <Link
      className="text-white text-sm font-medium leading-normal mt-6"
      href={searchQuery == '' ? '/blogr' : `/blogr?domain=${searchQuery}`}
    >
      <CustomButton text="View More" />
    </Link>
  );
}
