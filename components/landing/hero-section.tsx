"use client";

import { motion } from "framer-motion";
import { Instagram, Youtube, BookOpen, MessageCircle } from "lucide-react";
import Image from "next/image";

const socialLinks = [
  {
    name: "Instagram",
    icon: Instagram,
    href: "https://instagram.com/silv.er7774",
    gradient: "from-pink-500 via-red-500 to-yellow-500",
  },
  {
    name: "YouTube",
    icon: Youtube,
    href: "https://www.youtube.com/@%EC%B5%9C%EA%B3%A0%EC%9D%80silverball",
    gradient: "from-red-600 to-red-500",
  },
  {
    name: "블로그",
    icon: BookOpen,
    href: "https://m.blog.naver.com/nurse7774",
    gradient: "from-green-500 to-green-600",
  },
  {
    name: "1:1 대화하기",
    icon: MessageCircle,
    href: "https://open.kakao.com/o/sxlg5cZh",
    gradient: "from-yellow-400 to-yellow-500",
  },
];

export function HeroSection() {
  return (
    <section className="min-h-screen flex items-center justify-center relative overflow-hidden bg-background">
      {/* Subtle decorative elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-20 right-10 w-96 h-96 bg-accent/20 rounded-full blur-3xl" />
        <div className="absolute bottom-20 left-10 w-72 h-72 bg-primary/5 rounded-full blur-3xl" />
      </div>

      <div className="container mx-auto px-6 py-20 relative z-10">
        <div className="max-w-5xl mx-auto">
          <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-16">
            {/* Profile Image */}
            <motion.div
              className="flex-shrink-0"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8 }}
            >
              <div className="relative w-64 h-64 md:w-80 md:h-80 lg:w-96 lg:h-96">
                <Image
                  src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/%EC%A0%9C%EB%AA%A9%EC%9D%84%20%EC%9E%85%EB%A0%A5%ED%95%B4%EC%A3%BC%EC%84%B8%EC%9A%94.%20%2819%29-x1LA2bs7kZpUTO5GZ0GuLNNeKfhEiS.png"
                  alt="간호사 최고은"
                  fill
                  className="object-contain"
                  priority
                />
              </div>
            </motion.div>

            {/* Content */}
            <div className="text-center lg:text-left">
              {/* Main Headline */}
              <motion.h1
                className="font-serif text-2xl md:text-4xl lg:text-5xl font-semibold leading-tight text-foreground mb-6"
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.1 }}
              >
                <span className="text-primary">당신의 하루와 비즈니스를<br />간호합니다</span>
              </motion.h1>

              {/* Trust indicator */}
              <motion.p
                className="text-sm text-muted-foreground mb-8"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.8, delay: 0.2 }}
              >
                간호사 · 보험설계사 · 웰니스 전문가
              </motion.p>

              {/* Social Links */}
              <motion.div
                className="flex flex-wrap justify-center lg:justify-start gap-3"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.3 }}
              >
                {socialLinks.map((social, index) => (
                  <a
                    key={index}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`flex items-center gap-2 px-4 py-2.5 bg-gradient-to-br ${social.gradient} text-white rounded-full text-sm font-medium hover:scale-105 hover:shadow-lg transition-all duration-300`}
                  >
                    <social.icon className="w-4 h-4" />
                    <span>{social.name}</span>
                  </a>
                ))}
              </motion.div>
            </div>
          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        className="absolute bottom-10 left-1/2 -translate-x-1/2"
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.6, repeat: Infinity, repeatType: "reverse" }}
      >
        <div className="w-6 h-10 border-2 border-muted-foreground/30 rounded-full flex justify-center pt-2">
          <div className="w-1.5 h-3 bg-muted-foreground/30 rounded-full" />
        </div>
      </motion.div>
    </section>
  );
}
