'use client';
import { useAppSelector } from '@/lib/hooks';
import Link from 'next/link';
import CustomButton from './CustomButton';

export default function ViewMoreButton() {
  const searchQuery = useAppSelector((state) => state.search.searchQuery);
  // console.log('search: ', searchQuery);

  // extract keywords from domains with .com, .ru, etc.
  const keywords = searchQuery.split(',').map((domain) => {
    return domain.split('.')[0];
  });
  console.log('keywords: ', keywords);

  return (
    <Link
      className="text-white text-sm font-medium leading-normal mt-6"
      href={
        keywords.length == 0
          ? '/blogr'
          : `/blogr?keywords=${keywords.join(',')}`
      }
    >
      <CustomButton text="View More" />
    </Link>
  );
}
