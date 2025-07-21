"use client";

import { useState, useEffect } from "react";
import { Dialog, DialogPanel } from "@headlessui/react";
import { Bars3Icon, XMarkIcon } from "@heroicons/react/24/outline";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";

const navigation = [
  { name: "Home", href: "/" },
  { name: "Buy", href: "/buy" },
  { name: "Sell", href: "/sell" },
  { name: "Blog", href: "/blog" },
];

export default function ClientNav() {
  const pathname = usePathname();
  const isBlog = pathname.startsWith("/blog");

  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isVisible, setIsVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;

      if (!isBlog) {
        // For non-blog pages: toggle isScrolled based on scrollY
        if (currentScrollY > 80) {
          setIsScrolled(true);
        } else {
          setIsScrolled(false);
          setIsVisible(true);
        }
        if (currentScrollY > lastScrollY && currentScrollY > 80) {
          setIsVisible(false);
        } else if (currentScrollY < lastScrollY) {
          setIsVisible(true);
        }
      } else {
        // On blog page, only hide on scroll down / show on scroll up, no transparent background
        if (currentScrollY > lastScrollY && currentScrollY > 0) {
          setIsVisible(false);
        } else if (currentScrollY < lastScrollY) {
          setIsVisible(true);
        }
        setIsScrolled(true); // Always solid background on blog page
      }

      setLastScrollY(currentScrollY);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [lastScrollY, isBlog]);

  // Compose the nav class depending on page and scroll state
  const navClass = isBlog
    ? `sticky top-0 z-50 bg-brand-primary transition-all duration-300 ease-in-out ${
        isVisible ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-full"
      }`
    : `fixed top-0 w-full z-50 transition-all duration-300 ease-in-out ${
        isScrolled
          ? isVisible
            ? "bg-brand-primary opacity-100 translate-y-0"
            : "bg-brand-primary opacity-0 -translate-y-full"
          : "bg-transparent opacity-100 translate-y-0"
      }`;

  return (
    <header className={navClass}>
      <nav
        aria-label="Global"
        className="mx-auto flex max-w-7xl items-center justify-between p-6 lg:px-8"
      >
        <div className="flex lg:flex-1" />
        <div className="flex lg:hidden">
          <button
            type="button"
            onClick={() => setMobileMenuOpen(true)}
            className={`-m-2.5 inline-flex items-center justify-center rounded-md p-2.5 text-brand-text`}
          >
            <span className="sr-only">Open main menu</span>
            <Bars3Icon aria-hidden="true" className="h-6 w-6" />
          </button>
        </div>
        <div className="hidden lg:flex lg:gap-x-12">
          {navigation.map((item) => (
            <Link
              key={item.name}
              href={item.href}
              className="text-sm/6 font-semibold transition-all duration-200 text-brand-text hover:text-brand-accent hover:-translate-y-1"
            >
              {item.name}
            </Link>
          ))}
        </div>
        <div className="hidden lg:flex lg:flex-1 lg:justify-end">
          <Link
            href="/contact"
            className="text-sm/6 border-2 border-brand-secondary py-2 px-4 rounded-xl font-semibold text-brand-text bg-brand-secondary/20 hover:bg-brand-secondary hover:text-brand-primary transition-all duration-200"
          >
            Contact <span aria-hidden="true">→</span>
          </Link>
        </div>
      </nav>
      <Dialog open={mobileMenuOpen} onClose={setMobileMenuOpen} className="lg:hidden">
        <div className="fixed inset-0 z-50" />
        <DialogPanel className="fixed inset-y-0 right-0 z-50 w-full overflow-y-auto bg-brand-neutral px-6 py-6 sm:max-w-sm sm:ring-1 sm:ring-gray-900/10">
          <div className="flex items-center justify-between">
            <a href="#" className="-m-1.5 p-1.5">
              <span className="sr-only">Diego Garcia Realty</span>
              <Image
                alt=""
                width={32}
                height={32}
                src="/Headshot.jpg"
                className="h-16 w-16 rounded-full border-2 border-brand-secondary shadow-md"
              />
            </a>
            <button
              type="button"
              onClick={() => setMobileMenuOpen(false)}
              className="-m-2.5 rounded-md p-2.5 text-brand-primary"
            >
              <span className="sr-only">Close menu</span>
              <XMarkIcon aria-hidden="true" className="h-6 w-6" />
            </button>
          </div>
          <div className="mt-6 flow-root">
            <div className="-my-6 divide-y divide-gray-500/10">
              <div className="space-y-2 py-6">
                {navigation.map((item) => (
                  <Link
                    key={item.name}
                    href={item.href}
                    className="-mx-3 block rounded-lg px-3 py-2 text-base/7 font-semibold text-brand-primary hover:bg-brand-secondary/20"
                  >
                    {item.name}
                  </Link>
                ))}
              </div>
              <div className="py-6">
                <Link
                  href="/contact"
                  className="-mx-3 block rounded-lg px-3 py-2.5 text-base/7 font-semibold text-brand-primary hover:bg-brand-secondary/20"
                >
                  Contact
                </Link>
              </div>
            </div>
          </div>
        </DialogPanel>
      </Dialog>
    </header>
  );
}
