"use client";

import Link from "next/link";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { usePathname } from "next/navigation";
import { Fragment } from "react";

function BreadCrumb() {
  const pathname = usePathname();
  const paths = pathname.split("/").filter(Boolean);
  console.log("paths", paths);

  // Convert each segment to Title Case or handle hyphens properly
  const toTitleCase = (str: string) =>
    str
      .split("-")
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
      .join(" ");

  return (
    <Breadcrumb>
      <BreadcrumbList>
        <BreadcrumbItem>
          <BreadcrumbLink>
            <Link href="/" className="text-gray-600">
              Home
            </Link>
          </BreadcrumbLink>
        </BreadcrumbItem>
        {paths.map((path, index) => {
          const href = "/" + paths.slice(0, index + 1).join("/");

          const isLast = index === paths.length - 1;

          return (
            <Fragment key={path}>
              <BreadcrumbSeparator />
              <BreadcrumbItem>
                {isLast ? (
                  <span className="text-gray-800">{toTitleCase(path)}</span>
                ) : (
                  <BreadcrumbLink>
                    <Link href={href} className="text-gray-600">
                      {toTitleCase(path)}
                    </Link>
                  </BreadcrumbLink>
                )}
              </BreadcrumbItem>
            </Fragment>
          );
        })}
      </BreadcrumbList>
    </Breadcrumb>
  );
}

export default BreadCrumb;
