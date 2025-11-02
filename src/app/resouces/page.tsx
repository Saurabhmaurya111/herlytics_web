"use client";

import React from "react";
import {
  FaGraduationCap,
  FaBookOpen,
  FaDesktop,
  FaUniversity,
  FaCode,
  FaVideo,
  FaCertificate,
  FaFileAlt,
  FaUsers,
  FaChartBar,
  FaRobot,
  FaPython,
  FaDatabase,
  FaCloud,
  FaChartLine,
  FaMicroscope,
  FaFistRaised,
  FaExternalLinkAlt,
} from "react-icons/fa";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import Navbar from "@/components/layout/navbar";
import Footer from "@/components/layout/footer";
import Link from "next/link";

type ResourceItem = {
  title: string;
  description: string;
  category: string;
  level: "Beginner" | "Intermediate" | "Advanced";
  duration?: string;
  icon: React.ReactNode;
  link: string;
  featured?: boolean;
};

const resourceData: ResourceItem[] = [
  // Online Courses
  {
    title: "Introduction to Data Science for Women",
    description: "A comprehensive beginner-friendly course covering Python, statistics, and data visualization.",
    category: "Courses",
    level: "Beginner",
    duration: "8 weeks",
    icon: <FaGraduationCap />,
    link: "https://www.coursera.org/specializations/data-science-foundations-r",
    featured: true,
  },
  {
    title: "Machine Learning Fundamentals",
    description: "Deep dive into ML algorithms, supervised and unsupervised learning techniques.",
    category: "Courses",
    level: "Intermediate",
    duration: "12 weeks",
    icon: <FaRobot />,
    link: "https://www.coursera.org/learn/machine-learning",
  },
  {
    title: "Python for Data Analysis",
    description: "Master pandas, numpy, and data manipulation libraries for real-world projects.",
    category: "Courses",
    level: "Beginner",
    duration: "6 weeks",
    icon: <FaPython />,
    link: "https://www.kaggle.com/learn/python",
  },
  {
    title: "Advanced SQL and Database Management",
    description: "Expert-level database querying, optimization, and data warehousing concepts.",
    category: "Courses",
    level: "Advanced",
    duration: "10 weeks",
    icon: <FaDatabase />,
    link: "https://www.coursera.org/learn/sql-for-data-science",
  },
  // Learning Materials
  {
    title: "Data Science Cheat Sheets",
    description: "Quick reference guides for Python, R, SQL, and machine learning algorithms.",
    category: "Materials",
    level: "Beginner",
    icon: <FaFileAlt />,
    link: "https://www.datacamp.com/cheat-sheet",
    featured: true,
  },
  {
    title: "Statistics for Data Scientists",
    description: "Essential statistical concepts explained with practical examples and exercises.",
    category: "Materials",
    level: "Beginner",
    icon: <FaChartBar />,
    link: "https://www.khanacademy.org/math/statistics-probability",
  },
  {
    title: "Interview Prep Guide",
    description: "Complete guide with common data science interview questions and solutions.",
    category: "Materials",
    level: "Intermediate",
    icon: <FaFileAlt />,
    link: "https://github.com/alexeygrigorev/data-science-interviews",
  },
  {
    title: "Women in Tech Success Stories",
    description: "Inspiring stories and case studies from leading women in data science.",
    category: "Materials",
    level: "Beginner",
    icon: <FaUsers />,
    link: "https://builtin.com/diversity-inclusion/women-in-tech",
  },
  // Hands-on Labs
  {
    title: "Data Cleaning Challenge",
    description: "Interactive lab focusing on handling missing data and data preprocessing.",
    category: "Labs",
    level: "Beginner",
    duration: "2 hours",
    icon: <FaDesktop />,
    link: "https://www.kaggle.com/learn/data-cleaning",
    featured: true,
  },
  {
    title: "Build Your First ML Model",
    description: "Hands-on project building a predictive model from scratch using real datasets.",
    category: "Labs",
    level: "Intermediate",
    duration: "4 hours",
    icon: <FaChartLine />,
    link: "https://www.kaggle.com/learn/intro-to-machine-learning",
  },
  {
    title: "Cloud Data Pipeline Workshop",
    description: "Learn to deploy data pipelines on AWS, Azure, and GCP platforms.",
    category: "Labs",
    level: "Advanced",
    duration: "6 hours",
    icon: <FaCloud />,
    link: "https://aws.amazon.com/training/paths/machine-learning/",
  },
  {
    title: "Data Visualization Portfolio",
    description: "Create stunning visualizations using Tableau, Power BI, and Python libraries.",
    category: "Labs",
    level: "Intermediate",
    duration: "3 hours",
    icon: <FaChartBar />,
    link: "https://www.kaggle.com/learn/data-visualization",
  },
  // Government & Scholarships
  {
    title: "NMEICT Scholarships",
    description: "National Mission on Education through ICT funding for women in STEM programs.",
    category: "Government",
    level: "Beginner",
    icon: <FaUniversity />,
    link: "https://ictnmeicthn.karnataka.gov.in/",
    featured: true,
  },
  {
    title: "DST Women Scientist Scheme",
    description: "Department of Science and Technology grants for women pursuing research careers.",
    category: "Government",
    level: "Intermediate",
    icon: <FaMicroscope />,
    link: "https://online-wosa.gov.in/",
  },
  {
    title: "Skill India Data Science Initiative",
    description: "Government-sponsored free data science training programs for women.",
    category: "Government",
    level: "Beginner",
    icon: <FaCertificate />,
    link: "https://www.nsdcindia.org/",
  },
  {
    title: "Digital India Fellowship",
    description: "Fellowship program supporting women entrepreneurs in data science and AI.",
    category: "Government",
    level: "Intermediate",
    icon: <FaFistRaised />,
    link: "https://www.digitalindia.gov.in/",
  },
  // Additional Resources
  {
    title: "Weekend Coding Bootcamp",
    description: "Intensive weekend sessions for working professionals transitioning to data science.",
    category: "Courses",
    level: "Intermediate",
    duration: "8 weekends",
    icon: <FaCode />,
    link: "https://www.freecodecamp.org/learn/2022/data-science-with-python/",
  },
  {
    title: "Video Tutorial Library",
    description: "Access 100+ hours of video content on various data science topics.",
    category: "Materials",
    level: "Beginner",
    icon: <FaVideo />,
    link: "https://www.youtube.com/playlist?list=PLeo1K3hjS3us_ELKYSj_Fth2tIEkdKXvV",
  },
];

const getLevelColor = (level: string) => {
  switch (level) {
    case "Beginner":
      return "bg-green-100 text-green-800 border-green-200";
    case "Intermediate":
      return "bg-yellow-100 text-yellow-800 border-yellow-200";
    case "Advanced":
      return "bg-red-100 text-red-800 border-red-200";
    default:
      return "bg-gray-100 text-gray-800 border-gray-200";
  }
};

const Page: React.FC = () => {
  const categories = [
    { id: "all", label: "All Resources", icon: <FaFileAlt />, count: resourceData.length },
    { id: "courses", label: "Online Courses", icon: <FaGraduationCap />, count: resourceData.filter(r => r.category === "Courses").length },
    { id: "materials", label: "Learning Materials", icon: <FaBookOpen />, count: resourceData.filter(r => r.category === "Materials").length },
    { id: "labs", label: "Hands-on Labs", icon: <FaDesktop />, count: resourceData.filter(r => r.category === "Labs").length },
    { id: "government", label: "Government & Scholarships", icon: <FaUniversity />, count: resourceData.filter(r => r.category === "Government").length },
  ];

  return (
    <main className="flex flex-col min-h-screen bg-background">
      <Navbar />
      <div className="pt-20 pb-16 px-6 sm:px-8 lg:px-12">
        {/* Header Section */}
        <div className="text-center mb-12 animate-fadeIn">
          <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
            Educational Resources
          </h1>
          <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto">
            Empowering women in data science with curated courses, hands-on labs, and career development resources
          </p>
        </div>

        {/* Tabs Navigation */}
        <Tabs defaultValue="all" className="w-full max-w-7xl mx-auto">
          <TabsList className="grid w-full grid-cols-2 md:grid-cols-5 h-auto p-2 bg-secondary/20 mb-8">
            {categories.map((category) => (
              <TabsTrigger
                key={category.id}
                value={category.id}
                className="flex flex-col items-center gap-2 py-4 data-[state=active]:bg-primary data-[state=active]:text-primary-foreground transition-all hover:bg-secondary/50"
              >
                <span className="text-2xl">{category.icon}</span>
                <span className="text-xs font-semibold leading-tight">{category.label}</span>
                <Badge variant="secondary" className="text-xs">
                  {category.count}
                </Badge>
              </TabsTrigger>
            ))}
          </TabsList>

          {/* Featured Resources Banner */}
          <div className="mb-8 p-4 bg-gradient-to-r from-primary/20 to-accent/20 rounded-lg border border-primary/30">
            <h3 className="text-xl font-bold mb-2 flex items-center gap-2">
              <FaCertificate className="text-primary" />
              Featured Resources
            </h3>
            <p className="text-sm text-muted-foreground">
              Start with these recommended resources to kickstart your data science journey
            </p>
          </div>

          {/* Content Sections */}
          {categories.map((category) => (
            <TabsContent key={category.id} value={category.id} className="mt-6">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {resourceData
                  .filter((resource) =>
                    category.id === "all" || resource.category.toLowerCase() === category.id
                  )
                  .map((resource, index) => (
                    <Card
                      key={index}
                      className={`group cursor-pointer transition-all duration-300 hover:shadow-2xl hover:scale-[1.02] ${
                        resource.featured
                          ? "ring-2 ring-primary border-primary/50 bg-gradient-to-br from-primary/5 to-accent/5"
                          : ""
                      }`}
                    >
                      {resource.featured && (
                        <div className="absolute top-3 right-3">
                          <Badge className="bg-primary text-primary-foreground">
                            Featured
                          </Badge>
                        </div>
                      )}
                      <CardHeader>
                        <div className="flex items-start gap-3">
                          <div className="text-3xl text-primary group-hover:scale-110 transition-transform duration-300">
                            {resource.icon}
                          </div>
                          <div className="flex-1">
                            <CardTitle className="text-lg mb-2 group-hover:text-primary transition-colors">
                              {resource.title}
                            </CardTitle>
                            <div className="flex flex-wrap gap-2">
                              <Badge
                                variant="outline"
                                className={`border ${getLevelColor(resource.level)}`}
                              >
                                {resource.level}
                              </Badge>
                              {resource.duration && (
                                <Badge variant="outline" className="border border-accent">
                                  {resource.duration}
                                </Badge>
                              )}
                            </div>
                          </div>
                        </div>
                      </CardHeader>
                      <CardContent>
                        <CardDescription className="mb-4 min-h-[3rem]">
                          {resource.description}
                        </CardDescription>
                        <Link href={resource.link} target="_blank" rel="noopener noreferrer">
                          <Button
                            className="w-full group/btn"
                            variant={resource.featured ? "default" : "outline"}
                          >
                            <span>Explore Resource</span>
                            <FaExternalLinkAlt className="ml-2 h-3 w-3 transition-transform group-hover/btn:translate-x-1" />
                          </Button>
                        </Link>
                      </CardContent>
                    </Card>
                  ))}
              </div>
            </TabsContent>
          ))}
        </Tabs>

        {/* Call to Action */}
        <div className="mt-16 p-8 bg-secondary/30 rounded-2xl text-center border border-secondary/50">
          <h3 className="text-2xl font-bold mb-4">Ready to Start Learning?</h3>
          <p className="text-muted-foreground mb-6 max-w-xl mx-auto">
            Join our community of women data scientists and get access to exclusive resources, mentorship, and networking opportunities.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Button size="lg" className="bg-primary hover:bg-primary/90">
              Become a Member
            </Button>
            <Button size="lg" variant="outline" className="border-primary text-primary hover:bg-primary/10">
              Request Mentorship
            </Button>
          </div>
        </div>
      </div>
      <Footer />
    </main>
  );
};

export default Page;
