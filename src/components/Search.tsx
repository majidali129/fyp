"use client";

import { ComponentProps, FormEvent, useState } from "react";
import { Input } from "./ui/input";
import { GoSearch } from "react-icons/go";
import { useRouter } from "next/navigation";
import path from "path";

interface SearchInputProps extends ComponentProps<"input"> {
  label?: string;
}

const Search = ({ label, ...props }: SearchInputProps) => {
  const [search, setSearch] = useState<string>("");
  const params = new URLSearchParams();
  const router = useRouter();

  const onSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (!search) return;
    params.set("search", search);
    router.replace(`/courses?${params.toString()}`);
    setSearch("");
  };
  return (
    <form
      onSubmit={onSubmit}
      action=""
      className="flex-between border px-3  border-gray-200 max-w-sm w-full rounded-full"
    >
      <GoSearch className="md:w-6 md:h-6 w-5 h-5" />
      <Input
        type="text"
        className="ring-0 border-none !bg-transparent outline-none"
        {...props}
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />
    </form>
  );
};

export default Search;
