'use client'

import BreadCrumb from "@/components/BreadCrumb";
import { usePathname } from "next/navigation"

const Banner = () => {
  const path = usePathname().split('/')[1].replace('-', ' ').toUpperCase()
  // console.log(path);

  return (
    <header className="bg-gray-50 flex-center flex-col py-8 w-full">
      <h5>{path}</h5>
      <BreadCrumb />
    </header>
  )
}

export default Banner