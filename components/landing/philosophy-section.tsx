"use client";

import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";
import { Heart, Shield, Sparkles } from "lucide-react";

export function PhilosophySection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  const philosophyItems = [
    {
      icon: Heart,
      text: "호스피스 병동에서 배운 하루하루의 소중함으로 배웠습니다.",
    },
    {
      icon: Sparkles,
      text: "행복은 건강과 마음이 건강할 때 시작됩니다.",
    },
    {
      icon: Shield,
      text: "내 가족과 내 삶을 지켜내는 하루를 함께 만들어갑니다.",
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
              나의 철학
            </span>
            <h2 className="font-serif text-2xl md:text-4xl lg:text-5xl font-semibold text-foreground text-balance">
              하나뿐인 소중한<br />하루를 위해
            </h2>
          </motion.div>

          {/* Philosophy Content */}
          <div className="space-y-8">
            {philosophyItems.map((item, index) => (
              <motion.div
                key={index}
                className="flex gap-6 items-start bg-card p-6 md:p-8 rounded-2xl shadow-sm border border-border"
                initial={{ opacity: 0, x: -30 }}
                animate={isInView ? { opacity: 1, x: 0 } : {}}
                transition={{ duration: 0.6, delay: index * 0.15 }}
              >
                <div className="flex-shrink-0 w-12 h-12 bg-accent rounded-xl flex items-center justify-center">
                  <item.icon className="w-6 h-6 text-primary" />
                </div>
                <p className="text-foreground text-lg leading-relaxed">
                  {item.text}
                </p>
              </motion.div>
            ))}
          </div>

          {/* Closing Statement */}
          <motion.blockquote
            className="mt-16 text-center"
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.5 }}
          >
            <p className="font-serif text-xl md:text-2xl text-muted-foreground italic leading-relaxed">
              "삶의 마지막 순간, 모든 것이 무너져도
              <br className="hidden md:block" />
              사랑한 사람들과 함께한 시간만은 영원히 남습니다."
            </p>
            <cite className="mt-4 block text-sm text-muted-foreground not-italic">
              — 최고은
            </cite>
          </motion.blockquote>
        </div>
      </div>
    </section>
  );
}
