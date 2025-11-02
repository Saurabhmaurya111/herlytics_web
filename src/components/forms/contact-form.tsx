
"use client";

import { useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "@/hooks/use-toast";
import { Phone, User, Mail, MessageSquare, Type } from 'lucide-react';
import { useLanguage } from '@/contexts/language-context';

const contactFormSchema = z.object({
  name: z.string().min(2, {
    message: "Name must be at least 2 characters.",
  }),
  email: z.string().email({
    message: "Please enter a valid email address.",
  }),
  phone: z.string().optional(),
  subject: z.string().optional(),
  message: z.string().min(10, {
    message: "Message must be at least 10 characters.",
  }).max(500, {
    message: "Message must not be longer than 500 characters.",
  }),
});

export type ContactFormValues = z.infer<typeof contactFormSchema>;

interface ContactFormComponentProps {
  onFormSubmit?: () => void;
}

export default function ContactFormComponent({ onFormSubmit }: ContactFormComponentProps) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { t } = useLanguage();
  
  const form = useForm<ContactFormValues>({
    resolver: zodResolver(contactFormSchema),
    defaultValues: {
      name: "",
      email: "",
      phone: "",
      subject: "",
      message: "",
    },
    mode: "onChange",
  });

  async function onSubmit(data: ContactFormValues) {
    setIsSubmitting(true);
    
    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.error || 'Failed to send message');
      }

      toast({
        title: t('contact.form.success'),
        description: result.message || t('contact.form.successDesc'),
      });
      
      form.reset();
      if (onFormSubmit) {
        onFormSubmit();
      }
    } catch (error) {
      console.error('Error submitting form:', error);
      toast({
        title: t('contact.form.error'),
        description: error instanceof Error ? error.message : t('contact.form.errorDesc'),
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6 p-1">
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="flex items-center">
                <User className="mr-2 h-4 w-4 text-muted-foreground" />
                {t('contact.form.name')}
              </FormLabel>
              <FormControl>
                <Input placeholder="Sender Name" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="flex items-center">
                <Mail className="mr-2 h-4 w-4 text-muted-foreground" />
                {t('contact.form.email')}
              </FormLabel>
              <FormControl>
                <Input placeholder="sender@gmail.com" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="phone"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="flex items-center">
                <Phone className="mr-2 h-4 w-4 text-muted-foreground" />
                {t('contact.form.phone')}
              </FormLabel>
              <FormControl>
                <Input placeholder="+91 1234567890" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="subject"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="flex items-center">
                <Type className="mr-2 h-4 w-4 text-muted-foreground" />
                {t('contact.form.subject')}
              </FormLabel>
              <FormControl>
                <Input placeholder="Regarding " {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="message"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="flex items-center">
                <MessageSquare className="mr-2 h-4 w-4 text-muted-foreground" />
                {t('contact.form.message')}
              </FormLabel>
              <FormControl>
                <Textarea
                  placeholder="Tell us how we can help you or how you'd like to get involved..."
                  className="resize-none"
                  rows={5}
                  {...field}
                />
              </FormControl>
              <FormDescription className="text-xs">
                {t('contact.form.messageDesc')}
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button 
          type="submit" 
          className="w-full bg-primary hover:bg-primary/90 text-primary-foreground"
          disabled={isSubmitting}
        >
          {isSubmitting ? t('contact.form.sending') : t('contact.form.send')}
        </Button>
      </form>
    </Form>
  );
}
