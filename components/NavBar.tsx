"use client";

import {
  Phone,
  Info,
  Home,
  Bell,
  Globe,
  GalleryHorizontal,
} from "lucide-react";
import Link from "next/link";
import TopBar from "./TopBar";
import { Button } from "./ui/button";
import { Menu } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useTranslations } from "next-intl";
import { EventCalendar } from "./EventsCalendar";



export default function NavBar() {
  const t = useTranslations('');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const mobileMenuRef = useRef(null);
  const menuItems = [
    { name: "Home", href: "/", icon: <Home className="h-6 w-6" /> },
    // {
    //   name: "Courses",
    //   href: "/courses",
    //   icon: <BookOpen className="h-6 w-6" />,
    // },
    { name: "About", href: "/about", icon: <Info className="h-6 w-6" /> },
    {
      name: "Careers",
      href: "/careers",
      icon: <Info className="h-6 w-6" />,
    },
    // {
    //   name: "Govt Schemes",
    //   href: "/schemes",
    //   icon: <GraduationCap className="h-6 w-6" />,
    // },
    {
      name: "Gallery",
      href: "/gallery",
      icon: <GalleryHorizontal className="h-6 w-6" />,
    },
    { name: "Contact", href: "/contact", icon: <Phone className="h-6 w-6" /> },
  ];

  const languages = [
    { code: "en", name: "English" },
    { code: "hi", name: "हिंदी" },
    { code: "mr", name: "मराठी" },
  ];

  const login = [
    { code: "admin", name: "Admin" },
    { code: "user-login", name: "User Login" },
  ]

  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
  }, [mobileMenuOpen]);

  return (
    <>
      <div className="sticky top-0 z-50 flex flex-col bg-[#F4F6FF]">
        <TopBar />
        <header className="bg-[#10375C] text-[#F4F6FF]">
          <div className="container mx-auto px-4 py-4">
            <nav className="flex justify-between items-center">
              <Link
                href="/"
                className="flex items-center gap-4 text-xl font-bold"
              >
                <Image
                  src={"/sambodhi-logo.png"}
                  priority={true}
                  width={50}
                  height={25}
                  alt="logo"
                  className="aspect-w-4 aspect-h-3"
                />
                <span>
                  Sambodhi <br /> Academy
                </span>
              </Link>
              <nav className="hidden md:flex space-x-8">
                {menuItems.map((item) => (
                  <Link
                    key={item.name}
                    href={item.href}
                    className="text-[#FFF] hover:text-[#F3C623]"
                  >
                    {t(item.name)}
                  </Link>
                ))}
              </nav>
              <EventCalendar />
              <div className="md:flex hidden items-center gap-4 ">
                <div className="relative mr-4">
                  <Bell className="h-6 w-6 text-[#fff] hover:text-[#F3C623] cursor-pointer" />
                  <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full h-4 w-4 flex items-center justify-center">
                    3
                  </span>
                </div>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button
                      variant="outline"
                      className="bg-[#0a0908] text-[#fff] hover:bg-[#EB8317]"
                    >
                      Login
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="center">
                    {login.map((lang) => (
                      <DropdownMenuItem
                        key={lang.code}
                      >
                        <Link href={`/${lang.code}`} target="_blank">
                          {lang.name}
                        </Link>
                      </DropdownMenuItem>
                    ))}
                  </DropdownMenuContent>
                </DropdownMenu>

              </div>
              <div className="md:hidden relative" ref={mobileMenuRef}>
                <Button
                  variant="ghost"
                  onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                >
                  <Menu className="h-6 w-6" />
                </Button>
                {mobileMenuOpen && (
                  <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 z-50">
                    {menuItems.map((item) => (
                      <Link
                        key={item.name}
                        href={item.href}
                        className="flex items-center px-4 py-2 text-sm text-[#10375C] hover:bg-[#F3C623] hover:text-white"
                        onClick={() => setMobileMenuOpen(false)}
                      >
                        {item.icon}
                        <span className="ml-2">{t(item.name)}</span>
                      </Link>
                    ))}
                  </div>
                )}
              </div>

              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button
                    variant="ghost"
                    size="sm"
                    className="text-white hover:text-[#F3C623]"
                  >
                    <Globe className="h-4 w-4 mr-2" />
                    <span className="hidden sm:inline">language</span>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  {languages.map((lang) => (
                    <DropdownMenuItem
                      key={lang.code}
                    >
                      <Link href={`/${lang.code}`}>
                        {lang.name}
                      </Link>
                    </DropdownMenuItem>
                  ))}
                </DropdownMenuContent>
              </DropdownMenu>
            </nav>
          </div>
        </header>
      </div>
    </>
  );
}
