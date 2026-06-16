"use client";

import {
  Phone,
  Info,
  Home,
  GalleryHorizontal,
  Book,
  ChevronDown,
  GraduationCap,
  BookOpen,
} from "lucide-react";
import { Link, useRouter } from "@/i18n/routing";
import NextLink from "next/link";
import TopBar from "./TopBar";
import { Button } from "./ui/button";
import { Menu } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useTranslations } from "next-intl";
import { EventCalendar } from "./EventsCalendar";
import Image from "next/image";
import { usePathname } from "next/navigation";

export default function NavBar() {
  const t = useTranslations("");
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const mobileMenuRef = useRef(null);
  const router = useRouter();

  const pathName = usePathname();
  const locale = pathName.split("/")[1];

  const menuItems = [
    { name: "Home", href: "/", icon: <Home className="h-6 w-6" /> },
    {
      name: "Courses",
      href: "/courses",
      icon: <BookOpen className="h-6 w-6" />,
    },
    {
      name: "PYQ",
      href: "/question-papers",
      icon: <Book className="h-6 w-6" />,
    },
    {
      name: "MockTests",
      href: "/products",
      icon: <Book className="h-6 w-6" />,
    },
    { name: "About", href: "/about", icon: <Info className="h-6 w-6" /> },
    {
      name: "Careers",
      href: "/careers",
      icon: <Info className="h-6 w-6" />,
    },
    {
      name: "Govt Schemes",
      icon: <GraduationCap className="h-5 w-5" />,
      dropdown: [
        { name: "SchemesforSC", href: "/schemes/sc-schemes" },
        { name: "SchemesforST", href: "/schemes/st-schemes" },
        { name: "SchemesforOBC", href: "/schemes/obc-schemes" },
        { name: "SchemesforEWS", href: "/schemes/ews-schemes" },
      ],
    },
    {
      name: "Gallery",
      href: "/gallery",
      icon: <GalleryHorizontal className="h-6 w-6" />,
    },
    { name: "Contact", href: "/contact", icon: <Phone className="h-6 w-6" /> },
  ];

  const login = [
    { code: "admin", name: "Admin Login" },
    { code: "student-login", name: "Student Login" },
  ];

  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
  }, [mobileMenuOpen]);

  const handleLocaleChange = (locale: string) => {
    const currentPath = window.location.pathname;
    const localeRegex = /^\/(en|mr)(\/|$)/;
    const newPath = currentPath.replace(localeRegex, "/") || "/";
    router.replace(newPath, { locale });
  };

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
                  src="/sambodhi-logo.png"
                  priority={true}
                  width={50}
                  height={50}
                  alt="logo"
                  unoptimized
                />
                <span className="text-sm lg:text-lg">
                  Sambodhi <br /> Academy
                </span>
              </Link>
              <nav className="hidden md:flex md:text-sm gap-6 lg:text-md lg:gap-8">
                {menuItems.map((item: any) =>
                  item?.dropdown ? (
                    <DropdownMenu key={item.name}>
                      <DropdownMenuTrigger className="text-[#FFF] hover:text-[#F3C623] flex items-center">
                        {t(item.name)} <ChevronDown className="ml-1 h-4 w-4" />
                      </DropdownMenuTrigger>
                      <DropdownMenuContent>
                        {item.dropdown.map((subItem: any) => (
                          <DropdownMenuItem
                            key={subItem.name}
                            asChild
                            className="cursor-pointer"
                          >
                            <Link href={subItem.href} className="w-full">
                              {t(subItem.name)}
                            </Link>
                          </DropdownMenuItem>
                        ))}
                      </DropdownMenuContent>
                    </DropdownMenu>
                  ) : (
                    <Link
                      key={item.name}
                      href={item.href}
                      className="text-[#FFF] hover:text-[#F3C623]"
                    >
                      {t(item.name)}
                    </Link>
                  ),
                )}
              </nav>
              <div className="flex items-center gap-4 ">
                <EventCalendar />
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button
                      variant="outline"
                      className="bg-[#0a0908] text-[#fff] hover:bg-[#EB8317]"
                      size={"xs"}
                    >
                      Login
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="center">
                    {login.map((lang) => (
                      <NextLink
                        key={lang.code}
                        href={`/${lang.code}`}
                        target="_blank"
                      >
                        <DropdownMenuItem className="cursor-pointer">
                          {lang.name}
                        </DropdownMenuItem>
                      </NextLink>
                    ))}
                  </DropdownMenuContent>
                </DropdownMenu>
                <div className="flex items-center">
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button
                        variant="outline"
                        size={"xs"}
                        className="w-[3.5rem]"
                      >
                        <span className="sr-only">Toggle language</span>
                        {locale === "en" ? "EN" : "MR"}
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="center">
                      <DropdownMenuItem
                        onClick={() => handleLocaleChange("en")}
                      >
                        English
                      </DropdownMenuItem>
                      <DropdownMenuItem
                        onClick={() => handleLocaleChange("mr")}
                      >
                        मराठी
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>
                <div className="md:hidden relative" ref={mobileMenuRef}>
                  <Button
                    variant="ghost"
                    onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                    className="!p-0"
                  >
                    <Menu className="h-6 w-6" />
                  </Button>
                  {mobileMenuOpen && (
                    <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 z-50">
                      {menuItems.map((item: any) =>
                        item.dropdown ? (
                          <div key={item.name} className="">
                            <span className="px-4 py-2 text-sm font-semibold text-[#10375C] flex gap-3">
                              {item.icon} {t(item.name)}
                            </span>
                            {item.dropdown.map((subItem: any) => (
                              <Link
                                key={subItem.name}
                                href={subItem.href}
                                className="block px-4 py-2 text-sm text-[#10375C] hover:bg-[#F3C623] "
                                onClick={() => setMobileMenuOpen(false)}
                              >
                                {t(subItem.name)}
                              </Link>
                            ))}
                          </div>
                        ) : (
                          <Link
                            key={item.name}
                            href={item.href}
                            className="flex items-center px-4 py-2 text-sm text-[#10375C] hover:bg-[#F3C623]"
                            onClick={() => setMobileMenuOpen(false)}
                          >
                            {item.icon}
                            <span className="ml-2">{t(item.name)}</span>
                          </Link>
                        ),
                      )}
                    </div>
                  )}
                </div>
              </div>
            </nav>
          </div>
        </header>
      </div>
    </>
  );
}
