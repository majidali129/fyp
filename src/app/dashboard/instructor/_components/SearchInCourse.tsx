'use client'

import { Input } from "@/components/ui/input"
import { usePathname, useRouter, useSearchParams } from "next/navigation"
import { FormEvent, useCallback, useState } from "react"
import { GoSearch } from "react-icons/go"

const SearchInCourse = () => {
    const [search, setSearch] = useState<string>('')
    const searchParams = useSearchParams()
    const pathname = usePathname()
    const router = useRouter()


    const onSubmit = useCallback((e:FormEvent<HTMLFormElement>) =>{
        e.preventDefault()
        const params = new URLSearchParams(searchParams.toString())
        params.set('search', search)

        router.push(`${pathname}?${params.toString()}`, {scroll: false})
    }, [pathname, router, search, searchParams])
  return (
    <form onSubmit={onSubmit} className="bg-white px-2.5 grid grid-cols-[25px_auto] items-center rounded-sm">
        <GoSearch className="w-5 h-5" />
      <Input
        type="text"
        className="ring-0 border-none !bg-transparent outline-none py-2.5"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        placeholder="Search in your courses..."
      />
    </form>
  )
}

export default SearchInCourse