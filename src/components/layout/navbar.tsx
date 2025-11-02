"use client";
import Image from 'next/image';
import React, { useState, useEffect, type FC } from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Menu } from 'lucide-react';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { cn } from '@/lib/utils';



const Navbar: FC = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleNavClick = () => {
    setIsMobileMenuOpen(false);
  };

  return (
    <nav
      className={cn(
        'fixed top-0 left-0 right-0 z-50 transition-all duration-300 ease-in-out',
        isScrolled ? 'bg-gray-300 shadow-lg backdrop-blur-sm py-3' : 'bg-transparent py-5'
      )}
    >
      <div className="container mx-auto px-6 sm:px-8 lg:px-12">
        <div className="flex items-center justify-between h-16">
          <Link href="/" className="flex items-center space-x-2 text-2xl font-bold text-primary">
            <div className="logo-container">
              <Image
                src= '/logo.png'
                alt="Logo"
                width={50}
                height={50}
                className="logo-image"
              />
            </div>
            <span>HERlytics</span>
          </Link>

          <div className="hidden md:flex items-center space-x-6">
            <Link
              href="/"
              className="relative font-medium text-white transition-colors hover:text-primary group text-base"
              onClick={handleNavClick}
            >
              Home
              <span className="absolute bottom-[-2px] left-0 w-full h-[2px] bg-primary transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left"></span>
            </Link>
            <Link
              href="/#services"
              className="relative font-medium text-white transition-colors hover:text-primary group text-base"
              onClick={handleNavClick}
            >
              Services
              <span className="absolute bottom-[-2px] left-0 w-full h-[2px] bg-primary transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left"></span>
            </Link>
            <Link
              href="/resouces"
              className="relative font-medium text-white transition-colors hover:text-primary group text-base"
              onClick={handleNavClick}
            >
              Resources
              <span className="absolute bottom-[-2px] left-0 w-full h-[2px] bg-primary transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left"></span>
            </Link>
            <Link
              href="/gallery"
              className="relative font-medium text-white transition-colors hover:text-primary group text-base"
              onClick={handleNavClick}
            >
              Gallery
              <span className="absolute bottom-[-2px] left-0 w-full h-[2px] bg-primary transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left"></span>
            </Link>
            <Link
              href="/#about"
              className="relative font-medium text-white transition-colors hover:text-primary group text-base"
              onClick={handleNavClick}
            >
              About Us
              <span className="absolute bottom-[-2px] left-0 w-full h-[2px] bg-primary transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left"></span>
            </Link>
            {/* <Link
              href="/#team"
              className="relative font-medium text-white transition-colors hover:text-primary group text-base"
              onClick={handleNavClick}
            >
              Team
              <span className="absolute bottom-[-2px] left-0 w-full h-[2px] bg-primary transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left"></span>
            </Link> */}
            <Button variant="outline" size="sm" asChild>
              <Link href="/login">Login/Register</Link>
            </Button>
          </div>

          <div className="md:hidden">
            <Sheet open={isMobileMenuOpen} onOpenChange={setIsMobileMenuOpen}>
              <SheetTrigger asChild>
                <Button variant="ghost" size="icon">
                  <Menu className="h-6 w-6" />
                </Button>
              </SheetTrigger>
              <SheetContent side="left" className="w-[280px] sm:w-[320px] pt-12 px-6 bg-background">
                <div className="flex flex-col space-y-5">
                  <Link
                    href="/"
                    className="block font-medium text-foreground hover:text-primary py-2 text-lg"
                    onClick={handleNavClick}
                  >
                    Home
                  </Link>
                  <Link
                    href="/#services"
                    className="block font-medium text-foreground hover:text-primary py-2 text-lg"
                    onClick={handleNavClick}
                  >
                    Services
                  </Link>
                  <Link
                    href="/resouces"
                    className="block font-medium text-foreground hover:text-primary py-2 text-lg"
                    onClick={handleNavClick}
                  >
                    Resources
                  </Link>
                  <Link
                    href="/gallery"
                    className="block font-medium text-foreground hover:text-primary py-2 text-lg"
                    onClick={handleNavClick}
                  >
                    Gallery
                  </Link>
                  <Link
                    href="/#about"
                    className="block font-medium text-foreground hover:text-primary py-2 text-lg"
                    onClick={handleNavClick}
                  >
                    About Us
                  </Link>
                  <Link
                    href="/#team"
                    className="block font-medium text-foreground hover:text-primary py-2 text-lg"
                    onClick={handleNavClick}
                  >
                    Team
                  </Link>
                  <Button variant="outline" className="w-full mt-5" asChild>
                    <Link href="/login" onClick={handleNavClick}>Login/Register</Link>
                  </Button>
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;