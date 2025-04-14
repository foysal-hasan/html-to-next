'use client'
import { useAppSelector } from "@/lib/hooks"
import Link from "next/link"

export default function BrandsenseNavLink() {
  const searchQuery = useAppSelector(state => state.search.searchQuery)

  return (
    <Link
    className="text-white text-sm font-medium leading-normal"
    href={searchQuery == '' ? '/brandsense': `/brandsense?domain=${searchQuery}`}
  >
Brandsense
</Link>
  )
}
