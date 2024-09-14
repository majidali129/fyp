import TopNav from "@/components/TopNav";
import { Button } from "@/components/ui/button";
import { HomeIcon } from "lucide-react";
import Link from "next/link";

export default function NotFoundPage() {
  return (
    <div className="flex flex-col min-h-screen">
        <TopNav />
      <main className="flex-grow grid grid-cols-1 md:grid-cols-2 gap-8 p-6 md:p-10 lg:p-24">
        <div className="flex flex-col justify-center space-y-4">
            <h1 className="text-gray-100">Error 404</h1>
          <h2 className="text-4xl font-bold tracking-tighter sm:text-5xl">Oops! Page Not Found</h2>
          <p className="text-muted-foreground">
          Something went wrong. It’s look that your requested could not be found. It&apos;s look like the link is broken or the page is removed.
          </p>
          <Link href="/">
            <Button>
              <HomeIcon className="mr-2 h-4 w-4 " />
              Back To Home
            </Button>
          </Link>
        </div>
        <div className="flex items-center justify-center">
          <svg
            className="w-full h-auto max-w-md"
            viewBox="0 0 1155 742"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M203.5 542L0.5 0.5H445.5L203.5 542Z"
              fill="currentColor"
              fillOpacity="0.1"
            />
            <path
              d="M954.5 542L751.5 0.5H1154.5L954.5 542Z"
              fill="currentColor"
              fillOpacity="0.1"
            />
            <path
              d="M577.5 741L376.5 0.5H777.5L577.5 741Z"
              fill="currentColor"
              fillOpacity="0.1"
            />
            <path
              d="M577.5 741L203.5 542H954.5L577.5 741Z"
              fill="currentColor"
              fillOpacity="0.1"
            />
            <path
              d="M203.5 542L0.5 0.5L376.5 0.5L577.5 741L203.5 542Z"
              stroke="currentColor"
              strokeOpacity="0.2"
            />
            <path
              d="M954.5 542L1154.5 0.5L777.5 0.5L577.5 741L954.5 542Z"
              stroke="currentColor"
              strokeOpacity="0.2"
            />
          </svg>
        </div>
      </main>

      <footer className=" flex items-center justify-center py-3 text-center bg-background border-t">
        <p className="text-sm text-muted-foreground">&copy; 2024 - Learnist. Developed by <span className="text-gray-900 text-[1rem]">Majid Ali</span>. All rights reserved.</p>
      </footer>
    </div>
  );
}
