"use client";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import React, { useCallback } from "react";
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import { Button } from "../ui/button";

type Props = {};

function SortByAction({}: Props) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams()!;
  const currentSort = searchParams.get("sortBy") === "asc" ? "asc" : "desc";
  const isAsc = currentSort === "asc";
  // Get a new searchParams string by merging the current
  // searchParams with a provided key/value pair
  const createQueryString = useCallback(
    (name: string, value: string) => {
      const params = new URLSearchParams(searchParams);
      params.set(name, value);

      return params.toString();
    },
    [searchParams],
  );

  return (
    <>
      <span className="text-xs text-gray-400">Sort by: </span>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="outline">
            <DropdownMenuLabel>
              {isAsc ? "Date (Oldest)" : "Date (Newest)"}
            </DropdownMenuLabel>
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="w-56">
          <DropdownMenuCheckboxItem
            checked={isAsc}
            onClick={() =>
              router.push(pathname + "?" + createQueryString("sortBy", "asc"))
            }
          >
            Date (Oldest)
          </DropdownMenuCheckboxItem>
          <DropdownMenuCheckboxItem
            checked={!isAsc}
            onClick={() =>
              router.push(pathname + "?" + createQueryString("sortBy", "desc"))
            }
          >
            Date (Newest)
          </DropdownMenuCheckboxItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </>
  );
}

export default SortByAction;
