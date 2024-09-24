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

type SelectItemsType = Array<{label: string, value: string}>

const SelectFilter = ({selectItems, filterKey, className}: {selectItems: SelectItemsType, filterKey: string, className?:string}) => {
    const router = useRouter();
    const searchParams = useSearchParams();
    const pathname = usePathname();

    const onFilterChange = useCallback((value: string) => {
        const params = new URLSearchParams(searchParams.toString())
        // params.set('sort', value)
        params.set(filterKey, value)

        router.push(`${pathname}?${params.toString()}`, {scroll: false})
    }, [pathname, router, searchParams, filterKey])

  return (
    <Select onValueChange={onFilterChange}>
      <SelectTrigger className={`w-[180px] rounded-sm ${className}`}>
        <SelectValue placeholder={selectItems[0].label} />
      </SelectTrigger>
      <SelectContent>
        {selectItems.map((item) => (
          <SelectItem value={item.value} key={item.value}>
            {item.label}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
};

export default SelectFilter;
