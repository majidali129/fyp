'use client'

import BreadCrumb from "@/components/BreadCrumb";
import { usePathname } from "next/navigation"

const Banner = () => {
  const pathname = usePathname()
  const currentPath = pathname.slice(1,).split('-').join(' ').toUpperCase();
  // console.log(pathname.slice(1,).split('-').join(' ').toUpperCase())


  return (
    <header className="bg-gray-50 flex-center flex-col py-8 w-full">
      <h5>{currentPath}</h5>
      <BreadCrumb />
    </header>
  )
}

export default Banner