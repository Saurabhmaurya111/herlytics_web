
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
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";


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
      <ContactUsSection />
      <Footer />
    </main>
  );
}
