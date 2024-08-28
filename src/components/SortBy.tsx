"use client";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from "@/components/ui/select";
import { usePathname,useRouter, useSearchParams } from "next/navigation";
import { useCallback } from "react";
const SelectItemsList = [
  {
    name: "Rating",
    value: "rating"
  },
  {
    name: "Price",
    value: "price"
  },
  {
    name: "Students",
    value: "students"
  },
  {
    name: "Category",
    value: "category"
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

const SortBy = () => {
    const router = useRouter();
    const searchParams = useSearchParams();
    const pathname = usePathname();

    // const onFilterChange = (value: string) => {
    //     const current = new URLSearchParams(Array.from(searchParams.entries()));
    //     if(!value){
    //         current.delete('sort')
    //     }else{
    //         current.set('sort', value)
    //     }

    //     // CAST TO STRING
    //     const filter = current.toString()
    //     const query = filter ? `?${filter}`: '';
    //     router.push(`${pathname}${query}`)
    // };

    const onFilterChange = useCallback((value: string) => {
        const params = new URLSearchParams(searchParams.toString())
        params.set('sort', value)

        router.push(`${pathname}?${params.toString()}`, {scroll: false})
    }, [pathname, router, searchParams])

  return (
    <Select onValueChange={onFilterChange}>
      <SelectTrigger className="w-[180px] ">
        <SelectValue placeholder="Rating" />
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

export default SortBy;
