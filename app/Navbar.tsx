"use client";

import React, { useState, useEffect } from "react";
import { BookOpen, Menu, X, User, ChevronDown } from "lucide-react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { usePathname } from 'next/navigation';
import { signOut, useSession } from "next-auth/react";
import { cn } from "@/lib/utils"; 

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const pathname = usePathname();
  const { data: session, status } = useSession();
  const user = session?.user;

  // Debounced scroll effect
  useEffect(() => {
    let timeoutId: NodeJS.Timeout;
    
    const handleScroll = () => {
      clearTimeout(timeoutId);
      timeoutId = setTimeout(() => {
        setScrolled(window.scrollY > 10);
      }, 50);
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
      clearTimeout(timeoutId);
    };
  }, []);

  const navLinks = [
    { name: "Home", path: "/" },
    { name: "Features", path: "/features" },
    { name: "About", path: "/about" },
    { name: "Pricing", path: "/pricing" },
    { name: "Contact", path: "/contact" },
  ];

  const handleSignOut = async () => {
    await signOut();
  }

  return (
    <nav className={cn(
      "fixed w-full z-50 transition-all duration-300 border-b",
      scrolled 
        ? "bg-white/90 backdrop-blur-sm shadow-sm border-transparent" 
        : "bg-transparent border-gray-100"
    )}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16 md:h-20">
          {/* Logo */}
          <Link 
            href="/" 
            className="flex items-center space-x-2 group"
            aria-label="Home"
          >
            <motion.div
              whileHover={{ rotate: 15 }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              <BookOpen className="h-8 w-8 text-blue-600 group-hover:text-blue-500 transition-colors" />
            </motion.div>
            <span className="text-xl font-bold bg-gradient-to-r from-blue-600 to-blue-400 bg-clip-text text-transparent">
              SmartClass
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-1">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                href={link.path}
                className={cn(
                  "px-4 py-2 rounded-lg text-sm font-medium transition-all",
                  "text-gray-600 hover:text-blue-600 hover:bg-blue-50/50",
                  pathname === link.path 
                    ? "text-blue-600 font-semibold bg-blue-50" 
                    : ""
                )}
              >
                {link.name}
              </Link>
            ))}
          </div>

          {/* Desktop Auth Buttons */}
          <div className="hidden md:flex items-center space-x-2">
            {status === "loading" ? (
              <div className="h-9 w-20 rounded-lg bg-gray-100 animate-pulse" />
            ) : session && user ? (
              <div className="relative cursor-pointer">
                <button
                  onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                  className="flex items-center space-x-2 px-4 py-2 rounded-lg hover:bg-gray-100 transition-all cursor-pointer"
                  aria-expanded={isDropdownOpen}
                  aria-label="User menu"
                >
                  <div className="h-8 w-8 rounded-full bg-blue-100 flex items-center justify-center">
                    <User className="h-4 w-4 text-blue-600" />
                  </div>
                  <span className="text-sm font-medium text-gray-700">
                    My Account
                  </span>
                  <ChevronDown 
                    className={cn(
                      "h-4 w-4 text-gray-400 transition-transform",
                      isDropdownOpen ? "rotate-180" : ""
                    )} 
                  />
                </button>

                <AnimatePresence>
                  {isDropdownOpen && (
                    <motion.div
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      transition={{ duration: 0.2 }}
                      className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg py-1 z-50 border border-gray-100 cursor-pointer"
                      onMouseLeave={() => setIsDropdownOpen(false)}
                    >
                      <Link
                        href={`/dashboard/${user?.role.toLowerCase()}`}
                        className="block px-4 py-2 text-sm text-gray-700 hover:bg-blue-50 transition-colors"
                        onClick={() => setIsDropdownOpen(false)}
                      >
                        Dashboard
                      </Link>
                      <Link
                        href="/settings"
                        className="block px-4 py-2 text-sm text-gray-700 hover:bg-blue-50 transition-colors"
                        onClick={() => setIsDropdownOpen(false)}
                      >
                        Settings
                      </Link>
                      <div className="border-t border-gray-100 my-1" />
                      <span
                        onClick={handleSignOut}
                        className="block px-4 py-2 text-sm text-gray-700 hover:bg-blue-50 transition-colors"
                      >
                        Sign Out
                      </span>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            ) : (
              <>
                <Link
                  href="/login"
                  className="px-4 py-2 rounded-lg text-sm font-medium text-gray-600 hover:text-blue-600 transition-colors"
                >
                  Log in
                </Link>
                <Link
                  href="/signup"
                  className="px-4 py-2 rounded-lg text-sm font-medium text-white bg-gradient-to-r from-blue-600 to-blue-500 hover:from-blue-500 hover:to-blue-400 transition-all shadow-sm hover:shadow-md"
                >
                  Get Started
                </Link>
              </>
            )}
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="p-2 rounded-lg hover:bg-gray-100 transition-colors"
              aria-label={isOpen ? "Close menu" : "Open menu"}
              aria-expanded={isOpen}
            >
              {isOpen ? (
                <X className="h-6 w-6 text-gray-600" />
              ) : (
                <Menu className="h-6 w-6 text-gray-600" />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Navigation */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.2 }}
            className="md:hidden bg-white border-t border-gray-100 overflow-hidden"
          >
            <div className="px-4 pt-2 pb-4 space-y-1">
              {navLinks.map((link) => (
                <Link
                  key={link.path}
                  href={link.path}
                  className={cn(
                    "block px-4 py-3 rounded-lg text-base font-medium transition-colors",
                    pathname === link.path
                      ? "text-blue-600 bg-blue-50"
                      : "text-gray-600 hover:text-blue-600 hover:bg-blue-50"
                  )}
                  onClick={() => setIsOpen(false)}
                >
                  {link.name}
                </Link>
              ))}

              <div className="border-t border-gray-100 pt-2">
                {status === "loading" ? (
                  <div className="space-y-2">
                    <div className="h-12 rounded-lg bg-gray-100 animate-pulse" />
                    <div className="h-12 rounded-lg bg-gray-100 animate-pulse" />
                  </div>
                ) : session && user ? (
                  <>
                    <Link
                      href="/dashboard"
                      className="block px-4 py-3 rounded-lg text-base font-medium text-gray-600 hover:text-blue-600 hover:bg-blue-50 transition-colors"
                      onClick={() => setIsOpen(false)}
                    >
                      Dashboard
                    </Link>
                    <Link
                      href="/settings"
                      className="block px-4 py-3 rounded-lg text-base font-medium text-gray-600 hover:text-blue-600 hover:bg-blue-50 transition-colors"
                      onClick={() => setIsOpen(false)}
                    >
                      Settings
                    </Link>
                    <Link
                      href="/api/auth/signout"
                      className="block px-4 py-3 rounded-lg text-base font-medium text-gray-600 hover:text-blue-600 hover:bg-blue-50 transition-colors"
                      onClick={() => setIsOpen(false)}
                    >
                      Sign Out
                    </Link>
                  </>
                ) : (
                  <>
                    <Link
                      href="/login"
                      className="block px-4 py-3 rounded-lg text-base font-medium text-gray-600 hover:text-blue-600 hover:bg-blue-50 transition-colors"
                      onClick={() => setIsOpen(false)}
                    >
                      Log in
                    </Link>
                    <Link
                      href="/signup"
                      className="block px-4 py-3 rounded-lg text-base font-medium text-white bg-gradient-to-r from-blue-600 to-blue-500 hover:from-blue-500 hover:to-blue-400 transition-all mt-2 text-center"
                      onClick={() => setIsOpen(false)}
                    >
                      Get Started
                    </Link>
                  </>
                )}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

export default Navbar;