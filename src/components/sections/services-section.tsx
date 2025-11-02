
"use client";

import type { FC } from 'react';
import Link from 'next/link';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Briefcase, Users, Bookmark, type LucideIcon } from 'lucide-react';
import { useLanguage } from '@/contexts/language-context';
import { cn } from '@/lib/utils';

interface Service {
  title: string;
  description: string;
  icon: LucideIcon;
  id: string;
}

const ServicesSection: FC = () => {
  const { t } = useLanguage();
  
  const services: Service[] = [
    {
      id: 'workshops',
      title: t('services.workshops.title'),
      description: t('services.workshops.description'),
      icon: Briefcase,
    },
    {
      id: 'mentorship',
      title: t('services.mentorship.title'),
      description: t('services.mentorship.description'),
      icon: Users,
    },
    {
      id: 'resources',
      title: t('services.resources.title'),
      description: t('services.resources.description'),
      icon: Bookmark,
    },
  ];

  const getServiceLink = (id: string) => {
    if (id === 'resources') return '/resouces';
    return '#';
  };

  return (
    <section id="services" className="py-16 md:py-24 bg-secondary/30">
      <div className="container mx-auto px-6 sm:px-8 lg:px-12 text-center">
        <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
          {t('services.title')}
        </h2>
        <p className="text-lg text-muted-foreground mb-12 max-w-2xl mx-auto">
          {t('services.subtitle')}
        </p>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {services.map((service) => {
            const link = getServiceLink(service.id);
            const cardContent = (
              <Card
                className={cn(
                  "group text-center p-6 rounded-xl shadow-lg hover:shadow-2xl transition-all duration-300 ease-in-out transform hover:-translate-y-1 border-2 border-transparent hover:border-primary",
                  link !== '#' && "cursor-pointer"
                )}
              >
                <div className="flex justify-center mb-6">
                  <service.icon className="h-12 w-12 text-primary group-hover:animate-pulse" />
                </div>
                <CardHeader className="p-0 mb-2">
                  <CardTitle className="text-xl font-semibold text-foreground">
                    {service.title}
                  </CardTitle>
                </CardHeader>
                <CardContent className="p-0">
                  <p className="text-muted-foreground text-sm">
                    {service.description}
                  </p>
                </CardContent>
              </Card>
            );

            return link !== '#' ? (
              <Link key={service.id} href={link}>
                {cardContent}
              </Link>
            ) : (
              <div key={service.id}>{cardContent}</div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default ServicesSection;
