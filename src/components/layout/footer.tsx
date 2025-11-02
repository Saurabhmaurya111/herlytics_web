"use client";

import React, { type FC } from 'react';
import Link from 'next/link';
import { Instagram, Linkedin, Twitter } from 'lucide-react';
import { useLanguage } from '@/contexts/language-context';

const Footer: FC = () => {
  const currentYear = new Date().getFullYear();
  const { t } = useLanguage();

  return (
    <footer className="bg-muted/50 border-t border-border/50 py-8">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row justify-between items-center text-center sm:text-left space-y-4 sm:space-y-0">
          <p className="text-sm text-muted-foreground">
            &copy; {currentYear} HERlytics. {t('footer.copyright')}
          </p>
          <div className="flex space-x-5">
            <Link href="#" aria-label="Instagram" className="text-muted-foreground hover:text-primary transition-colors">
              <Instagram className="h-5 w-5" />
            </Link>
            <Link href="#" aria-label="LinkedIn" className="text-muted-foreground hover:text-primary transition-colors">
              <Linkedin className="h-5 w-5" />
            </Link>
            <Link href="#" aria-label="Twitter" className="text-muted-foreground hover:text-primary transition-colors">
              <Twitter className="h-5 w-5" />
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
