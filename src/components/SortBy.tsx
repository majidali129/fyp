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
    name: "Ascending",
    value: "asc"
  },
  {
    name: "Descending",
    value: "desc"
  },
  {
    name: "Latest",
    value: "latest"
  }
];

const SortBy = () => {
    const router = useRouter();
    const searchParams = useSearchParams();
    const pathname = usePathname();

    const onFilterChange = useCallback((value: string) => {
        const params = new URLSearchParams(searchParams.toString())
        params.set('sort', value)

        router.push(`${pathname}?${params.toString()}`, {scroll: false})
    }, [pathname, router, searchParams])

  return (
    <Select onValueChange={onFilterChange}>
      <SelectTrigger className="w-[180px] ">
        <SelectValue placeholder="Latest" />
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
