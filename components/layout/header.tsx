"use client";

import React from "react";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X } from "lucide-react";
import Link from "next/link";

import { Button } from "../ui";
import { ThemeToggle } from "../theme-toggle";

const menuItems = [
  { href: "/dashboard", label: "Dashboard" },
  { href: "/youtube-transcript", label: "YouTube Assistant" },
];

const Header = () => {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur-sm supports-backdrop-filter:bg-background/60">
      <div className="container mx-auto px-4 flex h-14 items-center">
        <Link href="/" className="mr-6 flex items-center space-x-2">
          <span className="font-neue text-2xl font-bold">ThryX</span>
        </Link>
        <nav
          aria-label="Main navigation"
          className="hidden md:flex items-center space-x-6 text-sm font-medium"
        >
          <Link
            href="/dashboard"
            className="transition-colors hover:text-foreground/80 text-foreground/60"
            aria-current={
              typeof window !== "undefined" &&
              window.location.pathname === "/dashboard"
                ? "page"
                : undefined
            }
          >
            PDF Assistant
          </Link>
          <Link
            href="/youtube-transcript"
            className="transition-colors hover:text-foreground/80 text-foreground/60"
            aria-current={
              typeof window !== "undefined" &&
              window.location.pathname === "/youtube-transcript"
                ? "page"
                : undefined
            }
          >
            YouTube Assistant
          </Link>
        </nav>
        <div className="ml-auto flex items-center space-x-4 md:space-x-0">
          <ThemeToggle />
          <div className="md:hidden">
            <Button
              variant="ghost"
              size="icon"
              className="relative z-50"
              onClick={() => setIsOpen(!isOpen)}
              aria-label={isOpen ? "Close menu" : "Open menu"}
              aria-expanded={isOpen}
              aria-controls="mobile-menu"
            >
              <AnimatePresence mode="wait">
                <motion.div
                  key={isOpen ? "close" : "menu"}
                  initial={{ opacity: 0, rotate: -90, scale: 0.8 }}
                  animate={{ opacity: 1, rotate: 0, scale: 1 }}
                  exit={{ opacity: 0, rotate: 90, scale: 0.8 }}
                  transition={{ duration: 0.2, ease: "easeInOut" }}
                >
                  {isOpen ? (
                    <X className="h-6 w-6" aria-hidden="true" />
                  ) : (
                    <Menu className="h-6 w-6" aria-hidden="true" />
                  )}
                </motion.div>
              </AnimatePresence>
            </Button>
            <AnimatePresence>
              {isOpen && (
                <motion.div
                  id="mobile-menu"
                  role="navigation"
                  aria-label="Mobile navigation"
                  initial={{ opacity: 0, y: -20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.2 }}
                  className="fixed inset-0 top-14 z-40 bg-background border-t"
                >
                  <nav className="container px-4 py-6 flex text-center flex-col space-y-4 bg-background border-b">
                    {menuItems.map((item) => (
                      <Link
                        key={item.href}
                        href={item.href}
                        className="text-lg font-medium hover:text-primary transition-colors"
                        onClick={() => setIsOpen(false)}
                        aria-current={
                          typeof window !== "undefined" &&
                          window.location.pathname === item.href
                            ? "page"
                            : undefined
                        }
                      >
                        {item.label}
                      </Link>
                    ))}
                  </nav>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
