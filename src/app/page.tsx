
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

const AboutUsSection = () => (
 <section id="about" className="py-16 md:py-24 bg-background">
    <div className="container mx-auto px-6 sm:px-8 lg:px-12">
      <div className="flex flex-col md:flex-row-reverse items-center gap-10 md:gap-16">
        <div className="md:w-1/2 space-y-6 text-center md:text-left">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground">
            About HERlytics
          </h2>
          <p className="text-lg text-muted-foreground leading-relaxed">
            Founded in 2020, HERlytics has grown into a vibrant community of women passionate about data and analytics. We believe in the power of diversity and inclusion to drive innovation.
          </p>
          <p className="text-lg text-muted-foreground leading-relaxed">
            Our team is composed of industry professionals, mentors, and volunteers dedicated to creating impactful programs and resources. We strive to support women at every stage of their careers, from students to seasoned experts.
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

const QASection = () => {
  const faqData = [
    {
      question: "What is HERlytics?",
      answer: "HERlytics is a community-driven organization founded in 2020 dedicated to empowering women in data science and analytics. We provide workshops, mentorship, and resources to support women at every stage of their career journey.",
    },
    {
      question: "Who can join HERlytics?",
      answer: "HERlytics welcomes women of all backgrounds and experience levels interested in data science and analytics. Whether you're a student, career changer, or experienced professional, there's a place for you in our community.",
    },
    {
      question: "What services does HERlytics offer?",
      answer: "HERlytics offers a variety of services including hands-on workshops, personalized mentorship programs from industry professionals, and access to curated resources, tools, and best practices to help you succeed in your data career.",
    },
    {
      question: "How do I get involved?",
      answer: "You can get involved by attending our workshops and events, joining our mentorship programs, or accessing our online resources. Simply fill out the contact form on our website or reach out through our social media channels.",
    },
    {
      question: "Are there any membership fees?",
      answer: "HERlytics is committed to making our resources accessible. Most of our events and resources are free or offered at minimal cost. We also offer scholarships for those in need through our partnerships and sponsors.",
    },
    {
      question: "How can I stay updated on HERlytics events?",
      answer: "Follow us on our social media channels and subscribe to our newsletter to receive regular updates about upcoming workshops, events, mentorship opportunities, and new resources. You can also check our events page regularly.",
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
            Frequently Asked Questions
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Find answers to common questions about HERlytics and how we can support your journey in data science and analytics.
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

  return (
    <section id="contact" className="py-16 md:py-24 bg-background">
      <div className="container mx-auto px-6 sm:px-8 lg:px-12 text-center">
        <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-6">Get In Touch</h2>
        <p className="text-lg text-muted-foreground mb-10 max-w-2xl mx-auto">
          Have questions or want to get involved? We'd love to hear from you!
        </p>
        <Dialog open={isFormOpen} onOpenChange={setIsFormOpen}>
          <DialogTrigger asChild>
            <Button size="lg" className="bg-primary hover:bg-primary/90 text-primary-foreground px-10 py-4 text-lg">
              Contact Us
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[480px] p-0">
            <DialogHeader className="p-6 pb-4">
              <DialogTitle className="text-2xl">Contact Us</DialogTitle>
              <DialogDescription>
                Fill out the form below and we'll get back to you as soon as possible.
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
