"use client"

import { usePathname } from 'next/navigation'
import Link from 'next/link'
import { Home, User, Phone } from 'lucide-react'
import { PiChalkboardTeacherThin } from "react-icons/pi";


export default function MobileNav() {
  const pathname = usePathname()

  const navItems = [
    { name: 'Home', href: '/', icon: Home },
    { name: 'About', href: '/about-us', icon: User },
    { name: 'Contact', href: '/contact-us', icon: Phone },
    { name: 'Courses', href: '/courses', icon: PiChalkboardTeacherThin },
  ]

  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-gray-950 border-t border-gray-200 md:hidden">
      <div className="flex justify-around">
        {navItems.map((item) => {
          const isActive = pathname === item.href
          return (
            <Link
              key={item.name}
              href={item.href}
              className={`flex flex-col items-center py-3 px-3 text-xs ${
                isActive ? 'text-primary-500' : 'text-gray-50'
              }`}
            >
              <item.icon className={`h-6 w-6 ${isActive ? 'text-primary-500' : 'text-gray-50'}`} />
              <span className={`${isActive? 'text-primary-500': 'text-gray-50'}`}>{item.name}</span>
            </Link>
          )
        })}
      </div>
    </nav>
  )
}