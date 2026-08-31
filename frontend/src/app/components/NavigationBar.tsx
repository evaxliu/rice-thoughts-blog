"use client";
import Link from "next/link";
import React from "react";
import { Sun, Moon } from 'lucide-react';
import { usePathname } from 'next/navigation';
import { useState, useEffect } from 'react';
import { useTheme } from 'next-themes';
import clsx from 'clsx';

export default function NavBar() {
  const pathname = usePathname();

  const { resolvedTheme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);

  function toggleTheme() {
    setTheme(resolvedTheme === 'dark' ? 'light' : 'dark');
  }

  const navTabs = [
    { label: "Articles", href: "/" },
    { label: "Food Reviews", href: "/food-reviews" },
    { label: "About", href: "/about" },
  ];

  return(
    <header className="sticky top-0 z-20 bg-canvas">
      <div className="mx-auto w-full max-w-page px-4 sm:px-6 md:px-8">
        <div className="flex flex-wrap items-center gap-x-4 gap-y-4 py-4 sm:py-5 md:gap-x-5 md:py-6">
          <Link href={"/"} className="min-w-0 md:mr-5">
            <span className="block truncate font-serif text-xl text-ink sm:text-2xl md:text-3xl">
              Rice Thoughts Blog
            </span>
          </Link>

          <nav className="order-10 flex basis-full items-center gap-5 text-sm sm:gap-6 md:order-none md:basis-auto md:gap-7">
            {
              navTabs.map((tab) => {
                const active = pathname === tab.href;
                return(
                  <Link
                    key={tab.label}
                    href={tab.href}
                    className={clsx(
                      'whitespace-nowrap pb-1.5 transition-colors',
                      active
                        ? 'border-b-2 border-accent text-ink'
                        : 'text-faint hover:text-ink',
                    )}
                  >
                    {tab.label}
                  </Link>
                )
              })
            }
          </nav>

          <div className="ml-auto flex shrink-0 items-center gap-2 md:gap-3">
            <button
              className="flex items-center p-1 text-faint transition-colors hover:text-ink"
              onClick={toggleTheme}
              aria-label="Toggle theme"
            >
              {!mounted ? (
                <span className="inline-block size-5" />
              ) : resolvedTheme === "dark" ? (
                <Sun className="size-5" />
              ) : (
                <Moon className="size-5" />
              )}
            </button>
          </div>
        </div>
      </div>
    </header>
  )
};