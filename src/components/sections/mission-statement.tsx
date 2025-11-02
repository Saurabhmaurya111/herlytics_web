"use client";

import React, { type FC } from 'react';
import Image from 'next/image';
// import Mission from '@/app/gallery/Mission.jpeg';
import { Card, CardContent } from '@/components/ui/card';
import { useLanguage } from '@/contexts/language-context';

const MissionStatement: FC = () => {
  const { t } = useLanguage();
  return (
    <section id="mission" className="py-16 md:py-24 bg-background">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row items-center gap-10 md:gap-16">
          <div className="md:w-1/2 space-y-6 text-center md:text-left">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground">
              {t('mission.title')}
            </h2>
            <p className="text-lg text-muted-foreground leading-relaxed">
              {t('mission.para1')}
            </p>
            <p className="text-lg text-muted-foreground leading-relaxed">
              {t('mission.para2')}
            </p>
          </div>
          <div className="md:w-1/2">
            <Card className="overflow-hidden shadow-xl rounded-xl">
              <CardContent className="p-0">
                <Image
                   src={"/Mission.jpeg"} // or your actual image path
                
                  alt="Diverse group collaborating"
                  width={600}
                  height={400}
                  className="w-full h-auto object-cover"
                  data-ai-hint="team collaboration"
                />
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </section>
  );
};

export default MissionStatement;
