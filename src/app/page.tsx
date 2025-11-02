
"use client";
import React, { useState } from 'react';
import Navbar from '@/components/layout/navbar';
import HeroSection from '@/components/sections/hero-section';
import MissionStatement from '@/components/sections/mission-statement';
import ServicesSection from '@/components/sections/services-section';
// import TeamSection from '@/components/sections/team-section';
import TeamSection from '@/components/sections/team-section';
import Footer from '@/components/layout/footer';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import ContactFormComponent from '@/components/forms/contact-form';
import AIChatbot from '@/components/chatbot/ai-chatbot';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { HelpCircle } from 'lucide-react';
import { useLanguage } from '@/contexts/language-context';


// Placeholder sections
const EventsSection = () => (
  <section id="events" className="py-16 md:py-24 bg-secondary/30">
    <div className="container mx-auto px-6 sm:px-8 lg:px-12 text-center">
      <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-12">Upcoming Events</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {[1, 2, 3].map((i) => (
          <Card key={i} className="text-left shadow-lg rounded-xl overflow-hidden transform transition-all hover:scale-105">
            <Image src={`https://placehold.co/600x400.png`} alt={`Event ${i}`} width={600} height={400} className="w-full h-48 object-cover" data-ai-hint="conference networking" />
            <CardHeader>
              <CardTitle className="text-xl">Event Title {i}</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground mb-2">Date: October {20+i}, 2024</p>
              <p className="text-muted-foreground mb-4">A brief description of the event goes here. Join us for an exciting session!</p>
              <Button variant="link" className="text-primary p-0">Learn More &rarr;</Button>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  </section>
);

const GallerySection = () => (
  <section id="gallery" className="py-16 md:py-24 bg-background"> {/* Changed bg to match other page sections */}
    <div className="container mx-auto px-6 sm:px-8 lg:px-12 text-center">
      <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-12">Gallery</h2>
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {[...Array(12)].map((_, i) => (
          <div key={i} className="overflow-hidden rounded-lg shadow-md aspect-square transform transition-all hover:scale-105">
            <Image 
              src={`https://placehold.co/400x400.png`} 
              alt={`Gallery image ${i + 1}`} 
              width={400} 
              height={400} 
              className="w-full h-full object-cover" 
              data-ai-hint="event photos community" 
            />
          </div>
        ))}
      </div>
    </div>
  </section>
);

const AboutUsSection = () => {
  const { t } = useLanguage();
  return (
 <section id="about" className="py-16 md:py-24 bg-background">
    <div className="container mx-auto px-6 sm:px-8 lg:px-12">
      <div className="flex flex-col md:flex-row-reverse items-center gap-10 md:gap-16">
        <div className="md:w-1/2 space-y-6 text-center md:text-left">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground">
            {t('about.title')}
          </h2>
          <p className="text-lg text-muted-foreground leading-relaxed">
            {t('about.para1')}
          </p>
          <p className="text-lg text-muted-foreground leading-relaxed">
            {t('about.para2')}
          </p>
        </div>
        <div className="md:w-1/2">
          <Card className="overflow-hidden shadow-xl rounded-xl">
            <CardContent className="p-0">
              <Image
                src="/Main.jpg"
                alt="Team photo"
                width={600}
                height={400}
                className="w-full h-auto object-cover"
                data-ai-hint="diverse team meeting"
              />
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  </section>
  );
};

const QASection = () => {
  const { t } = useLanguage();
  const faqData = [
    {
      question: t('faq.q1'),
      answer: t('faq.a1'),
    },
    {
      question: t('faq.q2'),
      answer: t('faq.a2'),
    },
    {
      question: t('faq.q3'),
      answer: t('faq.a3'),
    },
    {
      question: t('faq.q4'),
      answer: t('faq.a4'),
    },
    {
      question: t('faq.q5'),
      answer: t('faq.a5'),
    },
    {
      question: t('faq.q6'),
      answer: t('faq.a6'),
    },
  ];

  return (
    <section id="qa" className="py-16 md:py-24 bg-secondary/30">
      <div className="container mx-auto px-6 sm:px-8 lg:px-12">
        <div className="text-center mb-12">
          <div className="flex items-center justify-center mb-4">
            <HelpCircle className="h-12 w-12 text-primary" />
          </div>
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            {t('faq.title')}
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            {t('faq.subtitle')}
          </p>
        </div>
        <div className="max-w-3xl mx-auto">
          <Accordion type="single" collapsible className="space-y-4">
            {faqData.map((faq, index) => (
              <AccordionItem
                key={index}
                value={`item-${index}`}
                className="bg-background border border-border rounded-lg px-6 shadow-md hover:shadow-lg transition-shadow"
              >
                <AccordionTrigger className="text-left font-semibold text-foreground hover:no-underline py-4">
                  {faq.question}
                </AccordionTrigger>
                <AccordionContent className="text-muted-foreground leading-relaxed pb-4">
                  {faq.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </div>
    </section>
  );
};

const ContactUsSection = () => {
  const [isFormOpen, setIsFormOpen] = useState(false);
  const { t } = useLanguage();

  return (
    <section id="contact" className="py-16 md:py-24 bg-background">
      <div className="container mx-auto px-6 sm:px-8 lg:px-12 text-center">
        <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-6">{t('contact.title')}</h2>
        <p className="text-lg text-muted-foreground mb-10 max-w-2xl mx-auto">
          {t('contact.subtitle')}
        </p>
        <Dialog open={isFormOpen} onOpenChange={setIsFormOpen}>
          <DialogTrigger asChild>
            <Button size="lg" className="bg-primary hover:bg-primary/90 text-primary-foreground px-10 py-4 text-lg">
              {t('contact.btn')}
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[480px] p-0">
            <DialogHeader className="p-6 pb-4">
              <DialogTitle className="text-2xl">{t('contact.dialogTitle')}</DialogTitle>
              <DialogDescription>
                {t('contact.dialogDesc')}
              </DialogDescription>
            </DialogHeader>
            <div className="px-6 pb-6">
             <ContactFormComponent onFormSubmit={() => setIsFormOpen(false)} />
            </div>
          </DialogContent>
        </Dialog>
      </div>
    </section>
  );
};


export default function HomePage() {
  return (
    <main className="flex flex-col min-h-screen">
      <Navbar />
      <HeroSection />
      <MissionStatement />
      <ServicesSection />
      {/* <EventsSection /> */}
      {/* <GallerySection /> */}
      <AboutUsSection />
      {/* <TeamSection /> */}
      <QASection />
      <ContactUsSection />
      <Footer />
      <AIChatbot />
    </main>
  );
}
