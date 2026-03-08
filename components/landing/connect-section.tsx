"use client";

import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";
import { Instagram, Youtube, BookOpen, ArrowUpRight } from "lucide-react";

export function ConnectSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  const socialLinks = [
    {
      name: "Instagram",
      handle: "@silv.er7774",
      description: "일상과 영감을 나눕니다",
      icon: Instagram,
      href: "https://instagram.com/silv.er7774",
      gradient: "from-pink-500 via-red-500 to-yellow-500",
    },
    {
      name: "YouTube",
      handle: "최고은TV",
      description: "삶의 지혜를 공유합니다",
      icon: Youtube,
      href: "https://www.youtube.com/@%EC%B5%9C%EA%B3%A0%EC%9D%80silverball",
      gradient: "from-red-600 to-red-500",
    },
    {
      name: "네이버 블로그",
      handle: "인생간호사 최고은",
      description: "깊이 있는 글을 씁니다",
      icon: BookOpen,
      href: "https://m.blog.naver.com/nurse7774",
      gradient: "from-green-500 to-green-600",
    },
  ];

  return (
    <section ref={ref} className="py-24 md:py-32 bg-secondary">
      <div className="container mx-auto px-6">
        <div className="max-w-4xl mx-auto">
          {/* Section Header */}
          <motion.div
            className="text-center mb-16"
            initial={{ opacity: 0, y: 40 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8 }}
          >
            <span className="text-sm font-medium text-primary tracking-wider mb-4 block">
              함께해요
            </span>
            <h2 className="font-serif text-2xl md:text-4xl lg:text-5xl font-semibold text-foreground mb-6 text-balance">
              서로의 경험과 지혜를 나누며<br />함께 성장하는 커뮤니티
            </h2>
            <p className="text-lg text-muted-foreground">
              다양한 채널에서 만나요
            </p>
          </motion.div>

          {/* Social Cards */}
          <div className="grid md:grid-cols-3 gap-6">
            {socialLinks.map((social, index) => (
              <motion.a
                key={index}
                href={social.href}
                target="_blank"
                rel="noopener noreferrer"
                className="group relative bg-card border border-border rounded-2xl p-6 hover:shadow-xl hover:-translate-y-1 transition-all duration-300"
                initial={{ opacity: 0, y: 30 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: index * 0.1 }}
              >
                {/* Icon with gradient background */}
                <div
                  className={`w-14 h-14 bg-gradient-to-br ${social.gradient} rounded-xl flex items-center justify-center mb-5 group-hover:scale-110 transition-transform duration-300`}
                >
                  <social.icon className="w-7 h-7 text-white" />
                </div>

                {/* Platform Name */}
                <h3 className="font-serif text-lg font-semibold text-foreground mb-1">
                  {social.name}
                </h3>

                {/* Handle */}
                <p className="text-sm text-primary font-medium mb-2">
                  {social.handle}
                </p>

                {/* Description */}
                <p className="text-sm text-muted-foreground">
                  {social.description}
                </p>

                {/* Arrow indicator */}
                <div className="absolute top-6 right-6 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <ArrowUpRight className="w-5 h-5 text-muted-foreground" />
                </div>
              </motion.a>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
