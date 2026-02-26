"use client";

import Link from "next/link";
import Image from "next/image";
import {
  motion,
  useScroll,
  useTransform,
  useSpring,
  useMotionValue,
  useMotionTemplate,
} from "framer-motion";
import { useRef, useState, useEffect } from "react";
import { resume } from "@/data/resume";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Badge } from "@/components/ui/badge";
import { ModeToggle } from "@/components/mode-toggle";
import {
  Github,
  Linkedin,
  Mail,
  MapPin,
  Globe,
  Download,
  ExternalLink,
  MessageSquare,
  Award,
  GraduationCap,
} from "lucide-react";

export default function Home() {
  const {
    personal,
    education,
    experience,
    projects,
    skills,
    achievements,
    organizations,
  } = resume;

  // Scroll Progress
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001,
  });

  // Parallax for Background Glow (Very slow movement -> Deep Depth)
  const yGlow = useTransform(scrollYProgress, [0, 1], [0, 500]);
  const yGlowReverse = useTransform(scrollYProgress, [0, 1], [0, -500]);

  // Mouse Parallax
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({
        x: e.clientX,
        y: e.clientY,
      });
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  // Animation Variants
  const fadeInUp = {
    initial: { opacity: 0, y: 60 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.6, ease: "easeOut" },
  };

  const staggerContainer = {
    animate: {
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  return (
    <main className="min-h-screen selection:bg-primary/30 relative overflow-hidden">
      {/* Scroll Progress Bar */}
      <motion.div
        className="fixed top-0 left-0 right-0 h-1.5 bg-primary origin-left z-50"
        style={{ scaleX }}
      />

      {/* Mouse Parallax Background Blobs */}
      <div className="fixed inset-0 pointer-events-none -z-10 overflow-hidden">
        <motion.div
          className="absolute top-[-10%] left-[-10%] w-[40vw] h-[40vw] rounded-full bg-purple-500/10 blur-[100px]"
          animate={{
            x: mousePosition.x * -0.05,
            y: mousePosition.y * -0.05,
          }}
          transition={{ type: "spring", stiffness: 50, damping: 20 }}
        />
        <motion.div
          className="absolute bottom-[-10%] right-[-10%] w-[40vw] h-[40vw] rounded-full bg-blue-500/10 blur-[100px]"
          animate={{
            x: mousePosition.x * 0.05,
            y: mousePosition.y * 0.05,
          }}
          transition={{ type: "spring", stiffness: 50, damping: 20 }}
        />
      </div>

      {/* Scroll Parallax Hero Glow (Moved to Global) */}
      <motion.div
        style={{ y: yGlow }}
        className="fixed top-1/4 left-1/4 w-[500px] h-[500px] bg-primary/40 rounded-full blur-[150px] -z-10 animate-pulse pointer-events-none"
      />
      <motion.div
        style={{ y: yGlowReverse }}
        className="fixed bottom-1/4 right-1/4 w-[400px] h-[400px] bg-purple-600/50 rounded-full blur-[150px] -z-10 animate-float pointer-events-none"
      />

      {/* Floating Header */}
      <header className="fixed top-0 w-full z-50 px-4 py-4 pointer-events-none">
        <div className="container mx-auto flex justify-end pointer-events-auto">
          <ModeToggle />
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative min-h-[90vh] flex items-center justify-center pt-20 pb-12">
        <motion.div
          className="container px-4 mx-auto text-center space-y-8 max-w-4xl relative z-10"
          variants={staggerContainer}
          initial="initial"
          whileInView="animate"
          viewport={{ once: true }}
        >
          <motion.div className="relative w-40 h-40 md:w-56 md:h-56 mx-auto mb-8 group z-20">
            <div className="absolute inset-0 rounded-full bg-gradient-to-tr from-primary to-purple-400 blur-lg opacity-30 group-hover:opacity-100 transition-opacity duration-500" />
            <div className="relative w-full h-full rounded-full overflow-hidden border-4 border-background shadow-2xl">
              <Image
                src="/assets/img/aulia.png"
                alt={personal.name}
                fill
                className="object-cover object-top scale-105 group-hover:scale-110 transition-transform duration-700"
                priority
              />
            </div>
          </motion.div>

          <div className="space-y-4">
            <h1 className="text-5xl md:text-7xl font-extrabold tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-primary via-purple-500 to-pink-500 pb-2">
              {personal.name}
            </h1>
            <p className="text-xl md:text-3xl text-muted-foreground font-light max-w-2xl mx-auto">
              {personal.title}
            </p>
            <div className="flex flex-wrap justify-center gap-6 text-sm md:text-base text-muted-foreground pt-2">
              <a
                href={`mailto:${personal.email}`}
                className="flex items-center gap-2 hover:text-primary transition-colors"
              >
                <Mail className="w-4 h-4" /> {personal.email}
              </a>
              <span className="flex items-center gap-2">
                <MapPin className="w-4 h-4" /> {personal.location}
              </span>
              <a
                href={personal.website}
                target="_blank"
                className="flex items-center gap-2 hover:text-primary transition-colors"
              >
                <Globe className="w-4 h-4" /> Portfolio
              </a>
            </div>
          </div>

          <div className="flex flex-wrap justify-center gap-4 pt-8">
            <Link href="/feedback">
              <Button
                size="lg"
                className="rounded-full px-8 h-12 text-md font-medium shadow-lg shadow-primary/25 hover:shadow-primary/40 hover:-translate-y-1 transition-all"
              >
                <MessageSquare className="w-4 h-4 mr-2" /> Give Feedback
              </Button>
            </Link>
            <div className="flex gap-2">
              <Button
                variant="outline"
                size="icon"
                className="rounded-full h-12 w-12 border-primary/20 hover:bg-primary/10 transition-colors"
                asChild
              >
                <a href={personal.github} target="_blank">
                  <Github className="w-5 h-5" />
                </a>
              </Button>
              <Button
                variant="outline"
                size="icon"
                className="rounded-full h-12 w-12 border-primary/20 hover:bg-primary/10 transition-colors"
                asChild
              >
                <a
                  href={`https://linkedin.com/in/${personal.linkedin}`}
                  target="_blank"
                >
                  <Linkedin className="w-5 h-5" />
                </a>
              </Button>
            </div>
          </div>
        </motion.div>
      </section>

      <div className="container px-4 mx-auto py-20 space-y-24">
        {/* About Bento */}
        {/* About Me Split */}
        <motion.section
          initial="initial"
          whileInView="animate"
          viewport={{ once: true }}
          variants={fadeInUp}
          className=""
        >
          <div className="grid md:grid-cols-3 gap-8 items-start">
            <div className="md:col-span-1 space-y-6">
              <div className="glass rounded-3xl p-8 relative overflow-hidden">
                <div className="relative z-10">
                  <h2 className="text-3xl font-bold mb-4">About Me</h2>
                  <div className="space-y-4">
                    <div className="flex items-center gap-3 text-muted-foreground">
                      <MapPin className="w-5 h-5 text-primary" />
                      <span>{personal.location}</span>
                    </div>
                    <div className="flex items-center gap-3 text-muted-foreground">
                      <GraduationCap className="w-5 h-5 text-purple-500" />
                      <span>UGM Alumnus</span>
                    </div>
                    <div className="flex items-center gap-3 text-muted-foreground">
                      <Globe className="w-5 h-5 text-blue-400" />
                      <span>{skills.length}+ Skills</span>
                    </div>
                  </div>
                </div>
                <div className="absolute -right-10 -bottom-10 w-32 h-32 bg-primary/10 rounded-full blur-2xl" />
              </div>
            </div>

            <div className="md:col-span-2 glass rounded-3xl p-8 md:p-10 relative overflow-hidden flex items-center">
              <div className="relative z-10">
                <p className="text-lg md:text-xl leading-relaxed text-muted-foreground">
                  {personal.bio}
                </p>
              </div>
              <div className="absolute top-0 right-0 w-64 h-64 bg-purple-500/5 rounded-full blur-3xl -z-10" />
            </div>
          </div>
        </motion.section>

        {/* Experience & Education - Staggered Layout */}
        <motion.section
          initial="initial"
          whileInView="animate"
          viewport={{ once: true }}
          variants={fadeInUp}
          className="grid md:grid-cols-2 gap-12"
        >
          <div className="space-y-8">
            <h2 className="text-3xl font-bold flex items-center gap-3 mb-8">
              <span className="p-2 bg-primary/10 rounded-lg">
                <Award className="w-6 h-6 text-primary" />
              </span>
              Experience
            </h2>
            <div className="space-y-6">
              {experience.map((exp, i) => (
                <Sheet key={i}>
                  <SheetTrigger asChild>
                    <div className="relative group cursor-pointer">
                      <div className="absolute -left-[39px] top-1 h-5 w-5 rounded-full border-4 border-background bg-primary transition-transform group-hover:scale-125 duration-300" />
                      <div className="glass-card rounded-2xl p-6 transition-all hover:-translate-y-1 hover:bg-primary/5">
                        <div className="flex flex-col sm:flex-row justify-between sm:items-center gap-2 mb-2">
                          <h3 className="text-xl font-bold">{exp.role}</h3>
                          <Badge variant="secondary" className="w-fit">
                            {exp.period}
                          </Badge>
                        </div>
                        <p className="text-primary font-medium mb-3">
                          {exp.company}
                        </p>
                        <p className="text-muted-foreground text-sm leading-relaxed line-clamp-2">
                          {exp.description}
                        </p>
                        <p className="text-xs text-primary mt-2 font-medium opacity-0 group-hover:opacity-100 transition-opacity">
                          Read more →
                        </p>
                      </div>
                    </div>
                  </SheetTrigger>
                  <SheetContent className="overflow-y-auto sm:max-w-xl w-full">
                    <SheetHeader className="mb-6 space-y-4">
                      <SheetTitle className="text-3xl font-bold text-primary">
                        {exp.role}
                      </SheetTitle>
                      <div className="space-y-2">
                        <p className="text-xl font-medium">{exp.company}</p>
                        <div className="flex items-center gap-2 text-muted-foreground">
                          <Award className="w-4 h-4" />
                          <span>{exp.period}</span>
                        </div>
                      </div>
                    </SheetHeader>
                    <div className="prose dark:prose-invert text-muted-foreground whitespace-pre-line leading-relaxed">
                      {exp.description}
                    </div>
                  </SheetContent>
                </Sheet>
              ))}
            </div>
          </div>

          <div className="space-y-8">
            <h2 className="text-3xl font-bold flex items-center gap-3 mb-8">
              <span className="p-2 bg-purple-500/10 rounded-lg">
                <GraduationCap className="w-6 h-6 text-purple-500" />
              </span>
              Education
            </h2>
            <div className="space-y-6">
              {education.map((edu, i) => (
                <div
                  key={i}
                  className="glass-card rounded-2xl p-6 hover:-translate-y-1"
                >
                  <div className="flex justify-between items-start mb-2">
                    <div>
                      <h3 className="text-xl font-bold">{edu.school}</h3>
                      <p className="text-purple-500 font-medium">
                        {edu.degree}
                      </p>
                    </div>
                    <Badge variant="outline">{edu.year}</Badge>
                  </div>
                  <p className="text-muted-foreground text-sm mt-4">
                    {edu.description}
                  </p>
                  {edu.thesis && (
                    <div className="mt-4 p-3 bg-primary/5 rounded-lg border border-primary/10 text-xs italic">
                      Thesis: {edu.thesis}
                    </div>
                  )}
                </div>
              ))}

              {/* Skills as a sub-section of education column */}
              <div className="pt-8">
                <h3 className="text-2xl font-bold mb-6">Skills</h3>
                <div className="flex flex-wrap gap-2">
                  {skills.map((skill) => (
                    <Badge
                      key={skill}
                      variant="secondary"
                      className="px-3 py-1.5 text-sm hover:bg-primary hover:text-primary-foreground transition-colors cursor-default"
                    >
                      {skill}
                    </Badge>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </motion.section>

        {/* Bento Grid Projects */}
        {/* Projects Accordion */}
        <motion.section
          initial="initial"
          whileInView="animate"
          viewport={{ once: true }}
          variants={fadeInUp}
        >
          <h2 className="text-3xl font-bold mb-8 flex items-center gap-3">
            <span className="p-2 bg-gradient-to-br from-primary/20 to-purple-500/20 rounded-lg">
              <Globe className="w-6 h-6 text-primary" />
            </span>
            Featured Projects
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 auto-rows-[minmax(250px,auto)]">
            {projects.map((proj, i) => (
              <Sheet key={i}>
                <SheetTrigger asChild>
                  <div
                    className={`glass-card rounded-3xl p-8 flex flex-col justify-between group relative overflow-hidden cursor-pointer hover:shadow-primary/25 transition-all duration-300 ${
                      i === 0 || i === 3 ? "md:col-span-2" : "md:col-span-1"
                    }`}
                  >
                    <div className="absolute top-0 right-0 p-32 bg-gradient-to-br from-primary/10 to-transparent rounded-full blur-3xl -mr-16 -mt-16 group-hover:bg-primary/20 transition-all duration-500" />

                    <div className="relative z-10 w-full text-left">
                      <div className="flex justify-between items-start mb-4">
                        <Badge variant="outline" className="bg-background/50">
                          {proj.period}
                        </Badge>
                        <ExternalLink className="w-5 h-5 text-primary opacity-0 group-hover:opacity-100 transition-opacity" />
                      </div>
                      <h3 className="text-2xl font-bold mb-2 group-hover:text-primary transition-colors">
                        {proj.name}
                      </h3>
                      <p className="text-muted-foreground font-medium mb-3 text-sm">
                        {proj.role}
                      </p>
                      <p className="text-muted-foreground mb-4 line-clamp-3 text-sm">
                        {proj.description}
                      </p>
                    </div>

                    <div className="relative z-10 flex flex-wrap gap-2 mt-auto">
                      {proj.tags?.slice(0, 3).map((tag) => (
                        <span
                          key={tag}
                          className="text-xs font-medium px-2 py-1 rounded-md bg-background/50 border border-border/50 text-muted-foreground"
                        >
                          {tag}
                        </span>
                      ))}
                      {proj.tags && proj.tags.length > 3 && (
                        <span className="text-xs font-medium px-2 py-1 rounded-md bg-background/50 border border-border/50 text-muted-foreground">
                          +{proj.tags.length - 3}
                        </span>
                      )}
                    </div>
                  </div>
                </SheetTrigger>
                <SheetContent className="overflow-y-auto sm:max-w-xl w-full">
                  <SheetHeader className="mb-6 space-y-4">
                    <SheetTitle className="text-4xl font-bold text-primary">
                      {proj.name}
                    </SheetTitle>
                    <SheetDescription className="text-lg font-medium text-foreground">
                      {proj.role} • {proj.period}
                    </SheetDescription>
                    <div className="flex flex-wrap gap-2 py-2">
                      {proj.tags?.map((tag) => (
                        <Badge key={tag} variant="secondary">
                          {tag}
                        </Badge>
                      ))}
                    </div>
                  </SheetHeader>
                  <div className="prose dark:prose-invert text-muted-foreground whitespace-pre-line leading-relaxed text-lg">
                    {proj.description}
                  </div>
                </SheetContent>
              </Sheet>
            ))}
          </div>
        </motion.section>

        {/* Organizations Section */}
        <section>
          <h2 className="text-3xl font-bold mb-8 flex items-center gap-3">
            <span className="p-2 bg-orange-500/10 rounded-lg">
              <MessageSquare className="w-6 h-6 text-orange-500" />
            </span>
            Organizations
          </h2>
          <div className="flex flex-col md:flex-row justify-between items-end border-b border-orange-500/10 pb-4 mb-8">
            <div className="text-muted-foreground hidden md:inline-block">
              Leadership & Volunteering
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {organizations.map((org, i) => (
              <Sheet key={i}>
                <SheetTrigger asChild>
                  <div className="glass-card rounded-3xl p-6 group cursor-pointer hover:-translate-y-2 hover:bg-orange-500/5 transition-all duration-300 relative overflow-hidden flex flex-col h-full border-t-4 border-t-transparent hover:border-t-orange-500">
                    {/* Decorative Background Icon */}
                    <div className="absolute -right-4 -bottom-4 opacity-5 group-hover:opacity-10 transition-opacity">
                      <MessageSquare className="w-24 h-24" />
                    </div>

                    <div className="mb-4">
                      <Badge
                        variant="secondary"
                        className="mb-2 bg-orange-500/10 text-orange-700 hover:bg-orange-500/20 border-orange-200/50"
                      >
                        {org.period}
                      </Badge>
                      <h3 className="text-xl font-bold group-hover:text-orange-600 transition-colors leading-tight mb-1">
                        {org.name}
                      </h3>
                      <p className="text-sm font-medium text-muted-foreground">
                        {org.role}
                      </p>
                    </div>

                    <p className="text-sm text-muted-foreground line-clamp-3 mb-4 flex-grow">
                      {org.description}
                    </p>

                    <div className="flex items-center text-xs font-bold text-orange-500 group-hover:translate-x-1 transition-transform">
                      Read Story <ExternalLink className="w-3 h-3 ml-1" />
                    </div>
                  </div>
                </SheetTrigger>
                <SheetContent className="overflow-y-auto sm:max-w-xl w-full">
                  <SheetHeader className="mb-6 space-y-4">
                    <div className="h-14 w-14 rounded-xl bg-orange-500/10 flex items-center justify-center">
                      <MessageSquare className="w-7 h-7 text-orange-600" />
                    </div>
                    <div>
                      <SheetTitle className="text-3xl font-bold text-orange-600 mb-1">
                        {org.name}
                      </SheetTitle>
                      <SheetDescription className="text-lg font-medium text-foreground">
                        {org.role}
                      </SheetDescription>
                    </div>
                    <Badge variant="secondary" className="w-fit">
                      {org.period}
                    </Badge>
                  </SheetHeader>
                  <div className="prose dark:prose-invert text-muted-foreground whitespace-pre-line leading-relaxed">
                    {org.description}
                  </div>
                </SheetContent>
              </Sheet>
            ))}
          </div>
        </section>

        {/* Achievements Section */}
        <section className="pb-20">
          <h2 className="text-3xl font-bold mb-10 text-center">
            Honors & Awards
          </h2>
          <div className="text-center mb-12">
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Recognitions for excellence in technology, leadership, and
              innovation.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-6 relative">
            {/* Decorative Grid Background */}
            <div className="absolute inset-0 bg-grid-white/[0.02] -z-10" />

            {achievements.map((award, i) => (
              <Sheet key={i}>
                <SheetTrigger asChild>
                  <div className="glass-card rounded-xl p-1 relative group cursor-pointer overflow-hidden border-none shadow-lg hover:shadow-amber-500/10 transition-all">
                    {/* Golden Border Gradient */}
                    <div className="absolute inset-0 bg-gradient-to-br from-amber-300/30 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                    <div className="bg-background/90 backdrop-blur-xl rounded-[10px] p-5 h-full flex items-start gap-4 relative z-10">
                      <div className="h-12 w-12 rounded-full bg-gradient-to-br from-amber-100 to-amber-200 dark:from-amber-900/30 dark:to-amber-800/30 flex items-center justify-center shrink-0 shadow-inner group-hover:scale-110 transition-transform duration-300">
                        <Award className="w-6 h-6 text-amber-600 dark:text-amber-400" />
                      </div>
                      <div className="text-left">
                        <h4 className="font-bold text-lg leading-tight group-hover:text-amber-600 dark:group-hover:text-amber-400 transition-colors">
                          {award.title}
                        </h4>
                        <div className="flex items-center gap-2 mt-2">
                          <Badge
                            variant="outline"
                            className="text-xs border-amber-200 text-amber-700 dark:text-amber-400 bg-amber-50/50 dark:bg-amber-900/10"
                          >
                            {award.date}
                          </Badge>
                          {award.title.toLowerCase().includes("1st") && (
                            <Badge className="bg-amber-500 text-white hover:bg-amber-600 border-none text-[10px] px-1.5 h-5">
                              Winner
                            </Badge>
                          )}
                        </div>
                      </div>
                      <div className="absolute right-4 top-4 opacity-0 group-hover:opacity-100 transition-opacity">
                        <ExternalLink className="w-4 h-4 text-muted-foreground" />
                      </div>
                    </div>
                  </div>
                </SheetTrigger>
                <SheetContent className="overflow-y-auto sm:max-w-xl w-full">
                  <SheetHeader className="mb-8 items-center text-center space-y-4">
                    <div className="h-24 w-24 rounded-full bg-gradient-to-br from-amber-100 to-amber-200 flex items-center justify-center mb-2 shadow-xl ring-4 ring-background">
                      <Award className="w-12 h-12 text-amber-600" />
                    </div>
                    <div className="space-y-2">
                      <SheetTitle className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-amber-600 to-yellow-600">
                        {award.title}
                      </SheetTitle>
                      <SheetDescription className="text-lg text-muted-foreground font-medium">
                        {award.date}
                      </SheetDescription>
                    </div>
                  </SheetHeader>
                  <div className="prose dark:prose-invert text-muted-foreground text-center mx-auto whitespace-pre-line leading-relaxed bg-muted/30 p-6 rounded-2xl border border-border/50">
                    <p className="italic">
                      "{award.description || "No specific details available."}"
                    </p>
                  </div>
                </SheetContent>
              </Sheet>
            ))}
          </div>
        </section>
      </div>

      {/* Footer */}
      <footer className="py-12 bg-muted/30 border-t border-primary/5 text-center relative overflow-hidden">
        <div className="absolute inset-0 bg-grid-pattern opacity-[0.03]" />
        <div className="container relative z-10">
          <h2 className="text-2xl font-bold mb-6">
            Let's build something amazing together.
          </h2>
          <Link href="/feedback">
            <Button size="lg" className="rounded-full mb-8">
              Get In Touch
            </Button>
          </Link>
          <p className="text-sm text-muted-foreground">
            © {new Date().getFullYear()} {personal.name}. Crafted with Next.js &
            Tailwind.
          </p>
        </div>
      </footer>
    </main>
  );
}
