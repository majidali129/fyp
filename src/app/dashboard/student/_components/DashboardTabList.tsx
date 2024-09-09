
'use client'

import Link from "next/link"
import { TabsList, TabsTrigger } from "../../../../components/ui/tabs"
import { useRouter } from "next/navigation"

const TABS = [
    { label: "Dashboard", value: "dashboard" },
    { label: "Courses", value: "courses" },
    { label: "Teachers", value: "teachers" },
    { label: "Messages", value: "messages" },
    { label: "Wishlist", value: "wishlist" },
    { label: "Purchase History", value: "purchase-history" },
    { label: "Settings", value: "settings" }

]

const DashboardTabList = () => {
    const router = useRouter();

  return (
    <TabsList className="border-y tablist border-y-primary-400 z-10 flex-between !px-0 !py-0 h-12 *:h-full overflow-scroll">
        {TABS.map(tab => (
            <Link key={tab.value} href={`#${tab.value}`} passHref className="!px-0">
            <TabsTrigger value={tab.value} className="data-[state=active]:border-b-[1.5px]  tracking-wide z-40 text-[1rem]   text-gray-600 hover:text-gray-900  px-7 h-full data-[state=active]:text-gray-900 w-full data-[state=active]:bg-gray-50 data-[state=active]:border-b-primary-500">{tab.label}</TabsTrigger>
          </Link>
        ))}
    </TabsList>
  )
}

export default DashboardTabList