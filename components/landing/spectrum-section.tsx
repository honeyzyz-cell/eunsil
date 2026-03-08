"use client";

import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";
import { Brain, Megaphone, ShieldCheck, Leaf } from "lucide-react";

export function SpectrumSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  const services = [
    {
      icon: Brain,
      category: "정신건강 & 교육",
      title: "간호사",
      description: "당신의 마음 근육과 지적 성장을 돕습니다.",
      color: "bg-primary/10",
      iconColor: "text-primary",
    },
    {
      icon: Megaphone,
      category: "비즈니스 & 마케팅",
      title: "브랜드 블로그 & 플레이스 대행",
      description: "당신의 진심이 세상에 닿도록 돕습니다.",
      color: "bg-accent/50",
      iconColor: "text-accent-foreground",
    },
    {
      icon: ShieldCheck,
      category: "리스크 설계",
      title: "보험설계사",
      description: "나와 내 가족의 삶을 지키는 최소한의 안전장치를 설계합니다.",
      color: "bg-primary/10",
      iconColor: "text-primary",
    },
    {
      icon: Leaf,
      category: "웰니스 솔루션",
      title: "암웨이 ABO",
      description: "신체적 건강과 지속 가능한 성장의 기반을 다집니다.",
      color: "bg-accent/50",
      iconColor: "text-accent-foreground",
    },
  ];

  return (
    <section ref={ref} className="py-24 md:py-32 bg-background">
      <div className="container mx-auto px-6">
        {/* Section Header */}
        <motion.div
          className="text-center max-w-3xl mx-auto mb-16"
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
        >
          <span className="text-sm font-medium text-primary tracking-wider mb-4 block">
            전문 영역
          </span>
          <h2 className="font-serif text-2xl md:text-4xl lg:text-5xl font-semibold text-foreground mb-6 text-balance">
            삶의 모든 영역에서<br />함께합니다
          </h2>
          <p className="text-lg text-muted-foreground leading-relaxed">
            건강, 마음, 경제적 안정 그리고 성장까지.
          </p>
        </motion.div>

        {/* Services Grid */}
        <div className="grid md:grid-cols-2 gap-6 max-w-5xl mx-auto">
          {services.map((service, index) => (
            <motion.div
              key={index}
              className="group relative bg-card border border-border rounded-2xl p-8 hover:shadow-lg transition-all duration-300"
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: index * 0.1 }}
            >
              {/* Icon */}
              <div
                className={`w-14 h-14 ${service.color} rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300`}
              >
                <service.icon className={`w-7 h-7 ${service.iconColor}`} />
              </div>

              {/* Category */}
              <span className="text-xs font-medium text-muted-foreground tracking-wider uppercase">
                {service.category}
              </span>

              {/* Title */}
              <h3 className="font-serif text-xl font-semibold text-foreground mt-2 mb-3">
                {service.title}
              </h3>

              {/* Description */}
              <p className="text-muted-foreground leading-relaxed">
                {service.description}
              </p>

              {/* Hover indicator */}
              <div className="absolute bottom-8 right-8 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <div className="w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center">
                  <span className="text-primary text-lg">→</span>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
