'use client'

import { Input } from "@/components/ui/input";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue
  } from "@/components/ui/select";
  import { usePathname,useRouter, useSearchParams } from "next/navigation";
  import { FormEvent, useCallback, useState } from "react";
import { GoSearch } from "react-icons/go";

const Filters = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">

    <div className="flex gap-y-1.5 flex-col ">
    <p>Search:</p>
    <SearchLecture />
    </div>
    <div className="flex gap-y-1.5 flex-col">
        <p>Sort by:</p>
        <SortBy />
    </div>
    <div className="flex gap-y-1.5 flex-col">
        <p>Status:</p>
        <FilterByStatus />
    </div>
  </div>
  )
}

export default Filters

const SelectItemsList = [
    {
      name: "Latest",
      value: "latest"
    },
    {
      name: "Ascending",
      value: "asc"
    },
    {
      name: "Descending",
      value: "desc"
    }
  ];
const StatusItems = [
    {
      name: "All",
      value: "all"
    },
    {
      name: "Complete",
      value: "complete"
    },
    {
      name: "In-Progress",
      value: "in-Progress"
    }
  ];

  function SortBy () {
      const router = useRouter();
      const searchParams = useSearchParams();
      const pathname = usePathname();

      const onFilterChange = useCallback((value: string) => {
          const params = new URLSearchParams(searchParams.toString())
          params.set('sort', value)

          router.push(`${pathname}?${params.toString()}`, {scroll: false})
      }, [pathname, router, searchParams])

    return (
      <Select onValueChange={onFilterChange} defaultValue="latest">
        <SelectTrigger defaultChecked>
          <SelectValue />
        </SelectTrigger>
        <SelectContent>
          {SelectItemsList.map((item) => (
            <SelectItem value={item.value} key={item.value}>
              {item.name}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    );
  };

  function FilterByStatus () {
      const router = useRouter();
      const searchParams = useSearchParams();
      const pathname = usePathname();

      const onFilterChange = useCallback((value: string) => {
          const params = new URLSearchParams(searchParams.toString())
          params.set('status', value)

          router.push(`${pathname}?${params.toString()}`, {scroll: false})
      }, [pathname, router, searchParams])

    return (
      <Select onValueChange={onFilterChange} defaultValue="all">
        <SelectTrigger defaultChecked={true}>
          <SelectValue />
        </SelectTrigger>
        <SelectContent>
          {StatusItems.map((item) => (
            <SelectItem value={item.value} key={item.value}>
              {item.name}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    );
  };

  function SearchLecture () {
    const [search, setSearch] = useState<string>("");
  const params = new URLSearchParams();
  const pathname = usePathname();
  const router = useRouter();

  const onSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (!search) return;
    params.set("search", search);
    router.push(`${pathname}?${params.toString()}`, {scroll: false})
    setSearch("");
  };
  return (
    <form
      onSubmit={onSubmit}
      action=""
      className="flex-between border px-3  border-gray-200 w-full md:py-0.5"
    >
      <GoSearch className="md:w-6 md:h-6 w-5 h-5" />
      <Input
        type="text"
        className="ring-0 border-none !bg-transparent outline-none"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        placeholder="Search in your courses..."
      />
    </form>
  );
  }